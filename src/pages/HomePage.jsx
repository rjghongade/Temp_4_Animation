import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PropertyDetails from '../components/PropertyDetails';
import Footer from '../components/Footer';
import ReraInformation from '../components/Rera';
import VideoTour from '../components/VideoTour';
import FAQ from '../components/FAQ';
import Banks from '../components/Banks';
import Blogs from '../components/Blogs';
import ContactUs from '../components/ContactUs';
import Location from '../components/Location';
import PropertyPrices from '../components/PropertyPrices';
import AmenitiesSection from '../components/AmenitiesSection';
import UnitLayouts from '../components/UnitLayouts';
import FloorPlans from '../components/FloorPlans';
import MasterLayout from '../components/MasterLayout';
import Gallery from '../components/Gallary';
import FloatingButtons from '../components/FloatingButtons';
import LocationAdvantages from '../components/LocationAdvantages';
import { ContactDialog } from '../components/Contact';
import PropertiInfo from '../components/Porpertyinfo';
import PropertyDescription from '../components/PropertyDescription';
import PropertySpecifications from '../components/PropertySpecifications';
import Advertisement from '../components/Advertisement';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    // Show the popup after 5 seconds when the page loads
    const timeout = setTimeout(() => {
      openDialog();
    }, 5000);

    // Set an interval to show the popup every 5 minutes (300,000ms)
    const popupInterval = setInterval(() => {
      openDialog();
    }, 300000);

    return () => {
      clearTimeout(timeout); // Cleanup timeout on unmount
      clearInterval(popupInterval); // Cleanup interval on unmount
    };
  }, []);

  return (
    <>
      {/* Contact Dialog */}
      {/* <ContactDialog isOpen={isOpen} onClose={closeDialog} /> */}

      <Header />
      <PropertyDescription />
      <FloorPlans />
      <PropertyPrices />
      <LocationAdvantages />
      <AmenitiesSection />
      <Location />

      <UnitLayouts />
      <PropertiInfo />




      <Advertisement />
      <Gallery />
      <ReraInformation />
      <VideoTour />
      <PropertySpecifications />
      <Blogs />
      <FAQ />
      <ContactUs />
      <Banks />
      <Footer />
      <FloatingButtons />
    </>
  );
};

export default HomePage;
