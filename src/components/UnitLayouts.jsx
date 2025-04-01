import React, { useEffect, useState } from "react";
import config from "../../config";

const UnitLayouts = () => {
  const [layouts, setLayouts] = useState([]);
  const [heading, setHeading] = useState("Unit Layouts");

  useEffect(() => {
    fetch(`${config.API_URL}/unit-layout?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data?.page?.[0]?.heading || "Unit Layouts");
        setLayouts(data?.unit_layout || []);
      })
      .catch((error) => console.error("Error fetching unit layouts:", error));
  }, []);

  return (
    <section id="UnitLayouts" className="bg-gray-100 py-16 px-5">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">{heading}</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>

      {layouts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <p className="text-gray-700 text-lg">
            No unit layouts available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-full h-60 rounded-lg overflow-hidden relative">
                <img
                  src={layout.layout_image?.replace("//uploads", "/uploads")}
                  alt={layout.layout_name}
                  className="w-full h-full object-cover blur-sm hover:blur transition-all duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Layout+Image";
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mt-4">
                {layout.layout_name}
              </h3>
              <p className="text-gray-700 text-sm mb-4 text-center">
                {layout.unit_layout_heading || ""}
              </p>
              <span className="px-4 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                Carpet Area: {layout.unit_layout_carpet_area || "N/A"} sq.ft
              </span>
              <a
                href="#contact"
                className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 rounded-lg transition-all duration-200 text-sm font-medium animate-pulse"
              >
                Inquire About This Unit
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UnitLayouts;
