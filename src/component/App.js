import React, { useEffect, useState } from "react";

import "./style/board.css";

//Arreglar key en board
//hace nueva funcion para mover despues de hacer join

function App() {
  const [mainTable, setMainTable] = useState([
    [
      { value: 0, moveX: 0, moveY: 0, new: ""},
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 0, moveX: 0, moveY: 0, new: "" },
    ],
    [
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 4, moveX: 0, moveY: 0, new: "" },
    ],
    [
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 0, moveX: 0, moveY: 0, new: "" },
    ],
    [
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 4, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 0, moveX: 0, moveY: 0, new: "" },
    ],
  ]);
  const [config, setConfig] = useState({
    timeAnimation: 1000,
  });
  // const [transition, setTransition] = useState([]);

  useEffect(() => {
    listenerKey({ event: { code: "Left" }, table: mainTable });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      listenerKey({ event, table: mainTable })
    );
  }, []);

  const listenerKey = ({ event, table }) => {
    let newTable = copyTable(table);

    const movedTable = moveTable(event, table);
    setMainTable([].concat(table));
    setTimeout(() => {
      setMainTable(movedTable);
      setTimeout(() => {
        const joinedTable = joinTable(event, movedTable);
        // console.log("joined", joinedTable);
        const moved1Table = moveTable(event, joinedTable, movedTable);
        setMainTable([].concat(movedTable));
        setTimeout(() => {
          setMainTable(moved1Table)
        }, config.timeAnimation);
      }, 20);
    }, config.timeAnimation);
    // console.log("moved2", moved1Table);
    // console.log("moved", movedTable);
    // setTimeout(() => {
    //   setMainTable(moved1Table);
    // }, config.timeAnimation);
  };

  // const createTable = ({ rowLength, colLength }) => {
  //   let newTable = [];
  //   for (let row = 0; row < rowLength; row++) {
  //     newTable[row] = Array(colLength);
  //   }
  //   console.log("new", newTable);
  //   return newTable;
  // };

  const copyTable = (table) => {
    return table.map((fila) => {
      return fila.map((item) => {
        return { ...item };
      });
    });
  };

  const fillTableRow = (newTableRow, rowLength) => {
    const newRowLength = newTableRow.length;
    return newTableRow
      .concat(Array(rowLength - newRowLength))
      .fill({ value: 0, moveX: 0, moveY: 0, new: "" }, newRowLength, rowLength);
  };

  const moveTable = (event, table, prevTable) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return moveToLeft(table, prevTable);
    }
  };

  const joinTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return joinFromLeft(table);
    }
  };

  const moveToLeft = (table, prevTable) => {
    const colLength = table.length;
    const rowLength = table[0].length;
    let newTable = [];
    for (let row = 0; row < colLength; row++) {
      newTable[row] = [];
      for (let col = 0; col < rowLength; col++) {
        let number = table[row][col].value;
        if (number !== 0) {
          const newRowLength = newTable[row].push({
            value: number,
            moveX: 0,
            moveY: 0,
            new: table[row][col].new
          });
          const newColIndex = newRowLength - 1;
          if (prevTable) {
            prevTable[row][col].moveX += newColIndex - col;
          } else {
            table[row][col].moveX += newColIndex - col;
          }
        }
      }
      newTable[row] = fillTableRow(newTable[row], rowLength);
    }
    return newTable;
  };

  const joinFromLeft = (table) => {
    const colLength = table.length;
    const rowLength = table[0].length;
    let newTable = copyTable(table);
    for (let row = 0; row < colLength; row++) {
      for (let col = 0; col < rowLength - 1; col++) {
        const number = newTable[row][col].value;
        const nextNumber = newTable[row][col + 1].value;
        if (number !== 0 && number === nextNumber) {
          newTable[row][col].value *= 2;
          newTable[row][col].new = "new";
          newTable[row][col + 1].value = 0;
          table[row][col + 1].moveX = -1;
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
        {console.log(mainTable)}
        {mainTable.map((fila, index) => {
          return fila.map((object, indice) => {
            let value = object.value !== 0 ? object.value : null;
            let indiceItem = 4 * index + indice;

            let moveX = object.moveX * 106;
            let transform = moveX !== 0 ? `translateX(${moveX}%)` : "none";
            // console.log(object.value, moveX);
            const transition = 
            moveX !== 0 ? `${config.timeAnimation / 1000}s` : "none";
            const newItem = object.new ? "item-new" : ""
            let styleItem = {
              transform: transform,
              transition: transition,
            };
            if (moveX !== 0) {
              console.log(object.value, styleItem);
            }
            return (
              <div className="item-container" key={indiceItem}>
                <div className={`item item-${value} ${newItem}`} style={styleItem}>
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
