import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {clearGame, startNewGame, viewGame} from "../services/game";
import {v4 as uuidv4} from 'uuid';
import AuthContext from "../AuthContext";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Play = () => {
    let query = useQuery();
    const {user} = useContext(AuthContext);

    const [gameId, setGameId] = useState(query.get('gameId') ?? '')
    const [gameData, setGameData] = useState({
        state: '',
        points: 0,
        won: false,
        livesLeft: 3
    });

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
            updateState({
                state: 'viewing',
            })
        }
        return () => {
            updateState({
                state: '',
            })
        }
    }, []);


    const startGame = () => {
        const newGameId = `${user.name}-${uuidv4()}`;
        setGameId(newGameId)
        updateState({
            state: 'playing',
            key: newGameId
        })
    }

    return (
        <>
            <code>TBI</code>
            <p>Key: {gameId}</p>
            <p>Points: {gameData.points}</p>
            <p>State: {gameData.state}</p>
            <p>Won: {gameData.won}</p>
            <p>User: {gameData.user}</p>
            <p>LivesLeft: {gameData.livesLeft}</p>
            <button onClick={startGame}>
                Start New Game
            </button>
        </>
    );
};

export default Play;
