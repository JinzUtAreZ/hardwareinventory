import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CustomSelect = (props) => {
  const { label, name, value, datas, helpertext, onChange } = props;
  let { isNative } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  //////// dynamic component ///////

  if (isNative === undefined) {
    isNative = false;
  }

  const selcomp = {
    true: NativeSelect,
    false: Select,
  };

  const SelComponent = selcomp[isNative || false];

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        {isNative === true ? (
          <InputLabel htmlFor={name + "-native-helper"}>{label}</InputLabel>
        ) : (
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        )}

        <SelComponent
          // labelId="demo-simple-select-helper-label"
          // id="demo-simple-select-helper"
          value={value}
          onChange={handleChange}
        >
          {isNative === true
            ? datas.map((data, index) =>
                index === 0 ? (
                  <option aria-label="None" key={index} value="">
                    {""}
                  </option>
                ) : (
                  <option key={index} value={index}>
                    {data.name}
                  </option>
                )
              )
            : datas.map((data, index) =>
                index === 0 ? (
                  <MenuItem key={index} value="">
                    <em>&nbsp;</em>
                  </MenuItem>
                ) : (
                  <MenuItem key={index} value={index}>
                    {data.name}
                  </MenuItem>
                )
              )}
        </SelComponent>
        <FormHelperText>{helpertext}</FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default CustomSelect;
