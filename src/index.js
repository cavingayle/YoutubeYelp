import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById("root")
);
