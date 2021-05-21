import React, { useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Grid } from '@material-ui/core'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import ItemCard from '../components/Card'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../auth/auth'
import SignOut from '../components/SignOut'
import TextField from '@material-ui/core/TextField'

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
//enabled submit button
function EnabledButton(props) {
  return (
    <Button
      className={props.className}
      variant='contained'
      color='primary'
      onClick={props.onClick}
      style={{ backgroundColor: '#a17aef', color: 'black' }}
    >
      Submit
    </Button>
  )
}
//disabled submit button
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
//user page class
export default function User() {
  const [error, setError] = React.useState(null) //on page load error log when fetching from heroku
  const [items, setItems] = React.useState([]) //card state from Card.js
  const [customers, setCustomers] = React.useState([]) //customers state to post to DB
  const [total, setTotal] = React.useState(0) //total cost to post to DB
  const [dialogBox, setOpen] = React.useState(false) //dialog box display state
  const [dialogResponse, setMsg] = React.useState({
    dialogHead: '',
    dialogMsg: null,
  }) //dialog box content incase of error or if success
  const [searchValue, setSearchValue] = React.useState('')
  const { currentUser } = useContext(AuthContext)

  const classes = useStyles()
  //fetch to load items from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/Services`)
      .then((res) => res.json())
      .then(
        (result) => {
          let filteredResults = []
          for (var i = 0; i < result.length; i++) {
            if (
              result[i].Service.toLowerCase().includes(
                searchValue.toLowerCase()
              )
            ) {
              filteredResults.push(result[i])
            }
          }
          setItems(filteredResults)
        },
        (error) => {
          setError(error)
        }
      )
  }, [searchValue])

  let dateTime = new Date()
  var day = dateTime.getDate().toString()
  var month = (dateTime.getMonth() + 1).toString()
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  var date = day + '-' + month + '-' + dateTime.getFullYear().toString()
  var time = dateTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  })

  const getData = (data, sum) => {
    setCustomers(data)
    setTotal(sum)
  }
  const getSearchValue = (e) => {
    setSearchValue(e.target.value)
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
      .then((data) => {
        setOpen(true)
        setMsg({
          dialogHead: 'Done',
          dialogMsg: `Added ${orders.services} at ${orders.time}`,
        })
      })
      .catch(function (error) {
        setOpen(true)
        setMsg({ dialogHead: 'Error', dialogMsg: error.message })
      })
  }
  const SubmitDialog = () => {
    const handleClose = () => {
      setOpen(false)
      window.location.reload()
    }
    return (
      <div>
        <Dialog open={dialogBox} aria-labelledby='responsive-dialog-title'>
          <DialogTitle id='responsive-dialog-title' style={{ minWidth: 500 }}>
            {dialogResponse.dialogHead}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogResponse.dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClose}
              autoFocus
            >
              Return to Home
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
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
          <TextField
            label='Search'
            margin='normal'
            variant='outlined'
            onChange={getSearchValue}
          />
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
          <SubmitDialog />
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      ),
    ]
  }
}
