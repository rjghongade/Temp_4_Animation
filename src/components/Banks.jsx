import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/banks?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banks data");
        }

        const data = await response.json();
        setBanks(data.bank.banks);
        setHeading(data.bank.page.heading);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  // Extract unique categories from banks
  const categories = ["All"];

  // Filter banks based on search and category
  const filteredBanks = banks.filter(bank => {
    const matchesSearch = bank.bank_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || bank.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
        <div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="p-4 rounded-full bg-white shadow-lg"
        >
          <div className="text-blue-600 font-medium">Loading banks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-600 text-2xl mb-2">⚠️</div>
          <div className="text-red-600 font-medium">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          >
            {heading || "Banking Partners"}
          </motion.h1>
          <div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 w-24 bg-orange-500 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our trusted banking partners offering secure and reliable financial services.
          </motion.p>
        </div>

        {/* Filter and Search Section */}
        <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search banks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none shadow-sm"
            />
            
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Banks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank, index) => (
              <div
                key={bank.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={bank.bank_slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="bg-white h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <div className="relative overflow-hidden aspect-video bg-gray-100">
                      <div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center p-4"
                      >
                        <img
                          src={bank.property_bank_photo}
                          alt={bank.bank_name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      {bank.category && (
                        <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {bank.category}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <h2 className="text-xl font-semibold text-blue-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                        {bank.bank_name}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {bank.description || "Providing excellent financial services and solutions for our customers."}
                      </p>
                      <div className="flex justify-between items-center">
                        
                        <div className="flex items-center text-blue-700 font-medium text-sm group-hover:text-orange-600">
                          <span>Learn more</span>
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">No banks found matching your search criteria.</div>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Footer CTA */}
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Contact our team for personalized assistance with your banking needs.</p>
            <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banks;