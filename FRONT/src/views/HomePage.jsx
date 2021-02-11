import React, { useState } from "react";
import { HomeContainer } from "../style/views/HomePage.style";
import SimonBloc from "../components/SimonBloc";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const HomePage = () => {
  const [patternToDo, SetPatternToDo] = useState([getRandomInt(9)]);
  const [userPattern, SetUserPattern] = useState([]);

  let bloc = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(patternToDo);

  const handleClick = (val) => {
    SetUserPattern(userPattern.push(val));

    console.log("user" + userPattern[userPattern.length - 1]);
    console.log("todo" + patternToDo[userPattern.length - 1]);
    if (
      userPattern[userPattern.length - 1] ===
      patternToDo[userPattern.length - 1]
    ) {
      if (userPattern.length === patternToDo.length) {
        console.log("Gagné");
      }
    } else {
      console.log("Perdu");
    }
    // console.log(patternToDo);
  };
  return (
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
  );
};

export default HomePage;
