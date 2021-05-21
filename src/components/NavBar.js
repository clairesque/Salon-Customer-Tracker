import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Clock, Calendar, SignOut, ChartBar, PlusCircle } from 'phosphor-react'
import app from '../auth/config'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
})

export default function NavBar() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [clicked, setClicked] = React.useState(null)

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
        label='Daily'
        icon={
          <Clock
            size={30}
            weight='duotone'
            color={clicked === 0 ? '#733ef0' : '#000000'}
          />
        }
        component={Link}
        onClick={() => onButtonClicked(0)}
        to={'/daily'}
      />
      <BottomNavigationAction
        label='Monthly'
        icon={
          <Calendar
            size={30}
            weight='duotone'
            color={clicked === 1 ? '#733ef0' : '#000000'}
          />
        }
        onClick={() => onButtonClicked(1)}
        component={Link}
        to={'/monthly'}
      />
      <BottomNavigationAction
        label='Add'
        icon={<PlusCircle size={30} weight='duotone' color={clicked === 2 ? '#733ef0' : '#000000'} />}
        component={Link}
        onClick={() => onButtonClicked(2)}
        to={'/add'}
      />
      <BottomNavigationAction
        label='Dashboard'
        icon={<ChartBar size={30} weight='duotone' color={clicked === 3 ? '#733ef0' : '#000000'} />}
        onClick={() => onButtonClicked(3)}
        component={Link}
        to={'/dashboard'}
      />
      <BottomNavigationAction
        label='Logout'
        icon={<SignOut size={30} weight='duotone'/>}
        onClick={() => app.auth().signOut()}
      />
    </BottomNavigation>
  )
}
