import { Controls } from '@/components/Controls';
import { History } from '@/components/History';
import { LineChart } from '@/components/LineChart';
import { useBarsSubscription, useLatestBars, usePrefetchBars } from '@/pages/Home/queries';
import { AppState } from '@/state';
import { theme } from '@/utils/mantine';
import { Flex } from '@mantine/core';
import { useContext } from 'preact/hooks';

export const HomePage = () => {
  const { timeframe, symbols, prefetchLimit } = useContext(AppState);

  const prefetchBars = usePrefetchBars({
    symbols: symbols.value,
    limit: prefetchLimit.value,
    timeframe: timeframe.value,
  });

  const latestBars = useLatestBars();

  useBarsSubscription({ symbols: symbols.value });

  return (
    <Flex
      component="main"
      direction="column"
      gap="md"
      bg={theme.other.homeBg}
      p="md"
      mih="100dvh"
      h="100%"
    >
      <LineChart bars={prefetchBars.data} />
      <Controls />
      <History latestBars={latestBars} />
    </Flex>
  );
};
