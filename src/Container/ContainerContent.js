import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// import SignIn2 from '../Login/SignIn2';
// import CardContent from '../Card/CardElem';
//import CardContent from '../Card/CardContext';
import SignIn from '../Login/SignIn';

const ContainerContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <SignIn />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    background: 'linear-gradient(rgba(250,0,0,0.5),transparent)',
    backgroundColor: 'deepskyblue' /*this your primary color*/,
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
}));

export default ContainerContent;
