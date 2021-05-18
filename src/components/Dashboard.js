import React, {useState, useContext, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import app from '../auth/config'
import { AuthContext } from '../auth/auth'
import { Typography, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    dGrid: {
        marginTop: theme.spacing(6),

    },
    dDown: {

        marginLeft: theme.spacing(1),
        padding: theme.spacing(4),
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}))

const columns = [
    { field: 'Date', headerName: 'Date', width: 160 },
    { field: 'Amount', headerName: 'Amount', width: 160 },

];

const rows = [
    { id: 1, Date: '01/01/2021', Amount: 200 },
    { id: 2, Date: '01/01/2021', Amount: 200 },
    { id: 3, Date: '01/01/2021', Amount: 200 },
    { id: 4, Date: '01/01/2021', Amount: 200 },

];

const Dashboard = (props) => {
    // const [month, setMonth] = React.useState('');
    // const [open, setOpen] = React.useState(false);
    const { currentUser } = useContext(AuthContext)
  
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
    const classes = useStyles()
    const [value, setValue] = React.useState(new Date());

    return (
        <div>
        {currentUser.email.includes('admin') ? (
        
        <div style={{ height: 600, width: '100%' }}>
            <Button onClick={() => app.auth().signOut()}>Sign out</Button>
            <h1 style={{ textAlign: "Center" }}>Dashboard</h1>

            <LocalizaitonProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date('2023-06-01')}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        alert(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            helperText={null}
                            variant="standard"
                        />
                    )}
                />
            </LocalizaitonProvider>


            <DataGrid className={classes.dGrid} rows={rows} columns={columns} pmonthSize={5} checkboxSelection />
        </div >):(
            <Typography className='centered' color='textPrimary'>
                Login admin mingy
            </Typography>
        )
    }
    </div>
    );
}
export default Dashboard