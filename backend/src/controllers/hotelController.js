import { createHotel, getHotelsByCategory, getHotelsByCityAndCategory, updateHotel, deleteHotel, getHotelsByCityId} from '../models/hotelModel.js';

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

export const fetchHotelsByCityID = async (req, res) => {
  const { city_id } = req.params;

  try {
      const hotels = await getHotelsByCityId(city_id);
      res.status(200).json(hotels);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};



// Controller to update hotel details
export const updateHotelDetails = async (req, res) => {
    const { city_id, hotel_name, hotel_description, price_per_night, hotel_category } = req.body;
    const hotel_id = parseInt(req.params.hotel_id);
    const images = [
      req.files && req.files[0] ? req.files[0].buffer : null,  // image_1
      req.files && req.files[1] ? req.files[1].buffer : null,  // image_2
      req.files && req.files[2] ? req.files[2].buffer : null   // image_3
  ];
    try {
        const updatedHotelId = await updateHotel(hotel_id, city_id, hotel_name, hotel_description, price_per_night, hotel_category, images);
        res.status(200).json({ message: 'Hotel updated successfully', hotelId: updatedHotelId });
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({ error: 'Failed to update hotel' });
    }
};

// Controller to delete a hotel
export const deleteHotelById = async (req, res) => {
    const { hotel_id } = req.params;

    try {
        const deletedHotelId = await deleteHotel(hotel_id);
        res.status(200).json({ message: 'Hotel deleted successfully', hotelId: deletedHotelId });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ error: 'Failed to delete hotel' });
    }
};
