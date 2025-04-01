import { useEffect, useState } from "react";
import config from "../../config";

const PropertyDescription = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedView, setExpandedView] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/propert-details?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data.property_details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
        setLoading(false);
      });
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#09305d] border-t-[#7daa71] rounded-full animate-spin"></div>
          <p className="mt-4 text-[#09305d] font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center">
        <p>Unable to load property description. Please try again later.</p>
      </div>
    );
  }

  return (
    <div id="featured" className="relative bg-gradient-to-b from-[#f8f9fa] to-white py-12 px-4 sm:px-8 md:px-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#7daa71]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#09305d]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header with accent line */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-1 bg-[#7daa71] rounded-full mr-4"></div>
          <h2 className="text-4xl font-bold text-[#09305d]">
            About the Property
          </h2>
        </div>
        
        {/* Content card with subtle animation */}
        <div className="relative mt-6 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl bg-white">
          {/* Accent border */}
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#09305d] to-[#7daa71]"></div>
          
          {/* Content area */}
          <div className="pl-8 pr-6 py-8 bg-[#09305d] text-white">
            <div className={`text-[#e0e0e0] ${expandedView ? '' : 'max-h-96'} overflow-y-auto property-content p-4 transition-all duration-300`}>
              <div dangerouslySetInnerHTML={{ __html: property.property_description }} />
            </div>
            
            {/* Expand/collapse button */}
            {!expandedView && (
              <div className="relative">
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#09305d] to-transparent pointer-events-none"></div>
              </div>
            )}
          </div>
          
          {/* Button to toggle expanded view */}
          <div className="text-center p-4 bg-[#09305d] border-t border-[#1a4471]">
            <button
              onClick={() => setExpandedView(!expandedView)}
              className="text-[#7daa71] hover:text-white font-medium transition-colors duration-200 flex items-center mx-auto"
            >
              {expandedView ? (
                <>
                  <span>Show Less</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Contact button with enhanced styling */}
        <div className="flex justify-center mt-12">
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="group relative px-8 py-4 bg-[#cf6615] text-white text-lg font-semibold rounded-lg shadow-lg overflow-hidden transition-all duration-300"
          >
            {/* Animated background on hover */}
            <span className="absolute inset-0 w-0 bg-[#7daa71] transition-all duration-500 ease-out group-hover:w-full"></span>
            
            {/* Button text */}
            <span className="relative flex items-center justify-center">
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .property-content h1 {
          font-size: 24px;
          margin-bottom: 18px;
          font-weight: bold;
          color: #d1b578;
        }
        
        .property-content h2 {
          font-size: 20px;
          margin-top: 22px;
          margin-bottom: 12px;
          font-weight: bold;
          color: #d1b578;
        }
        
        .property-content p {
          margin-bottom: 16px;
          color: #e0e0e0;
          line-height: 1.6;
        }
        
        .property-content strong {
          font-weight: bold;
          color: #d1b578;
        }
        
        /* Custom scrollbar styling */
        .property-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .property-content::-webkit-scrollbar-track {
          background: #0c3b6d;
          border-radius: 8px;
        }
        
        .property-content::-webkit-scrollbar-thumb {
          background-color: #7daa71;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default PropertyDescription;