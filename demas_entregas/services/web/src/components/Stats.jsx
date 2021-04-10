import React, { useContext } from "react";
import AuthContext from "../AuthContext.js";

const Stats = () => {
  const { user } = useContext(AuthContext);

  return <p>{user.name}’s stats</p>;
};

export default Stats;
