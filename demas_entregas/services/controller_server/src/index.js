const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

router.post("/game", (ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state

  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    id: "<TODO: generate>",
    // ...
  });
});

router.get("/game/:id", (ctx) => {
  // 1. get current state from Stats server
  // 2. return state

  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    id: ctx.params.id,
    // ...
  });
});

router.post("/game/:id/event", (ctx) => {
  // 1. get current state from Stats server
  // 2. get next state from Game server
  // 3. post mutation to Stats server to store next state
  // 4. return state

  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    id: ctx.params.id,
    // ...
  });
});

app.use(koaBody());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT);
