import React, { useEffect } from "react";

function App() {
  const mainTable = [
    [0, 2, 0, 0],
    [0, 2, 2, 4],
    [0, 2, 0, 2],
    [2, 4, 2, 0],
  ];

  useEffect(() => {
    document.addEventListener("keydown", (event) => listenerKey({event, table: mainTable}));
  }, []);

  const listenerKey = ({event, table}) => {
    let newTable = moveTable({ event, table });

    console.log(newTable);
  };

  const fillTable = ({newTable, row, rowLength}) => {

  }


  const moveTable = ({ event, table }) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return moveToLeft(table);
    }
  };

  // const createTable = ({ rowLength, colLength }) => {
  //   let newTable = [];
  //   for (let row = 0; row < rowLength; row++) {
  //     newTable[row] = Array(colLength);
  //   }
  //   console.log("new", newTable);
  //   return newTable;
  // };

  const moveToLeft = (table) => {
    const colLength = table.length;
    const rowLength = table[0].length;
    let newTable = [];
    for (let row = 0; row < colLength; row++) {
      newTable.push([]);
      for (let col = 0; col < rowLength; col++) {
        let number = table[row][col];
        if (number !== 0) {
          newTable[row].push(number);
        }
      }
      newTable[row] = newTable[row]
      .concat(Array(rowLength - newTable[row].length))
      .fill(0, newTable[row].length, rowLength);

    }
    return newTable;
  };

  // const newTable = moveToLeft(mainTable)

  return <div>Hola mundo</div>;
}

export default App;
