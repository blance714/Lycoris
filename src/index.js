import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Search from './Pages/Search/Search';
import SearchContent from './Pages/Search/SearchContent';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index path='search' element={<Search />} />
          <Route path='test' element={<SearchContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
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
