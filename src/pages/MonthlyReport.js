import React, { useState, useContext, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import DatePicker from '@material-ui/lab/DatePicker'
import { AuthContext } from '../auth/auth'
import { Typography, Container, TextField, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  dgridStyle: {
    '& .dateHeader, & .paidHeader': {
      backgroundColor: '#0a1f4d',
      color: '#FFF',
    },
  },

  title: {
    marginTop: theme.spacing(2),
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
  },
}))

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    width: 200,
    headerClassName: 'dateHeader',
    headerAlign: 'center',
  },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 150,
    headerClassName: 'paidHeader',
    headerAlign: 'center',
  },
]
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
var currmonth = (parseInt(new Date().getMonth()) + 1).toString()
if (currmonth.length === 1) {
  currmonth = '0' + currmonth
}

var curryear = new Date().getFullYear().toString()
let theUrl =
  `${process.env.REACT_APP_BACKEND_URL}/Customers/monthly/` +
  currmonth +
  '-' +
  curryear

const MonthlyReport = () => {
  const [customers, setCustomers] = useState([{ item: null }])
  const { currentUser } = useContext(AuthContext)
  const [monthlyTot, setMonthlyTot] = useState([0])
  const [month, setMonth] = useState(currmonth)
  const [year, setYear] = useState(curryear)
  const [url, setUrl] = useState(theUrl)
  const classes = useStyles()
  const [value, setValue] = React.useState(new Date())

  useEffect(() => {
    const apiUrl = url
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        let finalOrders = {}
        orders.forEach((element) => {
          if (element.date in finalOrders) {
            finalOrders[element.date] += element.paid
          } else {
            finalOrders[element.date] = element.paid
          }
        })
        let finalCustomers = []
        for (var i in finalOrders) {
          let date = i
          let paid = finalOrders[i]
          let _id = '_' + Math.random().toString(36).substr(2, 9)
          finalCustomers.push({ _id: _id, date: date, paid: paid })
        }
        setCustomers({ item: finalCustomers })
        let tot = 0
        orders.forEach((item) => {
          tot += item.paid
        })

        setMonthlyTot(tot)
      })
  }, [url])

  const changeMonth = (date) => {
    date = new Date(date)
    var selected = (parseInt(date.getMonth()) + 1).toString()
    var selectedYear = date.getFullYear().toString()
    if (selected.length === 1) {
      selected = '0' + selected
    }
    let newUrl =
      `${process.env.REACT_APP_BACKEND_URL}/Customers/monthly/` +
      selected +
      '-' +
      selectedYear
    componentDidMount(selectedYear, selected, newUrl)
  }

  const componentDidMount = (year, month, newUrl) => {
    setYear(year)
    setMonth(month)
    setUrl(newUrl)
  }

  return (
    <Container maxWidth='xs'>
      {currentUser.email.includes('admin') ? (
        <div style={{ height: 600, width: '100%' }}>
          <Typography align='center' variant='h5' className={classes.title}>
            Monthly Report ({monthNames[parseInt(month - 1)]} {year})
          </Typography>

          <Grid className={classes.monthPicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['month', 'year']}
                label='Pick a Month'
                minDate={new Date('2019-01-01')}
                maxDate={new Date('2099-12-01')}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue)
                  changeMonth(newValue)
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

          <div style={{ height: 550, width: '100%', margin: '10px auto' }}>
            {customers.item && (
              <DataGrid
                className={classes.dgridStyle}
                getRowId={(r) => r._id}
                rows={customers.item}
                columns={columns}
                pageSize={9}
              />
            )}
          </div>

          <Grid className={`center ${classes.monthlyText}`}>
            <Typography>
              <span style={{ fontWeight: 'bold' }}> Monthly: </span>{' '}
              {monthlyTot.toLocaleString('en-US', {
                style: 'currency',
                currency: 'AED',
              })}
            </Typography>
          </Grid>
        </div>
      ) : (
        <Typography className='centered'>
          You do not have permissions to access this page.
        </Typography>
      )}
    </Container>
  )
}
export default MonthlyReport
