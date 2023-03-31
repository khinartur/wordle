import React, { useCallback, useEffect, useState } from "react";
import { getWords } from "./data.js";
import "./App.css";
import { getSolutionChars } from "./utils.js";
import { Keyboard } from "./Keyboard";

// const API_URL = "https://some-api.com/api/wordle-words";
const WORDS_COUNT = 6;
const WORD_LENGTH = 5;

const INITIAL_TRIES = new Array(WORDS_COUNT).fill("");

export default function App() {
  const [solution, setSolution] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [tries, setTries] = useState(INITIAL_TRIES);

  useEffect(() => {
    const fetchWords = async () => {
      // const response = await fetch(API_URL);
      // return await response.json();
      return await getWords();
    };
    const setupSolution = async () => {
      const words = await fetchWords();
      const solution = words[Math.floor(Math.random() * words.length)];
      setSolution(solution.toLowerCase());
    };
    setupSolution();
  }, []);

  const getIndexOfCurrentTry = useCallback(
    () => tries.findIndex((t) => t[t.length - 1] !== "+"),
    [tries]
  );

  const onKeyDown = useCallback(
    (evt) => {
      if (isGameOver) {
        return;
      }

      const currIndex = getIndexOfCurrentTry();
      const currentTry = tries[currIndex];
      if (evt.key === "Enter") {
        if (currentTry.length < WORD_LENGTH) {
          return;
        }
        setTries((prev) => {
          const newState = [...prev];
          newState[currIndex] = currentTry + "+";
          return newState;
        });
        if (
          currentTry.toLowerCase() === solution ||
          currIndex === WORDS_COUNT - 1
        ) {
          setIsGameOver(true);
        }
        return;
      }

      if (evt.key === "Backspace" && currentTry.length > 0) {
        setTries((prev) => {
          const newState = [...prev];
          newState[currIndex] = currentTry.slice(0, -1);
          return newState;
        });
        return;
      }

      if (currentTry.length < WORD_LENGTH && /^[a-zA-Z]{1}$/.test(evt.key)) {
        setTries((prev) => {
          const newState = [...prev];
          newState[currIndex] = currentTry + evt.key;
          return newState;
        });
      }
    },
    [tries, getIndexOfCurrentTry, solution, isGameOver]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="app">
      <div>
        <h1 className="title">Wordle Game</h1>
      </div>
      {isGameOver && (
        <div className="solution">Solution is: {solution.toUpperCase()}</div>
      )}
      <div className="board">
        {tries.map((t, idx) => (
          <Line key={idx} line={t} solution={solution} />
        ))}
      </div>
      <div className="keyboard">
        <Keyboard chars={getSolutionChars(solution, tries)} />
      </div>
    </div>
  );
}

function Line({ line, solution }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = line[i] || "";
    let classname = "tile";
    if (line[WORD_LENGTH] === "+") {
      if (char === solution[i]) {
        classname += " correct";
      } else if (solution.includes(char)) {
        classname += " position";
      }
    }

    tiles.push(
      <Tile key={i} classname={classname} character={line[i] || ""} />
    );
  }

  return <div className="line">{tiles}</div>;
}

function Tile({ classname, character }) {
  return <div className={classname}>{character.toUpperCase()}</div>;
}
