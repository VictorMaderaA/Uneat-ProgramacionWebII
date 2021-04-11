import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {clearGame, startNewGame, viewGame} from "../services/game";
import {v4 as uuidv4} from 'uuid';
import AuthContext from "../AuthContext";

const Play = () => {
    let query = useQuery();
    const {user} = useContext(AuthContext);

    const [gameId, setGameId] = useState(query.get('gameId') ?? '')
    const [gameData, setGameData] = useState({});


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    // TODO Mientras el usuario esté viendo los datos de la partida en la vista `/game/play`, ésta debe estar marcada como `en uso` en el servidor.
    useEffect(() => {
        if (gameId) {
            viewGame(gameId)
        }
        return () => {
            clearGame(gameId)
        }
    }, []);


    const startGame = () => {
        const newGameId = `${user.name}-${uuidv4()}`;
        setGameId(newGameId)
        startNewGame(newGameId)

        // TODO Mientras el usuario esté viendo los datos de la partida en la vista `/game/play`, ésta debe estar marcada como `en uso` en el servidor.
    }


    // TODO Si se accede a la vista `/game/play` a través del enlace con texto `new game` en el compononte `Menu`, se deben mostrar los datos de una partida nueva. Esta partida debe aparecer en `/game/history` a partir de ese momento.


    return (
        <>
            <code>TBI</code>
            <button onClick={startGame}>
                Start New Game
            </button>
        </>
    );
};

export default Play;
