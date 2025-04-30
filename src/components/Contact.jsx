import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirection
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader,
  Send,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import config from "../../config";

export const ContactDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

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

    // Add scroll event listener to detect scrolling for header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, section) => {
    e.preventDefault();
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    onClose(); // Close the dialog when navigating
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${config.API_URL}/contact?website=${config.SLUG_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      // Success
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });

      // Show success message briefly before redirecting
      setTimeout(() => {
        // Close the dialog
        onClose();
        
        // Redirect to thank you page using React Router
        navigate('/thank-you/');
      }, 1000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Show loading indicator if data is still loading
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white backdrop-blur-sm">
        <div className="bg-[#09305d] rounded-lg p-8 shadow-2xl animate-pulse">
          <Loader size={32} className="text-[#cf6615] animate-spin" />
        </div>
      </div>
    );
  }

  // Show error message if there was an error fetching data
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-[#09305d] rounded-lg p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#e0e0e0]">Error</h3>
            <button onClick={onClose} className="text-[#7daa71] hover:text-[#e0e0e0] transition-colors">
              <X size={24} />
            </button>
          </div>
          <p className="text-red-400">Failed to load content: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#36322e] rounded-lg w-full max-w-md shadow-2xl animate-fadeIn border border-[#7daa71]">
        <div className="relative p-5 border-b border-[#7daa71] flex flex-col items-center text-center">
          {/* Close Button - Positioned at the top-right */}
          <button
            onClick={onClose}
            className="absolute top-10 right-5 text-[#cf6615] hover:text-[#e0e0e0] transition-colors"
          >
            <X size={24} />
          </button>

          {/* Centered Content */}
          <div className="flex flex-col items-center w-full">
            {data?.logo && (
              <img
                src={data.logo}
                alt={data.property_name || "Amberwood"}
                className="h-12 max-w-[120px] mb-3"
              />
            )}
            <h1 className="text-[#e0e0e0] text-lg sm:text-xl md:text-2xl font-semibold">
              {data.hero_banner_heading}
            </h1>
            <h3 className="text-lg sm:text-xl font-semibold text-[#cf6615] mt-2">
              Contact Us
            </h3>
          </div>
        </div>
        <div className="p-6">
          {/* {submitStatus === "success" && (
            <div className="mb-6 bg-green-600/20 border border-green-500 text-green-400 p-4 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Thank you for your message! Redirecting you to our thank you page...
            </div>
          )} */}

          {submitStatus === "error" && (
            <div className="mb-6 bg-red-600/20 border border-red-500 text-red-400 p-4 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-[#cf6615] mb-2 text-sm"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-[#7daa71]" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f8f9fa] text-[#36322e] border ${formErrors.first_name
                        ? "border-red-500"
                        : "border-[#09305d]"
                      } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-[#7daa71]`}
                    placeholder="First Name*"
                  />
                </div>
                {formErrors.first_name && (
                  <p className="mt-1 text-red-400 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-[#cf6615] mb-2 text-sm"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-[#7daa71]" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f8f9fa] text-[#36322e] border ${formErrors.last_name
                        ? "border-red-500"
                        : "border-[#09305d]"
                      } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-[#7daa71]`}
                    placeholder="Last Name*"
                  />
                </div>
                {formErrors.last_name && (
                  <p className="mt-1 text-red-400 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_id"
                className="block text-[#cf6615] mb-2 text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={16} className="text-[#7daa71]" />
                </div>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleInputChange}
                  className={`w-full bg-[#f8f9fa] text-[#36322e] border ${formErrors.email_id ? "border-red-500" : "border-[#09305d]"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-[#7daa71]`}
                  placeholder="email@example.com"
                />
              </div>
              {formErrors.email_id && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.email_id}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-[#cf6615] mb-2 text-sm"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone size={16} className="text-[#7daa71]" />
                </div>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={`w-full bg-[#f8f9fa] text-[#36322e] border ${formErrors.phone_number
                      ? "border-red-500"
                      : "border-[#09305d]"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-[#7daa71]`}
                  placeholder="Your phone number*"
                />
              </div>
              {formErrors.phone_number && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.phone_number}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block text-[#cf6615] mb-2 text-sm"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={16} className="text-[#7daa71]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full bg-[#f8f9fa] text-[#36322e] border ${formErrors.message ? "border-red-500" : "border-[#09305d]"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-[#7daa71]`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-[#7daa71]">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-[#cf6615] hover:text-[#e0e0e0] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="py-2 px-4 rounded-lg bg-gradient-to-b from-[#09305d] to-[#09305d] text-[#e0e0e0] text-sm font-medium hover:from-[#cf6615] hover:to-[#cf6615] active:bg-[#7daa71] transition-all duration-300 flex items-center"
              >
                {submitting ? (
                  <Loader size={16} className="animate-spin mr-2" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Example of usage component
const ContactDialogButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openDialog}
        className="py-2 px-4 rounded-lg bg-gradient-to-b from-[#09305d] to-[#09305d] text-[#e0e0e0] font-medium hover:from-[#cf6615] hover:to-[#cf6615] active:bg-[#7daa71] transition-all duration-300"
      >
        Contact Us
      </button>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ContactDialogButton;