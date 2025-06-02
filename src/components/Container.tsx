import { Paper, PaperProps } from '@mantine/core';
import { JSX } from 'preact/jsx-runtime';

type ContainerProps = PaperProps & {
  children: JSX.Element;
};

export const Container = ({ children, ...props }: ContainerProps) => (
  <Paper
    bg="white"
    shadow="sm"
    {...props}
  >
    {children}
  </Paper>
);
