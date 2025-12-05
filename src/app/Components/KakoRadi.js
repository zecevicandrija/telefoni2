'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiShoppingCart, FiTruck, FiMapPin } from 'react-icons/fi';
import styles from './KakoRadi.module.css';

// --- 1. PREMIUM SCREEN ANIMATIONS (Telefon ekran - Ostaje isto) ---
const ScreenContent = ({ step }) => {
  // SEARCH
  if (step.id === 1) {
    return (
      <div className={styles.screenStepWrapper}>
        <motion.div className={styles.searchBar} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }}>
          <FiSearch /> <span>iPhone 15 Pro...</span>
        </motion.div>
        <div className={styles.resultList}>
          {[1, 2, 3].map((i) => (
            <motion.div key={i} className={styles.resultItem} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}>
              <div className={styles.resultImg} />
              <div className={styles.resultLines}><div className={styles.lineLg} /><div className={styles.lineSm} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  // CHECK / SCAN
  if (step.id === 2) {
    return (
      <div className={styles.screenStepWrapper}>
        <div className={styles.scanCircle}>
          <motion.div className={styles.scanLine} animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          <FiCheckCircle className={styles.bigCheckIcon} />
        </div>
        <div className={styles.checkList}>
          {['Ekran', 'Baterija', 'FaceID'].map((text, i) => (
            <motion.div key={text} className={styles.checkItem} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.3) }}>
              <FiCheckCircle color="#bd00ff" /> <span>{text} OK</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  // CART / PAY
  if (step.id === 3) {
    return (
      <div className={styles.screenStepWrapper}>
        <motion.div className={styles.creditCard} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ type: "spring" }}>
          <div className={styles.cardChip} /><div className={styles.cardText}>**** 4242</div>
        </motion.div>
        <motion.button className={styles.payBtn} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}>POTVRDI</motion.button>
      </div>
    );
  }
  // DELIVERY
  if (step.id === 4) {
    return (
      <div className={styles.screenStepWrapper}>
        <div className={styles.mapRoute}>
          <div className={styles.mapLine} />
          <motion.div className={styles.mapTruck} animate={{ offsetDistance: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
             <FiTruck />
          </motion.div>
          <div className={styles.mapPointStart} /><div className={styles.mapPointEnd}><FiMapPin /></div>
        </div>
        <motion.div className={styles.deliveryStatus} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>Stiže sutra</motion.div>
      </div>
    );
  }
  return null;
};

// --- PHONE COMPONENT ---
function PhoneScreen({ activeStep, steps }) {
  const currentStep = steps[activeStep] || steps[0];

  return (
    <div className={styles.screenInner}>
      <div className={styles.screenNotch}></div>
      
      {/* Dynamic Header Overlay */}
      <motion.div 
        className={styles.screenHeaderBg}
        animate={{ backgroundColor: currentStep.color }}
      />

      <div className={styles.appContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className={styles.animContainer}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
          >
            <h4 style={{ color: currentStep.color }} className={styles.inAppTitle}>
                {currentStep.shortTitle}
            </h4>
            
            <ScreenContent step={currentStep} />
            
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className={styles.screenGlow} />
    </div>
  );
}

// --- TEXT CARD (REDIZAJNIRANO) ---
function TextCard({ step, index, activeStep, setActiveStep, isMobile, totalSteps, steps }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  
  const isActive = activeStep === index;
  const isPast = activeStep > index;

  useEffect(() => {
    if (isInView && !isMobile) {
      setActiveStep(index);
    }
  }, [isInView, index, setActiveStep, isMobile]);

  return (
    <div className={styles.cardWrapper} ref={ref}>
       {/* TIMELINE DEO */}
       <div className={styles.timelineCol}>
         {index !== 0 && (
             <div 
               className={styles.timelineLine} 
               style={{ background: isActive || isPast ? step.color : '#333' }}
             />
         )}
         
         <motion.div 
           className={styles.timelineDot}
           animate={{ 
               scale: isActive ? 1.3 : 1,
               backgroundColor: isActive || isPast ? step.color : '#222',
               borderColor: isActive ? step.color : '#444'
           }}
         />
         
         {index !== totalSteps - 1 && (
               <div 
                 className={styles.timelineLine} 
                 style={{ background: isPast ? steps[index + 1].color : '#333' }}
               />
         )}
       </div>

       {/* KARTICA */}
       <motion.div 
        className={`${styles.stepCard} ${isActive ? styles.activeCard : ''}`}
        initial={{ opacity: 0.2, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => isMobile && setActiveStep(index)}
      >
        {/* Veliki dekorativni broj u pozadini */}
        <div className={styles.bigBgNumber} style={{ color: step.color }}>0{step.id}</div>

        <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
                {/* Ikonica u boxu */}
                <div className={styles.iconBox} style={{ borderColor: step.color, color: step.color, boxShadow: isActive ? `0 0 15px ${step.color}40` : 'none' }}>
                    <step.icon size={24} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
            
            <p className={styles.stepDesc}>{step.description}</p>
        </div>
        
        {/* Active Glow Border */}
        {isActive && (
            <motion.div 
                layoutId="glowBorder" 
                className={styles.glowBorder} 
                style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}10` }} 
            />
        )}
      </motion.div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function KakoRadi() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Dodate ikonice u niz
  const steps = [
    { id: 1, title: "Izaberi Uređaj", shortTitle: "Pretraga", description: "Pregledaj našu ponudu verifikovanih telefona. Filtriraj po modelu, ceni i stanju.", color: "#00f2ff", icon: FiSearch },
    { id: 2, title: "Proveri Detalje", shortTitle: "Specifikacije", description: "Svaki uređaj prolazi testiranje u 30 tačaka. Transparentno stanje i originalne slike.", color: "#bd00ff", icon: FiCheckCircle },
    { id: 3, title: "Poruči Sigurno", shortTitle: "Korpa", description: "Bezbedno plaćanje ili pouzećem. Dobijaš fiskalni račun i pisanu garanciju od 12 meseci.", color: "#00ff88", icon: FiShoppingCart },
    { id: 4, title: "Brza Dostava", shortTitle: "Na Putu", description: "Paket stiže na tvoju adresu u roku od 24h. Besplatna dostava za sve porudžbine.", color: "#ff0055", icon: FiTruck }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile, steps.length]);

  const phoneY = isMobile ? "0vh" : (activeStep) * 45 + "vh"; 

  return (
    <section className={styles.mainWrapper} id="kako-radi">
      <div className={styles.bgGrid}></div>
      
      <div className={styles.mobileHeader}>
          <h2 className={styles.mainTitle}>KAKO <span className={styles.gradientText}>RADI?</span></h2>
      </div>

      <div className={styles.contentRow}>
        {/* Left Column: STICKY PHONE */}
        <div className={styles.stickyColumn}>
          <motion.div 
            className={styles.movingPhoneWrapper}
            animate={{ y: phoneY }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
             <div className={styles.phoneFrame}>
                <div className={styles.phoneButtons}></div>
                <PhoneScreen activeStep={activeStep} steps={steps} />
             </div>
             
             <motion.div 
               className={styles.blob}
               animate={{ 
                 background: steps[activeStep].color, 
                 opacity: [0.3, 0.5, 0.3], 
               }}
               transition={{ duration: 2 }}
             />
          </motion.div>
        </div>

        {/* Right Column: SCROLLABLE CARDS */}
        <div className={styles.scrollColumn}>
           <div className={styles.headerSpacer}>
              <h2 className={styles.mainTitle}>KAKO <span className={styles.gradientText}>RADI?</span></h2>
           </div>
           
           <div className={styles.cardsList}>
               {steps.map((step, index) => (
                 <TextCard 
                   key={index} 
                   step={step} 
                   index={index} 
                   activeStep={activeStep}
                   setActiveStep={setActiveStep}
                   isMobile={isMobile}
                   totalSteps={steps.length}
                   steps={steps}
                 />
               ))}
           </div>
        </div>
      </div>
    </section>
  );
}