import React, { useContext } from "react";
import AuthContext from "../AuthContext.js";

const Stats = () => {
  // Todo Debe contener una vista, `/game/stats`, con estadísticas, obtenidas del servidor

  const { user } = useContext(AuthContext);

  return <p>{user.name}’s stats</p>;
};

export default Stats;
