import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { pause, play, playBack, playForward } from "ionicons/icons";
import { useState } from "react";

import './PlayerButton.css';

function PlayerButton(props) {
  let nowIconProp = {};

  if (props.type === 'forward') nowIconProp = {icon: playForward};
  else if (props.type === 'back') nowIconProp = {icon: playBack};
  else if (props.type === 'play') nowIconProp = {
    icon: props.audioInfo ? (props.audioInfo.paused ? play : pause ) : play
  };
  else nowIconProp = { icon: props.type };

  const [isActived, setIsActived] = useState(false);

  return (
    <div className={classNames('playerButton', { active: isActived })}
    onClick={e => {
      e.stopPropagation();
      if (isActived) {
        setIsActived(false);
        setTimeout(() => setIsActived(true), 0);
      } else setIsActived(true);
      props.onClick && props.onClick();
    }}
    onAnimationEnd={e => setIsActived(false)}
    >
      <IonIcon className="playerButtonIcon" {...nowIconProp}/>
    </div>
  )
}

export default PlayerButton;