import React from "react";
import { render } from "react-dom";

const MyHello = () =>  {
  return (
    <h1>TestY</h1>
  );
};

render(<MyHello />, document.getElementById("app"));
