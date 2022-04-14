import { useContext, useEffect, useState } from "react";
import { PlayListContent } from "../../Tools/PlayList";
import InputBox from "../../Utilities/InputBox";
import TextButton from "../../Utilities/TextButton";

function SyncSetting(props) {
  const {
    syncInfo: { isConnected, name, roomID, avaliableRooms, isSync },
    syncController: {
      connectServer, setUpName, createRoom, 
      requestAvaliableRoom, joinRoom, exitRoom
    }
  } = useContext(PlayListContent);

  useEffect(() => {
    const ID = setInterval(() => {
      requestAvaliableRoom();
    }, 2000);
    return () => clearInterval(ID);
  })

  return (
    <div id="syncsetting-wrapper">
      {!isConnected && (
        <TextButton handleClick={e => connectServer()}>
          Connect Server
        </TextButton>
      )}
      {/* <div id='changename-wrapper'>
        <div>在这里改名哦(´▽｀)ノ♪</div>
        <InputBox placeHolder={ name } handleSubmit={e => setUpName(e.target.input.value)} />
      </div> */}
      <ul id='roomlist'>
        { avaliableRooms.map(room => (
          <li key={ room.ID } onClick={e => joinRoom(room.ID)}>
            <span>{ room.ID }</span>
            <span>{ room.count }</span>
          </li>
        ))}
      </ul>
      {(!isSync && 
        <TextButton handleClick={e => createRoom()}>
          Create Room
        </TextButton>)
        || 
        <TextButton handleClick={e => exitRoom()}>
          Exit Room
        </TextButton>
      }
    </div>
  )
}

export default SyncSetting;