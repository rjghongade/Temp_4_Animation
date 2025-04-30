import React, { useEffect, useState } from "react";
import {
  Calendar,
  Building,
  FileText,
  Map,
  Home,
  Loader,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import config from "../../config";
import { QRCodeCanvas } from "qrcode.react";

// Separated RERA Information Component
const ReraInformation = () => {
  const [reraData, setReraData] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/rera?website=${config.SLUG_URL}`
        );
        if (!response.ok) throw new Error("Failed to fetch RERA data");
        const data = await response.json();
        setPageInfo(data.page[0]);
        setReraData(data.rera || []);

        // Initialize first item as expanded if there are any items
        if (data.rera && data.rera.length > 0) {
          setExpandedItems([0]);
        }
      } catch (err) {
        console.error("Error fetching RERA data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReraData();
  }, []);

  const toggleItem = (index) => {
    setExpandedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader className="animate-spin text-[#cf6615]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-white shadow-lg rounded-lg">
        <AlertTriangle className="inline-block mr-2" /> {error}
      </div>
    );
  }
if (!reraData || reraData.length === 0) return null;
const displayed = showAll ? reraData : reraData.slice(0, 2);

  return (
    <div className="mb-8">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-[#09305d] mb-4 text-center">
          {pageInfo?.heading || "RERA Information"}
        </h2>
        <p className="text-lg text-[#7daa71] mb-6 text-center">
          {pageInfo?.subheading || "Project Registration Details"}
        </p>

        <div className="space-y-4">
          {displayed.map((rera, index) => (
            <div
              key={rera.rera_id || index}
              className="border border-gray-200 rounded-lg"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleItem(index)}
              >
                <h3 className="font-medium text-[#09305d]">
                  {rera.phase_name || `Phase ${index + 1}`}
                </h3>
                {expandedItems.includes(index) ? (
                  <ChevronUp size={20} className="text-[#cf6615]" />
                ) : (
                  <ChevronDown size={20} className="text-[#cf6615]" />
                )}
              </div>

              {expandedItems.includes(index) && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building size={20} className="text-[#7daa71]" />
                      <span>Phase Name: {rera.phase_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-[#7daa71]" />
                      <span>RERA ID: {rera.rera_id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map size={20} className="text-[#7daa71]" />
                      <span>
                        Total Area: {rera.total_area} sq.ft ({rera.total_acre}{" "}
                        acres)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home size={20} className="text-[#7daa71]" />
                      <span>Total Towers: {rera.total_tower}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-[#7daa71]" />
                      <span>Completion Date: {rera.completion_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-[#7daa71]" />
                      <span>Total Units: {rera.total_units}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <QRCodeCanvas
                      value={
                        rera?.rera_url || "https://maharera.maharashtra.gov.in/"
                      }
                      height={120}
                      width={120}
                      className="p-3 bg-white border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Show more / less toggle */}
          {reraData.length > 2 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="border border-gray-800 text-black font-medium px-6 py-2 rounded-md"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Separated Master Layout Component
const MasterLayout = () => {
  const [masterLayout, setMasterLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const fetchMasterLayout = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/master-layout?website=${config.SLUG_URL}`
        );
        if (!response.ok) throw new Error("Failed to fetch master layout");
        const data = await response.json();
        setHeading(data.page?.[0]?.heading || "Master Layout");
        setMasterLayout(data.master_layout?.[0] || null);
      } catch (err) {
        console.error("Error fetching master layout:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterLayout();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader className="animate-spin text-[#cf6615]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-white shadow-lg rounded-lg">
        <AlertTriangle className="inline-block mr-2" /> {error}
      </div>
    );
  }

  if (!masterLayout) {
    return null;
    
  }

  return (
    <div id="MasterLayout" className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-[#09305d] mb-4 text-center">
        {heading}
      </h2>
      <div className="flex flex-col items-center">
        <h3 className="text-[#cf6615] text-xl font-semibold mb-4">
          {masterLayout.layout_name}
        </h3>
        <img
          src={masterLayout.layout_image}
          alt={masterLayout.layout_name}
          className="w-full max-w-3xl object-cover blur-sm hover:blur-none transition-all duration-300 border-4 border-[#7daa71] shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
};

// Main Parent Component
const ReraMasterLayout = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col">
        <ReraInformation />
        <MasterLayout />
      </div>
    </div>
  );
};

export default ReraMasterLayout;
