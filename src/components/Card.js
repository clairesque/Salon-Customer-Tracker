import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  CardActions,
  Container,
  Card,
  CardContent,
  FormControl,
  FormGroup,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '500',
    margin: 5,
    borderRadius: '3%',
  },
  selected: {
    minWidth: '500',
    margin: 5,
    backgroundColor: '#FF8065',
    borderRadius: '3%',
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

let addedItems = []
let total = 0

function ItemCard(props) {
  let propsName = ' ' + props.name
  let propsPrice = props.price
  const [state, setState] = React.useState({
    checkVal: false,
  })
  let { checkVal } = state

  const handleChange = () => {
    setState({ checkVal: !checkVal })
    if (!addedItems.includes(propsName)) {
      addedItems.push(propsName)
      total += propsPrice
    } else {
      addedItems.splice(addedItems.indexOf(propsName), 1)
      total -= propsPrice
    }
    props.handleClick(addedItems, total)
  }

  const classes = useStyles()

  return (
    <Container component='main'>
      <div onClick={handleChange}>
        <Card
          className={checkVal ? classes.selected : classes.root}
          variant='elevation'
        >
          <CardActions disableSpacing style={{ float: 'right' }}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormGroup>
                <Checkbox
                  className='checkbox'
                  checked={checkVal}
                  name={propsName}
                  color='secondary'
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
