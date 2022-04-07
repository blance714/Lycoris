import { createContext, createRef } from "react";

const PlayerImageController = createContext();

function PlayerImage(props) {
  const imgRef = createRef();

  const changeImagePosition = (top, left) => {
    imgRef.current.style = {
      top: top, left: left
    };
  }

  return (
    <PlayerImageController.Provider value={changeImagePosition}>
      <img ref={imgRef} src={props.src} />
      {props.children}
    </PlayerImageController.Provider>
  );
}

export default PlayerImage;
export { PlayerImageController };