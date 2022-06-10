import React, { useState,Component  } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import { Routes ,Route } from 'react-router-dom';

import BootTable from './components/BootTable'
import Menu from './components/Menu'
import ASide from './components/Aside'
import Footer from './components/Footer'

function App() {
  return ( 
      <BootTable/>
  )
}
export default App;