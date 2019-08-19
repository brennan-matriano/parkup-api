export const schema = {
    create: [`
        CREATE TABLE registrations(
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
    drop: [`DROP TABLE IF EXISTS registrations`]
}

export async function getAll(pg){
    return pg.rows(`SELECT * FROM registrations`)
}

export async function insert(pg, data){
    const { first_name, last_name, unit, category, year_level, section, birthdate, gender, 
            address, province, city, barangay, zipcode, email, landline, mobile_number, 
            receipt_no, receipt_date, car_details, driver_details, sibling_details, ls_idnum } = data;

    return pg.rows(
        `INSERT INTO registrations(first_name, last_name, unit, category, year_level, section, 
                    birthdate, gender, address, province, city, barangay, zipcode, email, 
                    landline, mobile_number, receipt_no, receipt_date, car_details, 
                    driver_details, sibling_details, ls_idnum) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                    $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
            first_name, last_name, unit, category, year_level, section, birthdate, 
            gender, address, province, city, barangay, zipcode, email, landline, mobile_number, 
            receipt_no, receipt_date, car_details, driver_details, sibling_details, ls_idnum
    );
}

export async function getOne(pg, id){
    return pg.rows(`SELECT * FROM registrations WHERE id = $1`, id)
}

export async function destroy(pg, id){
    return pg.rows(`DELETE FROM registrations WHERE id = $1`, id)
}

export async function edit(pg, data, id){
    const { first_name, last_name, unit, category, year_level, section, birthdate, gender, 
        address, province, city, barangay, zipcode, email, landline, mobile_number, 
        receipt_no, receipt_date, car_details, driver_details, sibling_details, ls_idnum} = data
    return pg.rows(
        `UPDATE registrations set first_name = ($1), last_name = ($2), unit = ($3), category = ($4),
                 year_level = ($5), section = ($6), birthdate = ($7), gender = ($8), address = ($9),
                 province = ($10), city = ($11), barangay = ($12), zipcode = ($13), email = ($14),
                 landline = ($15), mobile_number = ($16), receipt_no = ($17), receipt_date = ($18),
                 car_details = ($19), driver_details = ($20), sibling_details = ($21), ls_idnum = ($22)
                 WHERE id = ($23)`,
        first_name, last_name, unit, category, year_level, section, birthdate, gender, 
        address, province, city, barangay, zipcode, email, landline, mobile_number, 
        receipt_no, receipt_date, car_details, driver_details, sibling_details, ls_idnum, id
    )
}

