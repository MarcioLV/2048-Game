import React from "react";
import { createRoot } from "react-dom/client"

import App from "./component/App"
import Prueba2 from "./component/prueba2"
import Prueba from "./component/prueba"

const container = document.getElementById("root")

const root = createRoot(container)

// root.render(<Prueba />)
root.render(<App />)