import './InputBox.css';
import icon from './searchIcon.svg'
import React from "react";

class InputBox extends React.Component {
  constructor(props) {
    super(props);

    this.placeholder = props.placeholder || 'qwq';
    this.imgSrc = icon;

    this.state = {
      value: ''
    };
  }

  handleChange = (e) => this.setState({value: e.target.value});

  render() {
    return (
      <div className='inputBox'>
        <img src={this.imgSrc} />
        <input
          placeholder={this.placeholder}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default InputBox;