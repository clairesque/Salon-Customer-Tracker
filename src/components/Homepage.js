import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, CardActionArea, Container } from '@material-ui/core'
import Card from './Card'
import ItemCard from './Card'
import { makeStyles } from '@material-ui/core/styles'
import { CenterFocusStrong } from '@material-ui/icons'

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
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState([])

  const classes = useStyles()

  useEffect(() => {
    fetch('http://saloontracker.herokuapp.com/collection/Services')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Typography className={classes.title}>Loading...</Typography>
  } else {
    return (
      <Container component='main'>
        <Typography className={classes.title}>Add customer</Typography>
        {items.map((item) => (
          <ItemCard key={item._id} name={item.Service} price={item.Price} />
        ))}
        <Button variant='contained'>Submit</Button>
      </Container>
    )
  }
}
