import React, { useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Container } from '@material-ui/core'

import ItemCard from './Card'
import { makeStyles } from '@material-ui/core/styles'

import app from '../auth/config'
import { AuthContext } from '../auth/auth'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: 50,
    '@media (min-height:800px)': {
      fontSize: 30,
    },
  },
}))
export default function Homepage() {
  const [error, setError] = React.useState(null)
  const [items, setItems] = React.useState([])
  const { currentUser } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    fetch('http://saloontracker.herokuapp.com/collection/Services')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
        },
        (error) => {
          setError(error)
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return [
      currentUser.email.includes('user') ? (
        <Container component='main'>
          <Button onClick={() => app.auth().signOut()}>Sign out</Button>
          <Typography className={classes.title}>Add customer</Typography>
          {items.map((item) => (
            <ItemCard key={item._id} name={item.Service} price={item.Price} />
          ))}
          <Button variant='contained'>Submit</Button>
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      ),
    ]
  }
}
