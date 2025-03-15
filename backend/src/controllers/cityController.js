import { createCity, getCityById, getCityIdByName, deleteCityById, updateCity, getAllCities } from '../models/cityModel.js';

export const addCity = async (req, res) => {
  try {
    
    const { city_name, state, country } = req.body;
    const imageBuffer = req.file.buffer;
    const cityId = await createCity(city_name, state, country, imageBuffer);
    res.status(201).json({ message: 'City added successfully', cityId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add city' });
  }
};

export const getCity = async (req, res) => {
  const { city_id } = req.params; // Retrieve the city_id from URL parameters

  try {
    const city = await getCityById(city_id);

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.status(200).json(city); // Return the city data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
};

export const fetchCityIdByName= async(req, res)=>{
  const { name } = req.params;
  if (!name) return res.status(400).json({ error: "City name is required" });

  try {
    const cities = await getCityIdByName(name);
    if (!cities || cities.length === 0) {
      return res.status(404).json({ message: "No matching cities found" });
    }
    res.json(cities);
  } catch (err) {
    console.error("Error in search route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// controllers/cityController.js


export const deleteCityController = async (req, res) => {
  const { city_id } = req.params;

  try {
    const cityId = await deleteCityById(city_id);
    if (cityId) {
      return res.status(200).json({ message: `City with ID ${cityId} deleted successfully.` });
    } else {
      return res.status(404).json({ message: 'City not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting city.' });
  }
};


export const updateCityController = async (req, res) => {
  const { city_id } = req.params;
  const { city_name, state, country } = req.body;
  const image = req.file ? req.file.buffer : null; // Assuming the image is uploaded as part of the request

  try {
    const updatedCity = await updateCity(city_id, city_name, state, country, image);
    if (updatedCity) {
      return res.status(200).json({ message: 'City updated successfully.', city: updatedCity });
    } else {
      return res.status(404).json({ message: 'City not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating city.' });
  }
};

export const fetchAllCities = async (req, res) => {
   // Retrieve the city_id from URL parameters

  try {
    const cities = await getAllCities();

    if (!cities) {
      return res.status(404).json({ error: 'Cities not found' });
    }

    res.status(200).json(cities); // Return the city data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
};