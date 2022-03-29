import logo from './logo.svg';
import './App.css';
import React from 'react';

import InputBox from './Utilities/InputBox';

function App() {
  return (
    <div id='app-wrapper'>
      <div style={{margin: '1rem', width: '5rem'}}>
        <InputBox />
      </div>
    </div>
  );
}

export default App;
