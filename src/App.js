import React from 'react';
import './App.css';
import "./reset.css";
import routes from "./routes";
import { useLocation } from "react-router-dom";
import Nav from "./components/nav/Nav";

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname !== "/" ? <Nav /> : null}
     {routes}
    </div>
  );
}

export default App;
