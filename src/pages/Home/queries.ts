import {
  TBar,
  THttpPrefetchResponse,
  TQueriesData,
  TSymbol,
  TWsAuthPayload,
  TWsMsg,
} from '@/types';
import { barToLinePoint, extractSymbol, formatSymbol } from '@/utils';
import { useQueryClient, useSuspenseQueries, UseSuspenseQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo } from 'preact/hooks';

const prefetchBar = async ({
  symbol,
  timeframe,
  limit,
}: {
  symbol: TSymbol;
  timeframe: number;
  limit: number;
}) => {
  const url = new URL(import.meta.env.VITE_ALPACA_HTTP);

  const formattedSymbol = formatSymbol(symbol);
  url.searchParams.append('symbols', formattedSymbol);
  url.searchParams.append('timeframe', `${timeframe}Min`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('sort', 'desc');

  const res = await fetch(url.toString());
  const data: THttpPrefetchResponse = await res.json();

  return {
    symbol: formattedSymbol,
    bars: data.bars,
  };
};

type PrefetchedBar = Awaited<ReturnType<typeof prefetchBar>>;
const combinePrefetchBars = (results: UseSuspenseQueryResult<PrefetchedBar>[]) => {
  return {
    data: results
      .filter(result => result.isSuccess)
      .map(result => {
        const symbol = result.data.symbol;
        const bar = result.data.bars[symbol];
        const id = extractSymbol(symbol);
        const data = bar.map(barToLinePoint);

        return { id, data };
      }),
    isError: results.some(result => result.isError),
    errors: results.filter(result => result.isError).map(result => result.error),
  };
};

export const usePrefetchBars = ({
  symbols,
  timeframe,
  limit,
}: {
  symbols: TSymbol[];
  timeframe: number;
  limit: number;
}) => {
  return useSuspenseQueries({
    queries: symbols.map(symbol => ({
      queryKey: [symbol, timeframe, limit],
      queryFn: () =>
        prefetchBar({
          symbol,
          timeframe,
          limit,
        }),
    })),
    combine: combinePrefetchBars,
  });
};

export const useBarsSubscription = ({ symbols }: { symbols: TSymbol[] }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_ALPACA_WS);

    ws.onopen = () => {
      const auth: TWsAuthPayload = {
        action: 'auth',
        key: import.meta.env.VITE_KEY,
        secret: import.meta.env.VITE_SECRET,
      };

      ws.send(JSON.stringify(auth));

      const subscriptions = {
        action: 'subscribe',
        bars: symbols.map(formatSymbol),
      };

      ws.send(JSON.stringify(subscriptions));
    };

    ws.onmessage = event => {
      const { '0': msg }: TWsMsg = JSON.parse(event.data);

      if (msg.T === 'b') {
        const id = extractSymbol(msg.S);
        const symbol = msg.S;

        queryClient.setQueriesData<{ [symbol: TSymbol]: TBar[] }>({ queryKey: [id] }, oldData => {
          if (!oldData) return;

          return {
            ...oldData,
            bars: {
              ...oldData.bars,
              [symbol]: [msg, ...(Array.isArray(oldData.bars[symbol]) ? oldData.bars[symbol] : [])],
            },
          };
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [symbols]);
};

export const useLatestBars = () => {
  const queryClient = useQueryClient();
  const queriesData = queryClient.getQueriesData<TQueriesData>({});

  return useMemo(() => {
    return queriesData
      .flatMap(([_, query]) =>
        Object.entries(query.bars ?? {}).map(([S, bars]) => ({
          S,
          ...bars[bars.length - 1],
        })),
      )
      .sort((a, b) => new Date(b.t).getTime() - new Date(a.t).getTime());
  }, [queriesData]);
};
