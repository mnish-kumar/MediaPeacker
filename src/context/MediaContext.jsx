import { createContext, useContext, useState, useEffect } from "react";
import { fetchGIF, PexelsVideos, UnsplashPhotos } from "../api/media.api";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [mediaType, setMediaType] = useState("photos");
  const [mediaData, setMediaData] = useState([]);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMedia = async () => {
    if (loading || page > totalPages || !query) return;

    setLoading(true);

    let data;

    if (mediaType === "photos") {
      data = await UnsplashPhotos(query, page);
      setMediaData((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setTotalPages(data.total_pages);
    }

    if (mediaType === "gifs") {
      data = await fetchGIF(query, page);
      setMediaData((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setTotalPages(data.total_pages || 50);
    }

    if (mediaType === "videos") {
      data = await PexelsVideos(query, page);
      setMediaData((prev) =>
        page === 1 ? data.videos : [...prev, ...data.videos]
      );
      setTotalPages(50);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!query) return;
    fetchMedia();
  }, [page, query, mediaType]);

  const startSearch = (searchQuery, type) => {
    setQuery(searchQuery);
    setMediaType(type);
    setMediaData([]);
    setPage(1);
    setTotalPages(1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <MediaContext.Provider
      value={{
        mediaType,
        mediaData,
        loading,
        loadMore,
        startSearch,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => useContext(MediaContext);
