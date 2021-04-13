import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {find, setNone, startNewGame} from "../services/game";
import {v4 as uuidv4} from 'uuid';
import AuthContext from "../AuthContext";
import {useHistory} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Play = () => {
    let query = useQuery();
    const {user} = useContext(AuthContext);
    const history = useHistory()

    const [gameId, setGameId] = useState(query.get('gameId') ?? '')
    const [gameData, setGameData] = useState({});

    const updateState = (data) => {
        data.key = data.key?? gameId
        console.log(data.key)
        let d = {
            ...gameData,
            ...data
        }
        setGameData(d)
        startNewGame(data.key, d);
    }

    useEffect(() => {
        if (gameId) {
            find(gameId).then(r => {
                if(r.state === 'viewing' || r.state === 'playing'){
                    history.push('/game/history')
                }else{
                    updateState({
                        ...r.value,
                        state: 'viewing',
                    })
                }
            })
        }
        return (x) => {
            // console.log('GAMEDATA', gameData)
            // updateState({
            //     ...gameData,
            //     state: 'none',
            // })
        }
    }, []);


    const startGame = () => {
        const newGameId = `${user.name}-${uuidv4()}`;
        setGameId(newGameId)
        updateState({
            state: 'playing',
            points: 0,
            won: false,
            livesLeft: 3,
            key: newGameId
        })
    }

    const winGame = () =>{
        updateState({
            won: true
        })
    }

    const loseGame = () => {
        updateState({
            won: false
        })
    }

    const loseLives = () => {
        updateState({
            livesLeft: gameData.livesLeft - 1
        })
    }

    const winPoints = () => {
        updateState({
            points: gameData.points + 1
        })
    }

    return (
        <>
            <code>TBI</code>
            <p>Key: {gameId}</p>
            <p>Points: {gameData.points}</p>
            <p>State: {gameData.state}</p>
            <p>Won: {gameData.won? 'Ganador': 'Perdedor'}</p>
            <p>LivesLeft: {gameData.livesLeft}</p>

            <button onClick={startGame}>
                Start New Game
            </button>

            <button onClick={loseGame}>
                Perder Partida
            </button>

            <button onClick={winGame}>
                Ganar Partida
            </button>

            <button onClick={loseLives}>
                Restar Vidas
            </button>

            <button onClick={winPoints}>
                Aumentar Puntos
            </button>
        </>
    );
};

export default Play;
