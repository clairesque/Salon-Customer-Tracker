import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Clock, Calendar, SignOut, ChartBar, PlusCircle } from 'phosphor-react'
import app from '../auth/config'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#e9f2f9',
  },
}))

export default function NavBar() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [clicked, setClicked] = React.useState(null)
  const [pathname, setPath] = React.useState(window.location.pathname)

  React.useEffect(() => {
    setPath(window.location.pathname)
  }, [clicked])

  const onButtonClicked = (id) => {
    clicked === id ? setClicked(null) : setClicked(id)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.dailyNav}
        label={
          <Typography
            fontSize={pathname == '/daily' ? 15 : 12}
            color={pathname == '/daily' ? '#422eaa' : '#0a1f4d'}
          >
            Daily
          </Typography>
        }
        icon={
          <Clock
            size={30}
            weight='duotone'
            color={pathname == '/daily' ? '#422eaa' : '#0a1f4d'}
          />
        }
        component={Link}
        onClick={() => onButtonClicked(0)}
        to={'/daily'}
      />
      <BottomNavigationAction
        label={
          <Typography
            fontSize={pathname == '/monthly' ? 15 : 12}
            color={pathname == '/monthly' ? '#422eaa' : '#0a1f4d'}
          >
            Monthly
          </Typography>
        }
        icon={
          <Calendar
            size={30}
            weight='duotone'
            color={pathname == '/monthly' ? '#422eaa' : '#0a1f4d'}
          />
        }
        onClick={() => onButtonClicked(1)}
        component={Link}
        to={'/monthly'}
      />
      <BottomNavigationAction
        label={
          <Typography
            fontSize={pathname == '/add' ? 15 : 12}
            color={pathname == '/add' ? '#422eaa' : '#0a1f4d'}
          >
            Add
          </Typography>
        }
        icon={
          <PlusCircle
            size={30}
            weight='duotone'
            color={pathname == '/add' ? '#422eaa' : '#0a1f4d'}
          />
        }
        component={Link}
        onClick={() => onButtonClicked(2)}
        to={'/add'}
      />
      <BottomNavigationAction
        label={
          <Typography
            fontSize={pathname == '/dashboard' ? 15 : 12}
            color={pathname == '/dashboard' ? '#422eaa' : '#0a1f4d'}
          >
            Dashboard
          </Typography>
        }
        icon={
          <ChartBar
            size={30}
            weight='duotone'
            color={pathname == '/dashboard' ? '#422eaa' : '#0a1f4d'}
          />
        }
        onClick={() => onButtonClicked(3)}
        component={Link}
        to={'/dashboard'}
      />
      <BottomNavigationAction
        label={
          <Typography color='#0a1f4d' fontSize={12}>
            Logout
          </Typography>
        }
        icon={<SignOut size={30} weight='duotone' color='#0a1f4d' />}
        onClick={() => app.auth().signOut()}
      />
    </BottomNavigation>
  )
}
