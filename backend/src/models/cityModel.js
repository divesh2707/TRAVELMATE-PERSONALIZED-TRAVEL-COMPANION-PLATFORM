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
  const query = `
    SELECT id, city_name,
           similarity(city_name, $1) AS trigram_sim,
           levenshtein(city_name, $1) AS edit_distance
    FROM cities
    WHERE city_name % $1  -- Trigram-based fuzzy matching
    ORDER BY edit_distance ASC, trigram_sim DESC, city_name <-> $1 ASC
    LIMIT 5;
  `;

  const values = [city_name]; // No need for % wildcard with pg_trgm

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error fetching city ID by name:", err);
    return null;
  }
};


// models/cityModel.js
export const deleteCityById = async (city_id) => {
  const query = 'DELETE FROM cities WHERE id = $1 RETURNING id';
  const values = [city_id];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0]?.id; // Returns the deleted city id if successful, otherwise undefined
  } catch (error) {
    console.error('Error deleting city:', error);
    throw error;
  }
};


// models/cityModel.js
export const updateCity = async (city_id, city_name, state, country, imageBuffer) => {
  let query = 'UPDATE cities SET ';
  const values = [];
  let index = 1;

  if (city_name) {
    query += `city_name = $${index++}, `;
    values.push(city_name);
  }
  if (state) {
    query += `state = $${index++}, `;
    values.push(state);
  }
  if (country) {
    query += `country = $${index++}, `;
    values.push(country);
  }
  if (imageBuffer) {
    query += `image = $${index++}, `;
    values.push(imageBuffer);
  }

  // Remove the trailing comma and space
  query = query.slice(0, -2);

  query += ` WHERE id = $${index} RETURNING id, city_name, state, country, image`;
  values.push(city_id);

  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return updated city data
  } catch (error) {
    console.error('Error updating city:', error);
    throw error;
  }
};


export const getAllCities = async () => {
  const query = 'SELECT id, city_name, image FROM cities' ;
  const  { rows }  = await pool.query(query);
  return rows;
};