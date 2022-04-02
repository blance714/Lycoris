import { NavLink } from "react-router-dom";

import './NavigateBar.css'

import searchIcon from './Search/searchIcon.svg';
import settingsIcon from './settingsIcon.svg';

function NavigateBar() {
  return (
    <nav className='navigateBar'>
      <NavLink to='search' className='navigateBarItem'>
        <div className="navigateBarIcon">
          <img src={searchIcon} />
        </div>
        <span>Search</span>
      </NavLink>
      <NavLink to='test' className='navigateBarItem'>
        <div className="navigateBarIcon">
          <img src={settingsIcon} />
        </div>
        <span>Test</span>
      </NavLink>
    </nav>
  )
}

export default NavigateBar;