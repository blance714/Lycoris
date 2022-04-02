import logo from './logo.svg';
import './App.css';
import React from 'react';

import Search from './Pages/Search/Search';
import { Outlet, useLocation } from 'react-router-dom';
import NavigateBar from './Pages/NavigateBar';
import KeepAlive from 'react-activation';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { SwitchTransition } from 'react-transition-group';

function App(props) {
  // const location = useLocation();
  return (
    <div id='app-wrapper'>
        <div id='page-wrapper'>
          {props.children}
        </div>
      <div id='navigatorbar-wrapper'>
        <NavigateBar />
      </div>
    </div>
  );
}

export default App;
