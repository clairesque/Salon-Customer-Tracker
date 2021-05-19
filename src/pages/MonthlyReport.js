import React, { useState, useContext, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import DatePicker from '@material-ui/lab/DatePicker'
import { AuthContext } from '../auth/auth'
import { Typography, Container, TextField, Button, Grid } from '@material-ui/core'
import SignOut from '../components/SignOut'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  monthPicker: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  monthlyText: {
    marginTop: theme.spacing(2),
  }
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
  const classes = useStyles()
  const [value, setValue] = React.useState(new Date())

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

  return (
    <Container maxWidth='xs'>
      {currentUser.email.includes('admin') ? (
        <div style={{ height: 600, width: '100%' }}>
          <SignOut />
          <Typography align='center' variant='h5' color='textPrimary' className={classes.title}>
            Monthly Report
          </Typography>

        <Grid className={classes.monthPicker}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['year', 'month']}
              label='Pick a Month'
              minDate={new Date('2021-01-01')}
              maxDate={new Date('2023-12-01')}
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              inputStyle={{ textAlign: 'center' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
                  helperText={null}
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
          </Grid>

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

<Grid className={`center ${classes.monthlyText}`}>
          <Typography color='textPrimary'>
            <span style={{fontWeight: "bold"}}> Monthly: </span>{' '}
            {monthlyTot.toLocaleString('en-US', {
              style: 'currency',
              currency: 'AED',
            })}
          </Typography>
          </Grid>
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
