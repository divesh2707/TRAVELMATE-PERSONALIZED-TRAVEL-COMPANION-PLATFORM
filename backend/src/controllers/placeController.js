import { addFamousPlace,getFamousPlacesByCityId, deleteFamousPlace, updateFamousPlace } from '../models/placeModel.js';

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


export const updateFamousPlaceDetails = async (req, res) => {
  const { city_id, place_name, place_description } = req.body;
  const place_id = parseInt(req.params.place_id); // Ensure you are passing the correct ID from the URL params
  const image = req.file ? req.file.buffer : null;
  console.log(req.body)
  try {
    const updatedPlaceId = await updateFamousPlace(place_id, city_id, place_name, place_description, image);
    res.status(200).json({ message: 'Famous place updated successfully', placeId: updatedPlaceId });
  } catch (error) {
    console.error('Error updating famous place:', error);
    res.status(500).json({ error: 'Failed to update famous place' });
  }
};

export const deleteFamousPlaceController = async (req, res) => {
  const { place_id } = req.params; // Get place_id from URL parameters

  try {
      const deletedPlaceId = await deleteFamousPlace(place_id);
      res.status(200).json({ message: 'Famous place deleted successfully', placeId: deletedPlaceId });
  } catch (error) {
      console.error('Error deleting famous place:', error);
      res.status(500).json({ error: 'Failed to delete famous place' });
  }
};
