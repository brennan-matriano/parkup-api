import { getAll, insert, getOne, destroy, edit } from '../../database/model' 
import { postgres } from '../../database/postgres'
export function routes(router){
    router
        .get('/registrations', async(req, res, ) => {
            const data = await getAll(postgres(req))

            res.status = 200
            res.json(data)
        })
        .post('/registrations', async(req, res) => {
            const data = req.body
            
            const register = await insert(postgres(req), data)

            res.json(register)
            res.status = 200
        })
        .get('/registrations/:id', async(res, req) => {
            const register = await getOne(postgres(req), req.params.id)

            res.json(register)
            res.status = 200
        })
        .delete('/registrations/:id', async(req, res) => {
            const del = await destroy(postgres(req), req.params.id)

            res.status = 200
            res.json(del)
        })
        .put('/registrations/:id', async(req, res) => {
            const data = req.body

            const update = await edit(postgres(req), data, req.params.id)

            res.status = 200
            res.json(update)
        })
}