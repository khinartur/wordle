import React from "react";
import "./Keyboard.css";

const FIRST_LINE = "qwertyuiop".split("");
const SECOND_LINE = "asdfghjkl".split("");
const THIRD_LINE = "zxcvbnm".split("");

export function Keyboard({ chars }) {
  console.log(chars);

  return (
    <div className="wrapper">
      <div className="line">
        {FIRST_LINE.map((ch) => (
          <Key key={ch} char={ch} state={chars[ch]} />
        ))}
      </div>
      <div className="line">
        {SECOND_LINE.map((ch) => (
          <Key key={ch} char={ch} state={chars[ch]} />
        ))}
      </div>
      <div className="line">
        {THIRD_LINE.map((ch) => (
          <Key key={ch} char={ch} state={chars[ch]} />
        ))}
      </div>
    </div>
  );
}

function Key({ char, state }) {
  let classname = "key";
  if (state) {
    if (state === "correct") {
      classname += " correct";
    } else if (state === "position") {
      classname += " position";
    }
  }

  return <div className={classname}>{char.toUpperCase()}</div>;
}
