import { useState } from "react";

function Test() {
  const [val, setVal] = useState({a: 0, b: 0});

  return (
    <>
      <div onMouseOver={e => {
        setVal(v => ({...v, a: v.a + 1}));
        console.log(`${e.type} ${JSON.stringify(val)}`);
      }}
      onMouseEnter={e => {
        setVal(v => ({...v, b: v.b + 1}));
        console.log(`${e.type} ${JSON.stringify(val)}`);
      }}>{val.a}</div>
      <div>{val.b}</div>
    </>
  )
}

export default Test;