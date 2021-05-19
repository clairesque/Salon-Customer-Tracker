import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Login from './pages/Login'
import DailyReport from './pages/DailyReport'
import MonthlyReport from './pages/MonthlyReport'
import User from './pages/User'
import { AuthProvider } from './auth/auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
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
            <PrivateRoute exact path='/daily' component={DailyReport} />
            <PrivateRoute exact path='/user' component={User} />
            <PrivateRoute exact path='/monthly' component={MonthlyReport} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
