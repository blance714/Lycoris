import './SearchBar.css'
import React from 'react';
import InputBox from '../../Utilities/InputBox';

import searchIcon from './searchIcon.svg';
import classNames from 'classnames';
import TextButton from '../../Utilities/TextButton';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: 'qwq'
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({placeholder: `${document.body.clientHeight} ${window.innerHeight}`}), 100);
  }

  render() {
    const barClass = classNames('searchBar', {
      isFocusing : this.props.isFocusing
    });
    return (
      <div className={barClass}>
        <h3>検索</h3>
        <div className='searchBarInputWrapper'>
          <div className='searchBarInputBoxWrapper'>
            <InputBox
              type='search'
              imgSrc={searchIcon}
              placeholder={this.state.placeholder}
              handleFocus={this.props.handleFocus}
              handleSubmit={this.props.handleSubmit} />
          </div>
          <TextButton handleClick={this.props.handleBlur}>
            キャンセル
          </TextButton>
        </div>
      </div>
    );
  }
}

export default SearchBar;