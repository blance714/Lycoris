import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { list } from "ionicons/icons";

import "./PlayerPanelButton.css"

function PlayerPanelButton(props) {
  const [panelCategory, setPanelCategory] = props.panelCategory;
  const buttonClass = classNames('playerPanelButton', { active: panelCategory === props.type });
  return (
    <div className={ buttonClass } onClick={e => {
      e.stopPropagation();
      setPanelCategory(props.type === panelCategory ? 'none' : props.type);
    }}>
      <IonIcon icon={ list } />
    </div>
  )
}

export default PlayerPanelButton;