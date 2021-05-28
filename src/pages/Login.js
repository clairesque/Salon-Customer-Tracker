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
  root: {
    fontWeight: 'bold',
    letterSpacing: '1',
    textTransform: 'none',
  },
  login: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  paper: {
    display: 'flex',
    margin: '10px auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  lock: {
    color: theme.palette.primary.white,
  },
  input: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: '5%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.white,
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: theme.palette.secondary.main,
    textTransform: 'none',
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
        if (email.value.includes('admin')) history.push('/daily')
        else history.push('/user')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser && currentUser.email.includes('admin'))
    return <Redirect to='/daily' />
  else if (currentUser && currentUser.email.includes('user'))
    return <Redirect to='/user' />

  return (
    <>
      <Container component='main' maxWidth='xs' className={classes.login}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockSimple weight='fill' size={20} className={classes.lock} />
          </Avatar>
          <Typography className={classes.text} component='h1' variant='h5'>
            Login to your account
          </Typography>
          <form className={classes.form} onSubmit={handleLogin} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              InputLabelProps={{
                style: { color: '#818181' },
              }}
              InputProps={{
                className: classes.input,
              }}
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
              InputLabelProps={{
                style: { color: '#818181' },
              }}
              InputProps={{
                className: classes.input,
              }}
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
    </>
  )
}

export default withRouter(Login)
