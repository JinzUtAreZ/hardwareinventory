import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const CustomSelect = props => {
  const { value, datas, helpertext, onChange } = props;
  const classes = useStyles();

  const handleChange = event => {
    onChange(event.target.value);
  };

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          onChange={handleChange}
        >
          {datas.map((data, index) => (
            <MenuItem key={index} value={index}>
              {data.name}
            </MenuItem>
          ))}

          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        <FormHelperText>{helpertext}</FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default CustomSelect;


import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import ListSubheader from "@material-ui/core/ListSubheader";

import CustomSelect from "../Select/CustomSelect";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function createData(id, name, group) {
  return { id, name, group };
}

let rows = [createData(1, "Crap", "what"), createData(2, "Shit", "when")];

function addRowData() {
  let alter = false;
  let x = 0,
    y = 2;
  for (var i = 0; i < 10; i++) {
    //console.log(alter);

    const newId = rows[x].id + Number(y);
    const newName = rows[x].name + Number(i);
    const newGroup = rows[x].group;

    const rowsNew = createData(newId, newName, newGroup);
    //console.log(rowsNew);
    rows.push(rowsNew);
    alter = !alter;
    alter === false ? (y = y + 1) : (y = y + 2);
  }
  //console.log(rows);
}

export default function Selector() {
  const classes = useStyles();
  const [selectData, setSelectData] = useState({});

  const [age, setAge] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    addRowData();
    //console.log(rows);
    setLoad(true);
  }, []);

  const selectChange = key => value => {
    setSelectData({ ...selectData, [key]: value });
  };

  const handleChange = event => {
    setAge(event.target.value);
  };

  // const [state, setState] = useState({
  //   age: "",
  //   name: "hai"
  // });

  // const handleChange1 = event => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value
  //   });
  // };

  return (
    <Fragment>
      {load && (
        <CustomSelect
          datas={rows}
          onChange={selectChange}
          value={selectData.PopSelect}
          name="PopSelect"
          helpertext="important helper text"
        />
      )}

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      {/*<FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Age</InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange1}
          inputProps={{
            name: "age",
            id: "age-native-helper"
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Category 1</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </FormControl> */}
    </Fragment>
  );
}
