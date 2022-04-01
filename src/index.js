import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Routes, Route, MemoryRouter, useLocation, HashRouter, BrowserRouter} from 'react-router-dom';
import Search from './Pages/Search/Search';
import SearchContent from './Pages/Search/SearchContent';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import KeepAlive, { AliveScope } from 'react-activation';


function Root() {
  const location = useLocation();
  return (
    // <TransitionGroup component={null}>
      //<CSSTransition key={location.key} classNames='pagesChange' timeout={300}
      //mountOnEnter unmountOnExit>
        <Routes>
          <Route path='/' element={
            <App />
          }>
            <Route path='search' element={
              // <Search />
              <KeepAlive saveScrollPosition={true}>
                <SearchContent isFocusing/>
              </KeepAlive>
            } />
            <Route path='test' element={
              // <KeepAlive>
                <SearchContent />
              // </KeepAlive>
            } />
          </Route>
        </Routes>
      ///* </CSSTransition> */}
    // </TransitionGroup>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryRouter initialEntries={['/']}>
      <AliveScope>
        <Root />
      </AliveScope>
    </MemoryRouter>
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
