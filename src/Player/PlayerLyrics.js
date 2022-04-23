import { a, useSpring, useSprings } from "@react-spring/web";
import React, { useEffect, useMemo, useRef, useState } from "react";

import './PlayerLyrics.scss'

function praseLyric(lrcStr) {
  return [...lrcStr.matchAll(/\[(\d+):(\d+\.?\d+)\](.*$)/gm)]
    .map((reg) => ({
      beginTime: parseInt(reg[1]) * 60 + parseFloat(reg[2]),
      content: reg[3]
    }));
}

export default function PlayerLyrics({ lrcStr, time }) {
  const [lrc, setLrc] = useState([]);

  useEffect(() => {
    if (!lrcStr) setLrc([{ beginTime: 0, content: 'No lyric found.'}]);
    else {
      console.log(lrcStr);
      const lyrics = praseLyric(lrcStr);
      console.log(lyrics);
      setLrc(lyrics);
    }
  }, [ lrcStr ]);

  // const [nowLyric, setNowLyric] = useState(null);
  // useEffect(() => setNowLyric(null), [lrc]);
  // useEffect(() => {
  //   setNowLyric(p => {
  //     if (p === null) return lrc.findIndex((lyric, i) => 
  //       lyric.beginTime <= time && (i === lrc.length - 1 || lrc[i + 1].beginTime > time));
  //     else return lrc[p + 1].beginTime <= time ? p + 1 : p;
  //   });
  //   console.log(time);
  // }, [lrc, time]);
  const nowLyric = useMemo(() => lrc.findIndex((lyric, i) => 
    lyric.beginTime <= time && (i === lrc.length - 1 || lrc[i + 1].beginTime > time)),
    [lrc, time]);

  const springs = useSprings(lrc.length, lrc.map((lyric, i) => (
    Object.assign({
      config: { tension: 190, friction: 30 },
    }, i === nowLyric ? {
      blur: '0px', color: '#FFF', textShadow: '0 0 1rem #999A', scale: '105%'
    } : {
      blur: '1.3px', color: '#FFFC', textShadow: '0 0 1rem #9990', scale: '100%'
    })
  )));

  const ref = useRef();
  const { scroll } = useSpring({
    scroll: ref.current && nowLyric !== null && ref.current.children[nowLyric] ?
      ref.current.children[nowLyric].getBoundingClientRect().top + ref.current.scrollTop - 80 : 0,
    config: { tension: 190, friction: 30 },
  });

  useEffect(() => {
    ref.current && console.log(ref.current.children);
  }, [ref.current]);

  return (
    <a.div className="PlayerLyrics" ref={ref} scrollTop={ scroll }>
      {springs.map(({ blur, scale, ...style }, index) => (
        <a.div className="lyric" key={index} style={{
          filter: blur.to(v => `blur(${v})`),
          transform: scale.to(v => `scale(${v})`),
          ...style
        }}>{ lrc[index].content }</a.div>
      ))}
    </a.div>
  )
}