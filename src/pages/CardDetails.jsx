import { useMediaContext } from "../context/MediaContext.jsx";

const CardDetails = () => {
  const { mediaData, loadMore, loading, mediaType } = useMediaContext();

  return (
    <div className="mt-10 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaData.map((items) => {
          let mediaContent = null;

          if (mediaType === "photos") {
            mediaContent = (
              <img
                className="rounded-lg shadow-md h-60 w-full object-cover"
                loading="lazy"
                src={items.urls.small}
                alt={items.alt_description || "Unsplash Photo"}
              />
            );
          }

          if (mediaType === "gifs") {
            mediaContent = (
              <img
                className="rounded-lg shadow-md h-60 w-full object-cover"
                loading="lazy"
                src={items.media_formats.gif.url}
                alt="gif"
              />
            );
          }

          if (mediaType === "videos") {
            mediaContent = (
              <video
                className="rounded-lg shadow-md h-60 w-full object-cover"
                autoPlay muted
              >
                <source src={items.video_files[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          }

          return (
            <div key={items.id} className="flex flex-col">
              {mediaContent}
              <div className="p-1">
                <h2 className="text-sm font-bold uppercase">
                  {items.alt_description}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {mediaData.length > 0 && (
        <div className="flex justify-center my-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded cursor-pointer"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
