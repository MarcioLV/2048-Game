import React, { useEffect, useState } from "react";

import "./style/board.css";

function Prueba2() {
  // const openTable
  // const [secondTable, setSeconTable] = useState(0);
  const [secondTable, setSeconTable] = useState(
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  );

  useEffect(() => {
    const listenerKey = (event) => {
      printTable(secondTable)
      const movedTable = moveOneToLeft(secondTable);
      if (movedTable === "error") {
        return;
      }
      setSeconTable(movedTable);
    };
    window.addEventListener("keydown", listenerKey);
    return () => window.removeEventListener("keydown", listenerKey);
  }, [secondTable]);


  const moveOneToLeft = (table) => {
    const newTable = table.map((fila) => {
      return fila.map((value) => {
        return value + 1
      })
    })
    return newTable;
  };

  const printTable = (table) => {
    table.forEach((fila) => {
      console.log(
        fila.map((item) => {
          return item;
        })
      );
    });
    console.log("----------------");
  };

  return <div onClick={() => listenerKey()}>hola</div>;
}

export default Prueba2;
