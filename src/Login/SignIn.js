import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContext from '../Card/CardContext';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputField from '../Elements/Input/InputField';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import { Validators } from '../Elements/Input/Validator';
import ButtonContext from '../Elements/Button/ButtonContext';

import * as authActions from '../store/actions/authActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  footer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  centralize: {
    position: 'relative',
    justify: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '20.15%', // 16:9, image height change use paint
  },
}));

export function MediaLogo() {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.media}
      title="Logo"
      image={require('../images/what.png')}
    />
  );
}

export function HeaderText() {
  const classes = useStyles();
  return (
    <Typography component="h1" variant="h5" className={classes.centralize}>
      Bronzebull Commercial
    </Typography>
  );
}

export function FormContext() {
  const [txtInput, setTxtInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = (key) => (value) => {
    //alert('Change Clicked');

    setTxtInput({ ...txtInput, [key]: value });

    //this.setState({ [key]: value });
  };

  const eventClick = async (data) => {
    //setClick(!click);
    console.log(data);
    alert('Button Clicked');
    let action;
    action = authActions.signUp(txtInput.EmailLang, txtInput.PasswordLang);

    try {
      await dispatch(action);
      //props.navigation.navigate('Shop');
    } catch (err) {
      //setError(err.message);
      //setIsLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <PersonIcon
            color="action"
            style={{ fontSize: '40', marginTop: 20 }}
          />
        </Grid>
        <Grid item xs={11}>
          <InputField
            label="Email Address"
            value={txtInput.EmailLang}
            name="EmailLang"
            type="text"
            validtype="email"
            placeholder="Enter your email here..."
            validators={[Validators.email, Validators.required]}
            onChange={handleChange('EmailLang')}
          />
        </Grid>
        <Grid item xs={1}>
          <LockIcon color="action" style={{ fontSize: 40, marginTop: 20 }} />
        </Grid>
        <Grid item xs={11}>
          <InputField
            label="Password"
            value={txtInput.PasswordLang}
            name="PasswordLang"
            type="password"
            validtype="password"
            placeholder="Password is at least 6 characters"
            validators={[Validators.password, Validators.required]}
            onChange={handleChange('PasswordLang')}
          />
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox value="showPass" color="primary" />}
            label="Show Password"
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </Grid>
      </Grid>
      <ButtonContext
        value="login"
        textval="Login"
        isFull
        //webservice="true"
        //disabled={btnAble}
        onClick={eventClick}
      />

      <Grid container className={classes.footer}>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account?"} <br />
            {'Sign Up'}
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignIn = () => {
  return <CardContext copyright={true} medialogo={true} headerText={true} />;
};

export default SignIn;
