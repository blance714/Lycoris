import { IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";
import { a, config, useSpring, useTransition } from "@react-spring/web";
import { useContext, useEffect, useState } from "react";
import { PlayListContext } from "../../Tools/PlayList";
import InputBox from "../../Utilities/InputBox";
import TextButton from "../../Utilities/TextButton";

import './SyncSetting.scss'

function SyncSetting(props) {
  const {
    syncInfo: { isConnected, name, roomID, avaliableRooms, isSync },
    syncController: {
      connectServer, setUpName, createRoom, 
      requestAvaliableRoom, joinRoom, exitRoom
    }
  } = useContext(PlayListContext);

  useEffect(() => {
    const ID = setInterval(() => {
      requestAvaliableRoom();
    }, 2000);
    return () => clearInterval(ID);
  });

  const roomListWrapperSpring = useSpring({
    height: isConnected ? '70%' : '0%',
    backgroundColor: isConnected ? 'white' : 'mediumaquamarine',
  });

  const transitionConfig = {
    from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 },
  };

  const roomTitleTransitions = useTransition(isConnected, transitionConfig);
  const roomButtonTransitions = useTransition(isSync, transitionConfig);
  const roomButtonSpring = useSpring({ backgroundColor: isSync ? 'salmon' : 'mediumaquamarine' });

  const roomListTransitions = useTransition(avaliableRooms, {
    from: { height: '0rem' }, enter: { height: '2.5rem' }, leave: { height: '0rem' },
    keys: room => room.ID
  })

  const [nameFocus, setNameFocus] = useState(false);

  return (
    <div id="syncsetting-wrapper">
      <div className='changeNameWrapper'>
        <InputBox placeholder={ nameFocus ? name : '戳我改名！' }
          handleFocus={e => setNameFocus(true)}
          handleBlur={e => setNameFocus(false)}
          handleSubmit={e => setUpName(e.target.input.value)} />
      </div>
      <a.div className="roomListWrapper" style={ roomListWrapperSpring }>
        <a.div className="wrapperBefore" style={ useSpring({
          backgroundColor: isConnected ? 'floralwhite' : 'mediumaquamarine'
        }) } />
        {roomTitleTransitions((style, conn) => (
          !conn ? (
            <a.div className="title" style={style}>
              <TextButton color="#FFF" handleClick={e => connectServer()}>
                Connect Server
              </TextButton>
            </a.div>
          ) : (
          <>
            <a.div className="title" style={style}>Room List</a.div>
            <ul className='roomList'>
              { roomListTransitions((style, room) => (
                <a.li style={style} className="listItem" key={ room.ID } onClick={e => joinRoom(room.ID)}>
                  <span>{ room.ID }</span>
                  <div className="countWrapper">
                    <IonIcon icon={ person } />
                    <div className="count">{ room.count }</div>
                  </div>
                </a.li>
              ))}
            </ul>
            <a.div className="roomButton" style={ roomButtonSpring }>
            {roomButtonTransitions((style, sync) => (
              <a.div style={style}>{
                !sync 
                  ? <TextButton color="#FFF" handleClick={e => createRoom()}>Create Room</TextButton>
                  : <TextButton color="#FFF" handleClick={e => exitRoom()}>Exit Room</TextButton>
              }</a.div>
            ))}</a.div>
          </>)
        ))}
      </a.div>
    </div>
  )
}

export default SyncSetting;