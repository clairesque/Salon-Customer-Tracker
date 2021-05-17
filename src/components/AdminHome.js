import React, {useState} from "react"
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';

var dateobj = new Date();
var day = dateobj.getDate();
var month = dateobj.getMonth()+1;
var year = dateobj.getFullYear();
var time = dateobj.getTime()
var today = day.toString()+"/"+month.toString()+"/"+year.toString();

const useStyles = makeStyles((theme) => ({
    theader: {
        backgroundColor: theme.palette.primary.main
    },
    pagename:{
        textAlign: "center"
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

/* homies the ID must be unique of homie grid wont show element */
const rows = [
    {"id": 1,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 2,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 3,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 4,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 5,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 6,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 7,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 8,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 9,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 10,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
    {"id": 11,"date": today,"paid": 20.00,"services": ["dye", "cut", "shave", "pedicure", "wax"]},
]


const AdminHome = (props) => {
    const classes = useStyles()
    
    return (
        <Container maxWidth='xs'>
        <h1 className = {classes.pagename}>Order Details</h1>
            <form noValidate>
                <TextField
                    style={{ overflow: "hidden"}}
                    id="sdate"
                    label="Start Date"
                    type="date"
                    // onChange={this.handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    style={{overflow: "hidden"}}
                    id="edate"
                    label="End Date"
                    type="date"
                    // onChange={this.handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
            <div className="react-grid-multiline-content" style={{ height: 600, width: '100%',margin:"10px auto"}}>
                <DataGrid rows={rows} columns={columns}
                 pageSize={10}
                checkboxSelection
                autoHeight
                // onCellEnter =
                //cler, uncomment the next two lines and check design and keep/remove (refresh need)
                // showCellRightBorder = "true"
                // showColumnRightBorder = "true"
                
                />
            </div>
        </Container>
  );
}

export default AdminHome
