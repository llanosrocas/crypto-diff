import { TSymbol } from '@/types';
import { signal } from '@preact/signals';
import { createContext } from 'preact';

export const createAppState = () => {
  const symbols = signal<TSymbol[]>(['BTC', 'ETH']);
  const prefetchLimit = signal<number>(7);
  const timeframe = signal<number>(1);

  return { symbols, prefetchLimit, timeframe };
};

export const AppState = createContext(createAppState());
