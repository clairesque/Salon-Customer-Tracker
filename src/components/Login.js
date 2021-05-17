import React, { useCallback, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { LockSimple } from 'phosphor-react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { withRouter, Redirect } from 'react-router'
import app from '../auth/config'
import { AuthContext } from '../auth/auth'

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    marginTop: theme.spacing(12),
    ['@media (min-height:800px)']: {
      marginTop: theme.spacing(23),
    },
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.dark,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.error.dark,
  },
}))

const Login = ({ history }) => {
  const classes = useStyles()

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()

      var { email, password } = event.target.elements

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(
            email.value + '@salontracker.com',
            password.value
          )
        if (email.value.includes('admin')) history.push('/admin')
        else history.push('/home')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/home' />
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.login}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockSimple weight='fill' size={20} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log In
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}

export default withRouter(Login)
