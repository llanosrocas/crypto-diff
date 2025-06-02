import { TNormalizedChartDatum } from '@/types';
import { formatUSD } from '@/utils';
import { theme } from '@/utils/mantine';
import { Box, Flex, Paper } from '@mantine/core';
import { Point } from '@nivo/line';

type TooltipProps = {
  point: Point;
};

export const LineChartTooltip = ({ point }: TooltipProps) => {
  const data = point.data as Point['data'] & TNormalizedChartDatum;

  const date = new Date(data.x);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const percentageChange = Number(data.y).toFixed(3);

  return (
    <Paper
      bg={theme.other.tooltipBg}
      c="white"
      p="xs"
      fz="sm"
    >
      <Flex
        gap={4}
        class="tooltip-time"
      >
        <Box fw="bold">Time:</Box> {time}
      </Flex>
      <Flex
        gap={4}
        class="tooltip-price"
      >
        <Box fw="bold">Price:</Box> ${formatUSD(data.originalPrice)}
      </Flex>
      <Flex
        gap={4}
        class="tooltip-percent"
      >
        <Box fw="bold">Change:</Box> {percentageChange}%
      </Flex>
    </Paper>
  );
};
