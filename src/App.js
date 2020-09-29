import React from 'react';
import './App.css';
import "./reset.css";
import routes from "./routes";
import { useLocation } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from './components/footer/Footer'

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      { pathname !== '/' &&  <Nav/>}
     {routes}
     <Footer/>
    </div>
  );
}

export default App;
