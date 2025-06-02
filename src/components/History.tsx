import { Container } from '@/components/Container';
import { TBar } from '@/types';
import { formatDate, formatUSD, pluralize } from '@/utils';
import { theme } from '@/utils/mantine';
import { Badge, Box, Flex, Stack, Text } from '@mantine/core';

type HistoryProps = {
  latestBars: TBar[];
};

export const History = ({ latestBars }: HistoryProps) => (
  <Container
    p="md"
    h="max"
  >
    <Stack>
      {latestBars.map((bar, i) => (
        <Box
          key={`${bar.S}-${bar.t}-${i}`}
          bg={bar.n > 0 ? theme.other.activeTradesBg : 'none'}
          style={{ borderRadius: 4 }}
          p="0.25rem"
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="center"
            gap={2}
          >
            <Flex gap={4}>
              <Text td="underline">{formatDate(bar.t)}:</Text>
              <Text fw="bold">{bar.S}</Text>
              <Text>{pluralize(bar.n, 'trade')}</Text>
            </Flex>

            <Flex gap={4}>
              <PriceBadge
                label="c"
                price={bar.c}
                color="blue"
              />
              <PriceBadge
                label="l"
                price={bar.l}
                color="red"
              />
              <PriceBadge
                label="h"
                price={bar.h}
                color="green"
              />
            </Flex>
          </Flex>
        </Box>
      ))}
    </Stack>
  </Container>
);

type PriceBadgeProps = {
  label: string;
  price: number;
  color: string;
};

const PriceBadge = ({ label, price, color }: PriceBadgeProps) => (
  <Badge
    leftSection={`${label}:`}
    variant="light"
    color={color}
  >
    {formatUSD(price)}
  </Badge>
);
