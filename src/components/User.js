import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
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
function EnabledButton(props) {
  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={props.submitData}
      style={{ position: 'relative', left: '70%' }}
    >
      Submit
    </Button>
  )
}
function DisabledButton() {
  return (
    <Button
      variant='contained'
      color='secondary'
      disabled
      style={{ position: 'relative', left: '70%' }}
    >
      Submit
    </Button>
  )
}
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
  const ButtonType = (props) => {
    if (customers.length >= 1) {
      return <EnabledButton submitData={props.submitData} />
    } else {
      return <DisabledButton />
    }
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
          <div>
            <Button onClick={() => app.auth().signOut()}>Sign out</Button>
            <Typography className={classes.title}>Add customer</Typography>
            {items.map((item) => (
              <ItemCard
                key={item._id}
                name={item.Service}
                handleClick={getData}
                price={item.Price}
              />
            ))}

            <ButtonType submitData={submitData} />
          </div>
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      ),
    ]
  }
}
