import {Request, Response} from "express";

const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 3000

interface EntityPosition {
    position: Position
}

interface Position {
    x: number
    y: number
}

interface Area {
    h: number
    w: number
}

interface Player extends EntityPosition {
    alive: boolean
}

interface Enemy extends EntityPosition {
    alive: boolean
}

enum EntityOwnership {
    PLAYER,
    ENEMY
}

interface Bullet extends EntityPosition {
    owner: EntityOwnership
}

interface Game extends Area {
    playing: boolean
    player: Player
    enemies: Enemy[]
    bullets: Bullet[]
    input?: {
        x: number
        y: number
    }
}


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/new-game', (req: Request, res: Response) => {
    const height = 80;
    const width = 60;

    const player: Player = {
        alive: true,
        position: {
            x: width / 2,
            y: 1
        }
    }

    const newGame: Game = {
        h: height,
        w: width,
        player,
        playing: true,
        bullets: [],
        enemies: [
            {
                alive: true,
                position: {
                    x: width / 2,
                    y: height
                }
            }
        ],
    }
    res.json(newGame);
})

app.post('/tick', (req: Request, res: Response) => {
    // Variable del juego
    const reqGame: Game = req.body

    // Actualizamos las Bullets
    reqGame.bullets = reqGame.bullets.map(b => {
        if (b.owner === EntityOwnership.PLAYER) {
            b.position.y += 1
        } else if (b.owner === EntityOwnership.ENEMY) {
            b.position.y -= 1
        }
        if (b.position.y > reqGame.h || b.position.y < 0) {
            return;
        }
        return b;
    }).filter(x => x)

    // Movemos enemigos && Disparan los enemigos
    reqGame.enemies = reqGame.enemies.map(e => {
        const mX = Math.random() < 0.5 ? 1 : -1
        e.position.x += mX;
        if (e.position.x > reqGame.w || e.position.x < 0) {
            e.position.x -= mX
        }
        return e;
    })

    // Verificamos si hay collision entre las balas, jugadores o enemigos

    // Devolvemos respuesta
    res.json(reqGame)
})

app.post('/move', ((req: Request, res: Response) => {
    // Variables
    const reqGame: Game = req.body
    const mX = req.body.input.x ?? 0
    const mY = req.body.input.y ?? 0

    // Move
    reqGame.player.position.x += mX;
    reqGame.player.position.y += mY;

    // Evitar que salga
    if (reqGame.player.position.x > reqGame.w || reqGame.player.position.x < 0) {
        reqGame.player.position.x -= mX
    }
    if (reqGame.player.position.y > reqGame.h || reqGame.player.position.y < 0) {
        reqGame.player.position.y -= mY
    }

    delete reqGame.input

    // Respuesta
    res.json(reqGame);
}))

app.post('/shoot', ((req: Request, res: Response) => {
    // Variables
    const reqGame: Game = req.body
    const pX = reqGame.player.position.x
    const pY = reqGame.player.position.y

    // Nueva bala
    const newBullet: Bullet = {
        owner: EntityOwnership.PLAYER,
        position: {
            x: pX,
            y: pY + 1
        }
    }
    // Agregamos la nueva bala al juego
    reqGame.bullets.push(newBullet)

    // Respuesta
    res.json(reqGame);
}))

if(!module.parent){
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

module.exports = {
    app
};