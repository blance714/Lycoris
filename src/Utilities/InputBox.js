import './InputBox.css';
import React from "react";

function InputBox(props) {
  const input = <input
    name="input" autoComplete='off'
    type={props.type ? props.type : 'text'}
    placeholder={props.placeholder}
    onChange={props.handleChange}
    onFocus={props.handleFocus}
    onBlur={props.handleBlur}
    value={props.value}
  />
  return (
    <div className='inputBox'>
      <img src={props.imgSrc} />
        <form action='' onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmit && props.handleSubmit(e);
        }}>{input}</form>
    </div>
  );
}

export default InputBox;