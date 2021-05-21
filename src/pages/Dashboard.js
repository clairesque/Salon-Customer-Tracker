import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Bar,
  Area
} from 'recharts'

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(5),
        fontWeight: 'bold',
      },
}))

let dateobj = new Date()
let month = (dateobj.getMonth() + 1).toString()
let day = dateobj.getDate().toString()

if (month.length == 1) {
  month = '0' + month
}
if (day.length == 1) {
  day = '0' + day
}

let curr = day + '-' + month + '-' + dateobj.getFullYear().toString()

const Dashboard = () => {
  const [customers, setCustomers] = useState([{ item: null }])
  const classes = useStyles()
  
  useEffect(() => {
    const apiUrl =
      `${process.env.REACT_APP_BACKEND_URL}/Customers/daily/` + curr
    fetch(apiUrl)
      .then((res) => res.json())
      .then((orders) => {
        setCustomers({ item: orders })
      })
  }, [])

  return (
    <>
      <Typography
        align='center'
        variant='h5'
        color='textPrimary'
        className={classes.title}
      >
        Dashboard
      </Typography>
      <ComposedChart
        width={350}
        height={300}
        style={{ marginTop: '10%' }}
        data={customers.item}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey='time' />
        <YAxis dataKey='paid' />
        <Tooltip />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar dataKey='paid' barSize={20} fill='#413ea0' />
        <Line type='monotone' dataKey='paid' stroke='#ff7300' />
      </ComposedChart>
      {/* <ResponsiveContainer width='100%' height='100%'> */}
        <AreaChart
          width={350}
          height={300}
          data={customers.item}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='paid' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      {/* </ResponsiveContainer> */}
    </>
  )
}
export default Dashboard
