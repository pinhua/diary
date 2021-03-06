
import './App.css';
import Home from './home';
import View from './view';
import Edit from './edit';
import CalendarGfg from './calendar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component }  from 'react';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='view/:id' element={<View />} />
      <Route path='edit/:id' element={<Edit />} />
      <Route path='new' element={<Edit />} />
      <Route path='calendar' element={<CalendarGfg />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
