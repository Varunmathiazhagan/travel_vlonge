import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "../utils/TranslationContext";
import { 
  FaSearch, 
  FaStar, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaFilter, 
  FaGlobeAmericas, 
  FaUmbrellaBeach, 
  FaMountain, 
  FaCity, 
  FaTree, 
  FaWater,
  FaSnowflake,
  FaPlane,
  FaTimesCircle
} from "react-icons/fa";

const DestinationsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [duration, setDuration] = useState([1, 14]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [activeView, setActiveView] = useState("grid");
  
  // Mock destination data
  const destinations = [
    {
      id: 1,
      name: "Santorini Paradise",
      location: "Santorini, Greece",
      description: "Experience the breathtaking views of white-washed buildings against the azure Aegean Sea.",
      price: 1299,
      duration: 7,
      rating: 4.8,
      reviews: 1245,
      image: "/images/destinations/santorini.jpg",
      featured: true,
      category: "beach"
    },
    {
      id: 2,
      name: "Alpine Retreat",
      location: "Swiss Alps, Switzerland",
      description: "Discover snow-capped peaks and luxurious chalets in the heart of the Swiss Alps.",
      price: 1899,
      duration: 5,
      rating: 4.9,
      reviews: 873,
      image: "/images/destinations/swiss-alps.jpg",
      featured: true,
      category: "mountain"
    },
    {
      id: 3,
      name: "Tokyo Adventure",
      location: "Tokyo, Japan",
      description: "Immerse yourself in the vibrant culture and modern technology of Japan's capital city.",
      price: 1499,
      duration: 8,
      rating: 4.7,
      reviews: 1052,
      image: "/images/destinations/tokyo.jpg",
      featured: false,
      category: "city"
    },
    {
      id: 4,
      name: "Bali Serenity",
      location: "Bali, Indonesia",
      description: "Relax in lush tropical paradise with ancient temples and pristine beaches.",
      price: 1099,
      duration: 10,
      rating: 4.6,
      reviews: 1892,
      image: "/images/destinations/bali.jpg",
      featured: true,
      category: "beach"
    },
    {
      id: 5,
      name: "Machu Picchu Explorer",
      location: "Cusco, Peru",
      description: "Trek through the Andes to discover this ancient Incan citadel with breathtaking views.",
      price: 2199,
      duration: 9,
      rating: 4.9,
      reviews: 762,
      image: "/images/destinations/machu-picchu.jpg",
      featured: false,
      category: "adventure"
    },
    {
      id: 6,
      name: "Serengeti Safari",
      location: "Serengeti, Tanzania",
      description: "Witness the great migration and experience close encounters with Africa's majestic wildlife.",
      price: 2899,
      duration: 6,
      rating: 4.8,
      reviews: 541,
      image: "/images/destinations/serengeti.jpg",
      featured: true,
      category: "adventure"
    },
    {
      id: 7,
      name: "Venice Romance",
      location: "Venice, Italy",
      description: "Glide through historic canals and discover the timeless charm of this floating city.",
      price: 1599,
      duration: 5,
      rating: 4.7,
      reviews: 1248,
      image: "/images/destinations/venice.jpg",
      featured: false,
      category: "city"
    },
    {
      id: 8,
      name: "Amazon Expedition",
      location: "Amazon Rainforest, Brazil",
      description: "Explore the world's largest rainforest and encounter incredible biodiversity.",
      price: 2399,
      duration: 12,
      rating: 4.6,
      reviews: 318,
      image: "/images/destinations/amazon.jpg",
      featured: false,
      category: "adventure"
    },
    {
      id: 9,
      name: "Northern Lights Quest",
      location: "Reykjavik, Iceland",
      description: "Chase the aurora borealis across the dramatic Icelandic landscapes.",
      price: 2199,
      duration: 6,
      rating: 4.9,
      reviews: 687,
      image: "/images/destinations/iceland.jpg",
      featured: true,
      category: "adventure"
    },
    {
      id: 10,
      name: "Great Barrier Reef Discovery",
      location: "Queensland, Australia",
      description: "Dive into crystal clear waters and explore the world's largest coral reef system.",
      price: 2499,
      duration: 8,
      rating: 4.8,
      reviews: 945,
      image: "/images/destinations/great-barrier-reef.jpg",
      featured: false,
      category: "beach"
    },
    {
      id: 11,
      name: "Paris Enchantment",
      location: "Paris, France",
      description: "Experience the romance, art, and culinary delights of the City of Light.",
      price: 1399,
      duration: 5,
      rating: 4.7,
      reviews: 2125,
      image: "/images/destinations/paris.jpg",
      featured: false,
      category: "city"
    },
    {
      id: 12,
      name: "Kyoto Cultural Journey",
      location: "Kyoto, Japan",
      description: "Step back in time through ancient temples, traditional tea houses, and serene gardens.",
      price: 1599,
      duration: 7,
      rating: 4.8,
      reviews: 872,
      image: "/images/destinations/kyoto.jpg",
      featured: true,
      category: "cultural"
    },
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: t("All Destinations", "destinations"), icon: <FaGlobeAmericas /> },
    { id: "beach", name: t("Beaches", "destinations"), icon: <FaUmbrellaBeach /> },
    { id: "mountain", name: t("Mountains", "destinations"), icon: <FaMountain /> },
    { id: "city", name: t("Cities", "destinations"), icon: <FaCity /> },
    { id: "adventure", name: t("Adventure", "destinations"), icon: <FaTree /> },
    { id: "cultural", name: t("Cultural", "destinations"), icon: <FaWater /> },
  ];

  // Filter destinations based on search term, category, price range, and duration
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || destination.category === activeCategory;
    
    const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
    
    const matchesDuration = destination.duration >= duration[0] && destination.duration <= duration[1];
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  // Toggle favorite status for a destination
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Featured destinations (up to 4)
  const featuredDestinations = destinations.filter(dest => dest.featured).slice(0, 4);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Hero Image - Using a placeholder for now */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url('/images/destinations/hero-bg.jpg')" }}>
          {/* Parallax Effect */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-blue-900/50" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Explore Dream Destinations", "destinations")}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-blue-100 max-w-3xl text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t("Discover incredible places around the world curated by travel experts for unforgettable experiences", "destinations")}
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="w-full max-w-2xl relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t("Search destinations, cities, or experiences...", "destinations")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-full bg-white/20 backdrop-blur-lg border border-white/10 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-blue-100 text-lg" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Featured Destinations */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 text-blue-900"
            variants={fadeInUp}
          >
            {t("Featured Destinations", "destinations")}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative rounded-xl overflow-hidden shadow-xl h-80 group cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-cover bg-center h-full w-full transition-transform duration-700 group-hover:scale-110"
                     style={{ backgroundImage: `url(${destination.image})` }} />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-1 text-sm" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{destination.rating} <span className="text-xs">({destination.reviews})</span></span>
                    </div>
                    <div className="text-lg font-bold">
                      ${destination.price}
                    </div>
                  </div>
                </div>
                
                {/* Favorite Button */}
                <button 
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                >
                  <FaHeart className={`${favorites.has(destination.id) ? 'text-red-500' : 'text-white'}`} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Filters and Categories */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Categories */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full flex items-center ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Filter Toggle Button */}
            <motion.button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaFilter className="mr-2" />
              {filtersVisible ? t("Hide Filters", "destinations") : t("Show Filters", "destinations")}
            </motion.button>
          </div>
          
          {/* Advanced Filters */}
          <AnimatePresence>
            {filtersVisible && (
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3">{t("Price Range", "destinations")}</h3>
                    <div className="px-2">
                      <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          step="100"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <h3 className="font-semibold mb-3">{t("Duration (days)", "destinations")}</h3>
                    <div className="px-2">
                      <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>{duration[0]} {t("days", "common")}</span>
                        <span>{duration[1]} {t("days", "common")}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={duration[1]}
                          onChange={(e) => setDuration([duration[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold mb-3">{t("View", "destinations")}</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveView("grid")}
                      className={`px-4 py-2 rounded-md ${activeView === "grid" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
                    >
                      {t("Grid", "destinations")}
                    </button>
                    <button
                      onClick={() => setActiveView("list")}
                      className={`px-4 py-2 rounded-md ${activeView === "list" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
                    >
                      {t("List", "destinations")}
                    </button>
                    <button
                      onClick={() => setActiveView("map")}
                      className={`px-4 py-2 rounded-md ${activeView === "map" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
                    >
                      {t("Map", "destinations")}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Filtered Results */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">
              {filteredDestinations.length} {t("Destinations", "destinations")}
              {activeCategory !== "all" && ` - ${categories.find(cat => cat.id === activeCategory)?.name}`}
            </h2>
            
            {/* Clear Filters Button - only show if filters are applied */}
            {(activeCategory !== "all" || searchTerm || priceRange[0] > 0 || priceRange[1] < 5000 || duration[0] > 1 || duration[1] < 14) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchTerm("");
                  setPriceRange([0, 5000]);
                  setDuration([1, 14]);
                }}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <FaTimesCircle className="mr-1" />
                {t("Clear Filters", "destinations")}
              </button>
            )}
          </div>

          {filteredDestinations.length === 0 ? (
            <motion.div
              className="bg-white p-10 rounded-xl shadow text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaSearch className="text-5xl text-blue-200 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{t("No Destinations Found", "destinations")}</h3>
              <p className="text-gray-500">{t("Try adjusting your filters or search term", "destinations")}</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              layout
            >
              {activeView === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDestinations.map((destination) => (
                    <DestinationCard 
                      key={destination.id}
                      destination={destination}
                      isFavorite={favorites.has(destination.id)}
                      onToggleFavorite={() => toggleFavorite(destination.id)}
                    />
                  ))}
                </div>
              )}

              {activeView === "list" && (
                <div className="space-y-6">
                  {filteredDestinations.map((destination) => (
                    <DestinationListItem 
                      key={destination.id}
                      destination={destination}
                      isFavorite={favorites.has(destination.id)}
                      onToggleFavorite={() => toggleFavorite(destination.id)}
                    />
                  ))}
                </div>
              )}

              {activeView === "map" && (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <FaGlobeAmericas className="text-5xl text-blue-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t("Map View", "destinations")}</h3>
                    <p className="text-gray-500">{t("Interactive map would be displayed here", "destinations")}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </section>
      </div>
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16 mt-24">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("Get Exclusive Travel Deals", "destinations")}
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto mb-8 text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("Subscribe to our newsletter and receive special offers, travel tips, and exclusive early-bird discounts.", "destinations")}
          </motion.p>
          
          <motion.div 
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <input 
              type="email" 
              placeholder={t("Your email address", "destinations")}
              className="w-full px-5 py-3 pr-32 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 backdrop-blur-sm border border-white/10 text-white placeholder-blue-100"
            />
            <button className="absolute right-1 top-1 bg-white text-blue-800 font-medium rounded-full px-6 py-2 hover:bg-blue-50 transition-colors duration-300">
              {t("Subscribe", "destinations")}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination, isFavorite, onToggleFavorite }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <FaHeart className={`${isFavorite ? 'text-red-500' : 'text-white'}`} />
        </button>
        
        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ${destination.price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-blue-900">{destination.name}</h3>
        <div className="flex items-center mb-2 text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          <span>{destination.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{destination.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">{destination.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({destination.reviews})</span>
            </div>
            <div className="text-sm text-gray-600">
              {destination.duration} {t("days", "common")}
            </div>
          </div>
          
          <Link to={`/destination/${destination.id}`}>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 font-medium">
              {t("Explore", "destinations")}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Destination List Item Component
const DestinationListItem = ({ destination, isFavorite, onToggleFavorite }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row"
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-auto md:w-1/3 lg:w-1/4 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        <button 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          onClick={onToggleFavorite}
        >
          <FaHeart className={`${isFavorite ? 'text-red-500' : 'text-gray-300'}`} />
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-2xl font-bold text-blue-900">{destination.name}</h3>
          <div className="flex items-center mt-2 md:mt-0">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              ${destination.price}
            </div>
            <div className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {destination.duration} {t("days", "common")}
            </div>
          </div>
        </div>
        
        <div className="flex items-center my-3 text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          <span>{destination.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4">{destination.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {Array(5).fill(0).map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"} 
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">{destination.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({destination.reviews} reviews)</span>
            </div>
          </div>
          
          <Link to={`/destination/${destination.id}`}>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 font-medium">
              {t("View Details", "destinations")}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationsPage;
