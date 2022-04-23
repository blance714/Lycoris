import { a, config, easings, useSpring, useSprings, useTransition } from "@react-spring/web";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Agent from "../Tools/Agent";

import './PlayerLyrics.scss'

function praseLyric(lrcStr) {
  return [...lrcStr.matchAll(/\[(\d+):(\d+\.?\d+)\](.*$)/gm)]
    .map((reg) => ({
      beginTime: parseInt(reg[1]) * 60 + parseFloat(reg[2]),
      content: reg[3]
    }));
}

function PlayerLyricsDots({ beginTime, endTime, nowTime }) {
  const [style, api] = useSpring(() => ({ transform: 'scale(1)', opacity: 0 }));

  const active = beginTime <= nowTime && endTime >= nowTime;

  const [ID, setID] = useState(null);
  useEffect(() => {
    if (active) {
      api.stop();
      clearTimeout(ID);
      let first = true;
      const rev = () => {
        api.start({
          transform: first ? 'scale(0.90)' : 'scale(1.13)',
          onRest: rev
        });
        first = !first;
      }
      api.start({ 
        transform: 'scale(1.13)', opacity: 1,
        config: {
          duration: 2000,
          easing: easings.easeInOutSine,
        },
        onRest: rev
      });
      setID(setTimeout(() => api.start({
        to: [
          { transform: 'scale(1.13)' },
          { transform: 'scale(0)', opacity: 0 }
        ],
        config: config.slow
      }), (endTime - beginTime) * 1000 - 1500));
    }
    return () => clearTimeout(ID);
  }, [active]);

  const percent = ((nowTime - beginTime) / (endTime - beginTime - 1.5)) * 3;

  return (
    <a.div className="PlayerLyricsDots" style={ style }>
      <a.div className="dots" style={{ opacity: 0.3 + Math.max(0, Math.min(1, percent)) * .7 }} />
      <a.div className="dots" style={{ opacity: 0.3 + Math.max(0, Math.min(1, percent - 1)) * .7 }} />
      <a.div className="dots" style={{ opacity: 0.3 + Math.max(0, Math.min(1, percent - 2)) * .7 }} />
    </a.div>
  )
}

export default function PlayerLyrics({ lrcStr, time, onSeek }) {
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
  
  const nowLyric = useMemo(() => lrc.findIndex((lyric, i) => 
    lyric.beginTime <= time && (i === lrc.length - 1 || lrc[i + 1].beginTime > time)),
  [lrc, time]);
  
  const ref = useRef();
  
  const showDot = lrc[nowLyric] && lrc[nowLyric].content === ''
    && nowLyric !== lrc.length - 1 && lrc[nowLyric + 1].beginTime - lrc[nowLyric].beginTime > 4;
  const springs = useSprings(lrc.length, lrc.map((lyric, i) => (
    Object.assign({
      config: { tension: 190, friction: 30 },
    }, lyric.content === '' ? ( i === nowLyric && showDot ? {
      height: '2.7rem',
    } : {
      height: '0rem',
      config: config.slow
    }) : (i === nowLyric ? {
      blur: -0.2, color: '#FFF', textShadow: '0 0 1rem #999A', scale: '105%'
    } : {
      blur: 1.3, color: '#FFFC', textShadow: '0 0 1rem #9990', scale: '100%'
    }))
  )));
  
  // const showDot = false;
  // const showDotHeight = useMemo(() => {
  //   return 186.984375;
  //   return showDot && ref.current ?
  //     ref.current.children[nowLyric + 1].getBoundingClientRect().top : 0
  // }, [showDot]);
  const scrollVal = useMemo(() => {
    if (ref.current && nowLyric !== null && lrc[nowLyric]) {
      const target = lrc[nowLyric].content === '' ? (showDot ? nowLyric : nowLyric - 2) : 
        (nowLyric - 1 >= 0 && lrc[nowLyric - 1].content === '' ? nowLyric - 2 : nowLyric - 1);
      if (!ref.current.children[target])  return 0;
      const childRect = ref.current.children[target].getBoundingClientRect();
      if (showDot) return childRect.top + ref.current.scrollTop
        - 40 - Agent.rem2px(.5) - ref.current.getBoundingClientRect().top;
      return childRect.top + childRect.height + ref.current.scrollTop
        - 40 - ref.current.getBoundingClientRect().top;
    } else return 0;
  }, [time, showDot]);

  const { scroll } = useSpring({
    scroll: scrollVal,
    config: { tension: 190, friction: 30 },
  });

  return (
    <a.div className="PlayerLyrics" ref={ref} scrollTop={ scroll }>
      {springs.map(({ blur, scale, ...style }, index) => (
        lrc[index].content === ''
        && <a.div className="dot" style={ style }>
            {index + 1 !== lrc.length && (lrc[index + 1].beginTime - lrc[index].beginTime > 4)
            && <PlayerLyricsDots
                beginTime={ lrc[index].beginTime }
                endTime={ index + 1 !== lrc.length && lrc[index + 1].beginTime }
                nowTime={ time } />}
          </a.div>
        || <a.div className="lyric" key={index} onClick={e => {
          e.stopPropagation();
          onSeek(lrc[index].beginTime)
        }} style={{
          filter: blur.to(v => Math.max(0, v)).to(v => `blur(${v}px)`),
          transform: scale.to(v => `scale(${v})`),
          ...style
        }}>{ lrc[index].content }</a.div>
      ))}
    </a.div>
  )
}