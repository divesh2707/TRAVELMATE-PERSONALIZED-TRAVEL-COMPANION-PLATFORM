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
