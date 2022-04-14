import React, { useContext, useEffect, useState } from "react";

import './Player.css'

import TimeBar from "./TimeBar";

import PlayerButton from "./PlayerButton";
import { IonIcon } from "@ionic/react";
import { PlayListContent } from "../Tools/PlayList";

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
    isWaiting: false
  });

  const [seekInfo, setSeekInfo] = useState({
    isSeeking: false,
    seekTime: 0
  });

  const { 
    songInfo: { nowSong }, 
    songController: { nextSong, prevSong },
    syncInfo,
    syncController: { syncPlay, syncSeek }
  } = useContext(PlayListContent);

  useEffect(() => {
    console.log(nowSong);
  }, [nowSong]);

  useEffect(() => {
    if (syncInfo.paused)  audioRef.current.pause();
    else audioRef.current.play().catch(e => console.log(e));
    console.log(audioRef.current.readyState);
    // audioRef.current[syncInfo.paused ? 'pause' : 'play']();
  }, [syncInfo.paused]);
  
  useEffect(() => {
    if (audioInfo.paused != syncInfo.paused) {
      if (syncInfo.paused)  audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log(e));
    }
  }, [syncInfo.isSync]);

  useEffect(() => {
    console.log(`${syncInfo.isSync} ` + ((new Date()).getTime() - syncInfo.time.syncTime) / 1000);
    if (syncInfo.isSync && audioInfo.hasPlayed) audioRef.current.currentTime = 
      ((new Date()).getTime() - syncInfo.time.syncTime) / 1000 + syncInfo.time.songTime;
  }, [syncInfo.time]);
  
  const audioRef = React.createRef();
  
  const [nowTime, setNowTime] = useState(0);
  useEffect(() => {
    const ID = setInterval(() => {
      setNowTime(new Date().getTime());
    }, 100);
    return () => clearInterval(ID);
  });
  
  const switchPaused = () => {
    if (syncInfo.isSync) syncPlay(audioInfo.paused, audioInfo.currentTime);
    audioRef.current[audioInfo.paused ? 'play' : 'pause']();
    console.log(audioRef.current.readyState);
  }

  const seekOrCurTime = seekInfo.isSeeking ? seekInfo.seekTime : audioInfo.currentTime;

  const FullPlayer = (
    <div id='full-player' className={ audioInfo.paused ? '' : 'isPlaying' }
      onClick={e => props.setIsFullMode(false)}>
      <img src={ nowSong.picUrl } />
      <div className="songTitleWrapper">
        {/* <img className="songTitleImage" src={ songData.picUrl }/> */}
        <div className="songTitleNameWrapper">
          {/* <span className="songTitleName">{ nowSong.name }</span> */}
          <span className="songTitleName">{ nowTime }</span>
          <span className="artistName">{ nowSong.artists[0].name }</span>
        </div>
        <div className="songTitleButton">
          <PlayerButton type="back" />
        </div>
      </div>
      <div className="panelWrapper"></div>
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
        <div className="playerButtonWrapper">
          {/* <PlayerButton type="heart" /> */}
          <IonIcon className="heartOutline" icon="desktopSharp" />
        </div>
      </div>
    </div>
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
      <audio ref={ audioRef } src={ nowSong.url }
        onTimeUpdate={e => {
          console.log(`onTimeUpdate ${e.target.currentTime}`);
          setAudioInfo(v => ({...v, currentTime: e.target.currentTime}));
        }}
        onPause={e => setAudioInfo(v => ({...v, paused: e.target.paused}))}
        onPlay={e => setAudioInfo(v => ({...v, paused: e.target.paused, hasPlayed: true}))}
        onLoadStart={e => setAudioInfo(v => ({...v, paused: e.target.paused}))}
        onDurationChange={e => setAudioInfo(v => ({...v, duration: e.target.duration}))}
        onSeeked={e => setAudioInfo(v => ({...v, isSeeking: false}))}
        onAbort={e => console.log(`${e.type} ${e.target.readyState} ${e.target.paused}`)}
        onLoad={e => console.log(e.type)}
        // onLoadStart={e => console.log(e.type)}
        // onWaiting={e => console.log(e.type)}
        // onPlaying={e => console.log(e.type)}
        onPlaying={e => setAudioInfo(v => ({...v, isWaiting: false}))}
        onWaiting={e => {
          console.log('onWaiting');
          setAudioInfo(v => ({...v, isWaiting: true}));
        }}
      />
      {/* <div>{audioInfo.currentTime}</div> */}
      
      { MiniPlayer }
      { FullPlayer }
    </div>
  );
}

export default Player;