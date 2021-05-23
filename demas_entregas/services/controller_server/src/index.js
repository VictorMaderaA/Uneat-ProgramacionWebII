const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const Router = require("@koa/router");
const fetch = require('node-fetch').default
const gql = require('gql-query-builder')

const app = new Koa();
const router = new Router();

let gqlBasePath = "http://statsS:5001"
let gameBasePath = "http://gameS:5000"


router.post("/game", async (ctx) => {
    // 1. post mutation to Stats server to store new game
    // 2. return state


    await fetch(gameBasePath+'/new-game')
        .then(res => res.json())
        .then(async json => {

            let reqData = ctx.request.body.data
            reqData.game = JSON.stringify(json)

            console.log('STORE DATA', reqData)
            let gqlRes = await updateGame(ctx.request.body.uuid, reqData)
            console.log(gqlRes)
            ctx.response.set("Content-Type", "application/json");
            ctx.body = JSON.stringify({
                id: ctx.request.body.uuid,
                gqlRes: gqlRes
            });
        })
        .catch(e => {
            console.error('testing2we',e)
            ctx.response.set("Content-Type", "application/json");
            ctx.body = JSON.stringify({
                error: e
            });
        })

});

router.get("/game/:id", async (ctx) => {
    // 1. get current state from Stats server
    // 2. return state

    let gqlRes = await find(ctx.params.id)
    ctx.response.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
        id: ctx.params.id,
        gqlRes: gqlRes
    });
});

router.post("/game/:id/event", async (ctx) => {
    // 1. get current state from Stats server
    // 2. get next state from Game server
    // 3. post mutation to Stats server to store next state
    // 4. return state

    let gqlRes = await find(ctx.params.id)
    if (!gqlRes.value.game) {
        console.log(gqlRes)
        ctx.response.set("Content-Type", "application/json");
        ctx.body = JSON.stringify({
            error: ':( me da igual que haya sido'
        });
        return
    }

    let game = JSON.parse(gqlRes.value.game)

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...game,
            input: ctx.request.body.input
        })
    };

    if (!ctx.request.body.event) {
        console.log(JSON.stringify(ctx.request))
        ctx.response.set("Content-Type", "application/json");
        ctx.body = JSON.stringify({
            error: ':( me da igual que haya sido5'
        });
        return
    }

    let resGame = await fetch(gameBasePath + '/' + ctx.request.body.event, requestOptions)
        .then(res => {
            console.log(res)
            return res
        })
        .then(res => res.json())
        .catch(e => {
            console.error(e)
            ctx.response.set("Content-Type", "application/json");
            ctx.body = JSON.stringify({
                error: ':( me da igual que haya sido 2'
            });
            return
        })
    if (!resGame) {
        console.log(resGame)
        ctx.response.set("Content-Type", "application/json");
        ctx.body = JSON.stringify({
            error: ':( me da igual que haya sido3'
        });
        return
    }

    gqlRes.value.game = JSON.stringify(resGame)
    gqlRes.value.key = ctx.params.id
    console.log('---------------------------')
    console.log(gqlRes.value)
    if (!gqlRes.value.game) {
        console.log(gqlRes.value.game)
        ctx.response.set("Content-Type", "application/json");
        ctx.body = JSON.stringify({
            error: ':( me da igual que haya sido4'
        });
        return
    }
    gqlRes = await store(ctx.params.id, gqlRes.value)

    ctx.response.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
        id: ctx.params.id,
        gqlRes: gqlRes
    });
});


//Starts new game and set as playing
function updateGame(uuid, data) {
    return store(uuid, data)
}

function store(uuid, data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.mutation({
            operation: 'updatePair',
            variables: {
                ...data,
                key: {value: uuid, required: true},
            },
            fields: ['applicationId', 'key', 'createdAt', {
                value: [
                    'state',
                    'points',
                    'won',
                    'livesLeft',
                    'game',
                ]
            }]
        }))
    };
    return fetch(gqlBasePath, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function find(key) {
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gql.query({
            operation: 'pair',
            variables: {
                id: {value: key, required: true},
            },
            fields: ['applicationId', 'key', 'createdAt', {
                value: [
                    'state',
                    'points',
                    'won',
                    'livesLeft',
                    'game',
                ]
            }]
        }))
    };

    return fetch(gqlBasePath, requestOptions)
        .then(response => response.json())
        .then(r => {
            return r.data.pair
        })
        .catch(error => console.log('error', error));
}


app.use(koaBody());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT?? 5002);
