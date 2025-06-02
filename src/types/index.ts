import { DatumValue, Serie } from '@nivo/line';

export type TSymbol = string;
export type TTradingPair = `${TSymbol}/USD`;

export type TNormalizedChartDatum = {
  x: DatumValue;
  y: number;
  originalPrice: number;
};

export type TNormalizedChartBar = Serie & {
  data: TNormalizedChartDatum[];
};

export type TQueriesData = {
  queryKeys: [TSymbol, number, number];
  symbol: TTradingPair;
  bars: {
    [symbol: TTradingPair]: TBar[];
  };
};

export type TWsSuccess = {
  T: 'success';
  msg: 'connected' | 'authenticated';
};

export type TWsSubscription = {
  T: 'subscription';
  trades: Array<unknown>;
  quotes: Array<unknown>;
  orderbooks: Array<unknown>;
  bars: TBar;
  updatedBars: Array<unknown>;
  dailyBars: Array<unknown>;
};

export type TBar = {
  T: 'b';
  S: TTradingPair; // 'BTC/USD'
  o: number; // open price
  h: number; // high price
  l: number; // low price
  c: number; // close price
  v: number; // volume
  t: string; // timestamp
  n: number; // number of trades
  vw: number; // volume-weighted average price
};

export type TWsError = {
  T: 'error';
  code: 401 | 402;
  msg: 'auth failed' | 'not authenticated';
};

export type TWsMsg = [TWsSuccess | TWsSubscription | TBar | TWsError];

export type TWsAuthPayload = {
  action: 'auth';
  key: string;
  secret: string;
};

export type THttpError = {
  code: 200 | 400 | 403 | 429 | 500;
};

export type THttpPrefetchResponse = {
  bars: { [symbol: string]: TBar[] };
  next_page_token: string;
};
