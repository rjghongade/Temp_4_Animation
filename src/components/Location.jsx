import React, { useState, useEffect } from "react";
import config from "../../config";

const Location = () => {
  const [locationData, setLocationData] = useState({
    heading: "",
    subheading: null,
    map: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-map?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <section className="bg-[#f8f9fa] py-12 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-[#09305d] text-xl font-semibold">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-xl font-semibold">{error}</p>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#09305d] mb-4">{locationData.heading}</h2>
            {locationData.subheading && (
              <p className="text-lg text-[#36322e] mb-6">{locationData.subheading}</p>
            )}
            <div
              className="w-full h-[450px] mt-6 rounded-lg overflow-hidden shadow-lg"
              dangerouslySetInnerHTML={{ __html: locationData.map }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Location;