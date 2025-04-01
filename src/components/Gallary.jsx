import React, { useState, useEffect } from "react";
import config from "../../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("Property Gallery");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  };

  const closeLightbox = () => {
    setSelectedImage(null);
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

  return (
    <div id="Gallery" className="p-4 bg-[#f8f9fa] mb-14 animate__animated animate__spin animate__slow animate__delay-1s">
      <h1 className="text-3xl font-bold text-[#09305d] text-center mb-6">{heading}</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && images.length === 0 && (
        <p className="text-center text-gray-500">No images available</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.photo}
            alt={`Gallery ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75 transition"
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeLightbox}>
            ✖
          </button>
          <button className="absolute left-4 text-white text-3xl" onClick={prevImage}>
            ⬅
          </button>
          <img src={selectedImage.photo} alt="Lightbox" className="max-w-[90%] max-h-[80%] rounded-lg" />
          <button className="absolute right-4 text-white text-3xl" onClick={nextImage}>
            ➡
          </button>
        </div>
      )}
    </div>
    
  );
};

export default Gallery;
<style jsx>{`
  #Gallery {
    animation-iteration-count: 1;  /* Spins only once */
    animation-duration: 2s;  /* Duration of the spin */
  }
`}</style>