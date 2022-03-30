import './InputBox.css';
import React from "react";

function InputBox(props) {
  const input = <input
    type={props.type ? props.type : 'text'}
    placeholder={props.placeholder}
    onChange={props.handleChange}
    onFocus={props.handleFocus}
    onBlur={props.handleBlur}
    value={props.value}
    // onEnter
  />
  return (
    <div className='inputBox'>
      <img src={props.imgSrc} />
      {props.type == 'search'
        ? <form action='' onSubmit={props.handleSubmit}>{input}</form>
        : {input}}
    </div>
  );
}

export default InputBox;