import { AppState } from '@/state';
import { Grid, MultiSelect, NumberInput } from '@mantine/core';
import { useContext } from 'preact/hooks';

export const Controls = () => {
  const { symbols, prefetchLimit, timeframe } = useContext(AppState);

  return (
    <Grid
      gutter="sm"
      align="center"
    >
      <Grid.Col span={12}>
        <MultiSelect
          placeholder="Pick symbols"
          data={['BTC', 'ETH', 'SOL', 'AAVE', 'BCH']}
          defaultValue={symbols.value}
          nothingFoundMessage="Nothing found..."
          onChange={newSymbols => (symbols.value = newSymbols)}
          searchable
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <NumberInput
          label="Prefetch bar count"
          defaultValue={prefetchLimit.value}
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          min={1}
          onChange={newPrefetchLimit => (prefetchLimit.value = Number(newPrefetchLimit))}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <NumberInput
          label="Bar timeframe (minutes)"
          defaultValue={timeframe.value}
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          min={1}
          onChange={newTimeframe => (timeframe.value = Number(newTimeframe))}
        />
      </Grid.Col>
    </Grid>
  );
};
