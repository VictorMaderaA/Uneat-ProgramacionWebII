"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 3000;
var EntityOwnership;
(function (EntityOwnership) {
    EntityOwnership[EntityOwnership["PLAYER"] = 0] = "PLAYER";
    EntityOwnership[EntityOwnership["ENEMY"] = 1] = "ENEMY";
})(EntityOwnership || (EntityOwnership = {}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/new-game', (req, res) => {
    const height = 80;
    const width = 60;
    const player = {
        alive: true,
        position: {
            x: width / 2,
            y: 1
        }
    };
    const newGame = {
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
    };
    res.json(newGame);
});
app.post('/tick', (req, res) => {
    // Variable del juego
    const reqGame = req.body;
    // Actualizamos las Bullets
    reqGame.bullets = reqGame.bullets.map(b => {
        if (b.owner === EntityOwnership.PLAYER) {
            b.position.y += 1;
        }
        else if (b.owner === EntityOwnership.ENEMY) {
            b.position.y -= 1;
        }
        if (b.position.y > reqGame.h || b.position.y < 0) {
            return;
        }
        return b;
    }).filter(x => x);
    // Movemos enemigos && Disparan los enemigos
    reqGame.enemies = reqGame.enemies.map(e => {
        const mX = Math.random() < 0.5 ? 1 : -1;
        e.position.x += mX;
        if (e.position.x > reqGame.w || e.position.x < 0) {
            e.position.x -= mX;
        }
        return e;
    });
    // Verificamos si hay collision entre las balas, jugadores o enemigos
    // Devolvemos respuesta
    res.json(reqGame);
});
app.post('/move', ((req, res) => {
    var _a, _b;
    // Variables
    const reqGame = req.body;
    const mX = (_a = req.body.input.x) !== null && _a !== void 0 ? _a : 0;
    const mY = (_b = req.body.input.y) !== null && _b !== void 0 ? _b : 0;
    // Move
    reqGame.player.position.x += mX;
    reqGame.player.position.y += mY;
    // Evitar que salga
    if (reqGame.player.position.x > reqGame.w || reqGame.player.position.x < 0) {
        reqGame.player.position.x -= mX;
    }
    if (reqGame.player.position.y > reqGame.h || reqGame.player.position.y < 0) {
        reqGame.player.position.y -= mY;
    }
    // Respuesta
    res.json(reqGame);
}));
app.post('/shoot', ((req, res) => {
    // Variables
    const reqGame = req.body;
    const pX = reqGame.player.position.x;
    const pY = reqGame.player.position.y;
    // Nueva bala
    const newBullet = {
        owner: EntityOwnership.PLAYER,
        position: {
            x: pX,
            y: pY + 1
        }
    };
    // Agregamos la nueva bala al juego
    reqGame.bullets.push(newBullet);
    // Respuesta
    res.json(reqGame);
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map