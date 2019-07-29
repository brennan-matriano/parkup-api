import Koa from 'koa'
import helmet from 'koa-helmet'
import Router from 'koa-router'
import jsonBody from 'koa-json-body'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv-safe'

import { postgresMiddleware, postgres } from '../database/postgres'
import { schema, getAll } from '../database/model'

//load env values
dotenv.load()

const app = new Koa()
const router = new Router()
const port = process.env.PORT

app.use(bodyParser())
app.use(postgresMiddleware(schema))

//random test route
router.get('/', async(ctx) => {
    ctx.status = 200
    ctx.body = { "message": "hello there" }
})

//retrieve cars route
router.get('/retrieve-cars', async(ctx) => {
    const data = await getAll(postgres(ctx));
    ctx.body = data
})

app.use(jsonBody())
app.use(helmet())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})