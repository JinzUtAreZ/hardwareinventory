import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  removeLink: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const SideMenu = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      {props.menu.map((text, index) => (
        <ListItem button key={text[0]}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>

          <Link
            className={classes.removeLink}
            to={text[0] === 'home' ? `/` : `/${text[0]}`}
          >
            <ListItemText primary={text[1]} />
          </Link>
        </ListItem>
      ))}
      {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))} */}
    </Fragment>
  );
  //}
};

export default SideMenu;
