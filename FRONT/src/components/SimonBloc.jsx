import React from "react";
import { SimonBlocContainer } from "../style/components/SimonBloc.style";

const SimonBloc = (props) => {
  const { action, val, color } = props;

  return (
    <SimonBlocContainer onClick={action} style={{ backgroundColor: color }}>
      {val}
    </SimonBlocContainer>
  );
};

export default SimonBloc;
