import { useEffect, useState } from "react";
import config from "../../config";

const AmenitiesSection = () => {
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/amenities?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch amenities");
        }
        const result = await response.json();
        setAmenities(result.amenities.amenities);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="AmenitiesSection" className="bg-[#f8f9fa] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#09305d] text-center mb-10">
          Our Amenities
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center gap-6 p-5 border-l-4 border-[#cf6615] bg-white shadow-lg rounded-md transition-transform transform hover:scale-105"
            >
              <img
                src={amenity.property_amenities_photo}
                alt={amenity.amenity_name}
                className="w-20 h-20 object-cover rounded-md border-2 border-[#09305d]"
              />
              <h3 className="text-xl font-semibold text-[#09305d]">{amenity.amenity_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;