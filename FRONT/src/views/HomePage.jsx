import React, { useState, useEffect } from "react";
import {
  HomeContainer,
  GameContainer,
  ScoreBoard,
  ButtonList,
  Button,
} from "../style/views/HomePage.style";
import SimonBloc from "../components/SimonBloc";
import { getScores, postScore } from "../api/wrapper";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let distance;
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
  const [scoreList, SetScoreList] = useState([]);

  const bloc = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const scores = async () => {
      try {
        const response = await getScores();
        let responseData = response.data["hydra:member"];
        SetScoreList(
          responseData.sort(
            (score1, score2) => score1.bestScore - score2.bestScore
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    scores();
  }, []);

  const reInit = async () => {
    let response = await postScore({ bestScore: distance });
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
      distance = now - startDate;

      SetTimer(
        Math.floor(distance / (1000 * 60 * 60)) +
          "h : " +
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) +
          "m : " +
          Math.floor((distance % (1000 * 60)) / 1000) +
          "s"
      );
    }, 1000);
    newTurn(patternToDo);
  };

  useEffect(() => {
    if (
      userPattern[userPattern.length - 1] ===
      patternToDo[userPattern.length - 1]
    ) {
      if (userPattern.length === patternToDo.length) {
        SetLevel(level + 1);
        let newVal = [...patternToDo, getRandomInt(8)];
        SetPatternToDo(newVal);
        SetUserPattern([]);
        newTurn(newVal);
      }
    } else {
      SetState("Perdu");
      clearInterval(x);
    }
  }, [userPattern]);

  const newTurn = async (pattern) => {
    for (let i = 0; i < pattern.length; i++) {
      await sleep(500);
      setActiveColor({ id: pattern[i], color: "red" });
      await sleep(1000);
      setActiveColor({ id: pattern[i], color: "" });
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
        <GameContainer>
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
        </GameContainer>
        <div>
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
        </div>
        <ScoreBoard>
          <h2>Tableau des scores</h2>
          <ul>
            {scoreList.map((items, i) => {
              return (
                <li>
                  {i} : {items.bestScore / 1000} s
                </li>
              );
            })}
          </ul>
        </ScoreBoard>
      </HomeContainer>
      <p style={{ width: 400 }}>
        Cc ! Pour jouer, tu dois enchainer les combinaisons. Reproduis les
        motifs de couleurs de plus en plus dificile au fur et à mesure des
        niveaux. Le but du jeu est d'atteindre le plus haut niveau, le plus
        rapidement possible. Ton score est enregistré après avoir perdu une
        partie ou quand tu as cliqués sur le bouton "Stop Game"! Pour l'instant,
        seul le temps joué est enregistré en base, mais plus tard, le niveau
        atteint sera ajouté juste à coté de ton temps de jeu.
      </p>
    </>
  );
};

export default HomePage;
