import React, { } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';


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





const Dashboard = () => {
    const [month, setMonth] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const classes = useStyles()
    const [value, setValue] = React.useState(new Date());


    return (

        <div style={{ height: 600, width: '100%' }}>
            {
                <h1 style={{ textAlign: "Center" }}>Dashboard</h1>

                /* <div>
                
                <FormControl style={{ alignContent: "Center" }} className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">month</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={month}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Jan</MenuItem>
                        <MenuItem value={20}>Feb</MenuItem>
                        <MenuItem value={30}>March</MenuItem>
                    </Select>
                </FormControl>
            </div> */}
            <LocalizaitonProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date('2023-06-01')}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
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
        </div >

    );
}
export default Dashboard