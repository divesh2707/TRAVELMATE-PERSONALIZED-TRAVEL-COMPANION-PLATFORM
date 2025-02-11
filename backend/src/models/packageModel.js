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