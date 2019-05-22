import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

const MongoDb = require('./mongo');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json());

router
  .get('/:id', async ( ctx, next) => {
    let res = await MongoDb.query(ctx.params.id)
    if (res.status) {
      ctx.redirect(res.msg.long_url)
    }
    ctx.status = 302
  })
  .post('/', (ctx, next) => {
    let res = await MongoDb.save(ctx.request.body)
    ctx.body = res
  });

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(7193)

console.log(`app run in 7193`)