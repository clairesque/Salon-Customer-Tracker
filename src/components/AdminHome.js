import { DataGrid } from '@material-ui/data-grid'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react'

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

  useEffect(() => {
    const apiUrl = `https://saloontracker.herokuapp.com/collection/Customers`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
      })
  }, [setCustomers])

  return (
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
  )
}

export default AdminHome
