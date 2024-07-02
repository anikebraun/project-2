import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Characters from "./components/Characters.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="Characters/:id" element={<Characters />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
