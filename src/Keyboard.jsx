import React from "react";
import "./Keyboard.css";

const FIRST_LINE = "qwertyuiop".split("");
const SECOND_LINE = "asdfghjkl".split("");
const THIRD_LINE = "zxcvbnm".split("");

export function Keyboard({ chars }) {
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
        <Key key="delete" char="Delete" />
      </div>
      <div className="line">
        {THIRD_LINE.map((ch) => (
          <Key key={ch} char={ch} state={chars[ch]} />
        ))}
        <Key key="enter" char="Enter" />
      </div>
    </div>
  );
}

function Key({ char, state }) {
  const onClick = (evt) => {
    let code;
    if (char === "Enter") {
      code = 10;
    } else if (char === "Delete") {
      code = 8;
    } else {
      code = char.charCodeAt(0);
    }

    const event = new KeyboardEvent("keydown", {
      code,
      key: char === "Delete" ? "Backspace" : char,
      bubbles: true,
      cancelable: true,
    });

    console.log(evt.target.dispatchEvent, event);
    evt.target.dispatchEvent(event);
  };

  let classname = "key";
  if (state) {
    if (state === "position") {
      classname += " position";
    } else if (state === "correct") {
      classname += " correct";
    }
  }
  if (char === "Enter" || char === "Delete") {
    classname += " special";
  }

  return (
    <div className={classname} onClick={onClick}>
      {char.toUpperCase()}
    </div>
  );
}
