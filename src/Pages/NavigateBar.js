import { IonIcon } from "@ionic/react";
import { searchOutline, settingsSharp } from "ionicons/icons";
import { NavLink } from "react-router-dom";

import './NavigateBar.css'

function NavigateBar() {
  return (
    <nav className='navigateBar'>
      <NavLink to='search' className='navigateBarItem'>
        <IonIcon className="navigateBarIcon" icon={ searchOutline }/>
        <span>Search</span>
      </NavLink>
      <NavLink to='test' className='navigateBarItem'>
        <IonIcon className="navigateBarIcon" icon={ settingsSharp }/>
        <span>Test</span>
      </NavLink>
    </nav>
  )
}

export default NavigateBar;