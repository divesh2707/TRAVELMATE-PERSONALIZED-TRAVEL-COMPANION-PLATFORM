import pool from '../config/db.js'

export const createCity = async (city_name, state, country, imageBuffer) => {
  const query = 'INSERT INTO cities (city_name, state, country, image) VALUES ($1, $2, $3, $4) RETURNING id';
  const values = [city_name, state, country, imageBuffer];
  const { rows } = await pool.query(query, values);
  return rows[0].id;
};

export const getCityById = async (city_id) => {
  const query = 'SELECT * FROM cities WHERE id = $1';
  const values = [city_id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the city data if found
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

export const getCityIdByName = async (city_name) => {
  const query = 'SELECT id FROM cities WHERE LOWER(city_name) = LOWER($1)';
  const values = [city_name];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error fetching city ID by name:", err);
    return null;
  }
};