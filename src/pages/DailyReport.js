import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Typography, Container, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../auth/auth'
import { Trash } from 'phosphor-react'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(5),
    fontWeight: 'bold',
  },
  delete: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  monthlyText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const columns = [
  { field: 'time', headerName: 'Time', width: 100 },
  { field: 'paid', headerName: 'Paid', width: 90 },
  { field: 'services', headerName: 'Services', width: 400 },
]

let dateobj = new Date()
let month = (dateobj.getMonth()+1).toString()
let day = dateobj.getDate().toString()

if (month.length == 1){
  month = "0"+month
}
if (day.length == 1){
  day = "0"+day
}

let curr = day+"-"+month+"-"+(dateobj.getFullYear()).toString()

const DailyReport = (props) => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([{ item: null }])
  const [deleted, setDeleted] = useState(false)
  const [date, setDate] = useState(curr)
  const [selection, setSelection] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [dailyTot, setDailyTot] = useState([0])

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers/daily/`+curr
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
        let total = 0
        orders.forEach((item) => {
          total += item.paid
        })
        setDailyTot(total)
        console.log(curr)

      })
  }, [deleted]||[date])

  const deleteEntries = (selected) => {
    setDeleted(!deleted)
    var delIds = Array.from(selected)
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers`
    delIds.forEach((element) => {
      fetch(apiUrl + '/' + element, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      })
    })
    setDate(curr)
  }

  const handleChangeDate = e => {
    let newdate = moment((e.target.value)).format("DD-MM-YYYY")
    setDate(newdate);
    console.log(newdate)
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers/daily/`+newdate
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
        let total = 0
        orders.forEach((item) => {
          total += item.paid
        })
        setDailyTot(total)
      })
    
 };

  return (
    <>
      {currentUser.email.includes('admin') ? (
        <Container maxWidth='xs'>
          <Typography
            align='center'
            variant='h5'
            color='textPrimary'
            className={classes.title}
          >
            Daily Report - {date}
          </Typography>
          <Grid
            container
            spacing={35}
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={6}>
              <TextField
                id='sdate'
                label='Date'
                type='date'
                defaultValue = {curr}
                format = "dd/mm/yyyy"
                onChange = {handleChangeDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.delete}>
              <Trash
                size={28}
                weight='duotone'
                onClick={() => {
                  deleteEntries(selection)
                }}
              />
            </Grid>
          </Grid>
          <div style={{ height: 575, width: '100%', margin: '10px auto' }}>
            {customers.item && (
              <DataGrid
                checkboxSelection
                getRowId={(r) => r._id}
                rows={customers.item}
                columns={columns}
                pageSize={9}
                onSelectionModelChange={(e) => {
                  const selectedIDs = new Set(e.selectionModel)
                  setSelection(selectedIDs)
                }}
                {...customers.item}
              />
            )}
          </div>
          <Grid className={`center ${classes.monthlyText}`}>
            <Typography color='textPrimary'>
              <span style={{ fontWeight: 'bold' }}> Total: </span>{' '}
              {dailyTot.toLocaleString('en-US', {
                style: 'currency',
                currency: 'AED',
              })}
            </Typography>
          </Grid>
        </Container>
      ) : (
        <Typography className='centered' color='textPrimary'>
          You do not have permissions to access this page.
        </Typography>
      )}
    </>
  )
}

export default DailyReport
