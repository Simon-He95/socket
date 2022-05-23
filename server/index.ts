const Koa = require('koa')
const Router = require('koa-router')
const websockify = require('koa-websocket')

const app = websockify(new Koa())
const router = new Router()

app.ws.use((ctx, next) => {
  return next(ctx)
})

router.get('/', async ctx => {
  ctx.body = '欢迎'
})

router.all('/websocket/:id', async ctx => {
  ctx.websocket.on('message', msg => {
    console.log('前端发过来的数据：', msg, msg.toString())
    ctx.websocket.send(msg.toString())

  })
  ctx.websocket.on('close', () => {
    console.log('前端关闭了websocket')
  })
})

app
  .ws
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa is listening in 3000')
})

