import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx";


function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
         
        </Routes>
      </Router>
    </>
  );
}


export default App
