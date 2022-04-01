import { Link } from "react-router-dom";

import './NavigateBar.css'

function NavigateBar() {
  return (
    <nav className='navigateBar'>
      <Link to='search'>Search</Link>
      <Link to='test'>Test</Link>
    </nav>
  )
}

export default NavigateBar;