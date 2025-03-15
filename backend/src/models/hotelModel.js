import pool from '../config/db.js';

export const createHotel = async (city_id, hotel_name, hotel_description, price_per_night, hotel_category, images) => {
    const image_1 = images[0] || null;
    const image_2 = images[1] || null;
    const image_3 = images[2] || null;
  const query = `
    INSERT INTO hotels (city_id, hotel_name, hotel_description, price_per_night, hotel_category, image_1, image_2, image_3)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
  `;
  const values = [city_id, hotel_name, hotel_description, price_per_night, hotel_category, image_1,image_2,image_3];
  const { rows } = await pool.query(query, values);
  return rows[0].id;
};


export const getHotelsByCategory = async (category) => {
    try {
      const query = `SELECT * FROM hotels WHERE hotel_category = $1`;
      const values = [category];
  
      const { rows } = await pool.query(query, values);
  
      if (rows.length === 0) {
        throw new Error('No hotels found for this category');
      }
  
      return rows;
    } catch (error) {
      throw new Error(`Error fetching hotels: ${error.message}`);
    }
  };

  // Fetch hotels by city_id and category
export const getHotelsByCityAndCategory = async (city_id, hotel_category) => {
    const query = `
        SELECT * FROM hotels WHERE city_id = $1 AND hotel_category = $2;
    `;
    const values = [city_id, hotel_category];
    const { rows } = await pool.query(query, values);
    return rows;
};

export const getHotelsByCityId = async (city_id) => {
  const query = `
      SELECT * FROM hotels WHERE city_id = $1 ;
  `;
  const values = [city_id];
  const { rows } = await pool.query(query, values);
  return rows;
};



export const deleteHotel = async (hotel_id) => {
  const query = 'DELETE FROM hotels WHERE id = $1 RETURNING id';
  const values = [hotel_id];
  const { rows } = await pool.query(query, values);
  return rows[0].id;
};


// Update hotel details by hotel_id
export const updateHotel = async (hotel_id, city_id, hotel_name, hotel_description, price_per_night, hotel_category, images) => {
    // Set image values to null if no new image is provided
    const image_1 = images[0] || null;
    const image_2 = images[1] || null;
    const image_3 = images[2] || null;

    // Build dynamic query
    let query = `UPDATE hotels SET `;
    let values = [];
    let valueIndex = 1;

    // Check each column and only include it in the query if it's not null or undefined
    if (city_id !== undefined) {
        query += `city_id = $${valueIndex}, `;
        values.push(city_id);
        valueIndex++;
    }
    if (hotel_name !== undefined) {
        query += `hotel_name = $${valueIndex}, `;
        values.push(hotel_name);
        valueIndex++;
    }
    if (hotel_description !== undefined) {
        query += `hotel_description = $${valueIndex}, `;
        values.push(hotel_description);
        valueIndex++;
    }
    if (price_per_night !== undefined) {
        query += `price_per_night = $${valueIndex}, `;
        values.push(price_per_night);
        valueIndex++;
    }
    if (hotel_category !== undefined) {
        query += `hotel_category = $${valueIndex}, `;
        values.push(hotel_category);
        valueIndex++;
    }
    if (image_1 !== null) {
        query += `image_1 = $${valueIndex}, `;
        values.push(image_1);
        valueIndex++;
    }
    if (image_2 !== null) {
        query += `image_2 = $${valueIndex}, `;
        values.push(image_2);
        valueIndex++;
    }
    if (image_3 !== null) {
        query += `image_3 = $${valueIndex}, `;
        values.push(image_3);
        valueIndex++;
    }

    // Remove the last comma and space
    query = query.slice(0, -2);

    // Add the WHERE condition
    query += ` WHERE id = $${valueIndex} RETURNING id`;

    // Add the hotel_id value
    values.push(hotel_id);

    try {
        const { rows } = await pool.query(query, values);
        return rows[0].id; // Return the updated hotel id
    } catch (error) {
        throw new Error(`Error updating hotel: ${error.message}`);
    }
};
