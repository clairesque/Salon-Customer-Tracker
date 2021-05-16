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
import { Handbag } from 'phosphor-react'

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

function ItemCard() {
  const [state, setState] = React.useState({
    haircut: false,
  })
  var { haircut } = state

  const handleChange = () => {
    setState({ ...state, haircut: !haircut })
    console.log(haircut)
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
                      checked={haircut}
                      onClick={handleChange}
                      name='haircut'
                    />
                  }
                  label='Haircut'
                />
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
