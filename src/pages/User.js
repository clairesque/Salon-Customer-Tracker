import React, { useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Grid } from '@material-ui/core'
import ItemCard from '../components/Card'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../auth/auth'
import SignOut from '../components/SignOut'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  submit: {
    width: '88%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))
export default function User() {
  const [error, setError] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [customers, setCustomers] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const { currentUser } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/Services`)
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

  let dateTime = new Date()

  var date = dateTime.toLocaleDateString()
  var time = dateTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  })

  const getData = (data, sum) => {
    setCustomers(data)
    setTotal(sum)
  }

  const submitData = () => {
    let orders = {
      date: date,
      time: time,
      paid: total,
      services: customers,
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/Customers`, {
      method: 'POST',
      body: JSON.stringify(orders),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return [
      currentUser.email.includes('user') ? (
        <Container component='main'>
          <SignOut />
          <Typography
            align='center'
            variant='h5'
            color='textPrimary'
            className={classes.title}
          >
            Add Customer
          </Typography>
          {items.map((item) => (
            <ItemCard
              key={item._id}
              name={item.Service}
              handleClick={getData}
              price={item.Price}
            />
          ))}
          <Grid className='center'>
            <Button
              variant='contained'
              className={classes.submit}
              style={{ color: 'black' }}
              onClick={submitData}
            >
              Submit
            </Button>
          </Grid>
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      ),
    ]
  }
}
