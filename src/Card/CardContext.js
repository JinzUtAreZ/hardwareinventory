import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Box from '@material-ui/core/Box';
import { MediaLogo, HeaderText, Copyright, FormContext } from '../Login/SignIn';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

//export default function SimpleCard(props) {
const CardContext = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {console.log(props)}
        {props.medialogo && <MediaLogo />}

        {props.headerText && <HeaderText />}

        <form noValidate>
          <FormContext />
        </form>
        {props.copyright && (
          <Box mt={8}>
            <Copyright />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CardContext;
