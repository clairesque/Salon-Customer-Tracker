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
function EnabledButton(props) {
  return (
    <Button
      className={props.className}
      variant='contained'
      color='secondary'
      onClick={props.onClick}
      style={{ color: 'black' }}
    >
      Submit
    </Button>
  )
}
function DisabledButton(props) {
  return (
    <Button
      className={props.className}
      variant='contained'
      color='secondary'
      disabled
      style={{ color: 'black' }}
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
  var day = (dateTime.getDate()).toString()
  var month = (dateTime.getMonth()+1).toString()
  if (month.length===1){
    month= "0"+month
  }
  if (day.length===1){
    day= "0"+day
  }
  var date = day+"-"+month+"-"+(dateTime.getFullYear()).toString()
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
      return (
        <EnabledButton onClick={props.onClick} className={props.className} />
      )
    } else {
      return <DisabledButton className={props.className} />
    }
  }

  const submitData = () => {
    let orders = {
      date: date,
      month: month,
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
    return (
      <Typography variant='h5' color='textPrimary' align='center'>
        Error: {error.message}
      </Typography>
    )
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
            <ButtonType className={classes.submit} onClick={submitData} />
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
