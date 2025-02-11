import { createHotel, getHotelsByCategory, getHotelsByCityAndCategory} from '../models/hotelModel.js';

export const addHotel = async (req, res) => {
    
  const { city_id, hotel_name, hotel_description, price_per_night, hotel_category } = req.body;

  const images = [req.files[0].buffer, req.files[1].buffer, req.files[2].buffer];

  try {
    const hotelId = await createHotel(city_id, hotel_name, hotel_description, price_per_night, hotel_category, images);
    res.status(201).json({ message: 'Hotel added successfully', hotelId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add hotel' });
  }
};


export const fetchHotelsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const hotels = await getHotelsByCategory(category);
    res.status(200).json(hotels); // Send the list of hotels back in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch hotels: ${error.message}` });
  }
};


export const fetchHotelsByCityAndCategory = async (req, res) => {
    const { city_id, hotel_category } = req.params;

    try {
        const hotels = await getHotelsByCityAndCategory(city_id, hotel_category);
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
};