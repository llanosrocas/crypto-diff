import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

const customTheme = createTheme({
  respectReducedMotion: true,
  white: 'oklch(1 0 0)',
  other: {
    tooltipBg: 'oklch(0 0 0 / 70%)',
    activeTradesBg: 'oklch(0.9558 0.05 87)',
    homeBg: 'oklch(0.9821 0 0)',
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);
