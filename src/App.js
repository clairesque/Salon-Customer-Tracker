import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Login from './pages/Login'
import DailyReport from './pages/DailyReport'
import MonthlyReport from './pages/MonthlyReport'
import User from './pages/User'
import { AuthProvider } from './auth/auth'
import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'

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
  const NavBarRoutes = () => (
    <>
      <PrivateRoute exact path='/daily' component={DailyReport} />
      <PrivateRoute exact path='/monthly' component={MonthlyReport} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <NavBar />
    </>
  )
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute exact path='/user' component={User} />
            <Route component={NavBarRoutes} />
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
