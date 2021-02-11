import React, { useState, useEffect } from "react";
import { HomeContainer } from "../style/views/HomePage.style";
import SimonBloc from "../components/SimonBloc";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let initState = getRandomInt(8);

const HomePage = () => {
  const [patternToDo, SetPatternToDo] = useState([initState]);
  const [userPattern, SetUserPattern] = useState([]);
  const [state, SetState] = useState("");
  const [level, SetUp] = useState(1);

  let bloc = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  console.log(patternToDo);

  useEffect(() => {
    console.log("userPattern : " + userPattern);
    console.log("patternToDo : " + patternToDo);
    if (
      userPattern[userPattern.length - 1] ===
      patternToDo[userPattern.length - 1]
    ) {
      if (userPattern.length === patternToDo.length) {
        SetUp(level + 1);
        SetPatternToDo([...patternToDo, getRandomInt(8)]);
        SetUserPattern([]);
      } else {
        SetState("Partie en cours");
      }
    } else {
      SetState("Perdu");
    }
    // console.log(patternToDo);
  }, [userPattern]);

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
            ></SimonBloc>
          );
        })}
      </HomeContainer>
      <div>{state}</div>
      <div>Level : {level}</div>
    </>
  );
};

export default HomePage;
