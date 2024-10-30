// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";
import AlgorithmPage from "./pages/AlgorithmPage";
import ScrollToTop from "./components/ScrollToTop";

const pageVariants = {
 initial: {
   opacity: 0,
   y: 20,
   backgroundColor: "#000"
 },
 animate: {
   opacity: 1,
   y: 0,
   backgroundColor: "#000"
 },
 exit: {
   opacity: 0,
   y: -20,
   backgroundColor: "#000"
 }
};

const pageTransition = {
 type: "tween",
 ease: "easeInOut",
 duration: 0.3
};

const AnimatedRoutes = () => {
 const location = useLocation();
 
 return (
   <AnimatePresence mode="wait">
     <motion.div 
       style={{ backgroundColor: '#000' }}
       className="min-h-screen"
     >
       <Routes location={location} key={location.pathname}>
         <Route path="/" element={
           <motion.div
             initial="initial"
             animate="animate"
             exit="exit"
             variants={pageVariants}
             transition={pageTransition}
           >
             <HomePage />
           </motion.div>
         } />
         <Route path="/explore" element={
           <motion.div
             initial="initial"
             animate="animate"
             exit="exit"
             variants={pageVariants}
             transition={pageTransition}
           >
             <VisualizerPage />
           </motion.div>
         } />
         <Route path="/explore/:algorithmId" element={
           <motion.div
             initial="initial"
             animate="animate"
             exit="exit"
             variants={pageVariants}
             transition={pageTransition}
           >
             <AlgorithmPage />
           </motion.div>
         } />
       </Routes>
     </motion.div>
   </AnimatePresence>
 );
};

function App() {
 return (
   <Router>
     <ScrollToTop />
     <AnimatedRoutes />
   </Router>
 );
}

export default App;