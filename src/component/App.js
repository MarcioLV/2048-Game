import React, { useEffect, useState } from "react";

import "./style/board.css";

//Arreglar key en board
//hace nueva funcion para mover despues de hacer join

function App() {
  const [mainTable, setMainTable] = useState([
    [
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
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
      { value: 0, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
    ],
    [
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
      { value: 2, moveX: 0, moveY: 0, new: "" },
    ],
  ]);
  const [config, setConfig] = useState({
    timeAnimation: 1000,
  });
  // const [transition, setTransition] = useState([]);

  // useEffect(() => {
  //   listenerKey({ event: { code: "Left" }, table: mainTable });
  // }, []);

  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      listenerKey({ event, table: mainTable })
    );
  }, []);

  const listenerKey = ({ event, table }) => {
    const movedTable = joinTable(event, table);
    if(movedTable === "error"){
      return
    }
    setMainTable([].concat(table));
    console.log("table", table);
    console.log("movedTable", movedTable);
    setTimeout(() => {
      setMainTable(movedTable);
    }, config.timeAnimation);
  };

  const copyTable = (table) => {
    return table.map((fila) => {
      return fila.map((item) => {
        return { ...item };
      });
    });
  };

  const joinTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return joinFromLeft(table);
      default:
        return "error"
    }
  };

  const moveToLeft = (table, newTable) => {
    const colLength = newTable.length;
    const rowLength = newTable[0].length;
    for (let row = 0; row < colLength; row++) {
      let moveObject = 0;
      let moveX = 0;
      for (let col = 0; col < rowLength; col++) {
        let object = newTable[row][col];
        if (object.value !== 0) {
          if (moveObject !== 0) {
            //cambiar la posicion del valor en newTable
            newTable[row][col - moveObject] = { ...object };
            newTable[row][col] = { value: 0, moveX: 0, moveY: 0, new: "" };
            //cambiar la moveX en table en todos los valores que le siguen
            for (let index = col; index < rowLength; index++) {
              table[row][index].moveX -= moveX;
            }
          }
          moveX = 0;
        } else {
          moveX += 1;
          moveObject += 1;
        }
      }
      // newTable[row] = fillTableRow(newTable[row], rowLength);
    }
    // return joinFromLeft(table, newTable);
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
          table[row][col + 1].moveX -= 1;
        }
      }
    }
    return moveToLeft(table, newTable);
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
            // const newItem = object.new ? "item-new" : "";
            let styleItem =
              transition === "none"
                ? {}
                : {
                    transform: transform,
                    transition: transition,
                  };
            // if (moveX !== 0) {
            //   console.log(object.value, styleItem);
            // }
            return (
              <div className="item-container" key={indiceItem}>
                <div className={`item item-${value}`} style={styleItem}>
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
