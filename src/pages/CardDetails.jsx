import { useMediaContext } from "../context/MediaContext.jsx";

const CardDetails = () => {
  const { mediaData, loadMore, loading, mediaType } = useMediaContext();

  return (
    <div className="mt-16 px-4 md:px-0 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {mediaData.map((items) => {
          let mediaContent = null;

          if (mediaType === "photos") {
            mediaContent = (
              <img
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                src={items.urls.small}
                alt={items.alt_description || "Unsplash Photo"}
              />
            );
          }

          if (mediaType === "gifs") {
            mediaContent = (
              <img
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                src={items.media_formats.gif.url}
                alt="gif"
              />
            );
          }

          if (mediaType === "videos") {
            mediaContent = (
              <video
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                autoPlay muted loop playsInline
              >
                <source src={items.video_files[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          }

          return (
            <div key={items.id} className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm shadow-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 h-72">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300"></div>
              {mediaContent}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <h2 className="text-white text-sm font-semibold uppercase tracking-wide truncate">
                  {items.alt_description || "Untitled Media"}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {mediaData.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg border border-white/5 hover:border-white/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
           {loading ? (
             <>
               <span className="w-2 h-2 rounded-full bg-white animate-bounce"></span>
               <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-100"></span>
               <span className="w-2 h-2 rounded-full bg-white animate-bounce delay-200"></span>
             </>
           ) : "Load More"}
          </button>
        </div>
      )}

      {mediaData.length === 0 && !loading && (
        <div className="text-center mt-20 text-slate-500">
          <p className="text-lg">Start by searching for something amazing above.</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
