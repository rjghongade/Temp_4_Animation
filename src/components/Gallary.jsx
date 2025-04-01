import React, { useState, useEffect } from "react";
import config from "../../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("Property Gallery");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layout, setLayout] = useState("grid"); // 'grid' or 'masonry'

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/gallary?website=${config.SLUG_URL}`);

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const data = await response.json();
        const photos = data.property_photos || [];

        if (!Array.isArray(photos)) {
          throw new Error("Invalid data format");
        }

        setImages(photos);
        setHeading(data.page?.[0]?.heading || "Property Gallery");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const toggleLayout = () => {
    setLayout(layout === "grid" ? "masonry" : "grid");
  };

  // Handle keydown events for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <div id="Gallery" className="p-8 min-h-[400px] bg-[#f8f9fa] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-48 h-8 bg-[#09305d]/20 rounded mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#e0e0e0] h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="Gallery" className="p-8 bg-[#f8f9fa]">
        <h1 className="text-3xl font-bold text-[#09305d] text-center mb-6">{heading}</h1>
        <div className="max-w-lg mx-auto p-4 bg-[#cf6615]/10 border border-[#cf6615]/30 rounded-lg text-[#cf6615] text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div id="Gallery" className="p-8 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09305d] to-[#cf6615]">
            {heading}
          </h1>
          
          <button 
            onClick={toggleLayout}
            className="px-4 py-2 bg-[#09305d] text-white rounded-lg hover:bg-[#09305d]/90 transition flex items-center space-x-2"
          >
            <span>{layout === "grid" ? "Masonry View" : "Grid View"}</span>
          </button>
        </div>

        {images.length === 0 ? (
          <p className="text-center text-[#36322e] py-12">No images available</p>
        ) : layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl"
                style={{ height: "240px" }}
              >
                <img
                  src={img.photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  onClick={() => openLightbox(index)}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#09305d]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="p-4 text-white">
                    <p className="font-semibold">View Image</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="break-inside-avoid group relative overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={img.photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full object-cover transition-all duration-500 group-hover:scale-105"
                  onClick={() => openLightbox(index)}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#09305d]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="p-4 text-white">
                    <p className="font-semibold">View Image</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-[#09305d]/95 flex flex-col items-center justify-center z-50 animate-fadeIn">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              className="p-3 bg-[#cf6615] text-white rounded-full hover:bg-[#cf6615]/80 transition" 
              onClick={closeLightbox}
            >
              ✖
            </button>
          </div>

          <div className="relative max-w-[90%] max-h-[85vh] flex items-center">
            <button 
              className="absolute -left-16 p-4 bg-[#cf6615]/80 text-white rounded-full hover:bg-[#cf6615] transition flex items-center justify-center"
              onClick={prevImage}
            >
              ⬅
            </button>
            
            <img 
              src={selectedImage.photo} 
              alt="Lightbox" 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
            
            <button 
              className="absolute -right-16 p-4 bg-[#cf6615]/80 text-white rounded-full hover:bg-[#cf6615] transition flex items-center justify-center"
              onClick={nextImage}
            >
              ➡
            </button>
          </div>
          
          <div className="mt-4 text-white text-center">
            <p className="text-lg">{currentIndex + 1} of {images.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

// Add CSS for animations
const style = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;