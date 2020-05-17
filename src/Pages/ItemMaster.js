import React, { useState, useEffect } from 'react';
// import EnhancedTable from '../Elements/Tables/EnhancedTable';
import CustomTable from '../Elements/Tables/CustomTables';

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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const ItemMaster = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    addRowData();
    //console.log(rows);
    setLoad(true);
  }, []);

  return (
    <div>
      <h2>Item Master Page </h2>
      <h2>Inventory Item Master data</h2>
      {/* <EnhancedTable /> */}
      <CustomTable
        selectRow={true}
        newPaging={true}
        headCells={headCells}
        rows={rows}
        load={load}
      />
    </div>
  );
};

export default ItemMaster;
