import { useEffect, useState, useRef } from 'react';
import { Loader } from 'lucide-react';
import config from '../../config';

const PropertyPrices = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);

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
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
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
      <div className="flex justify-center items-center py-16 bg-gradient-to-br from-[#09305d] to-[#36322e]">
        <Loader size={30} className="text-[#cf6615] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400 bg-gradient-to-br from-[#09305d] to-[#36322e]">
        Error loading property prices: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gradient-to-br from-[#09305d] to-[#36322e]">
        No property data available
      </div>
    );
  }

  return (
    <section
      id="BanksSection"
      ref={sectionRef}
      className={`relative w-full py-16 text-white overflow-hidden bg-[#f8f9fa] ${
        isInView ? 'animate__animated animate__fadeInUp' : ''
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7daa71]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#cf6615]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#09305d]/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-[#7daa71]/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium text-[#cf6615] uppercase tracking-wider animate-fade-in">
            Premium Selection
          </span>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09305d] to-[#09305d] mb-4 mt-2">
            {data?.page?.[0]?.heading || 'Premium Property Collection'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#09305d] to-[#09305d] mx-auto rounded-full mb-4"></div>
          <p className="text-[#09305d] max-w-2xl mx-auto">
            Discover our exclusive selection of properties with premium amenities and strategic locations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {data?.property_prices?.map((property, index) => (
            <div key={property.id} className="property-card hover-float">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#36322e] to-[#09305d]/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-[#7daa71]/20 hover:border-[#cf6615]/30 transition-all duration-500 h-full flex flex-col">
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-[#e0e0e0] group-hover:text-[#f8f9fa] transition-colors duration-300">
                    {property.property_type}
                  </h3>
                  <p className="text-[#cf6615] font-medium mt-2">Tower: {property.property_tower}</p>
                  <p className="text-[#e0e0e0]">Carpet Area: {property.property_carpet_sqft} {property.carpet_unit_sqft}</p>
                  <p className="text-[#e0e0e0]">Configuration: {property.property_configuration || "Premium Layout"}</p>

                  <div className="mt-6 text-center">
                    <a
                      href="#contact"
                      className="inline-block px-6 py-3 text-base font-medium text-white bg-[#cf6615] rounded-lg hover:bg-[#7daa71] transition duration-300 animate__animated animate__fadeInUp"
                    >
                      Request More Detail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyPrices;
