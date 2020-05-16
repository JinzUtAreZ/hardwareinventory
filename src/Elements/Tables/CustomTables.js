import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    ////// custom styling ko
    border: 'solid',
    borderColor: '#e0e0e0',
    boxShadow: '2px 4px 5px #9E9E9E',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#a1887f', // almost brown
    },
  },
  tableCell: {
    '$selected &': {
      color: 'yellow',
    },
  },
  hover: {},
  selected: {},
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

let rows = [
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Noodles', 132, 74.0, 81, 6.9),
];

function addRowData() {
  let alter = false;
  let x = 0;
  for (var i = 0; i < 10; i++) {
    //console.log(alter);
    alter = !alter;
    alter === false ? (x = 0) : (x = 1);
    const newName = rows[x].name + i;
    const newCal = rows[x].calories + Number(i);
    const newFat = rows[x].fat + Number(i);
    const newCarb = rows[x].carbs + Number(i);
    const newProt = rows[x].protein + Number(i);
    const rowsNew = createData(newName, newCal, newFat, newCarb, newProt);
    //console.log(rowsNew);
    rows.push(rowsNew);
  }
  //console.log(rows);
}

export default function CustomTables() {
  const classes = useStyles();
  const [selectedID, setSelectedID] = useState(null);
  const [load, setLoad] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    addRowData();
    //console.log(rows);
    setLoad(true);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //const emptyRows = 0;
  // rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // spacing per row ng table para consistent.

  return (
    <Paper className={classes.root}>
      {load && ( //// loader to para sa data
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                hover
                key={row.name}
                onClick={() => {
                  setSelectedID(row.name);
                }}
                selected={selectedID === row.name}
                classes={{ hover: classes.hover, selected: classes.selected }}
                className={classes.tableRow}
              >
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.calories}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.fat}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.carbs}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.protein}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <center>
                    <Typography variant="h5" component="h2">
                      NO DATA FOUND
                    </Typography>
                  </center>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Paper>
  );
}
