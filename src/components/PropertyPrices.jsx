import { useEffect, useState, useRef } from 'react';
import { Loader, ChevronRight, Home, Maximize, Layout, Tag } from 'lucide-react';
import config from '../../config';

const PropertyPrices = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/property-prices?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch property prices');
        }
        const result = await response.json();
        setData(result);
        
        // Setup animation after data loads
        setTimeout(() => {
          setAnimateCards(true);
        }, 300);
        
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Intersection Observer for section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateCards(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-8 rounded-lg mx-4 my-8 text-center">
        <p className="font-medium">Error loading property prices</p>
        <p className="text-sm mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || !data.property_prices || data.property_prices.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg mx-4 my-8 text-center text-gray-500">
        No property pricing information is currently available
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white via-teal-50 to-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-600/5 rounded-full"></div>
        <div className="absolute top-40 left-10 w-6 h-6 bg-amber-400/30 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-8 h-8 bg-teal-400/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-amber-400/30 rounded-full"></div>
        <svg className="absolute bottom-0 left-0 w-full h-32 text-white" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="currentColor" fillOpacity=".1"></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="currentColor" fillOpacity=".05"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full mb-4">
            PROPERTY COLLECTION
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {data?.page?.[0]?.heading || 'Premium Properties'}
          </h2>
          <div className="w-20 h-1.5 bg-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Explore our exceptional selection of properties with outstanding features and prime locations
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.property_prices.map((property, index) => (
            <div 
              key={property.id} 
              className={`transform transition-all duration-700 ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Card Header with Accent */}
                <div className="h-3 bg-gradient-to-r from-teal-500 to-amber-400"></div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {property.property_type}
                    </h3>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600">
                      <Home size={18} />
                    </span>
                  </div>
                  
                  {/* Property Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Layout size={16} className="mr-2 text-amber-500" />
                      <span>Tower: </span>
                      <span className="ml-1 font-medium text-gray-900">{property.property_tower}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Maximize size={16} className="mr-2 text-amber-500" />
                      <span>Carpet Area: </span>
                      <span className="ml-1 font-medium text-gray-900">
                        {property.property_carpet_sqft} {property.carpet_unit_sqft}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Layout size={16} className="mr-2 text-amber-500" />
                      <span>Configuration: </span>
                      <span className="ml-1 font-medium text-gray-900">
                        {property.property_configuration || "Premium Layout"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price Tag - only shown if price is available */}
                  {property.property_price && (
                    <div className="mb-6">
                      <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 font-bold rounded-lg">
                        <span className="flex items-center">
                          <Tag size={16} className="mr-2" />
                          {property.property_price}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* CTA Button with animation */}
                  <div className="mt-auto">
                    <a
                      href="#contact"
                      className="group relative inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-teal-700"
                    >
                      <span className="relative z-10 flex items-center">
                        Request Details
                        <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <span className={`absolute inset-0 w-0 bg-amber-500 transition-all duration-300 ${activeCard === index ? 'w-full' : ''}`}></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">
            Contact our sales team for more information on these premium properties
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors"
          >
            Get in Touch
            <ChevronRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertyPrices;