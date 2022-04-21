import React, { useContext, useEffect, useReducer, useState } from "react";

import './Player.css'

import TimeBar from "./TimeBar";

import PlayerButton from "./PlayerButton";
import { PlayListContent } from "../Tools/PlayList";
import classNames from "classnames";
import PlayerPlayList from "./PlayerPlayList";
import { CSSTransition } from "react-transition-group";
import PlayerPanelButton from "./PlayerPanelButton";

function timeStr(sec) {
  let rsec = Math.abs(Math.round(sec));
  let s = Math.floor(Math.abs(rsec % 60));
  return (`${(sec < 0 ? '-' : '')}${Math.floor(rsec / 60)}:${s < 10 ? '0' : ''}${s}`);
}

function Player(props) {
  const [audioInfo, setAudioInfo] = useState({
    hasPlayed: false,
    currentTime: 0,
    duration: 0,
    paused: true,
    isSeeking: false,
    isWaiting: false,
    readyState: 0
  });

  const [seekInfo, setSeekInfo] = useState({
    isSeeking: false,
    seekTime: 0
  });

  const { 
    songInfo: { nowSong, iterator, playList }, 
    songController: { nextSong, prevSong },
    syncInfo,
    syncController: { syncPlay, syncSeek, finishedPlay }
  } = useContext(PlayListContent);

  const audioRef = React.useRef();

  const [syncList, setSyncList] = useState([]);

  useEffect(() => {
    console.log(nowSong);
    playList[iterator] && console.log(`${playList[iterator].name} ${iterator}`);
    audioRef.current.src = nowSong.platform === 'local' ? nowSong.url
      : `https://music.163.com/song/media/outer/url?id=${nowSong.id}.mp3`
    !syncInfo.isSync && audioRef.current.play();
  }, [nowSong]);

  useEffect(() => {
    console.log(`iterator ${iterator}`);
  }, [iterator]);

  useEffect(() => {
    setSyncList(p => p.concat({ name: "play", minState: 1, run: () => {
      Promise.resolve(audioRef.current[syncInfo.paused ? 'pause' : 'play']())
        .catch(console.log);
    }}));
  }, [syncInfo.paused, syncInfo.isSync]);
  
  useEffect(() => {
    setSyncList(p => p.concat({ name: "time", minState: 1, run: () => {
      console.log(`${syncInfo.isSync} ` + ((new Date()).getTime() - syncInfo.time.syncTime) / 1000);
      if (syncInfo.isSync && audioInfo.hasPlayed) audioRef.current.currentTime = 
        ((new Date()).getTime() - syncInfo.time.syncTime) / 1000 + syncInfo.time.songTime;
    }}));
  }, [syncInfo.time]);

  useEffect(() => {
    while (syncList.length && syncList[0].minState <= audioInfo.readyState) {
      console.log(syncList[0].name);
      syncList.shift().run();
    }
  }, [syncList, audioInfo.readyState])

  useEffect(() => {
    console.log(`readyState ${audioInfo.readyState}`);
  }, [audioInfo.readyState]);
  
  const switchPaused = () => {
    if (syncInfo.isSync) syncPlay(audioInfo.paused, audioInfo.currentTime);
    audioRef.current[audioInfo.paused ? 'play' : 'pause']();
  }

  const seekOrCurTime = seekInfo.isSeeking ? seekInfo.seekTime : audioInfo.currentTime;

  const [panelCategory, setPanelCategory] = useState('none');
  
  const FullPlayer = (
    <CSSTransition in={ panelCategory !== 'none' } timeout={500} classNames="showPanel" appear >
      <div id='full-player' className={ classNames({ isPlaying: !audioInfo.paused, showPanel: panelCategory !== 'none' }) }
        onClick={e => props.setIsFullMode(false)}>
        <img src={ nowSong.picUrl } />
        <div className="songTitleWrapper">
          <img className="songTitleImage" src={ nowSong.picUrl }/>
          <div className="songTitleNameWrapper">
            <span className="songTitleName">{ nowSong.name }</span>
            <span className="artistName">{ nowSong.artists[0].name }</span>
          </div>
          <div className="songTitleButton">
            <PlayerButton type="back" />
          </div>
        </div>
        <div className="panelWrapper">
          <PlayerPlayList />
        </div>
        <TimeBar audioInfo={ audioInfo } seekInfo={ seekInfo }
          onSeekStart={v => setSeekInfo(p => ({...p,
            isSeeking: true, seekTime: v
          }))}
          onSeekMove={v => setSeekInfo(p => ({...p, seekTime: v}))}
          onSeekEnd={v => {
            setSeekInfo(p => ({...p,
              isSeeking: false, seekTime: v
            }));
            console.log('onSeekEnd ' + v);
            audioRef.current.currentTime = v;
            if (syncInfo.isSync)  syncSeek(v);
            setAudioInfo(p => ({...p, isSeeking: true}));
          }}
        />
        <div className="playerTimeWrapper">
          <span className="playedTime">{ timeStr(seekOrCurTime) }</span>
          <span className="remainedTime">{ timeStr(seekOrCurTime - audioInfo.duration) }</span>
        </div>
        <div className="playerButtonListWrapper">
          <div className="playerButtonWrapper">
            <PlayerButton type="back" onClick={ prevSong } />
          </div>
          <div className="playerButtonWrapper">
            <PlayerButton type="play" audioInfo={ audioInfo } onClick={ switchPaused } />
          </div>
          <div className="playerButtonWrapper">
            <PlayerButton type="forward" onClick={ nextSong } />
          </div>
        </div>
        <div className="playerPanelButtonListWrapper">
            <PlayerPanelButton type="list" panelCategory={[panelCategory, setPanelCategory]} />
        </div>
      </div>
    </CSSTransition>
  )

  const MiniPlayer = (
    <div id='mini-player' onClick={e => props.setIsFullMode(true)} >
      <img src={ nowSong.picUrl } />
      <span className="songTitle">
        { nowSong.name }
      </span>
      <div className="playerButtonWrapper">
        <PlayerButton type="play" audioInfo={ audioInfo } onClick={ switchPaused } />
      </div>
      <div className="playerButtonWrapper">
        <PlayerButton type="forward" onClick={ nextSong }/>
      </div>
    </div>
  )

  return (
    <div id='player-wrapper'>
      <audio ref={ audioRef } preload="auto"
        onTimeUpdate={e => {
          // console.log(`onTimeUpdate ${e.target.currentTime}`);
          setAudioInfo(v => ({...v, currentTime: e.target.currentTime}));
        }}
        onPause={e => setAudioInfo(v => ({...v, paused: e.target.paused}))}
        onPlay={e => setAudioInfo(v => ({...v, paused: e.target.paused, hasPlayed: true }))}
        onLoadStart={e => setAudioInfo(v => ({...v, paused: e.target.paused}))}
        onDurationChange={e => setAudioInfo(v => ({...v, duration: e.target.duration}))}
        onSeeked={e => setAudioInfo(v => ({...v, isSeeking: false }))}
        
        // onEmptied={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState}))}
        onEmptied={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState}))}
        onWaiting={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState, isWaiting: true }))}
        onLoadedMetadata={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState}))}
        onLoadedData={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState, isWaiting: false }))}
        onCanPlay={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState}))}
        onCanPlayThrough={e => console.log(e.type) || setAudioInfo(v => ({...v, readyState: e.target.readyState}))}

        onEnded={e => {
          if (syncInfo.isSync)  finishedPlay()  //TODO sync 'finished play'
          else nextSong();
        }}
      />
      {/* <div>{audioInfo.currentTime}</div> */}
      
      { MiniPlayer }
      { FullPlayer }
    </div>
  );
}

export default Player;