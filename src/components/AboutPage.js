import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  FaHistory, 
  FaGlobe, 
  FaUsers, 
  FaTrophy, 
  FaLandmark, 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaHandshake, 
  FaRecycle,
  FaPlane,
  FaHotel,
  FaPassport,
  FaRoute,
  FaShieldAlt,
  FaSuitcaseRolling,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaHeadset // Added the missing FaHeadset import
} from "react-icons/fa"; 
import { useInView } from "react-intersection-observer";
// Import translation hook
import { useTranslation } from "../utils/TranslationContext";

// Enhanced responsive StatCard with better animations
const StatCard = ({ number, label, prefix = "", suffix = "", icon }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 40;
      const increment = number / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, number]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg 
                 transition-all duration-300 relative overflow-hidden group border border-gray-200"
      whileHover={{ scale: 1.02, y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        <h4 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 
                     bg-clip-text text-transparent mb-2">
          {prefix}{count}{suffix}
        </h4>
        <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {t(label, "about")}
        </p>
        <div className="h-1 w-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-2 
                     group-hover:w-20 transition-all duration-500 ease-out" />
      </motion.div>
    </motion.div>
  );
};

// Improved responsive Timeline with enhanced animations and updated colors
const Timeline = ({ events }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div ref={ref} className="relative max-w-3xl mx-auto mt-10 sm:mt-16 mb-12 sm:mb-20 px-4 sm:px-2">
      {/* Mobile timeline (vertical) with enhanced animations */}
      <div className="md:hidden relative pl-10 space-y-8">
        <motion.div 
          className="absolute h-full w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 
                    left-0 rounded-full" 
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: "100%", opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            className="relative"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.3, 
              type: "spring", 
              stiffness: 50,
              damping: 10
            }}
          >
            {/* Fixed animation - using separate animations instead of array with 3 values */}
            <motion.div 
              className="absolute w-5 h-5 bg-blue-600 rounded-full left-0 -translate-x-[10px] mt-1.5 border-2 border-white shadow-lg z-10"
              whileHover={{ scale: 1.4, boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1, boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)" } : {}}
              transition={{ 
                delay: index * 0.3 + 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 200
              }}
            >
              {/* Add glow effect with regular motion.div animation which supports multiple keyframes */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400 opacity-40"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              />
              {event.icon && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                  {event.icon}
                </div>
              )}
            </motion.div>
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-500 group z-20"
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div className="flex flex-col space-y-2">
                <motion.span 
                  className="inline-block px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full font-bold 
                          mb-2 group-hover:bg-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  {event.year}
                </motion.span>
                {event.title && (
                  <h4 className="font-bold text-gray-800">{t(event.title, "about")}</h4>
                )}
                <motion.p 
                  className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                >
                  {t(event.description, "about")}
                </motion.p>
                {event.achievement && (
                  <div className="mt-2 px-3 py-1 bg-blue-50/50 border border-blue-100 rounded-md text-sm text-blue-800">
                    {t(event.achievement, "about")}
                  </div>
                )}
                <motion.div 
                  className="h-1 w-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mt-3"
                  animate={inView ? { width: "40%" } : { width: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.3 + 0.5, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Desktop timeline with blue color scheme */}
      <div className="hidden md:block">
        <motion.div 
          className="absolute h-full w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 
                    left-1/2 transform -translate-x-1/2 rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: "100%", opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-10`}
            initial={{ 
              opacity: 0, 
              x: index % 2 === 0 ? -100 : 100,
              scale: 0.9 
            }}
            animate={inView ? { 
              opacity: 1, 
              x: 0,
              scale: 1 
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.4, 
              type: "spring", 
              stiffness: 40,
              damping: 15
            }}
          >
            <div className="w-1/2 px-6">
              <motion.div 
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200
                        hover:shadow-xl transition-all duration-500 group"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "rgba(239, 246, 255, 0.6)" // Light blue bg on hover
                }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <motion.span 
                    className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold 
                              group-hover:bg-blue-100 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      y: [0, -3, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut", 
                      delay: index * 0.2,
                      times: [0, 0.5, 1] 
                    }}
                  >
                    {event.year}
                    {/* Add shadow animation as a separate element */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 3px 10px rgba(59, 130, 246, 0.2)"]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    />
                  </motion.span>
                  {event.icon && (
                    <motion.div
                      className="text-blue-600 text-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.4 + 0.3, type: "spring" }}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      {event.icon}
                    </motion.div>
                  )}
                </div>
                
                {event.title && (
                  <h4 className="font-bold text-gray-800 mb-2">{t(event.title, "about")}</h4>
                )}

                <motion.p 
                  className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.4 + 0.3 }}
                >
                  {t(event.description, "about")}
                </motion.p>

                {event.achievement && (
                  <motion.div 
                    className="mt-3 px-3 py-1.5 bg-blue-50/50 border border-blue-100 rounded-md text-sm text-blue-800"
                    initial={{ opacity: 0, y: 5 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.4 + 0.5 }}
                  >
                    <div className="flex items-center space-x-1.5">
                      <FaTrophy className="text-amber-500" />
                      <span>{t(event.achievement, "about")}</span>
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full mt-3 
                          group-hover:w-full transition-all duration-700 ease-out"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "70%" } : {}}
                  transition={{ duration: 0.8, delay: index * 0.4 + 0.5, ease: "easeOut" }}
                />
              </motion.div>
            </div>
            {/* Blue dot in timeline */}
            <motion.div 
              className={`absolute w-7 h-7 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 mt-3 border-2 border-white shadow-lg z-10`}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1, boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" } : {}}
              transition={{ 
                delay: index * 0.4 + 0.2,
                duration: 1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.5, 
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)"
              }}
            >
              {/* Icon in the timeline dot */}
              {event.icon && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                  {event.icon}
                </div>
              )}
              {/* Separate pulsing animation */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400 opacity-50"
                animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: index * 0.3,
                  times: [0, 0.5, 1]
                }}
              />
            </motion.div>
            {/* Connect line from dot to content */}
            <motion.div
              className={`absolute top-[1.45rem] h-0.5 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-600 to-transparent right-1/2' : 'from-transparent to-blue-600 left-1/2'} w-[5%]`}
              initial={{ width: "0%" }}
              animate={inView ? { width: "5%" } : {}}
              transition={{ duration: 0.3, delay: index * 0.4 + 0.6 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Enhanced AnimatedSection with blue color scheme and improved animations
const AnimatedSection = ({ icon, title, children, delay }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const iconColors = {
    FaHistory: "from-blue-500 to-indigo-600",
    FaLeaf: "from-teal-500 to-green-600",
    FaUsers: "from-cyan-500 to-blue-500",
    FaLandmark: "from-indigo-500 to-blue-600",
    FaMapMarkerAlt: "from-blue-400 to-blue-600"
  };

  return (
    <motion.section
      ref={ref}
      className="group mb-12 sm:mb-16 p-5 sm:p-7 bg-white rounded-xl shadow-lg 
                 hover:shadow-xl transition-all duration-300 border-l-4 border-transparent 
                 hover:border-blue-400 relative overflow-hidden mx-4 sm:mx-auto"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 80 }}
      whileHover={{ y: -5 }}
    >
      {/* Enhanced background gradient effect with blue colors */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 
                    transition-all duration-500 ease-in-out -z-10" 
        style={{ background: icon ? `linear-gradient(to right, var(--${iconColors[icon.type.name] || "from-blue-400 to-blue-600"}))` : '' }} 
        animate={inView ? { scale: [0.9, 1.05, 1] } : {}}
        transition={{ duration: 1, delay: delay + 0.3 }}
      />

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          whileHover={{ x: 5 }}
        >
          {icon &&
            React.cloneElement(icon, {
              className: `text-3xl sm:text-4xl bg-gradient-to-r ${iconColors[icon.type.name] || "from-blue-500 to-indigo-600"} 
                         bg-clip-text text-transparent transform transition-transform 
                         duration-500 group-hover:scale-105`,
            })}
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                       bg-clip-text text-transparent">
            {t(title, "about")}
          </h3>
        </motion.div>

        <motion.div
          className="pl-3 sm:pl-14 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <motion.div 
            className="h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-400 
                       rounded-full group-hover:w-24 transition-all duration-500 ease-out"
          />
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {children}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced sustainability metric card
const SustainabilityMetricCard = ({ icon, label, percentage }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div 
      ref={ref}
      className="relative bg-white rounded-xl p-8 shadow-lg group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-transparent opacity-0 
                    group-hover:opacity-100 transition-all duration-500 ease-out" />
      <div className="relative z-10">
        {icon && React.cloneElement(icon, { 
          className: "text-5xl text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300"
        })}
        <h3 className="text-xl font-bold text-gray-800 mb-4">{label}</h3>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ width: 0 }}
            animate={inView ? { width: `${percentage}%` } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <motion.p 
          className="text-3xl font-bold text-blue-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {percentage}%
        </motion.p>
      </div>
    </motion.div>
  );
};

// NEW: Interactive Map Component to show global presence
const InteractiveMap = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const locations = [
    { id: 1, name: "New York", x: 25, y: 35, details: "North American headquarters & customer service center" },
    { id: 2, name: "London", x: 45, y: 25, details: "European operations & partnership management" },
    { id: 3, name: "Dubai", x: 58, y: 45, details: "Middle East booking center & luxury experiences" },
    { id: 4, name: "Singapore", x: 75, y: 60, details: "Asia-Pacific headquarters & tech innovation hub" }
  ];

  return (
    <motion.div 
      className="relative mx-auto max-w-3xl h-[400px] bg-blue-50 rounded-xl shadow-md overflow-hidden mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* World map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white opacity-70">
        <img 
          src="/images/world-map-outline.svg" 
          alt="World Map" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative w-full h-full">
        {locations.map(location => (
          <motion.div 
            key={location.id}
            className="absolute cursor-pointer"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            whileHover={{ scale: 1.2 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => setActiveLocation(location)}
          >
            <motion.div 
              className="w-4 h-4 bg-blue-600 rounded-full relative"
              animate={{ boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.5)", "0 0 0 10px rgba(59, 130, 246, 0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-blue-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {location.name}
            </div>
          </motion.div>
        ))}
        
        {/* Location details popup */}
        <AnimatePresence>
          {activeLocation && (
            <motion.div 
              className="absolute bottom-5 left-5 right-5 bg-white p-4 rounded-lg shadow-lg border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-blue-800">{activeLocation.name}</h3>
                <button 
                  onClick={() => setActiveLocation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mt-1">{activeLocation.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// NEW: InfoCard component for quick facts
const InfoCard = ({ title, content, icon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div 
      className="h-[200px] perspective-1000"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="w-full h-full relative cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 flex flex-col items-center justify-center text-white backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {icon && React.cloneElement(icon, { className: "text-4xl mb-3" })}
          <h3 className="text-xl font-bold text-center">{title}</h3>
          <div className="mt-4 text-sm text-blue-100">Click to learn more</div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute inset-0 bg-white rounded-xl p-6 border border-blue-100 flex items-center justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-gray-700 text-center">{content}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// NEW: ValueCard for core values section
const ValueCard = ({ icon, title, description }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
        {icon && React.cloneElement(icon, { className: "text-2xl text-blue-600" })}
      </div>
      <h3 className="text-xl font-bold mb-3 text-blue-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-4 group-hover:w-24 transition-all duration-300 ease-out" />
    </motion.div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Reference for parallax effect
  const containerRef = useRef(null);
  
  // Updated achievements for VoyageVista travel company
  const achievements = [
    { 
      year: 2018, 
      title: "Company Founding",
      description: "VoyageVista was launched with a vision to transform online travel booking through personalized experiences and cutting-edge technology.",
      achievement: "First 1,000 successful bookings milestone achieved",
      icon: <FaPlane />
    },
    { 
      year: 2019, 
      title: "Mobile App Launch",
      description: "Released our award-winning mobile app with instant booking capabilities and personalized travel recommendations.",
      achievement: "Featured in 'Top Travel Apps of 2019'",
      icon: <FaRoute />
    },
    { 
      year: 2020, 
      title: "Pandemic Resilience",
      description: "Pivoted to focus on virtual travel experiences and flexible booking options to support travelers during the global pandemic.",
      achievement: "Developed innovative FlexBook™ cancellation policy",
      icon: <FaShieldAlt />
    },
    { 
      year: 2022, 
      title: "Global Expansion",
      description: "Expanded operations to 30+ countries with localized experiences and multilingual support for travelers worldwide.",
      achievement: "Partnership with 500+ premium hotels worldwide",
      icon: <FaGlobe />
    },
    { 
      year: 2023, 
      title: "AI-Powered Travel Planning",
      description: "Launched revolutionary AI travel assistant that creates personalized itineraries based on traveler preferences and interests.",
      achievement: "Travel Tech Innovation Award Winner",
      icon: <FaTrophy />
    }
  ];

  // Define responsible tourism metrics
  const responsibleTravelMetrics = [
    { icon: <FaLeaf />, label: t("Carbon-Offset Journeys", "about"), percentage: 75 },
    { icon: <FaHandshake />, label: t("Local Community Support", "about"), percentage: 85 },
    { icon: <FaRecycle />, label: t("Sustainable Partners", "about"), percentage: 90 }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30 overflow-hidden">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Header section - Enhanced with gradients */}
      <motion.div 
        className="relative max-w-6xl mx-auto text-center pt-24 pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 
                     bg-clip-text text-transparent relative inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {t("About VoyageVista", "about")}
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("Transforming the way you discover and experience the world since 2018", "about")}
        </motion.p>
      </motion.div>

      {/* Statistics Section - With enhanced blue gradient */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-20 px-4 sm:px-6">
        {[
          { number: 5, suffix: "M+", label: "Happy Travelers", icon: <FaUsers /> },
          { number: 190, suffix: "+", label: "Countries Covered", icon: <FaGlobe /> },
          { number: 350, suffix: "K+", label: "Trips Booked", icon: <FaSuitcaseRolling /> },
          { number: 98, suffix: "%", label: "Satisfaction Rate", icon: <FaTrophy /> }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Our Story Section */}
      <AnimatedSection icon={<FaHistory />} title="Our Journey" delay={0.1}>
        {t("VoyageVista was born in 2018 from a passion to make travel more accessible, personalized, and seamless. What began as a small startup has evolved into a global travel platform connecting millions of travelers with unforgettable experiences worldwide. Our journey has been defined by innovation, customer-centricity, and a deep love for exploration. We believe travel has the power to transform lives, broaden perspectives, and create lasting memories.", "about")}
      </AnimatedSection>

      {/* Our Mission Section */}
      <AnimatedSection icon={<FaRoute />} title="Our Mission" delay={0.2}>
        {t("At VoyageVista, our mission is to empower travelers through technology and exceptional service. We're dedicated to creating a world where planning your perfect trip is as enjoyable as the journey itself. Through our innovative platform, we connect travelers with authentic experiences while providing the tools to make informed decisions, seamless bookings, and unforgettable memories. We strive to make travel more accessible, sustainable, and enriching for everyone.", "about")}
      </AnimatedSection>

      {/* Core Values Section - NEW */}
      <motion.div
        className="max-w-5xl mx-auto mb-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
          {t("Our Core Values", "about")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<FaUsers />} 
            title={t("Customer Obsession", "about")} 
            description={t("We put travelers first and work backward from their needs to create exceptional experiences at every touchpoint.", "about")} 
          />
          <ValueCard 
            icon={<FaGlobe />} 
            title={t("Global Perspective", "about")} 
            description={t("We embrace diversity and cultural authenticity, celebrating the unique beauty and traditions of destinations worldwide.", "about")} 
          />
          <ValueCard 
            icon={<FaLeaf />} 
            title={t("Responsible Travel", "about")} 
            description={t("We promote sustainable tourism practices that respect local communities and preserve natural environments for future generations.", "about")} 
          />
          <ValueCard 
            icon={<FaRoute />} 
            title={t("Innovation", "about")} 
            description={t("We continuously explore new ways to enhance the travel experience through cutting-edge technology and creative solutions.", "about")} 
          />
          <ValueCard 
            icon={<FaHandshake />} 
            title={t("Trust & Transparency", "about")} 
            description={t("We build relationships based on honesty, reliability and clear communication with our customers and partners.", "about")} 
          />
          <ValueCard 
            icon={<FaPassport />} 
            title={t("Accessibility", "about")} 
            description={t("We work to make travel possible for people of all backgrounds, abilities, and budgets through inclusive design and offerings.", "about")} 
          />
        </div>
      </motion.div>

      {/* Destination Experience Showcase - NEW - Updated to use gradients instead of images */}
      <DestinationsShowcaseSection />

      {/* Quick Facts Section with flip cards */}
      <motion.div
        className="max-w-4xl mx-auto mb-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
          {t("VoyageVista Facts", "about")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InfoCard 
            title={t("24/7 Support", "about")} 
            content={t("Our global customer service team operates around the clock in 12 languages to assist travelers whenever and wherever they need help.", "about")} 
            icon={<FaHeadset />}
          />
          <InfoCard 
            title={t("Best Price Guarantee", "about")} 
            content={t("Find a lower price? We'll match it and give you an extra 10% off your booking as VoyageVista travel credit.", "about")} 
            icon={<FaTrophy />}
          />
          <InfoCard 
            title={t("AI-Powered Planning", "about")} 
            content={t("Our cutting-edge recommendation engine analyzes 50+ factors to suggest personalized itineraries that match your unique travel style.", "about")} 
            icon={<FaRoute />}
          />
        </div>
      </motion.div>

      {/* Global presence map */}
      <motion.div
        className="max-w-5xl mx-auto mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
          {t("Our Global Presence", "about")}
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto px-4">
          {t("Explore our worldwide offices providing localized service and expertise in major travel markets.", "about")}
        </p>
        <InteractiveMap />
      </motion.div>

      {/* Responsible Tourism Section */}
      <motion.div
        className="max-w-5xl mx-auto mb-20 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 rounded-2xl shadow-lg"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <FaLeaf className="text-4xl text-blue-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
              {t("Responsible Tourism Commitment", "about")}
            </h2>
          </div>
          
          <p className="text-gray-700 mb-10 text-lg">
            {t("At VoyageVista, we believe that travel should enrich both travelers and destinations. Our Positive Impact Initiative focuses on carbon-offset programs, supporting local communities, and partnering with eco-conscious accommodations and tour providers. Every booking contributes to preservation and community development projects worldwide.", "about")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {responsibleTravelMetrics.map((metric, index) => (
              <SustainabilityMetricCard 
                key={index}
                icon={metric.icon}
                label={metric.label}
                percentage={metric.percentage}
              />
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl mt-10 border border-blue-100 flex items-center">
            <div className="p-3 bg-blue-50 rounded-full mr-4">
              <FaTrophy className="text-2xl text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">{t("Award-Winning Sustainability", "about")}</h4>
              <p className="text-gray-600">
                {t("Recognized with the Global Sustainable Tourism Award for our innovative approach to responsible travel.", "about")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Achievement Timeline - Enhanced */}
      <motion.div 
        className="mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          {t("Our Journey to Excellence", "about")}
        </motion.h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto px-4">
          {t("Explore our company's milestones as we've evolved from an innovative startup to a global travel platform.", "about")}
        </p>
        <Timeline events={achievements} />
      </motion.div>
    </div>
  );
};

export default AboutPage;