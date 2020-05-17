import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TablePaginationActions from '../Tables/CustomPaging';

////// styling para sa table body
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
      backgroundColor: '#616161', // almost grey
    },
  },
  tableCell: {
    '$selected &': {
      color: 'yellow',
    },
  },
  tableHead: {
    '&$root &': {
      backgroundColor: 'lightBlue', // almost brown
    },
  },
  hover: {},
  selected: {},
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

///// kakaiba pag style sa table header
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0277bd', //// lightblue
    color: 'white',
    fontSize: 16,
  },
}))(TableCell);

const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    color: 'white',
    '&:hover': {
      color: 'yellow',
    },
    '&$active': {
      color: 'yellow',
    },
  },
  active: {},
  icon: {
    color: 'inherit !important',
  },
}))(TableSortLabel);

////// sorting functions ///////
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    //onSelectAllClick,
    order,
    orderBy,
    //numSelected,
    //rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> 
        </TableCell>
        */}
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function CustomTables(props) {
  const { rows, newPaging, load, selectRow } = props;

  const classes = useStyles();

  /////// selected row /////
  const [selectedID, setSelectedID] = useState(null);

  /////// paging ////////
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  ////// sorting ///////
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  ///////// paging actions ////////
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

  ///////// sorting actions ///////////
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper className={classes.root}>
      {load && ( //// loader to para sa data
        <Table className={classes.table}>
          <EnhancedTableHead
            classes={classes}
            //numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            //onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />

          {/* <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat (g)</StyledTableCell>
              <StyledTableCell align="right">Carbs (g)</StyledTableCell>
              <StyledTableCell align="right">Protein (g)</StyledTableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {/* Basic Mapping */}
            {/* {rows.map((row) => ( */}
            {(rowsPerPage > 0
              ? //// paging only
                // ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                stableSort(rows, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows
            ).map((row) => (
              <TableRow
                hover
                key={row.name}
                onClick={() => {
                  setSelectedID(row.name);
                }}
                ////// selectRow for Picking data //////
                selected={selectRow && selectedID === row.name}
                classes={
                  selectRow && {
                    hover: classes.hover,
                    selected: classes.selected,
                  }
                }
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
                ////// newPaging for extensive viewing /////
                ActionsComponent={newPaging && TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Paper>
  );
}
