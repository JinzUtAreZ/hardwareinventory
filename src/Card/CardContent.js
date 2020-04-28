import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
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
    paddingTop: '20.25%', // 16:9, image height change use paint
  },
}));

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          title="Logo"
          image={require('../images/what.png')}
        />
        <Typography component="h1" variant="h5" className={classes.centralize}>
          Bronzebull Commercial
        </Typography>
        <form noValidate>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <PersonIcon
                color="action"
                style={{ fontSize: '40', marginTop: 20 }}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={1}>
              <LockIcon
                color="action"
                style={{ fontSize: 40, marginTop: 20 }}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
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
        </form>
      </CardContent>
    </Card>
  );
}
