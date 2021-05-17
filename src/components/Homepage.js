import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Container } from '@material-ui/core'
import Card from './Card'
import app from '../auth/config'
import { AuthContext } from '../auth/auth'

export default function Homepage() {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      {currentUser.email.includes('user') ? (
        <Container component='main'>
          <Button onClick={() => app.auth().signOut()}>Sign out</Button>
          <Typography color='textSecondary' gutterBottom>
            Choose Options
          </Typography>
          <Card name='Haircut' />
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      )}
    </>
  )
}
