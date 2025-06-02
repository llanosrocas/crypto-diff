import { NotFoundPage } from '@/pages/_404';
import { HomePage } from '@/pages/Home';
import { AppState, createAppState } from '@/state';
import { theme } from '@/utils/mantine';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppState.Provider value={createAppState()}>
        <MantineProvider theme={theme}>
          <LocationProvider>
            <Router>
              <Route
                path="/"
                component={HomePage}
              />
              <Route
                default
                component={NotFoundPage}
              />
            </Router>
          </LocationProvider>
        </MantineProvider>
      </AppState.Provider>
    </QueryClientProvider>
  );
};

render(<App />, document.getElementById('app'));
