import React, { Suspense, lazy } from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Box, CircularProgress, CssBaseline, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ContactMain from './components/ContactMain/ContactMain';
import { QueryClient, QueryClientProvider } from 'react-query';

const Login = lazy(() => import('./views/login/Login'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {staleTime: 10000}
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/:id',
        element: <ContactMain />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: blue[700],
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: 'Inter'
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '10px'
              }
            }
          }
        }
      }),
    [prefersDarkMode],
  );

  const SuspenseLoader = () => {
    return <Box className="suspense-loader">
      <CircularProgress />
    </Box>
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Suspense fallback={<SuspenseLoader />}>
              <RouterProvider router={router} />
            </Suspense>
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
