import './SearchBar.css'
import React from 'react';
import InputBox from '../../Utilities/InputBox';

import searchIcon from './searchIcon.svg';
import classNames from 'classnames';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const barClass = classNames('searchBar', {
      isFocusing : this.props.isFocusing
    });
    return (
      <div className={barClass}>
        <h3>検索</h3>
        <div className='searchBarInputWrapper'>
          <InputBox
            imgSrc={searchIcon}
            handleFocus={this.props.handleFocus} 
            handleBlur={this.props.handleBlur}/>
        </div>
      </div>
    );
  }
}

export default SearchBar;