import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GardenPage from './pages/GardenPage';
import PlantsPage from './pages/PlantsPage';
import PlantDetailPage from './pages/PlantDetailPage';
import ToursPage from './pages/ToursPage';
import MyGardenPage from './pages/MyGardenPage';
import ChatPage from './pages/ChatPage';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(8px)',
    x: 50,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(4px)',
    x: -50,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Ayurvedic mandala bloom transition
const MandalaTransition = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
  >
    {/* Center mandala bloom */}
    <motion.div
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: 1.5, rotate: 90, opacity: [0, 0.3, 0] }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute"
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 70%)',
        boxShadow: '0 0 60px rgba(16, 185, 129, 0.2), 0 0 40px rgba(180, 83, 9, 0.15)',
      }}
    />
    
    {/* Ripple circles */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0.4 }}
        animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
        transition={{ 
          duration: 0.8,
          delay: i * 0.1,
          ease: "easeOut"
        }}
        className="absolute rounded-full border"
        style={{
          width: '150px',
          height: '150px',
          borderColor: i % 2 === 0 ? `rgba(16, 185, 129, ${0.25 - i * 0.08})` : `rgba(180, 83, 9, ${0.2 - i * 0.06})`,
          borderWidth: '1px',
        }}
      />
    ))}

    {/* Petal patterns */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`petal-${i}`}
        initial={{ scale: 0, opacity: 0, rotate: i * 60 }}
        animate={{ scale: 1, opacity: [0, 0.35, 0], rotate: i * 60 + 180 }}
        transition={{
          duration: 0.7,
          delay: i * 0.04,
          ease: "easeOut"
        }}
        className="absolute"
        style={{
          width: '80px',
          height: '80px',
          background: i % 2 === 0 
            ? `radial-gradient(ellipse at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)`
            : `radial-gradient(ellipse at center, rgba(180, 83, 9, 0.15) 0%, transparent 70%)`,
          transform: `rotate(${i * 60}deg) translateY(-120px)`,
          borderRadius: '50%',
          filter: 'blur(2px)',
        }}
      />
    ))}

    {/* Om symbol or chakra center */}
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -90 }}
      animate={{ scale: 1, opacity: [0, 0.7, 0], rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute text-4xl"
      style={{
        filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.5)) drop-shadow(0 0 8px rgba(180, 83, 9, 0.3))',
        background: 'linear-gradient(135deg, #10b981 0%, #b45309 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      ☸
    </motion.div>
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <HomePage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/garden"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <GardenPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/plants"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PlantsPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/plant/:id"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PlantDetailPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/tours"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ToursPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/tour/:tourId"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ToursPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/my"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <MyGardenPage />
              </motion.div>
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <MandalaTransition />
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ChatPage />
              </motion.div>
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Fixed background layer - never animates */}
        <div 
          className="fixed inset-0 bg-slate-950 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: "url('/images/hero.png')",
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'auto',
          }}
        />
        {/* Fixed dark overlay - stays consistent across all pages */}
        <div className="fixed inset-0 bg-black/70 -z-[9]" />
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
