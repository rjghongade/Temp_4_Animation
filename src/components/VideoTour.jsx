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

//   if (loading || error || videos.length === 0 || !videos[0]?.youtube_video_id) return null;

//   return (
//     <div className="relative w-full flex items-center justify-center bg-white text-white px-5 mb-4">
//       <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105">
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/30 z-10"></div>

//         {/* Video */}
//         <iframe
//           src={`https://www.youtube.com/embed/${videos[0].youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${videos[0].youtube_video_id}`}
//           title="Property Tour"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           loading="lazy"
//           className="w-full aspect-video rounded-2xl"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default VideoTour;

import React, { useState, useEffect, useRef } from "react";
import config from "../../config";
import { FiMaximize, FiVolume2, FiVolumeX } from "react-icons/fi";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoContainerRef = useRef(null);

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

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getYoutubeEmbedUrl = () => {
    if (!videos[0]?.youtube_video_id) return '';
    
    const videoId = videos[0].youtube_video_id;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=${isMuted ? 1 : 0}&playlist=${videoId}`;
  };

  if (loading || error || videos.length === 0 || !videos[0]?.youtube_video_id) return null;

  return (
    <div className="relative w-full flex items-center justify-center bg-white text-white px-5 mb-4">
      <div 
        ref={videoContainerRef}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105"
      >
        {/* Video */}
        <iframe
          src={getYoutubeEmbedUrl()}
          title="Property Tour"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          className="w-full aspect-video rounded-2xl"
        ></iframe>
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button 
            onClick={toggleMute}
            className="bg-black/70 hover:bg-black p-2 rounded-full transition-colors"
          >
            {isMuted ? <FiVolumeX className="text-white" /> : <FiVolume2 className="text-white" />}
          </button>
          <button 
            onClick={toggleFullscreen}
            className="bg-black/70 hover:bg-black p-2 rounded-full transition-colors"
          >
            <FiMaximize className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTour;
