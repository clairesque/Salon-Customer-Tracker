import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  AreaChart,
  Bar,
  Area,
  Label
} from 'recharts'

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

let curr = day + '-' + month + '-' + dateobj.getFullYear().toString()

const Dashboard = () => {
  const [dailyData, setDailyData] = useState([{ item: null }])
  const [monthlyData, setMonthlyData] = useState([{ item: null }])
  const [allTimeTot, setAllTimeTot] = useState(0)
  const classes = useStyles()
  
  useEffect(() => {
    let total = 0
    const apiUrl1 =
      `${process.env.REACT_APP_BACKEND_URL}/Customers/daily/` + curr
    fetch(apiUrl1)
      .then((res) => res.json())
      .then((orders) => {
        setDailyData({ item: orders })
      })
    const apiUrl2 =
      `${process.env.REACT_APP_BACKEND_URL}/Customers/monthly/` + month+"-"+dateobj.getFullYear()
    fetch(apiUrl2)
      .then((res) => res.json())
      .then((orders) => {
        setMonthlyData({ item: orders })
      })
      const apiUrl3 =
      `${process.env.REACT_APP_BACKEND_URL}/Customers`
    fetch(apiUrl3)
      .then((res) => res.json())
      .then((orders) => {
        orders.forEach(element => {
          total+=element.paid
        });
        setAllTimeTot(total)
      })
  }, [])

  return (
    <>
      <Typography
        align='center'
        variant='h5'
        className={classes.title}
        marginTop = {2}
      >
        Dashboard
      </Typography>
      <ComposedChart
        
        width={350}
        height={300}
        data={dailyData.item}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey='time' fontSize={11}>
        <Label value="Daily" offset={0}
            fontSize={15}
            position="insideBottom"
            />
        </XAxis>
        <YAxis dataKey='paid' />
        <Tooltip />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar dataKey='paid' barSize={20} fill='#413ea0'/>
        <Line type='monotone' dataKey='paid' stroke='#ff7300' />
      </ComposedChart>
      <br></br>
      {/* <ResponsiveContainer width='100%' height='100%'> */}
        <AreaChart
          width={350}
          height={300}
          data={monthlyData.item}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' fontSize= {11}>
            <Label value="Monthly" offset={0}
            fontSize={15}
            position="insideBottom"
            />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='paid' stroke='#8884d8' fill='#8884d8'/>
        </AreaChart>
        <Grid className={`center ${classes.totText}`}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}> Total Earnings: </span>{' '}
            {allTimeTot.toLocaleString('en-US', {
              style: 'currency',
              currency: 'AED',
            })}
          </Typography>
        </Grid>
      {/* </ResponsiveContainer> */}
    </>
  )
}
export default Dashboard
