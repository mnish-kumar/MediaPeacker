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
    <div className="w-full flex flex-col items-center justify-center space-y-10 my-12 fade-in">
      <div className="text-center space-y-4 max-w-2xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x tracking-tight">
          MediaPeacker
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light">
          Your go-to hub for <span className="text-blue-400 font-medium">photos</span>, <span className="text-purple-400 font-medium">GIFs</span>, and <span className="text-pink-400 font-medium">videos</span>.
        </p>
      </div>

      <div className="w-full max-w-xl relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <input
          type="text"
          className="relative w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white placeholder-slate-500 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent shadow-xl text-lg transition-all"
          placeholder="Search for something amazing..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {[
          { id: 'photos', label: 'Photos', color: 'from-blue-500 to-blue-600' },
          { id: 'gifs', label: 'GIFs', color: 'from-purple-500 to-purple-600' },
          { id: 'videos', label: 'Videos', color: 'from-pink-500 to-pink-600' }
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => handleSearch(type.id)}
            disabled={loading}
            className={`
              relative px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-lg cursor-pointer
              ${activeType === type.id 
                ? `bg-gradient-to-r ${type.color} text-white ring-2 ring-white/20 ring-offset-2 ring-offset-slate-950 scale-105` 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/5'}
            `}
          >
            {loading && activeType === type.id ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Loading...
               </span>
            ) : (
              type.label.toUpperCase()
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
