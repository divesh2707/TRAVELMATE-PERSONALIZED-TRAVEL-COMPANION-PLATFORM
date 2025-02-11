import pool from '../config/db.js'; // Assuming you have your DB pool configured

// Function to add a famous place
export const addFamousPlace = async (city_id, place_name, place_description, image) => {
  const query = `
    INSERT INTO famous_places (city_id, place_name, place_description, image)
    VALUES ($1, $2, $3, $4) RETURNING id
  `;
  const values = [city_id, place_name, place_description, image];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0].id; // Return the ID of the newly inserted famous place
  } catch (error) {
    throw new Error(`Error adding famous place: ${error.message}`);
  }
};


export const getFamousPlacesByCityId = async (city_id) => {
    const query = `SELECT * FROM famous_places WHERE city_id = $1`;
    const values = [city_id];
  
    try {
      const { rows } = await pool.query(query, values);
  
      if (rows.length === 0) {
        throw new Error('No famous places found for this city');
      }
  
      return rows; // Return all famous places for the city
    } catch (error) {
      throw new Error(`Error fetching famous places: ${error.message}`);
    }
  };