import React, { useEffect, useState } from "react";

import "./style/board.css";

function App() {
  const [mainTable, setMainTable] = useState([
    [0, 2, 0, 0],
    [0, 2, 2, 4],
    [0, 2, 0, 2],
    [2, 4, 2, 0],
  ]);
  const [transition, setTransition] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      listenerKey({ event, table: mainTable })
    );
  }, []);

  useEffect(()=> {
    console.log("effect");
    // moveEffect(transition)
  },[mainTable])

  // const moveEffect = () => {

  // }

  const listenerKey = ({ event, table }) => {
    let newTable = copyTable(table)

    const moved1Table = moveTable(event, newTable);
    setMainTable(moved1Table);

    setTimeout(()=>{
      const joinedTable = joinTable(event, moved1Table);
      const moved2Table = moveTable(event, joinedTable);
      setMainTable(() => moved2Table);
    }, 1000)
  };

  // const createTable = ({ rowLength, colLength }) => {
  //   let newTable = [];
  //   for (let row = 0; row < rowLength; row++) {
  //     newTable[row] = Array(colLength);
  //   }
  //   console.log("new", newTable);
  //   return newTable;
  // };

  const fillTableRow = (newTableRow, rowLength) => {
    const newRowLength = newTableRow.length;
    return newTableRow
      .concat(Array(rowLength - newRowLength))
      .fill(0, newRowLength, rowLength);
  };

  const moveTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return moveToLeft(table);
    }
  };

  const copyTable = (table) => {
    return table.map(fila => {
      return fila.slice()
    })
  }

  const joinTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return joinFromLeft(table);
    }
  };

  const moveToLeft = (table) => {
    const colLength = table.length;
    const rowLength = table[0].length;
    let newTable = [];
    for (let row = 0; row < colLength; row++) {
      newTable[row] = [];
      for (let col = 0; col < rowLength; col++) {
        let number = table[row][col];
        if (number !== 0) {
          let colPosition = newTable[row].push(number);
        }
      }
      newTable[row] = fillTableRow(newTable[row], rowLength);
    }
    // setTransition(transition.push([0, 1], [0, 0]));
    return newTable;
  };


  const joinFromLeft = (table) => {
    const colLength = table.length;
    const rowLength = table[0].length;
    let newTable = copyTable(table)
    for (let row = 0; row < colLength; row++) {
      for (let col = 0; col < rowLength; col++) {
        const number = newTable[row][col];
        const nextNumber = newTable[row][col + 1];
        if (number == nextNumber) {
          newTable[row][col] *= 2;
          newTable[row][col + 1] = 0;
        }
      }
    }
    return newTable;
  };

  //----BOARD-----------------------
  const sizeRow = mainTable[0].length;
  const sizeCol = mainTable.length;
  const style = {
    gridTemplate: `repeat(${sizeRow}, 1fr) / repeat(${sizeCol}, 1fr)`,
  };

  //-----------------------------------

  return (
    <div className="board">
      <div className="table" style={style}>
        {mainTable.map((fila, index) => {
          return fila.map((valor, indice) => {
            let value = valor !== 0 ? valor : null;
            let indiceItem = 4 * index + indice;
            return (
              <div className="item-container" key={indiceItem}>
                <div
                  className={`item item-${value}`}
                  // style={{
                  //   fontSize: fontSize,
                  // }}
                >
                  {value}
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
