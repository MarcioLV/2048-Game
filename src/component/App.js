import React, { useEffect, useState } from "react";

import "./style/board.css";

//Arreglar key en board
//Arreglar multiplicador de movimiento
//Mejorar el error de tecla (listeerKey) usar callback
//agregar block cuando no se movio nada
//bloquear teclado cuando esta en ejecucion los movimientos

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
        printTable(mainTable, "listener");
        const movedTable = copyTable(mainTable);
        const finalTable = joinTable(event, movedTable);
        if (finalTable !== "error") {
          setMainTable([].concat(movedTable));
          setTimeout(() => {
            setMainTable([].concat(finalTable));
          }, config.timeAnimation);
        }
      };
      window.addEventListener("keydown", listenerKey);
      return () => window.removeEventListener("keydown", listenerKey);
    }
  }, [mainTable]);

  // useEffect(() => {
  //   console.log("first effect");
  //   // const table = createTable();
  //   const rowLength = mainTable[0].length;
  //   const colLength = mainTable.length;
  //   // setMainTable(table);
  //   setConfig({ ...config, isLoadign: false, rowLength, colLength });
  // }, []);

  const joinTable = (event, table) => {
    switch (event.code) {
      case "ArrowLeft":
      case "Left":
        return joinFromLeft(table);
      case "ArrowRight":
      case "Right":
        return joinFromRight(table);
      default:
        return "error";
    }
  };

  const reverseRowTable = (table, newTable) => {
    table.forEach((row, indexRow) => {
      row.reverse();
      if (newTable) {
        newTable[indexRow].reverse()
        row.forEach((object) => {
          if (object.moveX < 0) {
            object.moveX *= -1;
          }
        });
      }
    });

    printTable(table, "reverse");
  };

  const joinFromRight = (table) => {
    reverseRowTable(table);
    const newTable = joinFromLeft(table);
    reverseRowTable(table, newTable);
    return newTable;
  };

  const joinFromLeft = (table) => {
    const newTable = copyTable(table);
    newTable.forEach((fila, indexRow) => {
      fila.forEach((object, indexCol) => {
        if (indexCol + 1 !== fila.length) {
          const value = object.value;
          const nextValue = fila[indexCol + 1].value;
          if (value !== 0 && value === nextValue) {
            object.value *= 2;
            object.new = "new";
            fila[indexCol + 1].value = 0;
            table[indexRow][indexCol + 1].moveX -= 1;
          }
        }
      });
    });
    return moveToLeft(table, newTable);
  };

  const moveToLeft = (table, newTable) => {
    newTable.forEach((fila, indexRow) => {
      let moveObject = 0;
      let moveX = 0;
      fila.forEach((object, indexCol) => {
        if (object.value !== 0) {
          if (moveObject !== 0) {
            fila[indexCol - moveObject] = { ...object };
            fila[indexCol] = { value: 0, moveX: 0, moveY: 0, new: "" };
            for (let index = indexCol; index < fila.length; index++) {
              table[indexRow][index].moveX -= moveX;
            }
          }
          moveX = 0;
        } else {
          moveX += 1;
          moveObject += 1;
        }
      });
    });
    return newTable;
  };

  //---dev-----------
  const printTable = (table, name = "No Name") => {
    console.log("name", name);
    table.forEach((fila) => {
      console.log(
        fila.map((item) => {
          return item.value;
        })
      );
    });
    console.log("----------------");
  };

  //--------

  const copyTable = (table) => {
    return table.map((fila) => {
      return fila.map((item) => {
        return { ...item };
      });
    });
  };

  //----BOARD-----------------------

  const style = {
    gridTemplate: `repeat(${config.rowLength}, 1fr) / repeat(${config.colLength}, 1fr)`,
  };

  //-----------------------------------
  if (config.loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="board">
      <div className="table" style={style}>
        {mainTable.map((fila, index) => {
          return fila.map((object, indice) => {
            let value = object.value !== 0 ? object.value : null;
            let key = 4 * index + indice;

            let moveX = object.moveX * 106;
            let transform = moveX !== 0 ? `translateX(${moveX}%)` : "none";
            const transition =
              moveX !== 0 ? `${config.timeAnimation / 1000}s` : "none";
            let styleItem =
              transition === "none"
                ? {}
                : {
                    transform: transform,
                    transition: transition,
                  };
            return (
              <div className="item-container" key={key}>
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
