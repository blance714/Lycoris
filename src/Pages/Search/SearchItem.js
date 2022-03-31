import React from "react";
import './SearchItem.css';
import defImg from './default.svg'
import Agent from "../../Tools/Agent";

class SearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: defImg
    };

    Promise.resolve(props.data.getPicUrl())
      .then(v => v && this.setState({src: v}));
  }

  render() {
    return (
      <div className="searchItem">
        <img className="searchItemImage" src={this.state.src} />
        <div className="searchItemTitleWrapper">
          <div className="searchItemTitle">{this.props.data.name}</div>
          <div className="searchItemDetail">{`${this.props.data.type} · ${this.props.data.artists[0].name}`}</div>
        </div>
      </div>
    );
  }
}

class SearchItemWrapper extends React.Component {
  constructor(props) {
    super(props);

    Agent.searchSuggest('夜明けの詩')
      .then(v => Agent.parseSearchResult(v))
      .then(v => this.setState({data: v[0]}));

    this.state = {
      data: null
    };
  }

  render() {
    return (
      this.state.data && 
      <SearchItem data={this.state.data} />
    )
  }
}

export default SearchItem;