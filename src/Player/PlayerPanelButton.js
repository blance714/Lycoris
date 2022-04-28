import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { chatboxEllipses, list } from "ionicons/icons";

import "./PlayerPanelButton.css"

function PlayerPanelButton(props) {
  const [{ type, isShown }, setPanelCategory] = props.panelCategory;
  const buttonClass = classNames('playerPanelButton', { active: type === props.type && isShown });
  return (
    <div className={ buttonClass } onClick={e => {
      e.stopPropagation();
      setPanelCategory(p => props.type === p.type ? {...p, isShown: !p.isShown } : {...p, type: props.type, isShown: true });
    }}>
      <IonIcon icon={ props.type === 'list' ? list : chatboxEllipses } />
    </div>
  )
}

export default PlayerPanelButton;