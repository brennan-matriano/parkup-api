export const schema = {
    create: [`
        CREATE TABLE registration(
            id BIGSERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            category VARCHAR(50) NOT NULL,
            year_level VARCHAR(50) NOT NULL,
            section VARCHAR(50) NOT NULL,
            birthdate VARCHAR(50) NOT NULL,
            gender VARCHAR(50) NOT NULL,
            address VARCHAR(50) NOT NULL,
            province VARCHAR(50) NOT NULL,
            city VARCHAR(50) NOT NULL,
            barangay VARCHAR(50) NOT NULL,
            zipcode INT,
            email VARCHAR(50) NOT NULL,
            landline VARCHAR(50) NOT NULL,
            mobile_number VARCHAR(50) NOT NULL,
            receipt_no VARCHAR(50) NOT NULL,
            receipt_date VARCHAR(50) NOT NULL,
            car_details jsonb,
            driver_details jsonb,
            sibling_details jsonb,
            ls_idnum VARCHAR(50) NOT NULL
        )`],
    drop: [`DROP TABLE IF EXISTS registration`]
}

export async function getAll(pg){
    return pg.rows(`SELECT * FROM registration`)
}

export async function insert(pg, data){
    const {make, model, color, reg_year, plate, conduction_no, special_plate, engine_type } = data
    return pg.rows(
        `INSERT INTO registration(make, model, color, reg_year, plate, conduction_no, special_plate, engine_type) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
            make, model, color, reg_year, plate, conduction_no, special_plate, engine_type
    )
}

export async function getOne(pg, id){
    return pg.rows(`SELECT * FROM registration WHERE id = $1`, id)
}

export async function destroy(pg, id){
    return pg.rows(`DELETE FROM registration WHERE id = $1`, id)
}

export async function edit(pg, data, id){
    const {make, model, color, reg_year, plate, conduction_no, special_plate, engine_type } = data
    return pg.rows(
        `UPDATE registration set make = ($1), model = ($2), color = $(3), reg_year = $(4), plate = $(5), conduction_no = ($6), special_plate($7), engine_type($8) WHERE id = $(9)`,
           make, model, color, reg_year, plate, conduction_no, special_plate, engine_type
    )
}

