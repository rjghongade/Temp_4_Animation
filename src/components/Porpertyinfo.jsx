import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";

const PropertiInfo = () => {
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    fetch(`${config.API_URL}/propert-details?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => setProperty(data.property_details))
      .catch((error) => console.error("Error fetching property details:", error));
  }, []);

  if (!property) {
    return (
      <p className="text-center text-gray-500 animate-pulse">
        Loading property details...
      </p>
    );
  }

  return (
    <div id="SMP_Amberwood" className="max-w-7xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-xl mb-3">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center property-content-h1">
        {property.property_name}
      </h2>

      {/* Image Section */}
      <motion.div
        className="w-full md:w-2/3 mx-auto mb-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
      >
        <img
          src={property.og_image || "default-image.jpg"}
          alt={property.property_name}
          className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b pb-2 mb-6">
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-300 ${
            activeTab === "info" ? "bg-orange-600 text-white" : "bg-gray-300 text-blue-900"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Property Info
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Section - Property Description */}
            <div className="bg-blue-900 text-white rounded-lg shadow-lg p-6 max-h-60 overflow-y-auto property-content">
              <div dangerouslySetInnerHTML={{ __html: property.property_information }} />
            </div>

            {/* Right Section - Property Details */}
            <div className="space-y-4 text-lg">
              <p className="property-content-p">
                <strong className="text-orange-600 property-content-strong">Builder:</strong> <span className="text-gray-800">{property.builder_name}</span>
              </p>
              <p className="property-content-p">
                <strong className="text-orange-600 property-content-strong">Size Range:</strong> <span className="text-gray-800">{property.property_price_range}</span>
              </p>
              <p className="property-content-p">
                <strong className="text-orange-600 property-content-strong">Type:</strong> <span className="text-gray-800">{property.property_type_price_range}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertiInfo;

<style jsx>{`
  .property-content-h1 {
    font-size: 22px;
    margin-bottom: 16px;
    font-weight: bold;
    color: #d1b578;
  }

  .property-content h2 {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #d1b578;
  }

  .property-content-p {
    margin-bottom: 14px;
    color: #d1b578;
  }

  .property-content-strong {
    font-weight: bold;
    color: #d1b578;
  }
`}</style>
