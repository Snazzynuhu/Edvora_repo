import React from 'react';
import { useGlobalContext } from './Context';
import { Navbar } from './Navbar';
import { RidesContainer } from './RidesContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <RidesContainer/>
     
    </div>
  );
}

export default App;
