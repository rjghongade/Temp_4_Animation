import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";

const PropertyDetails = () => {
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
    <motion.section
      id="property_info"
      className="py-12 px-4 sm:px-6 md:px-8 relative overflow-hidden"
      animate={{
        background: [
          "linear-gradient(to bottom, #312223, #170505)",
          "linear-gradient(to bottom, #170505, #312223)",
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto bg-[#5f7858] text-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Property Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 sm:p-10">
          {/* Property Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
          >
            <img
              src={property.og_image || "default-image.jpg"}
              alt={property.property_name}
              className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Property Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#d1b578]">
              {property.property_name}
            </h1>
            <p className="text-[#312223] mt-2 text-lg">{property.sub_location}</p>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-block bg-[#312223] text-[#d1b578] px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                {property.property_type}
              </span>
            </motion.div>

            {/* Contact Us Button (Aligned Right) */}
            <div className="flex justify-start mt-6">
              <motion.a
                href="#contact"
                className="relative  px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-[#d1b578] to-[#b99760] rounded-lg shadow-lg transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 15px rgba(209, 181, 120, 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                Contact Us
                <motion.span
                  className="absolute inset-0 rounded-lg border border-white opacity-20"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.a>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 border-b border-[#312223] pb-2">
              {["info", "description", "specifications"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`text-lg font-semibold transition-all duration-300 pb-2 ${activeTab === tab
                    ? "text-[#d1b578] border-b-2 border-[#d1b578]"
                    : "text-[#312223] hover:text-[#d1b578]"
                    }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {tab === "info"
                    ? "Property Info"
                    : tab === "description"
                      ? "Description"
                      : "About Builder"}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Animation */}
        <div id="property_info" className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#d1b578]"
              >
                {/* Left Section - Property Description */}
                <div className="bg-[#170505] bg-opacity-50 border border-[#312223] rounded-lg shadow-lg p-6 max-h-60 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: property.property_information }} />
                </div>

                {/* Right Section - Property Details */}
                <div className="space-y-3 text-lg">
                  <p>
                    <strong className="text-[#d1b578]">Builder:</strong> <span className="text-[#312223]">{property.builder_name}</span>
                  </p>
                  <p>
                    <strong className="text-[#d1b578]">Size Range:</strong> <span className="text-[#312223]">{property.property_price_range}</span>
                  </p>
                  <p>
                    <strong className="text-[#d1b578]">Type:</strong> <span className="text-[#312223]">{property.property_type_price_range}</span>
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <h2 className="text-xl font-semibold text-[#d1b578]">About the Property</h2>
                <div className="text-[#d1b578] mt-3 max-h-60 overflow-y-auto p-4 bg-[#170505] bg-opacity-50 border border-[#312223] rounded-lg shadow-lg">
                  <div dangerouslySetInnerHTML={{ __html: property.property_description }} />
                </div>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                key="specifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <h2 className="text-xl font-semibold text-[#d1b578]">About Builder</h2>
                <div className="text-[#d1b578] mt-3 max-h-60 overflow-y-auto p-4 bg-[#170505] bg-opacity-50 border border-[#312223] rounded-lg shadow-lg">
                  <div dangerouslySetInnerHTML={{ __html: property.property_specification }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PropertyDetails;
