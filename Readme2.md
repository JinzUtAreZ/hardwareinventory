import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import ListSubheader from "@material-ui/core/ListSubheader";

import CustomSelect from "../Select/CustomSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

  // const [age, setAge] = useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const [load, setLoad] = useState(false);

  useEffect(() => {
    addRowData();
    //console.log(rows);
    setLoad(true);
  }, []);

  const selectChange = (key) => (value) => {
    // if (key in selectData) {
    setSelectData({ ...selectData, [key]: value });
    // } else {
    //   setSelectData({ [key]: value });
    // }
    console.log("select state", selectData);
  };

  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  const handleChange1 = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Fragment>
      {load && (
        <CustomSelect
          label="go to hell"
          datas={rows}
          onChange={selectChange("PopSelect")}
          //// ung value dapat may || "" para sa mga undefined ////
          value={selectData.PopSelect || ""}
          name="PopSelect"
          helpertext="important helper text"
        />
      )}

      {load && (
        <CustomSelect
          label="what the crap"
          datas={rows}
          onChange={selectChange("CrapSelect")}
          //// ung value dapat may || "" para sa mga undefined ////
          value={selectData.CrapSelect || ""}
          name="CrapSelect"
          helpertext="fuck important helper text"
          isNative={true}
        />
      )}

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
      </FormControl>
    </Fragment>
  );
}
