import React, { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  removeLink: {
    textDecoration: 'none',
    color: 'black',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideMenuUnli = (props) => {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState({});
  let openClose = false;

  const handleClick = (key) => {
    if (openMenu[key] !== undefined) {
      openClose = !openMenu[key];
    }

    if (openMenu[key] === undefined) {
      openClose = true;
    }
    console.log(key, openMenu);
    setOpenMenu({ ...openMenu, [key]: openClose });
  };

  ////// advance unli menu links for reusable  ///////
  const renderMenu = (items, chksub) => {
    return (
      <Fragment>
        {items.map((i, index) => (
          <Fragment key={index}>
            <Link key={i.key} className={classes.removeLink} to={i.link}>
              {/* {chksub && console.log('crap', i.title)} */}
              <ListItem
                key={i.title}
                button
                onClick={() => handleClick(i.title)}
                className={chksub.sub ? classes.nested : ''}
                //// menu at submenu position
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>

                <ListItemText primary={i.title} />

                {i.menu !== undefined &&
                  (openMenu[i.title] === false ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>
            </Link>
            <Collapse
              in={openMenu[i.title]}
              timeout="auto"
              unmountOnExit
              className={chksub && classes.nested} //// submenu position
            >
              {i.menu !== undefined && renderMenu(i.menu, { sub: true })}
            </Collapse>
          </Fragment>
        ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <List>{renderMenu(props.menumap.menu, { sub: false })}</List>
    </Fragment>
  );
  //}
};

export default SideMenuUnli;

////// basic render menu links only /////
// const renderMenu = (items) => {
//   return (
//     <ul>
//       {items.map((i, index) => {
//         return (
//           <li key={index}>
//             <a href={i.link}>{i.title}</a>
//             {i.menu && renderMenu(i.menu)}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

//////// hardcoded unli menu ////////

/* <ListItem button onClick={handleClick}>
<ListItemIcon>
  <InboxIcon />
</ListItemIcon>
<ListItemText primary="Inbox" />
{openMenu ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openMenu} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <StarBorder />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
  <ListItem
    button
    onClick={handleClick1}
    className={classes.nested}
  >
    <ListItemIcon>
      <AppleIcon />
    </ListItemIcon>
    <ListItemText primary="Apple" />
    {openMenu1 ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse
    in={openMenu1}
    timeout="auto"
    unmountOnExit
    className={classes.nested}
  >
    <List component="div" disablePadding>
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="People" />
      </ListItem>
    </List>
  </Collapse>
</List>
</Collapse>  */
