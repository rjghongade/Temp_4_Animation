import { useEffect, useState } from "react";
import config from "../../config";

const PropertyDescription = () => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/propert-details?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => setProperty(data.property_details))
      .catch((error) => console.error("Error fetching property details:", error));
  }, []);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
        <p className="text-center text-[#7daa71]">Loading property description...</p>
      </div>
    );
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="featured" className="bg-[#f8f9fa] text-[#36322e] py-8 px-4 sm:px-8 md:px-16">
      <h2 className="text-4xl font-bold text-[#09305d] mb-6 text-center sm:text-left">
        About the Property
      </h2>

      <div className="mt-6 sm:mt-8">
        <div className="p-8 bg-[#09305d] text-white rounded-lg shadow-lg border border-[#7daa71]">
          <div className="text-[#e0e0e0] max-h-96 overflow-y-auto property-content p-4">
            <div dangerouslySetInnerHTML={{ __html: property.property_description }} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
          className="px-8 py-4 bg-[#cf6615] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#7daa71] transition-all duration-300"
        >
          Contact Us
        </button>
      </div>

      <style jsx>{`
        .property-content h1 {
          font-size: 24px;
          margin-bottom: 18px;
          font-weight: bold;
          color: #d1b578;
        }
        
        .property-content h2 {
          font-size: 20px;
          margin-top: 22px;
          margin-bottom: 12px;
          font-weight: bold;
          color: #d1b578;
        }
        
        .property-content p {
          margin-bottom: 16px;
          color: #e0e0e0;
          line-height: 1.6;
        }
        
        .property-content strong {
          font-weight: bold;
          color: #d1b578;
        }
      `}</style>
    </div>
  );
};

export default PropertyDescription;