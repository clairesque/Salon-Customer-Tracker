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
import Particles from "react-tsparticles";

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    position: "absolute",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: "center",
  },
  paper: {
    display: 'flex',
    margin: "10px auto",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#a17aef',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#a17aef',
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
      {/* THIS IS THE BG ANIMATION, HARD REFRESH AFTER CHANGE TO SEE THEM */}
      <Particles
        style = {{zIndex: "-999", position: "absolute", width: "100%", height: "100%"}}
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#F8F7FF",
            },
          },
          fpsLimit: 60,         //initially was 60 fps, didnt have issues when it was 40 as well
          interactivity: {
            detectsOn: "canvas",
            events: {

              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              // value: ["#9381FF","#FFD8BE", "#B8B8FF"],
              value: ["#9381FF", "#B8B8FF"], //change particle colors or add colors here
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,     //increase speed here, i made it slow so it isnt annoying 
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
              // type: ["square","triangle"], //i prefer circles myself
            },
            size: {
              random: true,
              value: 60, //even 50 is coo
            },
          },
          detectRetina: true,
        }}
      />
    
      <Container component='main' maxWidth='xs' style = {{zIndex: "9999"}}className={classes.login}>
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
    </>
  )
}

export default withRouter(Login)
