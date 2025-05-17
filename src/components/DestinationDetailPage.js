import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "../utils/TranslationContext";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaUtensils,
  FaHotel,
  FaPlane,
  FaShield,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkedAlt,
  FaRegClock,
  FaUsers,
  FaTimes
} from "react-icons/fa";

const DestinationDetailPage = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();

  // Mock images for gallery
  const mockImages = [
    "/images/destinations/detail1.jpg",
    "/images/destinations/detail2.jpg",
    "/images/destinations/detail3.jpg",
    "/images/destinations/detail4.jpg",
    "/images/destinations/detail5.jpg"
  ];

  // Mock destination data
  useEffect(() => {
    // Simulate API fetch with timeout
    setTimeout(() => {
      setDestination({
        id: parseInt(id),
        name: "Santorini Paradise",
        location: "Santorini, Greece",
        description: "Experience the breathtaking views of white-washed buildings against the azure Aegean Sea in one of the world's most picturesque islands. Explore ancient ruins, enjoy fresh Mediterranean cuisine, and witness legendary sunsets that paint the sky in vibrant hues of orange and pink.",
        longDescription: "Nestled in the southern Aegean Sea, Santorini stands as a testament to nature's artistry and human resilience. Born from a volcanic eruption that shaped its dramatic caldera, the island offers a unique landscape where cobalt waters meet multicolored cliffs. Wander through the narrow streets of Oia and Fira, where white-washed buildings adorned with blue domes create a postcard-perfect setting. Discover hidden gems like the archaeological site of Akrotiri, often referred to as the 'Prehistoric Pompeii,' or unwind on distinctive beaches featuring volcanic red, black, or white sand. Every evening, join locals and fellow travelers to witness the legendary Santorini sunset – a daily spectacle that transforms the entire landscape into a canvas of warm, golden hues.",
        price: 1299,
        duration: 7,
        rating: 4.8,
        reviews: 1245,
        image: "/images/destinations/santorini.jpg",
        featured: true,
        category: "beach",
        highlights: [
          "Private tour of Oia's iconic blue-domed churches",
          "Sunset catamaran cruise with Greek wine tasting",
          "Visit to ancient Akrotiri archaeological site",
          "Horseback riding along black sand beaches",
          "Traditional Greek cooking class with local ingredients"
        ],
        itinerary: [
          { day: 1, title: "Welcome to Paradise", description: "Arrival and transfer to your cliffside hotel, welcome dinner with sunset views" },
          { day: 2, title: "Exploring Fira", description: "Walking tour of the capital, cable car ride, local cuisine tasting" },
          { day: 3, title: "Oia Adventure", description: "Blue dome photography tour, traditional pottery workshop, sunset viewing" },
          { day: 4, title: "Volcanic Discovery", description: "Boat trip to volcanic springs, mud baths, picnic at Thirassia" },
          { day: 5, title: "Beach Day", description: "Visit to red beach, black beach, and white beach with snorkeling" },
          { day: 6, title: "Cultural Immersion", description: "Ancient Akrotiri tour, wine tasting at traditional vineyards" },
          { day: 7, title: "Farewell to Greece", description: "Free morning, departure preparation, transfers to airport" }
        ],
        includes: ["Luxury accommodation", "Daily breakfast", "Two special dinners", "All transfers", "Professional guides", "Catamaran cruise", "Cooking class"],
        excludes: ["International flights", "Personal expenses", "Travel insurance", "Additional activities", "Meals not specified"]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">
            {t("Loading destination details...", "destinations")}
          </p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("Destination Not Found", "destinations")}</h2>
          <p className="text-gray-600 mb-6">{t("The destination you're looking for doesn't exist or has been removed.", "destinations")}</p>
          <Link to="/destinations" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            {t("Back to All Destinations", "destinations")}
          </Link>
        </div>
      </div>
    );
  }

  // Next image in gallery
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mockImages.length);
  };

  // Previous image in gallery
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mockImages.length) % mockImages.length);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section with Full Width Image */}
      <div className="h-[50vh] lg:h-[60vh] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/80" />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white max-w-4xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {destination.name}
            </motion.h1>
            <motion.div 
              className="flex items-center justify-center text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FaMapMarkerAlt className="mr-2" />
              <span>{destination.location}</span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mx-auto w-max"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex text-yellow-400 mr-2">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span>{destination.rating}</span>
              <span className="ml-1 text-sm">({destination.reviews})</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <Link to="/destinations" className="flex items-center text-blue-600 hover:underline font-medium">
                  <FaChevronLeft className="mr-2" />
                  {t("Back to Destinations", "destinations")}
                </Link>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center p-2 rounded-full ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-100'}`}
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button className="flex items-center p-2 rounded-full text-gray-500 bg-gray-100">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
              
              {/* Description */}
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{t("About This Destination", "destinations")}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{destination.longDescription}</p>

              {/* Image Gallery */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{t("Gallery", "destinations")}</h2>
                <div className="relative">
                  <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={mockImages[currentImageIndex]} 
                      alt={`${destination.name} gallery ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors duration-300"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors duration-300"
                  >
                    <FaChevronRight />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {mockImages.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{t("Experience Highlights", "destinations")}</h2>
                <ul className="space-y-3">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{t("Your Itinerary", "destinations")}</h2>
                <div className="space-y-6">
                  {destination.itinerary.map((day) => (
                    <div key={day.day} className="bg-blue-50 p-5 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-blue-800">
                          {t("Day", "destinations")} {day.day}: {day.title}
                        </h3>
                        <div className="flex items-center text-blue-600 text-sm mt-1 sm:mt-0">
                          <FaRegClock className="mr-1" />
                          <span>Full day</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking and Details */}
          <div>
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{t("Package Price", "destinations")}</h3>
                    <div className="flex items-center mt-1">
                      <FaRegClock className="mr-1 text-blue-200" />
                      <span className="text-blue-100">
                        {destination.duration} {t("days", "common")}
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold">${destination.price}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <FaUsers className="mr-2 text-blue-500" />
                    {t("Travelers", "destinations")}
                  </div>
                  <div>
                    <select className="form-select rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm">
                      <option>1 {t("Person", "destinations")}</option>
                      <option>2 {t("People", "destinations")}</option>
                      <option>3 {t("People", "destinations")}</option>
                      <option>4 {t("People", "destinations")}</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {t("Travel Date", "destinations")}
                  </div>
                  <div>
                    <input 
                      type="date" 
                      className="form-input rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                    />
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium my-2 transition-colors duration-300 flex items-center justify-center">
                  {t("Book This Package", "destinations")}
                </button>
                
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300">
                  {t("Check Availability", "destinations")}
                </button>

                {/* What's Included */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-4">{t("What's Included", "destinations")}</h4>
                  <ul className="space-y-2">
                    {destination.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Not Included */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">{t("Not Included", "destinations")}</h4>
                  <ul className="space-y-2">
                    {destination.excludes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Support */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600 text-center mb-2">
                    {t("Need help with this package?", "destinations")}
                  </p>
                  <button className="w-full flex items-center justify-center bg-green-50 text-green-600 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors duration-300">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {t("Contact Support", "destinations")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Destinations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">{t("You Might Also Like", "destinations")}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Placeholder for related destinations */}
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 bg-blue-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-blue-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-8 bg-blue-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
