/**
 * Ponto de Entrada, Estrutura Base e Integração do Frontend
 * @author Augusto Campos <1977campos7@gmail.com>
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);