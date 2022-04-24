import { IonIcon } from "@ionic/react";
import { a, useTransition, config } from "@react-spring/web";
import { informationCircle } from "ionicons/icons";
import { useState, useRef, useEffect, useMemo, createContext } from "react";
import { v4 } from "uuid";

import './Messager.scss';

const MessagerContext = createContext();
function Messager({ children }) {
  const refMap = useRef(new WeakMap());
  const cancelMap = useRef(new WeakMap());
  const [list, setList] = useState([]);

  const transitions = useTransition(list, {
    from: { height: 0, marginBottom: '0.5rem', opacity: 0, life: '100%' },
    enter: item => async (next, cancel) => {
      cancelMap.current.set(item, cancel);
      await next({ height: refMap.current.get(item).offsetHeight, opacity: 1, marginBottom: '0.5rem'});
      await next({ life: '0%' });
    },
    leave: { opacity: 0, height: 0, marginBottom: '0rem' },
    onRest: (result, value, item) => setList(l => l.filter(i => i.key !== item.key)),
    config: (item, index, phase) => key => phase === 'enter'
      ? (key === 'life' ? { duration: 4000 } : config.default)
      : config.slow
  });

  useEffect(() => {
    setList([{
      message: `夜雨凉秋色，思君在边陲。你好呀，${
        localStorage.name ? localStorage.name : '旅行者' }。`,
      key: 1
    }]);
  }, []);

  const addMessage = (message, type) => {
    console.log('addMessage' + message);
    setList(l => l.concat({
      message, type, key: v4()
    }))
  }

  // const item = {
  //   message: '我跟温迪的关系似乎一直都是这样若即若离，我并不擅长打理我跟许多人之间保持着的连接，',
  //   // type: 'warn',
  //   key: 1,
  // }
  // const life = '38%';
  // const style = {};

  return (
    <>
      <MessagerContext.Provider value={{
        addMessage: addMessage
      }}>
        { children }
      </MessagerContext.Provider>
      <div className="messagerContent">{
        transitions(({ life, ...style }, item) => (
          <a.div className="messageWrapper" style={ style }>
            <div className={"messageBox " + (item.type ? item.type : '')}
              ref={ref => refMap.current.set(item, ref)}
              onClick={e => cancelMap.current.get(item)()}>
              <div className="message">{ item.message }</div>
              <a.div className="life" style={{ right: life }} />
            </div>
          </a.div>
        ))
      }</div>
    </>
  );
}

export { MessagerContext }
export default Messager;