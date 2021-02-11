import React, { useState, useEffect } from "react";
import {
  HomeContainer,
  ButtonList,
  Button,
} from "../style/views/HomePage.style";
import SimonBloc from "../components/SimonBloc";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let x;
let initState = getRandomInt(8);

const HomePage = () => {
  const [patternToDo, SetPatternToDo] = useState([initState]);
  const [userPattern, SetUserPattern] = useState([]);
  const [state, SetState] = useState("Lancez une partie");
  const [level, SetLevel] = useState(1);
  const [activeColor, setActiveColor] = useState("");
  const [timer, SetTimer] = useState(0);
  const [isGameInProgress, SetGameInProgress] = useState(false);

  const bloc = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const reInit = () => {
    SetUserPattern([]);
    SetPatternToDo([getRandomInt(8)]);
    SetLevel(1);
    SetTimer(0);
    setActiveColor("");
    SetGameInProgress(false);
    clearInterval(x);
    SetState("Lancez une partie");
  };

  const StartGame = () => {
    SetState("Partie en cours...");
    SetGameInProgress(true);
    let startDate = Date.now();
    x = setInterval(function () {
      let now = new Date().getTime();
      let distance = now - startDate;

      SetTimer(
        Math.floor(distance / (1000 * 60 * 60)) +
          "h : " +
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) +
          "m : " +
          Math.floor((distance % (1000 * 60)) / 1000) +
          "s"
      );
    }, 1000);
    newTurn();
  };

  useEffect(() => {
    console.log("userPattern : " + userPattern);
    console.log("patternToDo : " + patternToDo);
    if (
      userPattern[userPattern.length - 1] ===
      patternToDo[userPattern.length - 1]
    ) {
      if (userPattern.length === patternToDo.length) {
        SetLevel(level + 1);
        SetPatternToDo([...patternToDo, getRandomInt(8)]);
        SetUserPattern([]);
        newTurn();
      }
    } else {
      SetState("Perdu");
      clearInterval(x);
    }
  }, [userPattern]);

  const newTurn = async () => {
    for (let i = 0; i < patternToDo.length; i++) {
      console.log(patternToDo[i]);
      await sleep(500);
      setActiveColor({ id: patternToDo[i], color: "red" });
      await sleep(1000);
      setActiveColor({ id: patternToDo[i], color: "" });
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleClick = (val) => {
    SetUserPattern([...userPattern, val]);
  };
  return (
    <>
      <HomeContainer>
        {bloc.map((items, i) => {
          return (
            <SimonBloc
              action={() => handleClick(items)}
              key={`bloc_number_${i}`}
              val={items}
              color={activeColor.id === items ? activeColor.color : ""}
            ></SimonBloc>
          );
        })}
      </HomeContainer>
      <div>{state}</div>
      <div>Level : {level}</div>
      <div>Timer : {timer}</div>
      <ButtonList>
        <Button onClick={StartGame} disabled={isGameInProgress}>
          Start Game
        </Button>
        <Button onClick={reInit} disabled={!isGameInProgress}>
          Stop Game
        </Button>
      </ButtonList>
    </>
  );
};

export default HomePage;
