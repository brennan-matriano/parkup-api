import express from 'express'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv-safe'
import * as swagger from 'swagger2'
import helmet from 'helmet'

import { postgresMiddleware } from '../database/postgres'
import { schema } from '../database/model'

import { routes as registerRoute } from './routes/registration'

//load env values
dotenv.load()

const app = express()
const router = express.Router()
app.use(bodyParser()).use(postgresMiddleware(schema))


const spec = swagger.loadDocumentSync('./src/swagger.yaml') //check validity of swagger file
if (!swagger.validateDocument(spec)) {
	throw Error('swagger.yaml is not valid Swagger 2.0 schema.')
}

app.use('/v1', router)

router.get('/swagger.json', async (ctx) => {
    ctx.status = 200
    ctx.body = spec
})
for (const routes of [
    registerRoute
]) {
    routes(router)
}

app.use("/", swaggerUi.serve);
app.use("/", swaggerUi.setup(spec));
app.use(helmet())

app.listen(8000, () => {
    console.log(`Server is up on port 8000`)
})