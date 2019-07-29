const Koa = require('koa')
const helmet = require('koa-helmet')
const Router = require('koa-router')
const jsonBody = require('koa-json-body')
const bodyParser = require('koa-bodyparser')
const dotenv = require('dotenv-safe')

dotenv.load()

const app = new Koa()
const router = new Router()
const port = process.env.PORT

router.get('/', async (ctx) => {
    ctx.status = 200
    ctx.body = {'Message': 'Hello there'}
})

app.use(bodyParser())
app.use(jsonBody())
app.use(helmet())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})