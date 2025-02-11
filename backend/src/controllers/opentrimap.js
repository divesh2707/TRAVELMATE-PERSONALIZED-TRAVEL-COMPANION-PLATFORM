import axios from 'axios';

// Fetch city details and famous places
export const getCityDetails = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required!' });
  }

  try {
    // Step 1: Geocode the city to get coordinates
    const geoResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname`, {
      params: {
        name: city,
        apikey: process.env.OPENTRIPMAP_API_KEY,
      },
    });

    if (!geoResponse.data.lat || !geoResponse.data.lon) {
      return res.status(404).json({ error: 'City not found!' });
    }

    const { lat, lon } = geoResponse.data;

    // Step 2: Fetch famous places using OpenTripMap
    const placesResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
      params: {
        radius: 5000,
        lon,
        lat,
        limit: 10,
        apikey: process.env.OPENTRIPMAP_API_KEY,
      },
    });

    // Extract only name and category
    const places = placesResponse.data.features.map((place) => ({
      name: place.properties.name,
      rating: place.properties.rate,
    }));

    // Step 3: Return the response
    res.json({ city, places });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error!' });
  }
};
