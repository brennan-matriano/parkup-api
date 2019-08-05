import { getAll, insert, getOne, destroy, edit } from '../../database/model' 
import { postgres } from '../../database/postgres'
export function routes(router){
    router
        .get('/', async(ctx) => {
            ctx.status = 200
            ctx.body = { "message": "hello there" }
        })
        .get('/registration', async(ctx) => {
            const data = await getAll(postgres(ctx));
            if (!data){
                ctx.body = {'message': 'could not retrieve registration'}
                ctx.status = 400
            }
            ctx.status = 200
            ctx.body = {'data': data}
        })
        .post('/register', async(ctx) => {
            const data = ctx.request.body
            const register = await insert(postgres(ctx), data)

            if(!register){
                ctx.status = 400
                ctx.body = {'message': 'could not retrieve registration'}
            }
            ctx.body = {'register': register}
            ctx.status = 200
        })
        .get('/register/:id', async(ctx) => {
            const id = ctx.request.params.id

            const register = await getOne(postgres(ctx), id)

            if(!register){
                ctx.status = 400
                ctx.body = {'message': 'could not retrieve registration'}
            }
            ctx.body = {'register': register}
            ctx.status = 200
        })
        .delete('register/:id', async(ctx) => {
            const id = ctx.request.params.id

            const del = await destroy(postgres(ctx), id)

            if(!del){
                ctx.status = 400
                ctx.body = {'message': 'could not delete record'}  
            }

            ctx.status = 200
            ctx.body = {'destroy': del}
        })
        .put('/edit/:id', async(ctx) => {
            const id = ctx.request.params.id
            const data = ctx.request.body

            const update = await edit(postgres(ctx), data, id)

            if(!update){
                ctx.status = 400
                ctx.body = {'message': 'could not update'}
            }
            ctx.status = 200
            ctx.body = {'message': update}
        })
}