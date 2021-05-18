import React, { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@material-ui/data-grid'
<<<<<<< HEAD
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react'
=======
import { Typography, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import app from '../auth/config'
import { AuthContext } from '../auth/auth'
>>>>>>> 2e1d63c95d8b1796e78f855329e3c9584bbb680c

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
  { field: 'date', headerName: 'Date', width:100},
  { field: 'paid', headerName: 'Paid', width:90},
  { field: 'services', headerName: 'Services', width:500}
]


const AdminHome = (props) => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([{ item: null }])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Customers`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
      })
  }, [setCustomers])

  return (
<<<<<<< HEAD
    <Container maxWidth='xs'>
      <h1 className={classes.pagename}>Order Details</h1>
      <form noValidate>
        <TextField
          style={{ overflow: 'hidden' }}
          id='sdate'
          label='Start Date'
          type='date'
          defaultValue='dd/m/yyyy'
          // onChange={this.handleChange}
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
          // onChange={this.handleChange}
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
            autoHeight
            // onCellEnter =
            //cler, uncomment the next two lines and check design and keep/remove (refresh need)
            // showCellRightBorder = "true"
            // showColumnRightBorder = "true"
          />
        )}
      </div>
    </Container>
=======
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
>>>>>>> 2e1d63c95d8b1796e78f855329e3c9584bbb680c
  )
}

export default AdminHome
