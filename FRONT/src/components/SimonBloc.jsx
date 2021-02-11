import React from "react";
import { SimonBlocContainer } from "../style/components/SimonBloc.style";

const SimonBloc = (props) => {
  const { action, val } = props;

  return <SimonBlocContainer onClick={action}>{val}</SimonBlocContainer>;
};

export default SimonBloc;
