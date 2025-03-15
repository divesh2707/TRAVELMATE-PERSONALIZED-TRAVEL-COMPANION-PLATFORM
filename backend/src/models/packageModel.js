import pool from '../config/db.js';

export const createPackage = async (city_id, no_of_days, package_description, package_cost) => {
    const query = `
        INSERT INTO packages (city_id, no_of_days, package_description, package_cost)
        VALUES ($1, $2, $3, $4) RETURNING id;
    `;
    const values = [city_id, no_of_days, package_description, package_cost];
    const { rows } = await pool.query(query, values);
    return rows[0].id;
};

// Fetch package by city_id
export const getPackagesByCityId = async (city_id) => {
    const query = `
        SELECT * FROM packages WHERE city_id = $1;
    `;
    const values = [city_id];
    const { rows } = await pool.query(query, values);
    return rows;
};

export const updatePackage = async (package_id, city_id, no_of_days, package_description, package_cost) => {
    let query = `UPDATE packages SET `;
    let values = [];
    let valueIndex = 1;

    // Check each column and only include it in the query if it's defined
    if (city_id !== undefined) {
        query += `city_id = $${valueIndex}, `;
        values.push(city_id);
        valueIndex++;
    }
    if (no_of_days !== undefined) {
        query += `no_of_days = $${valueIndex}, `;
        values.push(no_of_days);
        valueIndex++;
    }
    if (package_description !== undefined) {
        query += `package_description = $${valueIndex}, `;
        values.push(package_description);
        valueIndex++;
    }
    if (package_cost !== undefined) {
        query += `package_cost = $${valueIndex}, `;
        values.push(package_cost);
        valueIndex++;
    }

    // Remove the last comma and space
    query = query.slice(0, -2);

    // Add the WHERE condition
    query += ` WHERE id = $${valueIndex} RETURNING id`;

    // Add the package_id value
    values.push(package_id);

    try {
        const { rows } = await pool.query(query, values);
        return rows[0].id; // Return the updated package id
    } catch (error) {
        throw new Error(`Error updating package: ${error.message}`);
    }
};


export const getCityIdByPackageid = async (package_id) => {
    const query =`Select city_id from packages where id= $1`;
    const values=[package_id];
    const {rows} = await pool.query(query, values);
    return rows[0];
}