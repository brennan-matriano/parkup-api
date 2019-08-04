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

export async function insert(pg, data){
    const { id, make, model, color, reg_year, plate, conduction_no, special_plate, engine_type } = data
    return pg.rows(
        `INSERT INTO cars( id, make, model, color, reg_year, plate, conduction_no, special_plate, engine_type) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
            id, make, model, color, reg_year, plate, conduction_no, special_plate, engine_type
    )
}

export async function getOne(pg, id){
    return pg.rows(`SELECT * FROM cars WHERE id = $1`, id)
}

export async function destroy(pg, id){
    return pg.rows(`DELETE FROM cars WHERE id = $1`, id)
}

export async function edit(pg, data, id){
    const { id, make, model, color, reg_year, plate, conduction_no, special_plate, engine_type } = data
    return pg.rows(
        `UPDATE cars set make = ($1), model = ($2), color = $(3), reg_year = $(4), plate = $(5), conduction_no = ($6), special_plate($7), engine_type($8) WHERE id = $(9)`,
            id, make, model, color, reg_year, plate, conduction_no, special_plate, engine_type
    )
}

