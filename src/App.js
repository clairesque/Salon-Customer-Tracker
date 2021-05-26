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
import Add from './pages/Add'

function App() {
  const NavBarRoutes = () => (
    <>
      <PrivateRoute exact path='/daily' component={DailyReport} />
      <PrivateRoute exact path='/monthly' component={MonthlyReport} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/add' component={Add} />
      <NavBar />
    </>
  )
  return (
    <ThemeProvider>
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
