import React, { Suspense, lazy } from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { blue } from '@mui/material/colors';

const Login = lazy(() => import('./views/login/Login'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/f',
        element: <div>sdsd</div>
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
