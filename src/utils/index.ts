import { TBar, TNormalizedChartBar, TSymbol, TTradingPair } from '@/types';
import { Datum, Serie } from '@nivo/line';

export const barToLinePoint = (bar: TBar): Datum => {
  return { x: bar.t, y: bar.c };
};

/** @description Compare the % change to negate the price diff */
export const normalizeBarsForLine = (bars: Serie): TNormalizedChartBar => {
  const base = Number(bars.data[0].y);
  return {
    ...bars,
    data: bars.data.map(b => ({
      x: b.x,
      y: ((Number(b.y) - base) / base) * 100,
      originalPrice: Number(b.y),
    })),
  };
};

export const extractSymbol = (symbol: TTradingPair): TSymbol => symbol.split('/')[0];

export const formatSymbol = (symbol: TSymbol): TTradingPair => `${symbol}/USD`;

export const formatUSD = (amount: number) =>
  new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const pluralize = (count: number, word: string, suffix = 's') =>
  `${count} ${word}${count !== 1 ? suffix : ''}`;

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
