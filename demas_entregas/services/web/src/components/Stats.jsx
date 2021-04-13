import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext.js";
import {stats} from "../services/game";
import {useHistory} from "react-router-dom";

const Stats = () => {

  const history = useHistory()
  const { user } = useContext(AuthContext);
  const [ stat, setStat ] = useState({})

  useEffect(() => {
    stats(user.name).then(r => {
      if(!r){
        window.alert('Fallo del servidor. Intente mas tarde.')
        history.push('/game/history')
      }
      setStat(r);
    })
  }, [])

  return <>
    <p>{user.name}’s stats</p>

    <p>Partidas Totales: {stat?.totales}</p>
    <p>Ganadas: {stat?.ganadas}</p>
    <p>Perdidas: {stat?.perdidas}</p>
    <p>Puntos: {stat?.puntos}</p>
    <p>Promedio Puntos: {stat?.promedio_puntos}</p>
    <p>Porcentaje Ganadas: {stat?.porcentaje_ganadas}</p>
    <p>Porcentaje perdidas: {stat?.porcentaje_perdidas}</p>

  </>;
};

export default Stats;
