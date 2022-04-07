import smkni from '../Player/smkni.mp3';
import defPic from '../Player/shinu.jpeg';
import kanade from '../Player/kanade.mp3';
import kanaPic from '../Player/kanade.jpeg';
import { createContext, useEffect, useState } from 'react';

function PlayList() {
  let list = [{
    name: 'Untitled',
    url: smkni,
    artists: [{ name: 'Picon' }],
    picUrl: defPic
  }];
  this.iterator = 0;

  this.addSong = songData => {
    list.push(Object.assign(songData, { isDownloaded: false }));
    ++this.iterator;
  }

  this.nextSong = () => this.iterator < list.length ? list[this.iterator++] : undefined;
  this.prevSong = () => this.iterator > 0 && list.length ? list[--this.iterator] : undefined;

  setInterval(() => this.addSong({
    name: 'Untitled',
    url: smkni,
    artists: [{ name: 'Picon' }],
    picUrl: defPic
  }), 1000);
}

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
  /**
   * 
   * @param {{name: string, url: URL, artists: Array, picUrl: URL}} song 
   * @param {boolean} now
   */
  const addSong = (song, now) => {
    console.log('addSong');
    console.log(song);
    if (now)  setPlayList(list => list.slice(0, iterator).concat(song, ...list.slice(iterator)));
    else  setPlayList(list => list.concat(song));
  }

  const nextSong = () => setIterator(v => v < playList.length - 1 ? v + 1 : v);
  const prevSong = () => setIterator(v => v > 0 ? v - 1 : v);

  // useEffect(() => {
  //   const int = setInterval(() => {
  //     addSong({
  //       name: 'Untitled',
  //       url: smkni,
  //       artists: [{ name: 'Picon' }],
  //       picUrl: defPic
  //     }, false);
  //     // setIterator(v => v + 1);
  //   }, 500);
  //   return () => clearInterval(int);
  // })

  const nowSong = playList[iterator];

  return (
    <PlayListContent.Provider value={{ playList, iterator, nowSong, addSong, nextSong, prevSong}}>
      {props.children}
    </PlayListContent.Provider>
  )
}

export { PlayListContent };
export default PlayListProvider;