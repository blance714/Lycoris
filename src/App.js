import './App.css';
import React, { useState } from 'react';

import NavigateBar from './Pages/NavigateBar';
import Player from './Player/Player';
import Agent from './Tools/Agent';
import Messager from './Messager/Messager';

function App(props) {
  const [isFullMode, setIsFullMode] = useState(false);

  return (
    <div id='app-wrapper' className={ isFullMode ? 'fullMode' : 'miniMode' }  
      onContextMenu={(e) => e.preventDefault()}>
      <div id='page-wrapper'>
        {props.children}
      </div>
      <Player setIsFullMode={ setIsFullMode } />
      <div id='navigatorbar-wrapper'>
        <NavigateBar />
      </div>
    </div>
  );
}

export default App;