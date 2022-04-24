import './TextButton.css'

function TextButton({ children, handleClick, color }) {
  return (
    <a className="textButton" onClick={ handleClick }
      style={{ color: color }} >
      { children }
    </a>
  );
}

export default TextButton;