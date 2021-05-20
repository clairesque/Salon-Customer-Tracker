import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Clock, Calendar, SignOut, ChartBar, PlusCircle } from 'phosphor-react';
import app from '../auth/config'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Daily" icon={<Clock size={30} weight='duotone' />} component={Link} to={'/daily'} />
      <BottomNavigationAction label="Monthly" icon={<Calendar size={30} weight='duotone' />} component={Link} to={'/monthly'} />
      <BottomNavigationAction label="Add" icon={<PlusCircle size={30} weight='duotone' />} component={Link} to={'/add'} />
      <BottomNavigationAction label="Dashboard" icon={<ChartBar size={30} weight='duotone' />} component={Link} to={'/dashboard'} />
      <BottomNavigationAction label="Logout" icon={<SignOut size={30} weight='duotone' />} onClick ={() => app.auth().signOut()} />
    </BottomNavigation>
  );
}
