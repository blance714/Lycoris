import classNames from 'classnames';
import React from 'react';
import './Search.css';
import SearchBar from './SearchBar';
import SearchContent from './SearchContent';
import SearchResult from './SearchResult';

import Agent from '../../Tools/Agent';
import KeepAlive, { withActivation } from 'react-activation';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocusing: false,
      searchResult: []
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
              isFocusing: true
            })} 
            handleBlur={(e) => this.setState({
              isFocusing: false
            })}
            handleSubmit={e => {
              console.log(e.target.input.value);
              Agent.search(e.target.input.value)
                .then(v => Agent.parseSearchResult(v))
                .then(v => this.setState({searchResult: v}));
              e.target.input.blur();
            }}
            />
        </div>
        <div id='search-content-wrapper'>
          <SearchResult result={this.state.searchResult} />
        </div>
        <div id='search-suggestion-content-wrapper'>
          <KeepAlive id="content">
            <div>233333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333</div>
            {/* <SearchContent isFocusing/> */}
          </KeepAlive>
        </div>
        <div style={{display: 'block',
          position: 'relative',
          left: 0,
          top: '0'
        }}>
        </div>
      </div>
    );
  }
}

export default Search;