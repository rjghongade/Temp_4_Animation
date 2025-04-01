import React, { useEffect, useState } from "react";
import { Check, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import config from "../../config";

const ThankYouPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-pulse text-[#7daa71]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Header/Logo Section */}
      <div className="w-full py-4 border-b border-[#36322e] flex justify-center">
        {data?.logo && (
          <img
            src={data.logo}
            alt={data.property_name || "Amberwood"}
            className="h-12 max-w-[120px]"
          />
        )}
      </div>

      {/* Thank You Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white border border-[#36322e] rounded-lg p-8 max-w-md w-full shadow-2xl text-center animate-fadeIn">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#7daa71] to-[#09305d] flex items-center justify-center">
              <Check size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-semibold text-[#09305d] mb-4">
            Thank You!
          </h1>
          
          <p className="text-[#7daa71] mb-6">
            We have received your message. Our team will contact you shortly!
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/"
              className="py-2 px-4 rounded-lg border border-[#7daa71] text-[#7daa71] flex items-center justify-center hover:bg-[#7daa71]/10 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Link>
            
            <Link 
              to="/"
              className="py-2 px-4 rounded-lg bg-gradient-to-b from-[#09305d] to-[#cf6615] text-white flex items-center justify-center hover:from-[#7daa71] hover:to-[#e0e0e0] transition-all duration-300"
            >
              <Home size={16} className="mr-2" />
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-3 border-t border-[#36322e] text-center text-[#7daa71] text-sm">
        &copy; {new Date().getFullYear()} {data?.property_name || "Amberwood"}
      </div>
    </div>
  );
};

export default ThankYouPage;
