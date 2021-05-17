import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Login from './components/Login'
import AdminHome from './components/AdminHome'
import Homepage from './components/Homepage'
import { AuthProvider } from './auth/auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)')
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontWeight: 400,
          letterSpacing: 1,
          textTransform: 'none',
          button: {
            fontWeight: 400,
            letterSpacing: 1,
            textTransform: 'none',
          },
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div>
            <Route exact path='/' component={Login} />
            <PrivateRoute exact path='/admin' component={AdminHome} />
            <PrivateRoute exact path='/home' component={Homepage} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
