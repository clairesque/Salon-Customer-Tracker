import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Typography, Container, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../auth/auth'
import { Trash } from 'phosphor-react'
import SignOut from '../components/SignOut'

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
}))

const columns = [
  { field: 'time', headerName: 'Time', width: 100 },
  { field: 'paid', headerName: 'Paid', width: 90 },
  { field: 'services', headerName: 'Services', width: 400 },
  { field: 'delete', headerName: '', width: 50 },
]

const DailyReport = (props) => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([{ item: null }])
  const [selection, setSelection] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
      })
  }, [customers])

  const deleteEntries = (selected) => {
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
  }

  return (
    <>
      {currentUser.email.includes('admin') ? (
        <Container maxWidth='xs'>
          <SignOut />
          <Typography
            align='center'
            variant='h5'
            color='textPrimary'
            className={classes.title}
          >
            Daily Report
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
          <div style={{ height: 450, width: '100%', margin: '10px auto' }}>
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
