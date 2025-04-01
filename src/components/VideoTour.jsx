// import React, { useState, useEffect } from "react";
// import config from "../../config";

// const VideoTour = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await fetch(`${config.API_URL}/video?website=${config.SLUG_URL}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch video data");
//         }

//         const data = await response.json();
//         setVideos(data.property_videos || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   // If loading or there's an error, return nothing
//   if (loading || error) return null;

//   // Check if a valid video ID exists
//   const validVideo = videos.length > 0 && videos[0]?.youtube_video_id;

//   // If no valid video, remove the entire section
//   if (!validVideo) return null;

//   return (
//     <div className="relative w-full md:h-screen h-64 flex items-center justify-center bg-black text-white">
//       <iframe
//         src={`https://www.youtube.com/embed/${videos[0].youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${videos[0].youtube_video_id}`}
//         title="Property Tour"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="w-full h-full object-cover"
//       ></iframe>
//     </div>
//   );
// };

// export default VideoTour;

import React, { useState, useEffect } from "react";
import config from "../../config";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.API_URL}/video?website=${config.SLUG_URL}`);

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setVideos(data.property_videos || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading || error || videos.length === 0 || !videos[0]?.youtube_video_id) return null;

  return (
    <div className="relative w-full flex items-center justify-center bg-white text-white px-5">
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Video */}
        <iframe
          src={`https://www.youtube.com/embed/${videos[0].youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${videos[0].youtube_video_id}`}
          title="Property Tour"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full aspect-video rounded-2xl"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoTour;
