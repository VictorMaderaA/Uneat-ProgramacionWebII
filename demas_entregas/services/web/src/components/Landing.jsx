import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Entrega 02</h1>
      <p>
        Try <Link to="/sign-in">logging in</Link>.
      </p>
    </>
  );
};

export default Landing;
