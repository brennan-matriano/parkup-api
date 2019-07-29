export const schema = {
    create: [`
        CREATE TABLE cars(
            id BIGSERIAL PRIMARY KEY,
            make VARCHAR(50) NOT NULL,
            model VARCHAR(50) NOT NULL,
            color VARCHAR(50) NOT NULL,
            reg_year VARCHAR(50) NOT NULL,
            plate VARCHAR(50) NOT NULL,
            conduction_no VARCHAR(50) NOT NULL,
            special_plate VARCHAR(50) NOT NULL,
            engine_type VARCHAR(50) NOT NULL
        )`],
    drop: [`DROP TABLE IF EXISTS cars`]
}

export async function getAll(pg){
    return pg.rows(`SELECT * FROM cars`)
}

