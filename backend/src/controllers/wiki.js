import axios from 'axios';

// Function to get tourism-related details of a city from Wikipedia
export const getTourismDetailsForCity = async (cityName) => {
  try {
    // Search for the city and tourism info on Wikipedia
    const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: 'Tourism in '+ cityName ,  // Search for city + tourism info
        format: 'json',
      },
    });

    const searchResults = searchResponse.data.query.search;
    if (searchResults.length === 0) {
      return `No tourism-related information found for ${cityName}.`;
    }

    // Get the first result's title (the page that is most likely related to tourism)
    const pageTitle = searchResults[0].title;

    // Get the summary or content of the city page
    const summaryResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        prop: 'extracts',
        exintro: true,  // Get the introduction section
        titles: pageTitle,
        format: 'json',
      },
    });

    const pages = summaryResponse.data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === '-1') {
      return `No page found for ${cityName}.`;
    }

    // Return the summary (intro section)
    return pages[pageId].extract;
  } catch (error) {
    console.error(error);
    return 'Error fetching tourism details.';
  }
};
// const cityTourismInfo = await getTourismDetailsForCity("Mumbai");
// console.log(cityTourismInfo); // Logs tourism-related details for Paris

