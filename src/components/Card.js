import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardActionArea, Container } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'

import { Handbag } from 'phosphor-react'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '500',
    margin: 5,
  },
  title: {
    fontSize: 50,
    '@media (min-height:800px)': {
      fontSize: 30,
    },
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
  },
}))

//set to store selected items
let addedItems = new Set()

function ItemCard(props) {
  let propsName = props.name
  let propsPrice = props.price
  const [state, setState] = React.useState({
    checkVal: false,
  })
  let { checkVal } = state

  const handleChange = () => {
    setState({ ...state, checkVal: !checkVal })
    //Items added to set
    if (!addedItems.has(propsName)) addedItems.add(propsName)
    else addedItems.delete(propsName)
    console.log(addedItems)
  }

  const classes = useStyles()
  //submit Set on click of submit button
  const submitSelection = () => {}
  return (
    <Container component='main'>
      <div onClick={handleChange}>
        <Card className={classes.root} variant='elevation'>
          <CardActions disableSpacing style={{ float: 'right' }}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      className='checkbox'
                      checked={checkVal}
                      onChange={handleChange}
                      name={propsName}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </CardActions>
          <CardContent>
            <Typography>{propsName}</Typography>
            <Typography>
              <em>Dhs: {propsPrice} </em>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
export default ItemCard
