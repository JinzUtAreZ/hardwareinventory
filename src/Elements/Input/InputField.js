import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { validateInput } from './Validator';

const InputField = ({
  value,
  label,
  placeholder,
  validators,
  type,
  onChange,
  validtype,
  focus,
}) => {
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [oldVal, setOldVal] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    const checkError = validateInput(validators, value);
    setError(checkError.error);
    setMsg(checkError.message);
    if (checkError.error === true) {
      if (validtype === 'email' || validtype === 'password') {
        onChange(value);
      } else {
        value === '' ? onChange('') : onChange(oldVal);
      }
    } else {
      setOldVal(value);
      onChange(value);
    }
  };

  return (
    <Fragment>
      {type === 'textarea' ? (
        <textarea
          className="form-control"
          placeholder={placeholder}
          value={value}
          defaultValue={value}
          onChange={handleChange}
          validtype={validtype}
        />
      ) : (
        <TextField
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          validtype={validtype}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={label}
          label={label}
          name={label}
          autoComplete={label}
          autoFocus={focus}
          helperText={msg}
          error={error}
        />
      )}
    </Fragment>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  type: 'text',
  validators: [],
};

export default InputField;
