import { useContext, useEffect, useRef } from "react";
import { PlayListContext } from "../Tools/PlayList";

import './PlayerPlayList.css';

function PlayerPlayList(props) {
  const {
    songInfo: { iterator, playList },
    songController: { changeSong }
  } = useContext( PlayListContext );

  const listRef = useRef();

  useEffect(() => {
    listRef.current.scrollTo(0, 
      listRef.current.children[iterator].getBoundingClientRect().top - 
      listRef.current.getBoundingClientRect().top + listRef.current.scrollTop);
  }, []);

  return (
    <ul ref={ listRef } id="player-playlist">
      { playList.map((song, i) => (
        <li className="playListSong" key={ song.uuid } onClick={e => {
          e.stopPropagation(); changeSong(i)
        }}>
          <img className="songImage" src={ song.picUrl } />
          <div className="songNameWrapper">
            <span className="songName">{ song.name }</span>
            <span className="artistName">{ song.artists[0].name }</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PlayerPlayList;