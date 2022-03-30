import classNames from 'classnames';
import React from 'react';
import './Search.css';
import SearchBar from './SearchBar';
import SearchContent from './SearchContent';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocusing: false
    };
  }

  render() {
    const searchClass = classNames({isFocusing: this.state.isFocusing});
    return (
      <div id='search-wrapper' className={searchClass}>
        <div id='searchbar-wrapper'>
          <SearchBar
            isFocusing={this.state.isFocusing}
            handleFocus={(e) => this.setState({
              isFocusing: !this.state.isFocusing
            })}
            handleBlur={() => this.setState({
              isFocusing: false
            })}/>
          <div id='search-content-wrapper'>
            <SearchContent />
          </div>
        </div>
        <div style={{display: 'block',
          position: 'relative',
          left: 0,
          top: '0'
        }}>
          <SearchContent isFocusing/>
        </div>
      </div>
    );
  }
}

export default Search;