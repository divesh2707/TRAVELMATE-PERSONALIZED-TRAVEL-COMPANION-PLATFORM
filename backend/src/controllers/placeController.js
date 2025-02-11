import { addFamousPlace,getFamousPlacesByCityId } from '../models/placeModel.js';

export const addPlace = async (req, res) => {
  const { city_id, place_name, place_description } = req.body;
  const imageBuffer = req.file.buffer; // Assuming image is uploaded using multer

  try {
    const placeId = await addFamousPlace(city_id, place_name, place_description, imageBuffer);
    res.status(201).json({ message: 'Famous place added successfully', placeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to add famous place: ${error.message}` });
  }
};



export const fetchPlacesByCityId = async (req, res) => {
  const { city_id } = req.params;

  try {
    const places = await getFamousPlacesByCityId(city_id);
    res.status(200).json(places); // Send the list of famous places back in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch famous places: ${error.message}` });
  }
};
