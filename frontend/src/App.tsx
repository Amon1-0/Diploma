import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import NavMenu from "./components/NavMenu";
import Players from "./pages/Players";
import Profile from "./pages/Profile";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/home" element={<Main/>}/>
              <Route path="/players" element={<Players/>}/>
              <Route path="/profile" element={<Profile/>}/>

          </Routes>

      </BrowserRouter>
  );
}

export default App;
