import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import SyncIcon from '@material-ui/icons/Sync';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
// import DeleteIcon from '@material-ui/icons/Delete';

// import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
  button: {},
  iconSpace: {
    marginRight: '1%',
  },
  loginSpace: {
    marginRight: '3%',
  },
}));

const ButtonContext = (props) => {
  const classes = useStyles();
  let {
    btnClass,
    iconClass,
    disabled,
    visible,
    isEnd,
    isFull,
    textval,
    value,
    onClick,
  } = props;

  const btnClick = (event) => {
    event.preventDefault();
    onClick('ass');
  };

  if (visible === undefined) {
    visible = true;
  }

  if (disabled === undefined) {
    disabled = false;
  }

  if (isEnd === undefined) {
    isEnd = false;
  }

  if (isFull === undefined) {
    isFull = false;
  }

  let colorClass,
    hoverColor = '#fff176';

  switch (props.value) {
    case 'login':
      btnClass = 'outlined';
      colorClass = '#5c6bc0';
      iconClass = <SyncIcon className={classes.loginSpace} />;
      break;
    case 'save':
      btnClass = 'contained';
      colorClass = 'primary';
      iconClass = <SaveIcon className={classes.iconSpace} />;
      break;
    case 'update':
      btnClass = 'outlined';
      colorClass = 'green';
      iconClass = <UpdateIcon className={classes.iconSpace} />;
      break;
    case 'back':
      btnClass = 'info';
      //iconClass = FontAwesome['FaArrowLeft'];
      break;
    case 'next':
      btnClass = 'info';
      //iconClass = FontAwesome['FaArrowRight'];
      break;
    case 'view':
      btnClass = 'success';
      //iconClass = Ionicons['IoIosEye'];
      break;
    case 'mail':
      btnClass = 'outline-success';
      //iconClass = Ionicons['IoIosMailUnread'];
      break;
    default:
      btnClass = 'outlined';
      //colorClass = 'primary';
      iconClass = '';
  }

  const useColors = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      backgroundColor: () => `${colorClass}`,
      color: '#fff',
      borderBottom: () => `3px solid ${hoverColor}`,
      '&:hover': {
        backgroundColor: () => '#808080',
        borderBottom: () => {
          const borderColor = hoverColor ? hoverColor : colorClass;
          return `3px solid ${borderColor}`;
        },
      },
    },
  }));

  const colorBtn = useColors();

  return (
    <Fragment>
      {visible && (
        <Button
          value={value}
          variant={btnClass}
          className={colorBtn.root}
          fullWidth={isFull}
          disabled={disabled}
          onClick={btnClick}
        >
          {iconClass}
          {'  '} {textval}
        </Button>
      )}
    </Fragment>
  );
};

ButtonContext.propTypes = {
  textval: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonContext;
