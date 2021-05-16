import React from 'react'
import Typography from '@material-ui/core/Typography'
import { CardActionArea, Container } from '@material-ui/core'
import Card from './Card'

export default function Homepage() {
  return (
    <Container component='main'>
      <Typography color='textSecondary' gutterBottom>
        Choose Options
      </Typography>
      <Card name='Haircut' />
    </Container>
  )
}
