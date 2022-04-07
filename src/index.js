import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Routes, Route, MemoryRouter, useLocation, HashRouter, BrowserRouter, useMatch, useNavigationType, matchPath} from 'react-router-dom';
import Search from './Pages/Search/Search';
import SearchContent from './Pages/Search/SearchContent';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import KeepAlive, { AliveScope } from 'react-activation';
import { createBrowserHistory } from 'history';
import Player from './Player/Player';
import Test from './Test';
import PlayListProvider from './Tools/PlayList';

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
          <Route path='/search' element={
            <KeepAlive saveScrollPosition="#page-wrapper">
              <Search />
            </KeepAlive>
          } />
          <Route path='/test' element={<SearchContent />} />
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
      <TestPage />
      {/* <Player /> */}
      {/* <Test /> */}
    </App>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayListProvider>
        <AliveScope>
          <Root />
        </AliveScope>
      </PlayListProvider>
    </BrowserRouter>
  </React.StrictMode>,
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
