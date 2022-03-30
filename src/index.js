import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// window.onresize = () => {
//   document.getElementById('app-wrapper').style.height = 100 + 'px';
//   document.getElementById('root').style.height = window.innerHeight + 'px';
//   document.documentElement.style.height = window.innerHeight + 'px';
//   document.body.style.height = window.innerHeight + 'px';
// }

// window.onresize();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
