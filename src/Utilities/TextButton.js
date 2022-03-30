import './TextButton.css'

function TextButton(props) {
  return (
    <a className="textButton" onClick={props.handleClick}>
      {props.children}
    </a>
  );
}

export default TextButton;