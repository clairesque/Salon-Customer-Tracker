import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Typography, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import app from '../auth/config'
import { AuthContext } from '../auth/auth'

const useStyles = makeStyles((theme) => ({
  theader: {
    backgroundColor: theme.palette.primary.main,
  },
  pagename: {
    textAlign: 'center',
  },
  textField: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: 150,
  },
}))

const columns = [
  { field: 'Time', headerName: 'Date' },
  { field: 'Service', headerName: 'Service' },
  { field: 'Bill', headerName: 'Amount' },
]

const AdminHome = (props) => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([{ item: null }])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const apiUrl = `https://saloontracker.herokuapp.com/collection/Customers`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
      })
  }, [setCustomers])

  return (
    <>
      {currentUser.email.includes('admin') ? (
        <Container maxWidth='xs'>
          <Button onClick={() => app.auth().signOut()}>Sign out</Button>
          <h1 className={classes.pagename}>Order Details</h1>
          <form noValidate>
            <TextField
              style={{ overflow: 'hidden' }}
              id='sdate'
              label='Start Date'
              type='date'
              defaultValue='dd/m/yyyy'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ overflow: 'hidden' }}
              id='edate'
              label='End Date'
              type='date'
              defaultValue='dd/m/yyyy'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <div style={{ height: 600, width: '100%', margin: '10px auto' }}>
            {customers.item && (
              <DataGrid
                getRowId={(r) => r._id}
                rows={customers.item}
                columns={columns}
                pageSize={9}
                checkboxSelection
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

export default AdminHome
