import React, { useEffect, useState } from "react";
import { Calendar, Building, FileText, ExternalLink, Map, Home, Loader, AlertTriangle } from "lucide-react";
import config from "../../config";

const ReraInformation = () => {
  const [reraData, setReraData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/rera?website=${config.SLUG_URL}`);
        if (!response.ok) throw new Error("Failed to fetch RERA data");
        const data = await response.json();
        setPageInfo(data.page[0]);
        setReraData(data.rera[0]);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReraData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin text-[#cf6615]" size={40} /></div>;
  if (error) return <div className="text-center text-red-600 p-4"><AlertTriangle className="inline-block mr-2" /> {error}</div>;
  if (!reraData) return null;

  return (
    <div  className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-[#09305d] mb-4">{pageInfo?.heading}</h2>
      <p className="text-lg text-[#7daa71] mb-6">{pageInfo?.subheading || "Project Registration Details"}</p>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-2"><Building size={20} /><span>Phase Name: {reraData.phase_name}</span></div>
        <div className="flex items-center gap-2"><FileText size={20} /><span>RERA ID: {reraData.rera_id}</span></div>
        <div className="flex items-center gap-2"><Map size={20} /><span>Total Area: {reraData.total_area} sq.ft ({reraData.total_acre} acres)</span></div>
        <div className="flex items-center gap-2"><Home size={20} /><span>Total Towers: {reraData.total_tower}</span></div>
        <div className="flex items-center gap-2"><Calendar size={20} /><span>Completion Date: {reraData.completion_date}</span></div>
        <div className="flex items-center gap-2"><FileText size={20} /><span>Total Units: {reraData.total_units}</span></div>
      </div>
      <div className="mt-6 text-center">
        <a href={reraData.rera_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#cf6615] text-white px-6 py-2 rounded-lg hover:bg-[#7daa71]">
          <ExternalLink className="inline-block mr-2" /> View RERA Details
        </a>
      </div>
    </div>
  );
};

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
    <div id="MasterLayout" className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-[#09305d] mb-4 text-center">{heading}</h2>
      {masterLayout && (
        <div className="flex flex-col items-center">
          <h3 className="text-[#cf6615] text-xl font-semibold mb-2">{masterLayout.layout_name}</h3>
          <img src={masterLayout.layout_image} alt={masterLayout.layout_name} className="w-full max-w-3xl object-cover blur-sm hover:blur border-4 border-[#7daa71] shadow-lg rounded-lg" />
        </div>
      )}
    </div>
  );
};

const ReraMasterLayout = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReraInformation />
        <MasterLayout />
      </div>
    </div>
  );
};

export default ReraMasterLayout;