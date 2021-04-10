import React, { useContext } from "react";
import AuthContext from "../AuthContext.js";

const History = () => {
  const { user } = useContext(AuthContext);

  return <p>{user.name}’s past games</p>;
};

export default History;
