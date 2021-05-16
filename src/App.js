import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Login from './components/Login'
import AdminHome from './components/AdminHome'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
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
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/admin' component={AdminHome} />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
