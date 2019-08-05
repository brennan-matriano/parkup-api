import Koa from 'koa'
import helmet from 'koa-helmet'
import Router from 'koa-router'
import jsonBody from 'koa-json-body'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv-safe'

import { postgresMiddleware } from '../database/postgres'
import { schema } from '../database/model'

import { routes as registerRoute } from './routes/routes'

//load env values
dotenv.load()

const app = new Koa()
const router = new Router()
const port = process.env.PORT

app.use(bodyParser()).use(postgresMiddleware(schema))

for (const routes of [
    registerRoute
]) {
    routes(router)
}
app.use(jsonBody())
app.use(helmet())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})