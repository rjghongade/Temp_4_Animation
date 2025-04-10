import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  Loader,
  Send,
  AlertCircle,
  Star,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import config from "../../config";

const ContactUs = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
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
    
    if (!formData.email_id.trim()) {
      //errors.email_id = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      errors.email_id = "Please enter a valid email address";
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

      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });
      setTimeout(() => {
        window.location.href = "/thank-you/";
      }, 1500);
      
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f8f9fa] min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-[#cf6615] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f8f9fa] min-h-[300px] p-8">
        <div className="bg-[#e0e0e0] p-4 rounded-lg text-[#cf6615]">
          <p>Failed to load contact information: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] p-8 relative overflow-hidden" id="contact">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#7daa71]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#cf6615]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09305d] to-[#cf6615] mb-4">
            {contactData?.name || "Get In Touch"}
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row-reverse gap-8">
          {/* Right Content Section (previously left) */}
          <div className="md:w-1/2">
            <div className="mb-6">
              <p className="text-[#36322e] mb-6">
                We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>
            
            {/* Contact information */}
            <div className="bg-[#09305d] backdrop-blur-lg p-6 rounded-2xl border border-[#36322e]/20 shadow-xl mb-6">
              <h3 className="text-[#e0e0e0] text-xl font-medium mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-[#cf6615]/20 p-2 rounded-full mr-3">
                    <Phone size={20} className="text-[#cf6615]" />
                  </div>
                  <div>
                    <p className="text-[#e0e0e0]">Phone</p>
                    <a href="tel:+91 8600020568" className="text-[#7daa71] hover:text-[#cf6615] transition-colors">
                      +91 8600020568
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Form Section (previously right) */}
          <div className="md:w-1/2">
            <div className="bg-[#e0e0e0] backdrop-blur-lg p-8 rounded-2xl border border-[#36322e]/10 shadow-xl">
              {submitStatus === "error" && (
                <div className="mb-8 bg-[#cf6615]/10 border border-[#cf6615]/30 text-[#cf6615] p-5 rounded-xl flex items-center">
                  <div className="bg-[#cf6615]/20 p-2 rounded-full mr-3">
                    <AlertCircle size={24} className="text-[#cf6615]" />
                  </div>
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="first_name" className="block text-[#09305d] mb-2 font-medium">
                      First Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#7daa71] group-focus-within:text-[#cf6615] transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`w-full bg-[#f8f9fa] text-[#36322e] border ${
                          formErrors.first_name
                            ? "border-[#cf6615]"
                            : "border-[#09305d]/20 group-focus-within:border-[#7daa71]"
                        } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                        placeholder="Your first name"
                      />
                    </div>
                    {formErrors.first_name && (
                      <p className="mt-2 text-[#cf6615] text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.first_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-[#09305d] mb-2 font-medium">
                      Last Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#7daa71] group-focus-within:text-[#cf6615] transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`w-full bg-[#f8f9fa] text-[#36322e] border ${
                          formErrors.last_name
                            ? "border-[#cf6615]"
                            : "border-[#09305d]/20 group-focus-within:border-[#7daa71]"
                        } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                        placeholder="Your last name"
                      />
                    </div>
                    {formErrors.last_name && (
                      <p className="mt-2 text-[#cf6615] text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email_id" className="block text-[#09305d] mb-2 font-medium">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#7daa71] group-focus-within:text-[#cf6615] transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        id="email_id"
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleInputChange}
                        className={`w-full bg-[#f8f9fa] text-[#36322e] border ${
                          formErrors.email_id
                            ? "border-[#cf6615]"
                            : "border-[#09305d]/20 group-focus-within:border-[#7daa71]"
                        } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                        placeholder="email@example.com"
                      />
                    </div>
                    {formErrors.email_id && (
                      <p className="mt-2 text-[#cf6615] text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.email_id}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-[#09305d] mb-2 font-medium">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#7daa71] group-focus-within:text-[#cf6615] transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className={`w-full bg-[#f8f9fa] text-[#36322e] border ${
                          formErrors.phone_number
                            ? "border-[#cf6615]"
                            : "border-[#09305d]/20 group-focus-within:border-[#7daa71]"
                        } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                        placeholder="Your phone number"
                      />
                    </div>
                    {formErrors.phone_number && (
                      <p className="mt-2 text-[#cf6615] text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-[#09305d] mb-2 font-medium">
                    Your Message
                  </label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 pointer-events-none text-[#7daa71] group-focus-within:text-[#cf6615] transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className={`w-full bg-[#f8f9fa] text-[#36322e] border ${
                        formErrors.message
                          ? "border-[#cf6615]"
                          : "border-[#09305d]/20 group-focus-within:border-[#7daa71]"
                      } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>
                  {formErrors.message && (
                    <p className="mt-2 text-[#cf6615] text-sm flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#09305d] to-[#cf6615] hover:from-[#09305d] hover:to-[#7daa71] active:from-[#09305d] active:to-[#7daa71] text-white font-medium transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#09305d]/20"
                >
                  {submitting ? (
                    <Loader size={20} className="animate-spin mr-2" />
                  ) : (
                    <Send size={18} className="mr-2" />
                  )}
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;