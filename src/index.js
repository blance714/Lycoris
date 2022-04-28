import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Routes, Route, useLocation, BrowserRouter, useMatch, useNavigationType } from 'react-router-dom';
import Search from './Pages/Search/Search';
import SearchContent from './Pages/Search/SearchContent';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import KeepAlive, { AliveScope } from 'react-activation';
import PlayListProvider from './Tools/PlayList';
import SyncSetting from './Pages/SyncSetting/SyncSetting';
import PlayerPlayList from './Player/PlayerPlayList';
import Messager from './Messager/Messager';

function TestPage() {
  const location = useLocation();
  const navigationType = useNavigationType();
  let noTransition = useMatch('/test/*');
  noTransition = useMatch('/search/*') || noTransition;

  return (
    <>
    <TransitionGroup component={null} childFactory={child => React.cloneElement(child, {
      classNames: navigationType === 'POP' ? 'pagesOut' : (noTransition ? '' : 'pagesIn'),
      timeout: (navigationType === 'POP' || !noTransition) ? 300 : 0
    })}>
      <CSSTransition key={location.pathname} timeout={300}>
        <Routes location={location}>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
    </>
  )
}

function Root() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    // <Player />
    <App>
      <Routes>
        <Route index element={
          // <KeepAlive saveScrollPosition="#page-wrapper" id="1" key="1">
            <Search />
          // </KeepAlive>
        } />
        <Route path='/test' element={
          // <KeepAlive id="2" key="2">
            <SyncSetting />
          // </KeepAlive>
        } />
      </Routes>
    </App>
  )
}

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      {/* <AliveScope> */}
        <Messager>
          <PlayListProvider>
            <Root />
          </PlayListProvider>
        </Messager>
      {/* </AliveScope> */}
    </BrowserRouter>
  // </React.StrictMode>,
);

window.onresize = () => {
  document.body.style.height = window.innerHeight + 'px';
}
// document.documentElement.style.height = window.innerHeight + 'px';
//   document.getElementById('app-wrapper').style.height = 100 + 'px';
//   document.getElementById('root').style.height = window.innerHeight + 'px';
// }

// window.onresize();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
