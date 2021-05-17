import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardActionArea,
  Container,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '500',
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
    margin: theme.spacing(3),
  },
}))
function ItemCard(props) {
  var propsName = props.name
  const [state, setState] = React.useState({
    checkVal: false,
  })
  var { checkVal } = state

  const handleChange = () => {
    setState({ ...state, checkVal: !checkVal })
    console.log(checkVal)
  }

  const classes = useStyles()

  return (
    <Container component='main'>
      <div onClick={handleChange}>
        <Card className={classes.root} variant='elevation'>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormGroup>
              <CardContent>
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
                {propsName}
              </CardContent>
            </FormGroup>
          </FormControl>
        </Card>
      </div>
      <CardActionArea></CardActionArea>
    </Container>
  )
}
export default ItemCard
