"use client"
import { motion, useScroll } from "framer-motion"
import { Link } from "react-router-dom"
import { FaGlobe, FaPlane, FaHotel, FaChevronDown, FaQuoteLeft, FaImages, FaUmbrellaBeach, FaCar, FaPassport, FaMapMarkedAlt, FaCheckCircle, FaShieldAlt, FaSuitcase, FaAward, FaClipboardCheck, FaCompass, FaCreditCard, FaConciergeBell, FaCalendarAlt } from "react-icons/fa"
import { useInView } from "react-intersection-observer"
import { useTranslation } from "../utils/TranslationContext"

// Add ScrollProgressBar component
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// VideoBackground Component
const VideoBackground = () => {
  const { t } = useTranslation()
  
  return (
    <div className="relative h-screen w-screen overflow-hidden -mt-16 md:-mt-[4.5rem]">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full scale-105 transform-gpu"
      >
        <source src="/images/b.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-black/70 flex items-center justify-center">
        <motion.div
          className="text-center px-4 pt-16 md:pt-[4.5rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
            {t("Discover Your", "home")} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">{t("Perfect Getaway", "home")}</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">{t("Unforgettable journeys begin with VoyageVista - Your premium travel companion", "home")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations">
              <motion.button
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-blue-500/50 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <FaGlobe className="mr-2" />
                  {t("Explore Destinations", "home")}
                </span>
              </motion.button>
            </Link>
            <Link to="/packages">
              <motion.button
                className="group bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <FaSuitcase className="mr-2" />
                  {t("View Packages", "home")}
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <FaChevronDown className="text-white text-4xl opacity-80" />
      </motion.div>
    </div>
  )
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-blue-100/30"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="flex items-center justify-center mb-6 text-5xl text-blue-600"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

// Features Section
const FeaturesSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      className="text-center px-4 md:px-16 py-24 relative bg-gradient-to-b from-white to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        {t("Experience", "home")} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{t("VoyageVista", "footer")}</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
        {t("Your premium gateway to extraordinary destinations and unforgettable experiences around the globe", "home")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<FaGlobe />}
          title={t("Global Destinations", "home")}
          description={t("Access to over 190+ countries and 10,000+ curated destinations worldwide", "home")}
        />
        <FeatureCard
          icon={<FaPlane />}
          title={t("Seamless Booking", "home")}
          description={t("One-click booking for flights, hotels, and experiences with instant confirmation", "home")}
        />
        <FeatureCard
          icon={<FaHotel />}
          title={t("Premium Stays", "home")}
          description={t("Handpicked luxury, boutique and exclusive accommodations with special perks", "home")}
        />
        <FeatureCard
          icon={<FaConciergeBell />}
          title={t("Personal Concierge", "home")}
          description={t("24/7 dedicated travel assistant for all your needs before and during your journey", "home")}
        />
      </div>
    </motion.section>
  )
}

// Enhanced WhyChooseUsSection with hover animations
const WhyChooseUsSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Create translated list items
  const whyChooseItems = [
    t("Premium partnerships with luxury hotels and airlines for exclusive member rates", "home"),
    t("Advanced AI trip planning that adapts to your preferences and travel style", "home"),
    t("Flexible booking with free cancellation up to 48 hours before departure", "home"),
    t("Price match guarantee plus 10% VoyageVista credit if you find a better deal", "home"),
    t("Personalized travel guides and mobile app with offline access during your journey", "home"),
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16 px-6 md:px-16 rounded-lg shadow-2xl mx-4 md:mx-16 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-100">
        {t("Why Choose", "home")} <span className="text-white">{t("VoyageVista", "footer")}?</span>
      </h2>
      <ul className="space-y-6 max-w-4xl mx-auto">
        {whyChooseItems.map((item, index) => (
          <motion.li
            key={`item${index + 1}`}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            whileHover={{ x: 10, color: '#93c5fd' }}
            className="flex items-start cursor-pointer transition-colors duration:300 group"
            role="listitem"
            aria-label={item}
          >
            <div className="mr-4 p-2 bg-blue-700/50 rounded-full group-hover:bg-blue-600 transition-colors">
              <FaCheckCircle className="text-blue-300 text-xl" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed pt-1">{item}</p>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
}

// New Testimonials Section
const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      text: t("VoyageVista transformed our honeymoon with their premium package to the Maldives. Their attention to detail made every moment magical.", "home"),
      author: "Emily & James",
      company: t("Newlyweds", "home"),
      image: "/images/testimonial1.jpg"
    },
    {
      text: t("As a business traveler, their concierge service is invaluable. They arranged everything for my multi-city Asian tour seamlessly.", "home"),
      author: "Michael Chen",
      company: t("Executive Traveler", "home"),
      image: "/images/testimonial2.jpg"
    },
    {
      text: t("Their AI planner created the perfect European itinerary for my family of five. The kids loved the activities and we loved the luxury accommodations.", "home"),
      author: "The Rodriguez Family",
      company: t("Family Explorers", "home"),
      image: "/images/testimonial3.jpg"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 md:px-16 bg-gradient-to-b from-white to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-blue-900">
        {t("Travel Stories From Our Explorers", "home")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <FaQuoteLeft className="text-blue-600 text-2xl" />
              </div>
            </div>
            <p className="text-gray-700 mb-6 italic text-center">{testimonial.text}</p>
            <div className="border-t border-blue-100 pt-6 text-center">
              <p className="font-semibold text-blue-900">{testimonial.author}</p>
              <p className="text-blue-600">{testimonial.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Travel Insurance Section
const TravelInsuranceSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 md:px-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-blue-800/50 p-8 rounded-2xl border border-blue-700/50 shadow-2xl"
          >
            <FaShieldAlt className="text-5xl mb-6 text-blue-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                {t("Premium Travel Protection", "home")}
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t("Travel with absolute peace of mind knowing you're covered by our comprehensive insurance packages tailored to your journey.", "home")}
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-300 mr-3" />
                <span>{t("Emergency medical coverage up to $1,000,000", "home")}</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-300 mr-3" />
                <span>{t("Trip cancellation and interruption protection", "home")}</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-300 mr-3" />
                <span>{t("Lost luggage and personal belongings coverage", "home")}</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-300 mr-3" />
                <span>{t("24/7 emergency assistance worldwide", "home")}</span>
              </li>
            </ul>
            <Link to="/insurance">
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg shadow-blue-500/30 w-full flex justify-center items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaShieldAlt className="mr-2" />
                {t("Explore Insurance Options", "home")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <div className="md:w-1/2">
          <motion.img
            src="/images/travel-insurance.jpg" 
            alt="Travel Insurance"
            className="rounded-2xl shadow-2xl object-cover w-full h-full max-h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

// Destinations Showcase Section
const DestinationsShowcaseSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const destinations = [
    { 
      name: t("Santorini, Greece", "home"), 
      image: "/images/rc.jpeg", 
      description: t("Luxury villas with infinity pools overlooking the Aegean Sea", "home"),
      price: "$1,299"
    },
    { 
      name: t("Bali, Indonesia", "home"), 
      image: "/images/co.jpeg", 
      description: t("Private beach resorts with traditional Balinese spa treatments", "home"),
      price: "$1,099"
    },
    { 
      name: t("Kyoto, Japan", "home"), 
      image: "/images/rs.jpeg", 
      description: t("Cultural immersion with exclusive access to ancient temples", "home"),
      price: "$1,499"
    },
    { 
      name: t("Machu Picchu, Peru", "home"), 
      image: "/images/v.jpeg", 
      description: t("Guided heritage tours with luxury mountain accommodations", "home"),
      price: "$1,899"
    }
  ]

  return (
    <motion.section
      ref={ref}
      className="py-24 px-6 md:px-16 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">
          {t("Trending Destinations", "home")}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {t("Discover our handpicked selection of premium vacation experiences", "home")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {destinations.map((destination, index) => (
          <motion.div
            key={`destination-${index}`}
            className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-blue-100"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
          >
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
                {t("from", "home")} {destination.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-blue-900">{destination.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
              <div className="flex justify-between items-center">
                <Link to="/destinations">
                  <motion.button
                    className="text-blue-600 font-semibold text-sm inline-flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    {t("View Packages", "home")}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
                <div className="flex items-center">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-16">
        <Link to="/destinations">
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCompass className="mr-3 text-xl" />
            {t("Explore All Destinations", "home")}
          </motion.button>
        </Link>
      </div>
    </motion.section>
  )
}

// Travel Process Section
const TravelProcessSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      title: t("Discover & Plan", "home"),
      description: t("Browse destinations and get personalized recommendations from our AI trip planner", "home"),
      icon: <FaCompass className="text-3xl text-white" />
    },
    {
      title: t("Customize & Book", "home"),
      description: t("Tailor your perfect itinerary and secure your reservation with our flexible payment options", "home"),
      icon: <FaCalendarAlt className="text-3xl text-white" />
    },
    {
      title: t("Prepare & Go", "home"),
      description: t("Access digital travel documents and pre-trip information through your personal travel portal", "home"),
      icon: <FaSuitcase className="text-3xl text-white" />
    },
    {
      title: t("Experience & Share", "home"),
      description: t("Enjoy premium support during your journey and earn rewards by sharing your experiences", "home"),
      icon: <FaGlobe className="text-3xl text-white" />
    }
  ]

  return (
    <motion.section
      ref={ref}
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-blue-900">
        {t("Your Journey With VoyageVista", "home")}
      </h2>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Connect line */}
        <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-indigo-500 transform -translate-x-1/2 z-0"></div>
        
        <div className="space-y-24 lg:space-y-0 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={`step-${index}`}
              className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <motion.div 
                  className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-blue-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.icon}
                </motion.div>
              </div>
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12 text-left' : 'lg:pr-12 text-right'}`}>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-800">{step.title}</h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-20">
        <Link to="/how-it-works">
          <motion.button
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-8 py-3 rounded-xl font-medium text-lg transition duration-200 inline-flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("Learn More About Our Process", "home")}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.section>
  )
}

// Travel Styles Section
const TravelStylesSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const travelStyles = [
    {
      name: t("Luxury Escapes", "home"),
      icon: <FaUmbrellaBeach className="text-blue-500" />,
      description: t("Five-star accommodations with exclusive access to premium experiences", "home")
    },
    {
      name: t("Adventure Travel", "home"),
      icon: <FaMapMarkedAlt className="text-blue-500" />,
      description: t("Custom expeditions with expert guides to the world's most thrilling destinations", "home")
    },
    {
      name: t("Family Vacations", "home"),
      icon: <FaSuitcase className="text-blue-500" />,
      description: t("Carefully planned itineraries with activities for all ages and family-friendly accommodations", "home")
    },
    {
      name: t("Business Travel", "home"),
      icon: <FaPassport className="text-blue-500" />,
      description: t("Streamlined business trips with priority services and workspaces at premium locations", "home")
    },
  ]

  return (
    <motion.section
      ref={ref}
      className="py-24 px-6 md:px-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("Travel Your Way", "home")}</h2>
          <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            {t("Discover experiences tailored to your unique travel style and preferences", "home")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelStyles.map((style, index) => (
            <motion.div
              key={`style-${index}`}
              className="bg-blue-800/50 p-8 rounded-2xl border border-blue-700/40 flex items-start gap-6 hover:bg-blue-800/70 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="bg-blue-700/50 p-4 rounded-full flex-shrink-0">
                <div className="text-4xl">{style.icon}</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{style.name}</h3>
                <p className="text-blue-200 mb-4">{style.description}</p>
                <Link to="/travel-styles">
                  <motion.button
                    className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-lg inline-flex items-center text-sm border border-blue-600/30"
                    whileHover={{ x: 3 }}
                  >
                    {t("Explore Packages", "home")}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-blue-800/30 p-6 rounded-2xl border border-blue-700/30 flex items-center">
            <FaAward className="text-4xl text-blue-400 mr-6" />
            <div>
              <span className="block text-2xl font-bold text-blue-100 mb-1">{t("Tailor-Made Journeys", "home")}</span>
              <span className="text-blue-300">{t("Can't find what you're looking for? Our travel experts will craft a custom itinerary just for you.", "home")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Travel Security Section
const TravelSecuritySection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const securityFeatures = [
    {
      title: t("Secure Payments", "home"),
      description: t("Advanced encryption and multi-factor authentication protect your financial information", "home"),
      icon: <FaCreditCard />
    },
    {
      title: t("Verified Partners", "home"),
      description: t("All hotels and service providers undergo rigorous screening and quality assessments", "home"),
      icon: <FaCheckCircle />
    },
    {
      title: t("Global Assistance", "home"),
      description: t("Premium support team available in multiple languages for any emergency situation", "home"),
      icon: <FaGlobe />
    },
    {
      title: t("Travel Monitoring", "home"),
      description: t("Real-time tracking of travel conditions with automated alerts and itinerary adjustments", "home"),
      icon: <FaShieldAlt />
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: [0.8, 1.2, 1] } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <FaShieldAlt className="text-5xl text-blue-600 mb-6" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">
            {t("Your Security Is Our Priority", "home")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("Travel with absolute confidence knowing every aspect of your journey is protected", "home")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={`security-${index}`}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-5">
                <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-blue-800 rounded-2xl shadow-2xl py-12 px-6 md:px-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-around space-y-10 md:space-y-0">
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">5M+</p>
              <p className="text-blue-200">{t("Happy Travelers", "home")}</p>
            </div>
            
            <div className="h-16 w-px bg-gradient-to-b from-blue-500 to-blue-700 hidden md:block"></div>
            
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">190+</p>
              <p className="text-blue-200">{t("Countries", "home")}</p>
            </div>
            
            <div className="h-16 w-px bg-gradient-to-b from-blue-500 to-blue-700 hidden md:block"></div>
            
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">24/7</p>
              <p className="text-blue-200">{t("Premium Support", "home")}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Update HomePage component
const HomePage = () => {
  return (
    <div className="relative">
      <ScrollProgressBar />
      <VideoBackground />
      <div className="space-y-0 bg-gradient-to-b from-white via-blue-50 to-white">
        <FeaturesSection />
        <DestinationsShowcaseSection /> 
        <WhyChooseUsSection />
        <TravelProcessSection />
        <TravelStylesSection />
        <TravelSecuritySection />
        <TestimonialsSection />
        <TravelInsuranceSection />
      </div>
    </div>
  )
}

export default HomePage

