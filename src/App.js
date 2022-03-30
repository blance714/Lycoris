import logo from './logo.svg';
import './App.css';
import React from 'react';

import InputBox from './Utilities/InputBox';
import Search from './Pages/Search/Search'
import Agent from './Tools/Agent';
// import SearchItem from './Pages/Search/SearchItem';
import SearchItemWrapper from './Pages/Search/SearchItem';

function App() {
  return (
    <div id='app-wrapper' style={
      window.innerHeight ? {height: window.innerHeight} : {}
    }>
      {/* <SearchItemWrapper /> */}
      <Search />
    </div>
  );
}

export default App;
