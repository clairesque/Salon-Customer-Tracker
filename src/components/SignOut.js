import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { SignOut as Logout } from 'phosphor-react'
import app from '../auth/config'

const useStyles = makeStyles((theme) => ({
  signOut: {
    paddingTop: '1em',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}))

const SignOut = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={35}
      direction='row'
      justify='space-between'
      alignItems='center'
    >
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <Logout
          size={28}
          onClick={() => app.auth().signOut()}
          className={classes.signOut}
        />
      </Grid>
    </Grid>
  )
}

export default SignOut
