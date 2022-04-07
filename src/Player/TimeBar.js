import { useRef } from 'react';
import './TimeBar.css'

let nowIdentifier = 0;
//  {currentTime duration} {seekTime isSeeking} onSeekStart onSeekEnd onSeekMove
function TimeBar(props) {
  const barRef = useRef();

  const getTouch = touchList => {
    for (let i = 0; i < touchList.length; ++i)
      if (touchList.item(i).identifier === nowIdentifier)
        return touchList.item(i);
  }

  const getSeekTime = touch => {
    const rect = barRef.current.getBoundingClientRect()
    return Math.min(props.audioInfo.duration, Math.max(0, 
      ((touch.clientX - rect.left) / rect.width * props.audioInfo.duration)
      ));
  }

  
  const touchStartHandler = e => {
    console.log(e.type);
    const touch = e.changedTouches[0];
    nowIdentifier = touch.identifier;
    console.log(`start ${nowIdentifier}`);
    props.onSeekStart(getSeekTime(touch));
  }
  
  const touchMoveHandler = (e, isEnd) => {
    console.log(e.type);
    console.log(e.changedTouches);
    const touch = getTouch(e.changedTouches);
    console.log(touch);
    if (props.seekInfo.isSeeking && touch) {
      const seekTime = getSeekTime(touch);
      console.log(`move ${nowIdentifier} ${seekTime}`);
      isEnd ? props.onSeekEnd(seekTime) : props.onSeekMove(seekTime);
    }
  }

  const progress = ((props.seekInfo.isSeeking || props.audioInfo.isSeeking) ? 
    props.seekInfo.seekTime : props.audioInfo.currentTime) / props.audioInfo.duration;
  
  return (
    <div ref={barRef} className="timeBar"
      onTouchMove={touchMoveHandler}
      onTouchEnd={e => touchMoveHandler(e, true)}>
      <div className={'timeBarDot' + (props.seekInfo.isSeeking ? ' isSeeking' : '')}
        style={{left: `${progress * 100}%`}}
        onTouchStart={touchStartHandler} />
    </div>
  )
}

export default TimeBar;