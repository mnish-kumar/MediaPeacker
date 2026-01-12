const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_API_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;



export const UnsplashPhotos = async (query, page) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30`,
    {
        // params: {
        //   per_page: 100,
        // },
        method: "GET",
        headers: {
          Authorization: `Client-ID ${UNSPLASH_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching photos from Unsplash:", error.message);
    throw error;
  }
};



export const fetchGIF = async (query, page) => {
  try {
    const limit = 12;
    const params = new URLSearchParams({
      key: TENOR_KEY,
      q: query,
      limit: String(limit),
      // Use a simple offset-based pagination derived from page
      pos: String(((page || 1) - 1) * limit),
    });

    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Tenor error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GIFs from Tenor:", error.message);
    throw error;
  }
};



export const PexelsVideos = async (query, page) => {
  try {
    const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&page=${page}&per_page=12`, {
        headers:{
        Authorization: PEXELS_KEY
        }
    });


    if (!response.ok) {
      throw new Error(`Pexels error: ${response.status}`);
    }


    const data = await response.json();
    return data;
  } catch (error) {

    console.error("Error fetching videos from Pexels:", error.message);
    throw error;
  }
};
