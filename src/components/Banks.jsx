import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-[#cf6615] text-lg font-semibold">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );

  return (
    <motion.div
      className="bg-[#f8f9fa] py-8 px-4 sm:px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6 border border-[#7daa71]">
        <h1 className="text-3xl font-bold text-[#09305d] mb-6 text-center border-b-4 border-[#cf6615] pb-2">
          {heading}
        </h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {banks.map((bank) => (
            <motion.div
              key={bank.id}
              className="bg-[#e0e0e0] rounded-lg p-4 shadow-md hover:shadow-lg transition transform hover:scale-105 border border-[#cf6615]"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href={bank.bank_slug}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.img
                  src={bank.property_bank_photo}
                  alt={bank.bank_name}
                  className="w-full h-32 object-contain mb-4 rounded-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-lg font-semibold text-center text-[#cf6615]">
                  {bank.bank_name}
                </h2>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banks;
