import { useEffect, useState } from "react";
import { useMediaContext } from "../context/MediaContext.jsx";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeType, setActiveType] = useState("");
  const { startSearch, loading } = useMediaContext();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (type) => {
    const value = inputValue.trim();
    if (!value) return;
    setActiveType(type);
    startSearch(value, type);
  };

  useEffect(() => {
    if (!loading) {
      setActiveType("");
    }
  }, [loading]);

  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold text-gray-700">MediaPeacker</h1>
        <p className=" text-gray-600">
          Welcome to MediaPeacker, your go-to app for media management!
        </p>

        <input
          type="text"
          className="mt-4 p-2 border border-gray-300 rounded-lg w-1/2 "
          placeholder="Search for photos, GIFs, or videos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-green-400 py-1 px-2 font-medium rounded-2xl hover:bg-gray-600 text-white cursor-pointer"
          onClick={() => handleSearch("photos")}
          disabled={loading}
        >
          {loading && activeType === "photos" ? "Loading..." : "GET PHOTOS"}
        </button>

        <button
          className="bg-green-400 py-1 px-2 font-medium rounded-2xl hover:bg-gray-600 text-white cursor-pointer"
          onClick={() => handleSearch("gifs")}
          disabled={loading}
        >
          {loading && activeType === "gifs" ? "Loading..." : "GET GIFS"}
        </button>

        <button
          className="bg-green-400 py-1 px-2 font-medium rounded-2xl hover:bg-gray-600 text-white cursor-pointer"
          onClick={() => handleSearch("videos")}
          disabled={loading}
        >
          {loading && activeType === "videos" ? "Loading..." : "GET VIDEOS"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
