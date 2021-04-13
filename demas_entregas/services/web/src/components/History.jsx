import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext.js";
import {useHistory} from "react-router-dom";
import {allPrefix} from "../services/game";

const History = () => {

    const history = useHistory();
    const [gameHistory, setGameHistory] = useState([])
    const {user} = useContext(AuthContext);
    const [interval, setInterval] = useState(0);

    const load = () => {
        console.log('LOAD')
        allPrefix(user.name).then(r => {
            setGameHistory(r?? [])
        })
    }

    useEffect(() => {
        load()
        let i = window.setInterval(load, 15000)
        return () => {
            console.log('CLEAR')
            window.clearInterval(i)
        }
    }, [])

    // TODO Al pulsar en una de las partidas de la lista anterior, debe redirigir al usuario a una tercera vista, `/game/play`, en la que se muestre algún dato de la partida seleccionada
    const handleGameSelect = (game) => {
        if(game.value.state === 'viewing' || game.value.state === 'playing') {
            window.alert('Juego en curso o no disponible')
            return
        }
        // 'en uso' Este dato debe reflejarse en la vista `/game/history`, de tal manera que no sea posible acceder a una partida que esté `en uso`.
        history.push(`/game/play?gameId=${game['key']}`);
    }



    return (
        <>
            <p>{user.name}’s past games</p>

            <table style={{width: '100%'}}>
                <thead>
                <tr>
                    <td>Key</td>
                    <td>Fecha Ultima Modificacion</td>
                    <td>Estado</td>
                    <td>Puntos</td>
                    <td>Resultado</td>
                    <td>Vidas Restantes</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {
                    gameHistory.map((v, k) => {
                        return (
                            <tr key={k}>
                                <td>{v.key}</td>
                                <td>{v.createdAt}</td>
                                <td>{v.value.state}</td>
                                <td>{v.value.points}</td>
                                <td>{v.value.won? 'Ganador': 'Perdedor'}</td>
                                <td>{v.value.livesLeft}</td>
                                <td>
                                    <button onClick={() => handleGameSelect(v)}>
                                        Ver Partida
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>


        </>
    );
}

export default History;
