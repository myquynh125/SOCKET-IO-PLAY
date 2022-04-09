import { Route, Routes } from "react-router-dom";
import Home from "./Home";
// import React, { useEffect, useState, useRef } from "react";
// import socketIOClient from "socket.io-client";
// const host = "http://localhost:4000";


<h2>RẠP CHIẾU PHIM</h2>
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </header>
    </div>
  );
}


export default App;
