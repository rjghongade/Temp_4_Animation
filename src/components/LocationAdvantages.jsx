import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-advantages?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const locationAdvantages = data?.location_advantages || [];
  const heading = data?.page?.[0]?.heading || "Location Highlights";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locationAdvantages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [locationAdvantages]);

  return (
    <div className="bg-[#09305d] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#cf6615] mb-8 uppercase">{heading}</h2>
        <div className="relative bg-[#f8f9fa] p-8 rounded-lg shadow-lg border border-[#7daa71]">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + locationAdvantages.length) % locationAdvantages.length)}
              className="p-3 rounded-full bg-[#36322e] hover:bg-[#7daa71] text-[#e0e0e0] shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % locationAdvantages.length)}
              className="p-3 rounded-full bg-[#36322e] hover:bg-[#7daa71] text-[#e0e0e0] shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center bg-[#cf6615] rounded-full shadow-lg mb-4">
              <MapPin size={40} className="text-[#f8f9fa]" />
            </div>
            <h4 className="text-2xl font-semibold text-[#09305d]">{locationAdvantages[currentIndex]?.location}</h4>
            <p className="text-[#36322e] text-md font-medium">{locationAdvantages[currentIndex]?.distance}</p>
            <p className="text-[#09305d] text-center mt-4 text-lg max-w-2xl">{locationAdvantages[currentIndex]?.description}</p>
            <a href="#" className="text-[#cf6615] flex items-center mt-6 hover:underline">
              View on map <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {locationAdvantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-4 w-4 mx-1 rounded-full transition-all ${currentIndex === index ? "bg-[#cf6615] scale-125" : "bg-[#e0e0e0]"}`}
            />
          ))}
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LocationAdvantages;
