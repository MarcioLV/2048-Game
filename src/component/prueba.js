import React, { useEffect, useState } from "react";

import "./style/board.css";

//Arreglar key en board

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
    isLoading: true,
    rowLength: 4,
    colLength: 4,
  });

  useEffect(() => {
    if (mainTable.length !== 0) {
      const listenerKey = (event) => {
        printTable("listener", mainTable);
        const newTable = copyTable(mainTable);
        // const movedTable = multiply(newTable);
        // const movedTable = joinTable(event, mainTable);
        const movedTable = joinTable(event, newTable);
        setMainTable([].concat(newTable));
        setTimeout(() => {
          setMainTable([].concat(movedTable));
          
        }, config.timeAnimation);
      };
      window.addEventListener("keydown", listenerKey);
      return () => window.removeEventListener("keydown", listenerKey);
    }
  }, [mainTable]);

  // const multiply = (table) => {
  //   return table.map((fila) => {
  //     return fila.map((element) => {
  //       const value = element.value;
  //       if (value > 0) {
  //         return { ...element, value: value * 2};
  //       }
  //       return element
  //     });
  //   });
  // };

  const joinTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return joinFromLeft(table);
      default:
        return "error";
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
            newTable[row][col - moveObject] = { ...object };
            newTable[row][col] = { value: 0, moveX: 0, moveY: 0, new: "" };
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
    }
    return newTable;
  };

  const joinFromLeft = (table) => {
    const { colLength } = config;
    const { rowLength } = config;
    const newTable = copyTable(table);
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
    // return newTable;
  };

  const printTable = (name = "No Name", table) => {
    console.log(name);
    table.forEach((fila) => {
      console.log(
        fila.map((item) => {
          return item.value;
        })
      );
    });
    console.log("----------------");
  };

  const copyTable = (table) => {
    return table.map((fila) => {
      return fila.map((item) => {
        return { ...item };
      });
    });
  };

  return <div className="board"></div>;
}

export default App;
