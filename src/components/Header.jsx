import { useEffect, useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiChevronDown, FiMenu, FiX, FiCornerDownRight } from 'react-icons/fi';
import config from '../../config';
import 'animate.css';


const Header = () => {
  const [data, setData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the header height to use as offset
      const headerHeight = document.querySelector('header').offsetHeight;
      
      // Get the top position of the section relative to the viewport
      const sectionTop = section.getBoundingClientRect().top;
      
      // Calculate the total scroll distance needed
      const offsetPosition = sectionTop + window.pageYOffset - headerHeight;
      
      // Scroll to the section with the offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  if (!data) return <div className="h-screen flex justify-center items-center bg-[#09305d]"><div className="w-12 h-12 border-4 border-[#cf6615] border-t-transparent rounded-full animate-spin"></div></div>;

  const menuItems = [
    { 
      name: 'Home', 
      id: 'hero',
      hasDropdown: false 
    },
    { 
      name: 'Properties', 
      id: 'properties',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About the Property', id: 'featured' },
        { name: 'SMP Amberwood', id: 'SMP_Amberwood' },
        { name: 'About the Builder', id: 'About_the_Builder' }
      ]
    },
    { 
      name: 'Layouts', 
      id: 'Layouts',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Unit Layouts', id: 'UnitLayouts' },
        { name: 'Floor Plans', id: 'FloorPlans' },
        { name: 'MasterLayout', id: 'MasterLayout' }
      ]
    },
    { 
      name: 'Amenities', 
      id: 'AmenitiesSection',
      hasDropdown: false
    },
    { 
      name: 'Gallery', 
      id: 'Gallery',
      hasDropdown: false 
    },
    { 
      name: 'Contact', 
      id: 'contact',
      hasDropdown: false 
    }
  ];

  const isScrolled = scrollPosition > 50;

  return (
    <>
      {/* Top Info Bar */}
      {/* <div className="hidden lg:block bg-[#36322e] text-[#e0e0e0] py-2 border-b border-[#7daa71]/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <FiMapPin className="mr-2 text-[#7daa71]" />
              <span>{data.location}, {data.sublocation}</span>
            </div>
            <div className="flex items-center">
              <FiMail className="mr-2 text-[#7daa71]" />
              <span>info@propertyname.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm font-medium">
              <FiPhone className="mr-2 text-[#7daa71]" />
              <span>+91 1234567890</span>
            </div>
            <a 
              href="#contact" 
              className="bg-[#cf6615] hover:bg-[#cf6615]/90 text-[#f8f9fa] px-4 py-1 rounded text-sm transition-colors"
              onClick={() => scrollToSection('contact')}
            >
              Book a Visit
            </a>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <header  className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-[#09305d] shadow-lg' : 'bg-[#09305d]/90 backdrop-blur-md'}`}>
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 animate__animated animate__zoomIn">
              <a href="/" className="block">
                <img 
                  src={data.logo} 
                  alt={data.property_name} 
                  className={`transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button 
                    className={`flex items-center px-4 py-2 text-[#f8f9fa] hover:text-[#cf6615] font-medium transition-colors ${activeDropdown === index ? 'text-[#cf6615]' : ''}`}
                    onClick={() => item.hasDropdown ? handleDropdown(index) : scrollToSection(item.id)}
                  >
                    {item.name}
                    {item.hasDropdown && <FiChevronDown className={`ml-1 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />}
                  </button>
                  
                  {item.hasDropdown && (
                    <div 
                      className={`absolute left-0 mt-1 w-56 bg-[#f8f9fa] rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top-left ${activeDropdown === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                    >
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={`#${dropdownItem.id}`}
                            className="flex items-center px-4 py-3 text-[#36322e] hover:bg-[#7daa71]/10 hover:text-[#09305d] transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(dropdownItem.id);
                            }}
                          >
                            <FiCornerDownRight className="mr-2 text-[#7daa71]" />
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#cf6615] to-[#cf6615]/80 hover:from-[#7daa71] hover:to-[#7daa71]/80 text-[#f8f9fa] px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg animate-bounce"
              >
                Enquire Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[#f8f9fa] hover:text-[#cf6615] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="bg-[#36322e] py-4 px-4 space-y-3">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-[#7daa71]/20 pb-3">
                <button
                  className="w-full flex justify-between items-center py-2 text-[#f8f9fa] focus:outline-none"
                  onClick={() => item.hasDropdown ? handleDropdown(index) : scrollToSection(item.id)}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {item.hasDropdown && activeDropdown === index && (
                  <div className="mt-2 pl-4 border-l-2 border-[#7daa71]">
                    {item.dropdownItems.map((dropdownItem, dropIndex) => (
                      <a
                        key={dropIndex}
                        href={`#${dropdownItem.id}`}
                        className="block py-2 text-[#e0e0e0] hover:text-[#cf6615] transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(dropdownItem.id);
                        }}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="block w-full text-center bg-[#cf6615] hover:bg-[#cf6615]/90 text-[#f8f9fa] px-4 py-3 rounded-md font-medium animate-bounce"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div id='hero' className="relative h-screen ">
        <div className="absolute inset-0">
          <img 
            src={data.hero_banner_img.desktop[0]} 
            alt={data.property_name}
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09305d]/80 to-transparent"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center animate__animated animate__wobble">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 bg-[#cf6615]/90 px-4 py-2 rounded-r-full">
              <span className="text-[#f8f9fa] font-medium">
                {data.property_type_price_range_text}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#f8f9fa] mb-6 animate-pulse">
              {data.hero_banner_heading}
            </h1>
            
            <p className="text-xl text-[#e0e0e0] mb-8 max-w-xl leading-relaxed">
              {data.hero_banner_subheading}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex items-center justify-center bg-[#cf6615] hover:bg-[#cf6615]/90 text-[#f8f9fa] px-8 py-4 rounded-md font-medium text-lg transition-colors shadow-lg "
                style={{
                  animation: "wiggle 0.5s ease-in-out infinite"
                }}
              >
                Book a Site Visit
              </a>
              <style>
            {`
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
  `}
          </style>
              <a 
                href="#Gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('Gallery');
                }}
                className="inline-flex items-center justify-center bg-[#7daa71] hover:bg-[#7daa71]/90 text-[#f8f9fa] px-8 py-4 rounded-md font-medium text-lg transition-colors shadow-lg animate-bounce"
              >
                View Gallery
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
              <div className="bg-[#36322e]/70 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-[#7daa71] font-semibold">{data.property_area_min_max}</div>
                <div className="text-[#e0e0e0] text-sm">Area Range</div>
              </div>
              <div className="bg-[#36322e]/70 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-[#7daa71] font-semibold">Premium Location</div>
                <div className="text-[#e0e0e0] text-sm">{data.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;