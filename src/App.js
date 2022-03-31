import logo from './logo.svg';
import './App.css';
import React from 'react';

import Search from './Pages/Search/Search';
import { Outlet } from 'react-router-dom';
import NavigateBar from './Pages/NavigateBar';

function App() {
  return (
    <div id='app-wrapper'>
      <div id='page-wrapper'>
        <Outlet />
      </div>
      <div id='navigatorbar-wrapper'>
        <NavigateBar />
      </div>
    </div>
  );
}

export default App;
