import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import ListSubheader from "@material-ui/core/ListSubheader";
// import { concat, filter, orderBy, groupBy } from "lodash";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// function groupBy(list, keyGetter) {
//   const map = new Map();
//   list.forEach((item) => {
//     const key = keyGetter(item);
//     const collection = map.get(key);
//     if (!collection) {
//       map.set(key, [item]);
//     } else {
//       collection.push(item);
//     }
//   });
//   return map;
// }

const CustomSelect = (props) => {
  const { label, name, value, datas, helpertext, onChange } = props;
  let { isNative, isGroup } = props;
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

  //const grouped = groupBy(datas, (data) => data.group);

  // const grouped = groupBy(datas, (data) => data.group);

  const cats = datas.reduce((catsSoFar, { group, name, id }) => {
    if (!catsSoFar[group]) catsSoFar[group] = [];
    catsSoFar[group].push({ name: name, id: id });

    return catsSoFar;
  }, {});

  console.log(cats);

  // if (isGroup === true) {
  //   return (
  //     <FormControl className={classes.formControl}>
  //       <InputLabel htmlFor={name + "-native-select"}>{name}</InputLabel>
  //       <Select native defaultValue="" id={name + "-native-select"}>
  //         <option aria-label="None" value="" />
  //         <optgroup label="Category 1">
  //           <option value={1}>Option 1</option>
  //           <option value={2}>Option 2</option>
  //         </optgroup>
  //         <optgroup label="Category 2">
  //           <option value={3}>Option 3</option>
  //           <option value={4}>Option 4</option>
  //         </optgroup>
  //       </Select>
  //     </FormControl>
  //   );
  // }

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name + "-native-select"}>{label}</InputLabel>
        <Select native defaultValue="" id={name + "-native-select"}>
          {/* {datas.map((data, index) => {
            console.log(data.group);
          })} */}
          
          {/* aayusin ko pa to */}
          
          {Object.keys(cats).map((cat, index) => (
            <optgroup label={cat}>
              {Object.keys(cat).map((data) => (
                <option value={data.id}>{data.name}</option>
              ))}
            </optgroup>
          ))}

          {/* <option aria-label="None" value="" />
        <optgroup label="Category 1">
          <option value={1}>Option 1</option>
          <option value={2}>Option 2</option>
        </optgroup>
        <optgroup label="Category 2">
          <option value={3}>Option 3</option>
          <option value={4}>Option 4</option>
        </optgroup> */}
        </Select>
      </FormControl>

      {/* <FormControl className={classes.formControl}>
        {isNative === true ? (
          <InputLabel htmlFor={name + "-native-helper"}>{label}</InputLabel>
        ) : (
          <InputLabel id={name + "-select-helper-label"}>{label}</InputLabel>
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
      </FormControl> */}
    </Fragment>
  );
};

export default CustomSelect;
