import { Container } from '@/components/Container';
import { LineChartTooltip } from '@/components/LineChartTooltip';
import { normalizeBarsForLine } from '@/utils';
import { ResponsiveLine, Serie } from '@nivo/line';

type ChartProps = {
  bars: Serie[];
};

export const LineChart = ({ bars }: ChartProps) => {
  const normalizedData = bars.map(normalizeBarsForLine);

  return (
    <Container
      h="50vh"
      px="sm"
      py="md"
    >
      <ResponsiveLine
        data={normalizedData}
        margin={{ top: 20, right: 10, bottom: 35, left: 45 }}
        curve="monotoneX"
        motionConfig="stiff"
        enableArea={true}
        areaOpacity={0.1}
        xScale={{
          type: 'time',
          format: '%Y-%m-%dT%H:%M:%SZ',
          precision: 'minute',
          useUTC: true,
          nice: true,
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
          nice: true,
        }}
        axisBottom={{
          format: '%H:%M',
          tickRotation: -45,
          tickValues: 'every 3 minutes',
        }}
        colors={{ scheme: 'set2' }}
        pointSize={6}
        pointColor={{ from: 'color' }}
        pointBorderColor={{ from: 'color' }}
        pointBorderWidth={2}
        enableTouchCrosshair={true}
        useMesh={true}
        tooltip={({ point }) => <LineChartTooltip point={point} />}
        legends={[
          {
            anchor: 'top-left',
            direction: 'row',
            translateY: -20,
            translateX: -40,
            itemWidth: 50,
            itemHeight: 10,
            symbolSize: 10,
            symbolShape: 'circle',
          },
        ]}
      />
    </Container>
  );
};
