import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import config from "../../config";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [reraData, setReraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/footer?website=${config.SLUG_URL}`);
        if (!response.ok) throw new Error("Failed to fetch footer data");
        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/rera?website=${config.SLUG_URL}`);
        if (!response.ok) throw new Error("Failed to fetch RERA data");
        const data = await response.json();
        setReraData(data.rera[0]);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
      }
    };
    fetchReraData();
  }, []);

  if (loading) {
    return <div className="bg-gray-900 p-4 md:p-8 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 p-4 md:p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <footer className="bg-white text-[#d1b578] py-6 md:py-10 text-center border-t border-gray-700 px-4 text-sm animate__animated animate__fadeIn animate__delay-1s">
      <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto">
        {reraData?.rera_url && (
          <QRCodeCanvas
            value={reraData.rera_url}
            height={150}
            width={150}
            className="mb-2 p-4 bg-white rounded-md animate__animated animate__bounceInUp animate__delay-2s"
          />
        )}
        <p className="text-sm sm:text-base break-words animate__animated animate__fadeIn animate__delay-2s">
          <span className="block sm:inline">Agent RERA: {footerData?.g_setting?.footer_agent_rera}</span>
          <span className="hidden sm:inline"> | </span>
          <span className="block sm:inline"> Project RERA: {reraData?.rera_id}</span>{" "}
          {reraData?.rera_url && (
            <a
              href={reraData.rera_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5f7858] block sm:inline overflow-hidden text-ellipsis hover:text-[#cf6615] transition-colors"
            >
              ({reraData.rera_url})
            </a>
          )}
        </p>
        <hr className="border-gray-600 w-full md:w-3/4" />
        <p className="mt-2 text-sm max-w-3xl mx-auto px-2 animate__animated animate__fadeIn animate__delay-3s">
          {footerData?.g_setting?.footer_disclamer}
        </p>
        <div className="text-sm mt-4 animate__animated animate__fadeIn animate__delay-4s">
          <p>
            Digital Media Planned By: <span className="text-red-500">My Digital Kart</span>
          </p>
          <a
            href="/privacy-policy"
            className="text-red-500 hover:text-[#7daa71] transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div className="text-sm text-gray-500 mt-4 animate__animated animate__fadeIn animate__delay-5s">
          &copy; 2025 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
