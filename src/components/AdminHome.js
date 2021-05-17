import React, { useState, useContext } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import app from '../auth/config'
import { AuthContext } from '../auth/auth'

var dateobj = new Date()
var day = dateobj.getDate()
var month = dateobj.getMonth() + 1
var year = dateobj.getFullYear()
console.log('MONTH IS ' + month)
var time = dateobj.getTime()
var today = day.toString() + '/' + month.toString() + '/' + year.toString()

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
  { field: 'date', headerName: 'Date' },
  { field: 'services', headerName: 'Services' },
  { field: 'paid', headerName: 'Paid' },
]

/* homies the ID must be unique of homie grid wont show element */
const rows = [
  { id: 1, date: today, services: ['dye', 'cut'], paid: 20.0 },
  { id: 2, date: '17/5/2020', services: ['dye', 'cut', 'shave'], paid: 40.0 },
  { id: 3, date: '18/5/2020', services: ['dye', 'cut'], paid: 10.0 },
  { id: 4, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 5, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 6, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 7, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 8, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 9, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 10, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 11, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 12, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 13, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
  { id: 14, date: '19/5/2020', services: ['dye', 'cut'], paid: 50.0 },
]

const AdminHome = (props) => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

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
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={9}
              checkboxSelection
            />
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
