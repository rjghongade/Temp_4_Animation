import { useEffect, useState } from "react";
import config from "../../config";

const PropertySpecifications = () => {
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
        <p className="text-center text-[#7daa71] text-lg">Loading builder details...</p>
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
    <div
      id="About_the_Builder"
      className="min-h-screen bg-[#f8f9fa] text-[#36322e] py-8 px-4 sm:px-8 md:px-16 animate__animated animate__fadeIn animate__delay-1s"
    >
      <h2 className="text-3xl font-semibold text-[#09305d] mb-6 text-center sm:text-left property-content-h1 animate__animated animate__fadeIn animate__delay-2s">
        About the Builder
      </h2>

      <div className="mt-6">
        <div className="p-6 bg-[#09305d] text-white rounded-lg shadow-md border border-[#7daa71]">
          <div className="text-[#e0e0e0] max-h-96 overflow-y-auto text-lg leading-relaxed property-content">
            <div dangerouslySetInnerHTML={{ __html: property.property_specification }} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="px-8 py-3 bg-[#cf6615] text-white font-semibold text-lg rounded-lg shadow-md hover:bg-[#7daa71] transition-all property-content-btn animate__animated animate__bounceInUp animate__delay-3s"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
};

export default PropertySpecifications;

<style jsx>{`
  .property-content-h1 {
    font-size: 22px;
    margin-bottom: 16px;
    font-weight: bold;
    color: #d1b578;
  }

  .property-content {
    color: #d1b578;
  }

  .property-content-btn {
    font-weight: bold;
    background-color: #cf6615;
    color: #fff;
  }

  .property-content-btn:hover {
    background-color: #7daa71;
  }
`}</style>
