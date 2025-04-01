import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, User, X, Plus, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import seodata from "../../seodata.json";
import { ContactDialog } from "./Contact";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position to add special effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const propertyName = seodata?.data?.property_name || "your property";

  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} className="text-white" />,
      label: "WhatsApp",
      href: `https://wa.me/918181817136?text=I%20am%20interested%20in%20${encodeURIComponent(propertyName)}`,
      color: "bg-gradient-to-r from-[#7daa71] to-[#36322e]",
      hoverColor: "hover:from-[#36322e] hover:to-[#7daa71]",
      ringColor: "ring-[#7daa71]",
    },
    {
      id: "phone",
      icon: <Phone size={20} className="text-white" />,
      label: "Call Now",
      href: "tel:+918181817136",
      color: "bg-gradient-to-r from-[#09305d] to-[#cf6615]",
      hoverColor: "hover:from-[#cf6615] hover:to-[#09305d]",
      ringColor: "ring-[#09305d]",
    },
    {
      id: "contact",
      icon: <User size={20} className="text-white" />,
      label: "Contact Us",
      color: "bg-gradient-to-r from-[#cf6615] to-[#7daa71]",
      hoverColor: "hover:from-[#7daa71] hover:to-[#cf6615]",
      ringColor: "ring-[#cf6615]",
      onClick: openDialog,
    },
  ];

  // Show "back to top" button when scrolled down
  const showBackToTop = scrollPosition > 300;

  return (
    <>
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 p-3 rounded-full bg-black/30 backdrop-blur-md text-white shadow-xl hover:bg-black/50 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main floating menu */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex flex-col-reverse items-end gap-3">
        {/* Floating Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col-reverse gap-3 mb-2"
            >
              {buttons.map((button, index) => (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {button.href ? (
                    <a
                      href={button.href}
                      className={`group flex items-center justify-between w-36 sm:w-44 px-4 py-3 rounded-xl ${button.color} ${button.hoverColor} text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1`}
                      target={button.id === "whatsapp" ? "_blank" : "_self"}
                      rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
                    >
                      <span className="text-sm font-medium">{button.label}</span>
                      <span
                        className={`p-2 rounded-full ${button.ringColor} bg-white/10 transition-all duration-300 group-hover:bg-white/20`}
                      >
                        {button.icon}
                      </span>
                    </a>
                  ) : (
                    <button
                      onClick={button.onClick}
                      className={`group flex items-center justify-between w-36 sm:w-44 px-4 py-3 rounded-xl ${button.color} ${button.hoverColor} text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <span className="text-sm font-medium">{button.label}</span>
                      <span
                        className={`p-2 rounded-full ${button.ringColor} bg-white/10 transition-all duration-300 group-hover:bg-white/20`}
                      >
                        {button.icon}
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={toggleExpand}
          className="relative p-4 rounded-full bg-gradient-to-r from-[#09305d] to-[#cf6615] text-white shadow-2xl ring-2 ring-white/20 backdrop-blur-sm hover:shadow-[#d1b578]/20 transition-all duration-300"
          aria-label="Toggle floating menu"
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px 5px rgba(209, 181, 120, 0.3)",
          }}
          animate={{
            rotate: isExpanded ? 45 : 0,
            background: isExpanded
              ? "linear-gradient(to right, #d1b578, #caa76c)"
              : "linear-gradient(to right, #09305d, #cf6615)",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {isExpanded ? <X size={24} /> : <Plus size={24} />}

          {/* Pulsing ring animation */}
          <motion.span
            className="absolute inset-0 rounded-full ring-2 ring-[#d1b578]/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.span>
        </motion.button>

        {/* Contact Dialog without animation */}
        <ContactDialog isOpen={isOpen} onClose={closeDialog} noAnimation />
      </div>
    </>
  );
};

export default FloatingButtons;
