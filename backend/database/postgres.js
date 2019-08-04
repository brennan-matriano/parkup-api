import PgAsync from 'pg-async'
import once from 'once'

async function init(pg, schema) {
    await pg.transaction(async tx => {
        const { drop, create } = schema
        if (drop) {
            for (const q of drop) {
                await tx.query(q);
            }
        }
        if (create) {
            for (const q of create) {
                await tx.query(q);
            }
        }
    });
}

export function postgresMiddleware(schema) {
    const pg = new PgAsync({
        connectionString: "postgres://postgres:postgres@pg:5432/parkup"
    })

    const setupSchema = once(init)
    return async(req, next) => {
        await setupSchema(pg, schema);
        req._postgres = pg;
        return next()
    }
}

export function postgres(req) {
    return req._postgres
}
