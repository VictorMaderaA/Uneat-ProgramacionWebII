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
    <h1 className="centrar">{user.name}’s stats</h1>
  <div className="container">
    <table className="table">
      <thead>
        <tr>
          <th>Métrica</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Partidas totales</td>
          <td>{stat?.totales}</td>
        </tr>
        <tr>
          <td>Ganadas</td>
          <td>{stat?.ganadas}</td>
        </tr>
        <tr>
          <td>Perdidas</td>
          <td>{stat?.perdidas}</td>
        </tr>
        <tr>
          <td>Puntos</td>
          <td>{stat?.puntos}</td>
        </tr>
        <tr>
          <td>Promedio</td>
          <td>{stat?.promedio_puntos}</td>
        </tr>
        <tr>
          <td>Ganadas(%)</td>
          <td>{stat?.porcentaje_ganadas}</td>
        </tr>
        <tr>
          <td>Perdidas(%)</td>
          <td>{stat?.porcentaje_perdidas}</td>
        </tr>
      </tbody>
    </table>
  </div>

  </>;
};

export default Stats;
