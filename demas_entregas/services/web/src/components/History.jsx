import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../AuthContext.js";
import {useHistory} from "react-router-dom";
import {allPrefix} from "../services/game";

const History = () => {

    const history = useHistory();
    const [gameHistory, setGameHistory] = useState([1,2,3])

    useEffect(() => {
        // allPrefix(user.name)
        //     .then(data => setGameHistory(data))
    }, [])

    // TODO Debe tener una vista, `/game/history` con la lista de partidas anteriores del usuario, obtenidas del servidor
    const loadGameHistory = () => {

    }

    // TODO Al pulsar en una de las partidas de la lista anterior, debe redirigir al usuario a una tercera vista, `/game/play`, en la que se muestre algún dato de la partida seleccionada
    const handleGameSelect = (gameId) => {
        // 'en uso' Este dato debe reflejarse en la vista `/game/history`, de tal manera que no sea posible acceder a una partida que esté `en uso`.
        history.push(`/game/play?gameId=${gameId}`);
    }


    const {user} = useContext(AuthContext);

    return (
        <>
            <p>{user.name}’s past games</p>
            {
                gameHistory.map((v, k) => {
                    return (
                        <button onClick={() => handleGameSelect(v['key'])}>
                            Game {v['key']}
                        </button>
                    )
                })
            }
        </>
    );
};

export default History;
