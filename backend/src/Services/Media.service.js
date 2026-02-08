// require('dotenv').config({ path: '../../.env' });
const axios = require("axios");

// Search Media Controller
const fetchImage = async (query, page) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30`,
      {
        // params: {
        //   per_page: 100,
        // },
        method: "GET",
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch images", response.status);
    }

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("Error fetching images from Unsplash: " + error.message);
  }
};



const fetchVideo = async (query , page) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/videos/search?query=${query}&page=${page}&per_page=12`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Pexels error: ${response.status}`);
    }

    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("Error fetching videos from API");
  }
};



const fetchGif = async (query, page) => {
  try {
    const limit = 12;
    const params = new URLSearchParams({
      key: process.env.TENOR_API_KEY,
      q: query,
      limit: String(limit),
      // Use a simple offset-based pagination derived from page
      pos: String(((page || 1) - 1) * limit),
    });

    const response = await axios.get(
      `https://tenor.googleapis.com/v2/search?${params.toString()}`,
    );

    if (response.status !== 200) {
      throw new Error(`Tenor error: ${response.status}`);
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching GIFs from Tenor:", error.message);
    throw error;
  }
};



module.exports = {
  fetchImage,
  fetchVideo,
  fetchGif
};