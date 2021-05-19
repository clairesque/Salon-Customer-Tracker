import React, { useState, useContext, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider'
import DatePicker from '@material-ui/lab/DatePicker'
import { AuthContext } from '../auth/auth'
import { Typography, Container, TextField, Button } from '@material-ui/core'
import SignOut from '../components/SignOut'

const useStyles = makeStyles((theme) => ({
  dGrid: {
    marginTop: theme.spacing(6),
  },
  dDown: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(4),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

// const columns = [
//     { field: 'Date', headerName: 'Date', width: 160 },
//     { field: 'Amount', headerName: 'Amount', width: 160 },
// ];

const columns = [
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'paid', headerName: 'Paid', width: 90 },
  { field: 'services', headerName: 'Services', width: 400 },
]

const MonthlyReport = (props) => {
  // const [month, setMonth] = React.useState('');
  // const [open, setOpen] = React.useState(false);
  const [customers, setCustomers] = useState([{ item: null }])
  const { currentUser } = useContext(AuthContext)
  const [monthlyTot, setMonthlyTot] = useState([0])

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })

        let tot = 0
        orders.forEach((item) => {
          tot += item.paid
        })

        setMonthlyTot(tot)
      })
  }, [setCustomers])

  //commented all these for faichan UwU - anonymous
  // useEffect(() => {
  //   const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Admin`
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((orders) => {
  //       setCustomers({ item: orders })
  //     })
  // }, [setCustomers])

  // const handleChange = (event) => {
  //     setMonth(event.target.value);
  // };

  // const handleClose = () => {
  //     setOpen(false);
  // };

  // const handleOpen = () => {
  //     setOpen(true);
  // };
  const classes = useStyles()
  const [value, setValue] = React.useState(new Date())

  return (
    <Container maxWidth='xs'>
      {currentUser.email.includes('admin') ? (
        <div style={{ height: 600, width: '100%' }}>
          <SignOut />
          <Typography align='center' variant='h5' color='textPrimary'>
            Monthly Report
          </Typography>

          <LocalizaitonProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              label='Year and Month'
              minDate={new Date('2012-03-01')}
              maxDate={new Date('2023-06-01')}
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
                  helperText={null}
                  variant='standard'
                />
              )}
            />
          </LocalizaitonProvider>

          <Container style={{ height: 450 }}>
            {customers.item && (
              <DataGrid
                getRowId={(r) => r._id}
                rows={customers.item}
                columns={columns}
                pageSize={9}
              />
            )}
          </Container>

          <Typography color='textPrimary'>
            Monthly{' '}
            {monthlyTot.toLocaleString('en-US', {
              style: 'currency',
              currency: 'AED',
            })}
          </Typography>
        </div>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      )}
    </Container>
  )
}
export default MonthlyReport
