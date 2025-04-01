import React, { useEffect, useState } from "react";
import config from "../../config";

const MasterLayout = () => {
  const [masterLayout, setMasterLayout] = useState(null);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    fetch(`${config.API_URL}/master-layout?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.page?.[0]?.heading || "Master Layout");
        setMasterLayout(data.master_layout?.[0] || null);
      })
      .catch((error) => console.error("Error fetching master layout:", error));
  }, []);

  return (
    <div className="bg-[#f8f9fa] p-6">
      <h2 className="text-[#09305d] text-3xl font-bold text-center mb-4">{heading}</h2>
      {masterLayout && (
        <div className="flex flex-col items-center">
          <h3 className="text-[#cf6615] text-2xl font-semibold mb-2">{masterLayout.layout_name}</h3>
          <img
            src={masterLayout.layout_image}
            alt={masterLayout.layout_name}
            className="w-full max-w-3xl border-4 border-[#7daa71] shadow-lg rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MasterLayout;