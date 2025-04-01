import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, AlertCircle, Loader } from "lucide-react";
import config from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/faq?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleQuestionClick = (id) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="bg-[#09305d] min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-[#cf6615] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#09305d] min-h-[300px] p-8">
        <div className="bg-[#cf6615]/20 p-4 rounded-lg text-[#cf6615] flex items-center gap-3">
          <AlertCircle size={20} />
          <p>Failed to load FAQs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-[#f8f9fa] p-6 md:p-12 lg:p-16 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="mb-10 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-[#09305d]">{heading}</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-[#e0e0e0] border border-[#09305d] rounded-lg shadow-md"
          >
            <button
              onClick={() => handleQuestionClick(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-all hover:bg-[#cf6615] hover:text-white"
            >
              <span className="text-[#09305d] font-medium text-lg">
                {faq.faq_title}
              </span>
              {activeQuestion === faq.id ? (
                <ChevronDown className="text-[#09305d]" />
              ) : (
                <ChevronRight className="text-[#09305d]" />
              )}
            </button>

            {activeQuestion === faq.id && (
              <div className="p-4 border-t border-[#7daa71] text-[#36322e]">
                {stripHtml(faq.faq_content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
