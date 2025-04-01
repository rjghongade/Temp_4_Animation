import { useEffect, useState } from "react";
import config from "../../config";

const PropertySpecifications = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/propert-details?website=${config.SLUG_URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProperty(data.property_details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
        setError("Failed to load builder details. Please try again later.");
        setLoading(false);
      });
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="p-8 rounded-lg shadow-lg bg-white">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-gray-200 rounded-full animate-spin mb-4"></div>
            <p className="text-center text-green-600 font-medium">Loading builder details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="p-8 rounded-lg shadow-lg bg-white border-l-4 border-red-500">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="About_the_Builder"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 relative">
          <span className="absolute -top-3 left-0 w-20 h-1 bg-orange-500"></span>
          <h2 className="text-4xl font-bold text-blue-900 pt-2">
            About the Builder
          </h2>
          <p className="mt-4 text-gray-600 text-lg">Expertise and excellence in construction</p>
        </div>

        {property && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
            <div className="bg-blue-900 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">Builder Specifications</h3>
              <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none text-gray-700 max-h-96 overflow-y-auto custom-scrollbar">
                <div dangerouslySetInnerHTML={{ __html: property.property_specification }} />
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <span className="flex items-center">
                    <span>Enquire Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
};

export default PropertySpecifications;