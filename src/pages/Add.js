import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from '@material-ui/core'
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        fontWeight: 'bold',
      },
    totText: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

}))

let dateobj = new Date()
let month = (dateobj.getMonth() + 1).toString()
let day = dateobj.getDate().toString()

if (month.length === 1) {
  month = '0' + month
}
if (day.length === 1) {
  day = '0' + day
}

var hours = dateobj.getHours();
var minutes = dateobj.getMinutes();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+(minutes).toString() : minutes;
hours = hours < 10 ? '0'+(hours).toString() : hours;

let curr = day + '-' + month + '-' + dateobj.getFullYear().toString()
+" "+hours+":"+minutes+" "+ampm

const Add = () => {

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState("")
  const [service, setService] = useState("")
  const [sdate, setDate] = useState(curr)
  const [amount, setAmount] = useState(0)

  const handleClose = () => {
    setOpen(false)
  }

  const postFunc = () =>{
    
    let dateArray = sdate.split("-")
    let timeArray = sdate.split(" ")
    
    let monthyear = dateArray[1]+"-"+dateArray[2]
    let myArr = monthyear.split(" ")
    monthyear = myArr[0]

    let time = timeArray[1]+" "+timeArray[2]

    let fDateArray = sdate.split(" ")
    let date = fDateArray[0]

    let orders = {
        user: user,
        date: date,
        monthyear: monthyear,
        time: time,
        paid: amount,
        services: service
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/Customers`, {
        method: 'POST',
        body: JSON.stringify(orders),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        handleClose()
  }

  const handleGet = useCallback(
    async (event) => {
        event.preventDefault()

        var { user, service, sdate, ptype, paisa } = event.target.elements
        if (ptype.value == "give"){
            paisa.value = -Math.abs(paisa.value)
        }
        
        let newdate = moment(sdate.value).format("DD-MM-YYYY hh:mm A")
        setOpen(true)
        setUser(user.value)
        setService(service.value)
        if (sdate.value != ""){
            setDate(newdate)
        }
        setAmount(paisa.value)
        user.value = ""
        service.value = ""
        paisa.value = 0
    })


  return (
    <div style={{height:"100%"}}>
    <Typography
        align='center'
        variant='h5'
        color='textPrimary'
        className={classes.title}
        marginTop={2}
        >
        Add Other Payments
    </Typography>

    <form onSubmit = {handleGet}>

    <div  style={{
        position: 'absolute', left: '50%', top: '40%',
        transform: 'translate(-50%, -50%)',
        width:"95%"
    }}>
    
    <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='user'
        label='User'
        name='user'
        autoFocus
        style={{marginBottom: 45, marginTop: 50}}
    />
    <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='service'
        label='Additional Services'
        name='service'
        autoFocus
        style={{marginBottom: 45, marginTop: 0}}
    />
    <TextField
        id='sdate'
        label='Date'
        type='datetime-local'
        defaultValue={curr}
        format='dd/mm/yyyy'
        style= {{width: "100%"}}
        // onChange={handleChangeDate}
        InputLabelProps={{
        shrink: true,
    }}    
    />
    
    <FormControl component="fieldset"
     style={{
        marginTop: 45
    }}
    >
      <FormLabel component="legend">Payment Type</FormLabel>
      <RadioGroup row aria-label="position" name="ptype" defaultValue="top">
        
        <FormControlLabel
          value="receive"
          control={<Radio color="primary" />}
          label="Payment Received"
          labelPlacement="start"
        />
        <FormControlLabel
          value= "give"
          control={<Radio color="primary" />}
          label="Payment Made"
          labelPlacement="start"
        />

      </RadioGroup>
    </FormControl>

    <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='paisa'
        type="number"
        label='Payment Amount'
        name='paisa'
        autoFocus
        style={{
        marginTop: 45
    }}
    />
    </div>
    <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        style={{ position: "absolute", bottom: 65, width: "95%", marginLeft: "2.5%", marginRight: "2.5%"}}
    >
        Add to Database
    </Button>
    </form>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to add
            <br/>
            <br/>
            Additional service <strong> {service} </strong>
             on <strong> {sdate} </strong>
             under account <strong> {user}</strong> with amount <strong>{ amount }</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={postFunc} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    
    </div>
  )
}
export default Add
