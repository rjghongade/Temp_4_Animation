import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "../../config";

const FloorPlans = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [heading, setHeading] = useState("Floor Plans");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/floor-layout?website=${config.SLUG_URL}`);
        if (!response.ok) throw new Error("Failed to fetch floor plans");

        const data = await response.json();
        setHeading(data.page?.[0]?.heading || "Floor Plans");
        setFloorPlans(data.Floor_plans || []);
      } catch (error) {
        console.error("Error fetching floor plans:", error);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="FloorPlans" className="bg-[#f8f9fa] py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#09305d] mb-6">{heading}</h2>
        <div className="space-y-12">
          {floorPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md border-l-4 border-[#cf6615]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={plan.layout_image}
                alt={plan.layout_name}
                className="w-full md:w-1/2 h-auto object-cover rounded-md blur-sm hover:blur"
              />
              <div className="md:ml-8 text-left mt-4 md:mt-0">
                <h3 className="text-2xl font-semibold text-[#09305d]">{plan.layout_name}</h3>
                <button
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }} className="mt-4 bg-[#cf6615] text-white py-2 px-6 rounded-md hover:bg-[#7daa71] transition-all">
                  Enquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default FloorPlans;