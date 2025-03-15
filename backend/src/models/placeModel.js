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

  export const updateFamousPlace = async (place_id, city_id, place_name, place_description, image) => {
    // Set image value to null if no new image is provided
    const newImage = image || null;

    // Build dynamic query
    let query = `UPDATE famous_places SET `;
    let values = [];
    let valueIndex = 1;
    
    // Check each column and only include it in the query if it's not null or undefined
    if (city_id !== undefined) {
        query += `city_id = $${valueIndex}, `;
        values.push(city_id);
        valueIndex++;
    }
    if (place_name !== undefined) {
        query += `place_name = $${valueIndex}, `;
        values.push(place_name);
        valueIndex++;
    }
    if (place_description !== undefined) {
        query += `place_description = $${valueIndex}, `;
        values.push(place_description);
        valueIndex++;
    }
    if (image !== null) {
        query += `image = $${valueIndex}, `;
        values.push(newImage);
        valueIndex++;
    }

    // Remove the last comma and space
    query = query.slice(0, -2);
    
    // Add the WHERE condition
    query += ` WHERE id = $${valueIndex} RETURNING id`;

    // Add the place_id value
    values.push(place_id);

    

    try {
        const { rows } = await pool.query(query, values);
        return rows[0].id; // Return the updated place id
    } catch (error) {
        throw new Error(`Error updating famous place: ${error.message}`);
    }
};


export const deleteFamousPlace = async (place_id) => {
  const query = `DELETE FROM famous_places WHERE id = $1 RETURNING id`;
  const values = [place_id];

  try {
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error('No famous place found with the given ID');
    }

    return rows[0].id; // Return the ID of the deleted famous place
  } catch (error) {
    throw new Error(`Error deleting famous place: ${error.message}`);
  }
};
