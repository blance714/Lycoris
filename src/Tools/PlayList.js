import smkni from '../Player/smkni.mp3';
import defPic from '../Player/shinu.jpeg';
import kanade from '../Player/kanade.mp3';
import kanaPic from '../Player/kanade.jpeg';
import { createContext, useEffect, useRef, useState } from 'react';
import Socket from './Socket';

const PlayListContent = createContext();
function PlayListProvider(props) {
  const [playList, setPlayList] = useState([
    {
      name: 'Untitled',
      url: smkni,
      artists: [{ name: 'Picon' }],
      picUrl: defPic
    },
    {
      name: 'カナデトモスソラ',
      url: kanade,
      artists: [{ name: 'Sasanomaly' }],
      picUrl: kanaPic
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
    socketRef.current = new Socket('ws://10.21.72.242:3001');
    const socket = socketRef.current;

    socket.on('open', () => {
      setSyncInfo(p => ({...p, isConnected: true }));
      requestAvaliableRoom();
    });
    socket.on('close', () => {
      setSyncInfo(p => ({...p, isConnected: false, isSync: false }));
    });
    socket.on('roomConnectionRefused', info => console.log(info));
    socket.on('roomConnected', ID => {
      setSyncInfo(p => ({...p, roomID: ID, isSync: true }));
      // requestAvaliableRoom();
    });
    socket.on('avaliableRooms', rooms => setSyncInfo(p => ({...p, avaliableRooms: rooms })));

    socket.on('sync', data => {
      data.list && setPlayList(data.list);
      data.iterator && setIterator(data.iterator);
      data.time && setSyncInfo(p => ({...p, time: data.time }));
      data.paused && setSyncInfo(p => ({...p, paused: data.paused}));
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
    if (syncInfo.isConnected) {
      socketRef.current.emit('setUpName', name);
      setSyncInfo(p => ({...p, name: name }));
    }
  }
  const createRoom = () => {
    if (syncInfo.isConnected && syncInfo.name) {
      socketRef.current.emit('createRoom', { list: playList, iterator: iterator });
    }
  }
  const requestAvaliableRoom = () => socketRef.current.emit('requestAvaliableRoom');
  const joinRoom = ID => socketRef.current.emit('joinRoom', ID);
  const exitRoom = () => socketRef.current.emit('exitRoom');
  const syncPlay = (play, songTime) => socketRef.current.emit(play ? 'play': 'pause', 
    { time: { syncTime: (new Date).getTime(), songTime: songTime } }
  );
  const syncSeek = songTime => socketRef.current.emit('syncSeek', {
    time: { syncTime: (new Date).getTime(), songTime: songTime }
  });

  //---List Controller---//
  /**
   * 
   * @param {{name: string, url: URL, artists: Array, picUrl: URL}} song 
   * @param {boolean} now
   */
  const addSongLocal = (song, now) => {
    console.log('addSongLocal');
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

  const nextSong = () => setIterator(v => v < playList.length - 1 ? v + 1 : v);
  const prevSong = () => setIterator(v => v > 0 ? v - 1 : v);

  const nowSong = playList[iterator];

  return (
    <PlayListContent.Provider value={{
      songInfo: { playList, iterator, nowSong },
      songController: { addSong, nextSong, prevSong }, 
      syncInfo,
      syncController: { 
        connectServer, setUpName, createRoom, 
        requestAvaliableRoom, joinRoom, exitRoom,
        syncPlay, syncSeek
      }
    }}>
      {props.children}
    </PlayListContent.Provider>
  )
}

export { PlayListContent };
export default PlayListProvider;