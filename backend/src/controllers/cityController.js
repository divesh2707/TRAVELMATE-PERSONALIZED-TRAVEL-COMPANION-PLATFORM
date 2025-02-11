import { createCity, getCityById, getCityIdByName } from '../models/cityModel.js';

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
  const {city_name}= req.params;

  try{
    const cityId = await getCityIdByName(city_name);
    if (!cityId) {
      return res.status(404).json({ error: 'City name not found' });
    }
    res.status(200).json(cityId);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch city name' });
  }

}