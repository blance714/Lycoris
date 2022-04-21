import { createContext, useEffect, useRef, useState } from 'react';
import Socket from './Socket';

import shiro from '../Player/shiro.mp3';
import shiroPic from '../Player/shiro.jpeg';
import smkni from '../Player/smkni.mp3';
import defPic from '../Player/shinu.jpeg';
import kanade from '../Player/kanade.mp3';
import kanaPic from '../Player/kanade.jpeg';

function genUUID() { return Math.round(Math.random() * 1000000); }

const PlayListContent = createContext();
function PlayListProvider(props) {
  const [playList, setPlayList] = useState([
    {
      name: '白ゆき オルゴールver',
      platform: 'local',
      url: shiro,
      artists: [{ name: 'n-buna' }],
      picUrl: shiroPic,
      uuid: genUUID()
    },
    {
      name: '死ぬにはいい日だった',
      platform: 'local',
      url: smkni,
      artists: [{ name: 'Picon' }],
      picUrl: defPic,
      uuid: genUUID()
    },
    {
      name: 'カナデトモスソラ',
      platform: 'local',
      url: kanade,
      artists: [{ name: 'Sasanomaly' }],
      picUrl: kanaPic,
      uuid: genUUID()
    }
  ]);

  const [iterator, setIterator] = useState(0);

  const [syncInfo, setSyncInfo] = useState({
    isConnected: false,
    name: null,
    roomID: null,
    avaliableRooms: [],
    paused: false,
    isSync: false,
    time: {
      syncTime: 0,
      songTime: 0
    }
  })

  //---Sync Controller---//
  let socketRef = useRef();
  const connectServer = () => {
    socketRef.current = new Socket('wss://balanca.cn:3001/');
    const socket = socketRef.current;

    socket.on('open', () => {
      setSyncInfo(p => ({...p, isConnected: true }));
      setUpName('qaq');
      requestAvaliableRoom();
    });
    socket.on('close', () => {
      setSyncInfo(p => ({...p, isConnected: false, isSync: false }));
    });
    socket.on('roomConnectionRefused', info => console.log(info));
    socket.on('roomConnected', ID => {
      setSyncInfo(p => ({...p, roomID: ID, isSync: true }));
      console.log(`roomConnected ${ID}`);
      requestAvaliableRoom();
    });
    socket.on('avaliableRooms', rooms => setSyncInfo(p => ({...p, avaliableRooms: rooms })));

    socket.on('sync', data => {
      'list' in data && setPlayList(data.list);
      'iterator' in data && setIterator(data.iterator);
      'time' in data && setSyncInfo(p => ({...p, time: data.time }));
      'paused' in data && setSyncInfo(p => ({...p, paused: data.paused}));
      socket.emit('syncComplete');
    });
    socket.on('play', data => {
      setSyncInfo(p => ({...p, time: data.time, paused: false }));
    });
    socket.on('pause', data => {
      setSyncInfo(p => ({...p, time: data.time, paused: true }));
    });
  };

  const setUpName = name => {
    // if (syncInfo.isConnected) {
      socketRef.current.emit('setUpName', name);
      setSyncInfo(p => ({...p, name: name }));
    // }
  }
  const createRoom = () => {
    if (syncInfo.isConnected && syncInfo.name) {
      socketRef.current.emit('createRoom', { list: playList, iterator: iterator });
    }
  }
  const requestAvaliableRoom = () => syncInfo.isConnected && socketRef.current.emit('requestAvaliableRoom');
  const joinRoom = ID => !syncInfo.isSync && socketRef.current.emit('joinRoom', ID);
  const exitRoom = () => {
    setSyncInfo(p => ({...p, isSync: false }));
    socketRef.current.emit('exitRoom');
  }
  const syncPlay = (play, songTime) => socketRef.current.emit(play ? 'play': 'pause', 
    { time: { syncTime: (new Date).getTime(), songTime: songTime } }
  );
  const syncSeek = songTime => socketRef.current.emit('syncSeek', {
    time: { syncTime: (new Date).getTime(), songTime: songTime }
  });
  const finishedPlay = () => socketRef.current.emit('finishedPlay');

  //---List Controller---//
  /**
   * 
   * @param {{name: string, url: URL, artists: Array, picUrl: URL}} song 
   * @param {boolean} now
   */
  const addSongLocal = (song, now) => {
    console.log('addSongLocal');
    song.uuid = genUUID();
    console.log(song);
    if (now)  setPlayList(list => list.slice(0, iterator).concat(song, ...list.slice(iterator)));
    else  setPlayList(list => list.concat(song));
  }
  const addSongRemote = (song, now) => {
    socketRef.current.emit('addSong', { song: song, now: now });
  }
  const addSong = (song, now) => {
    if (!syncInfo.isSync) addSongLocal(song, now);
    else addSongRemote(song, now);
  }

  const nextSong = () => {
    console.log(syncInfo);
    if (!syncInfo.isSync) setIterator(v => v < playList.length - 1 ? v + 1 : v);
    else socketRef.current.emit('nextSong');
  }
  const prevSong = () => {
    if (!syncInfo.isSync) setIterator(v => v > 0 ? v - 1 : v);
    else socketRef.current.emit('prevSong');
  }
  const changeSong = it => {
    if (!syncInfo.isSync) setIterator(it);
    else socketRef.current.emit('changeSong', it);
  }

  const nowSong = playList[iterator];

  return (
    <PlayListContent.Provider value={{
      songInfo: { playList, iterator, nowSong },
      songController: { addSong, nextSong, prevSong, changeSong }, 
      syncInfo,
      syncController: { 
        connectServer, setUpName, createRoom, 
        requestAvaliableRoom, joinRoom, exitRoom,
        syncPlay, syncSeek, finishedPlay
      }
    }}>
      {props.children}
    </PlayListContent.Provider>
  )
}

export { PlayListContent };
export default PlayListProvider;