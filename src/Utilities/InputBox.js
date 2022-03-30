import './InputBox.css';
import React from "react";

function InputBox(props) {
  return (
    <div className='inputBox'>
      <img src={props.imgSrc} />
      <input
        placeholder={props.placeholder}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        value={props.value}
      />
    </div>
  );
}

export default InputBox;