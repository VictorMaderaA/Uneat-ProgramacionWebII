import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {find, updateGame} from "../services/game";
import {v4 as uuidv4} from 'uuid';
import AuthContext from "../AuthContext";
import {useHistory} from "react-router-dom";
import PixelGrid from "react-pixel-grid";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

let game = null;

const Play = () => {
    let query = useQuery();
    const {user} = useContext(AuthContext);
    const history = useHistory()

    const [gameId, setGameId] = useState(query.get('gameId') ?? '')
    const [gameData, setGameData] = useState({});

    const [gameArray, setGameArray] = useState([]);

    const updateState = (data) => {
        data.key = data.key ?? gameId
        console.log(data.key)
        let d = {
            ...gameData,
            ...data
        }
        setGameData(d)
        updateGame(data.key, d).then(r => {
            console.log('TEST 123', r)
            updateGameWithData(JSON.parse(r.data.updatePair.value.game))
        });
        game = d;
    }

    useEffect(() => {
        if (gameId) {
            find(gameId).then(r => {
                if (!r) {
                    window.alert('Fallo del servidor. Intente mas tarde.')
                    history.push('/game/history')
                }
                console.log('TEST', r)
                if (r.value.state === 'viewing' || r.value.state === 'playing') {
                    window.alert('Juego en curso o no disponible')
                    history.push('/game/history')
                } else {
                    console.log('LOADED', r.value)
                    updateState({
                        ...r.value,
                        state: 'viewing',
                    })
                }
            })
        }
        return (x) => {
            console.log('GAMEDATA', gameData)
            updateState({
                ...game,
                state: 'none',
            })
        }
    }, []);


    const startGame = () => {
        if (gameId) {
            updateState({
                ...game,
                state: 'none',
            })
        }
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

    const winGame = () => {
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

    const handleGameResponse = (res) => {
        console.log(res.gqlRes.data.updatePair.value.game)
        updateGameWithData(JSON.parse(res.gqlRes.data.updatePair.value.game))
    }

    const updateGameWithData = (gameObject) => {

        const player = "#00aeff";
        const playerBullet = "#c128ec";
        const enemyBullet = "#ff582e";
        const enemy = "#ff0000";
        const back = "#FFF";

        console.log(gameObject)
        let gameArray = new Array(gameObject.h).fill(null);
        gameArray.forEach(((value, index) => {
            gameArray[index] = new Array(gameObject.w).fill(back)
        }))


        gameArray[gameObject.player.position.y][gameObject.player.position.x] = player
        gameObject.enemies.map(x => {
            gameArray[x.position.y][x.position.x] = enemy
        })
        gameObject.bullets.map(x => {
            gameArray[x.position.y][x.position.x] = x.owner === 0 ? playerBullet : enemyBullet
        })

        gameArray = gameArray.reverse()

        setGameArray(gameArray)
        console.log(gameArray)
    }


    const moveLeft = () => {
        fetch(`http://localhost:5002/game/${gameId}/event`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event: 'move',
                input: {
                    x: -1,
                    y: 0
                }
            })
        }).then(res => res.json()).then(handleGameResponse)
    }

    const moveRight = () => {
        fetch(`http://localhost:5002/game/${gameId}/event`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event: 'move',
                input: {
                    x: 1,
                    y: 0
                }
            })
        }).then(res => res.json()).then(handleGameResponse)
    }

    const shoot = () => {
        fetch(`http://localhost:5002/game/${gameId}/event`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event: 'shoot',
                input: {
                    x: 0,
                    y: 0
                }
            })
        }).then(res => res.json()).then(handleGameResponse)
    }

    const tick = () => {
        fetch(`http://localhost:5002/game/${gameId}/event`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                event: 'tick',
                input: {
                    x: 0,
                    y: 0
                }
            })
        }).then(res => res.json()).then(handleGameResponse)
    }

    return (
        <>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={2}><code>TBI</code></td>
                    </tr>
                    <tr>
                        <td>Llave</td>
                        <td>{gameId}</td>
                    </tr>
                    <tr>
                        <td>Puntos</td>
                        <td>{gameData.points}</td>
                    </tr>
                    <tr>
                        <td>Estado</td>
                        <td>{gameData.state}</td>
                    </tr>
                    <tr>
                        <td>Resultado</td>
                        <td>{gameData.won ? 'Ganador' : 'Perdedor'}</td>
                    </tr>
                    <tr>
                        <td>Vidas restantes</td>
                        <td>{gameData.livesLeft}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className=" centrar">
                <button onClick={startGame} className="btn">
                    Start New Game
                </button>

                <button onClick={moveLeft} className="btn">
                    moveLeft
                </button>

                <button onClick={moveRight} className="btn">
                    moveRight
                </button>

                <button onClick={shoot} className="btn">
                    shoot
                </button>
                <button onClick={tick} className="btn">
                    Tick
                </button>


                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<button onClick={loseGame} className="btn">*/}
                {/*    Perder Partida*/}
                {/*</button>*/}
                {/*<button onClick={winGame} className="btn">*/}
                {/*    Ganar Partida*/}
                {/*</button>*/}
                {/*<button onClick={loseLives} className="btn">*/}
                {/*    Restar Vidas*/}
                {/*</button>*/}
                {/*<button onClick={winPoints} className="btn">*/}
                {/*    Aumentar Puntos*/}
                {/*</button>*/}

            </div>
            <PixelGrid
                data={gameArray}
                options={{
                    size: 20,
                    padding: 2,
                }}
            />
        </>
    );
};

export default Play;
