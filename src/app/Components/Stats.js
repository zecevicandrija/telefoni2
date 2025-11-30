'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll
} from 'framer-motion';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FiThumbsUp, FiTruck, FiActivity, FiCheck, FiCpu } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import styles from './Stats.module.css';

// --- Animated Counter ---
function AnimatedCounter({ end, duration = 2.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      if (progress < 1) {
        setCount(Math.floor(end * easeProgress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- 3D Tilt Card Wrapper ---
function TiltCard({ children, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// --- Main Component ---
export default function Stats() {
  const containerRef = useRef(null);
  
  // Timeline logika: Prati skrolovanje kroz containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stats = [
    { 
      number: 15000, 
      suffix: '+', 
      label: 'Prodatih telefona', 
      subtext: 'Verifikovane transakcije', 
      icon: <IoMdPhonePortrait />,
      accent: 'blue'
    },
    { 
      number: 98, 
      suffix: '%', 
      label: 'Zadovoljnih klijenata', 
      subtext: 'Na osnovu 500+ recenzija', 
      icon: <FiThumbsUp />,
      accent: 'purple'
    },
    { 
      number: 12, 
      suffix: ' meseci', 
      label: 'Pisana Garancija', 
      subtext: 'Bez skrivenih mana', 
      icon: <BsShieldCheck />,
      accent: 'cyan'
    },
    { 
      number: 24, 
      suffix: 'h', 
      label: 'Ekspres Dostava', 
      subtext: 'Danas za sutra', 
      icon: <FiTruck />,
      accent: 'blue'
    },
  ];

  return (
    <section className={styles.statsSection} ref={containerRef}>
      {/* Dynamic Background */}
      <div className={styles.bgGrid}></div>
      <div className={styles.glowOrb}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.pillBadge}>
            <FiActivity /> STATISTIKA
          </div>
          <h2 className={styles.sectionTitle}>
            BROJEVI KOJI <br/>
            <span className={styles.gradientText}>PRAVE RAZLIKU</span>
          </h2>
        </motion.div>

        <div className={styles.contentWrapper}>
          
          {/* --- TIMELINE LINE --- */}
          <div className={styles.timelineContainer}>
            <div className={styles.timelineTrack}></div>
            <motion.div 
              className={styles.timelineFill}
              style={{ scaleY, transformOrigin: "top" }}
            ></motion.div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.gridItem}>
                
                {/* Timeline Dot (Konektor) */}
                <motion.div 
                  className={styles.timelineDot}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={styles.dotInner}></div>
                </motion.div>

                <TiltCard index={index}>
                  <div className={`${styles.statCardInner} ${styles[stat.accent]}`}>
                    
                    {/* --- Phone Screen Simulation UI --- */}
                    <div className={styles.screenHeader}>
                      <div className={styles.cameraDot}></div>
                      <div className={styles.speakerSlot}></div>
                    </div>

                    {/* Animated Floating Widgets (Background) */}
                    <motion.div 
                      className={styles.widgetFloat2}
                      animate={{ y: [0, 15, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Main Content */}
                    <div className={styles.iconBox}>
                       {stat.icon}
                    </div>

                    <div className={styles.statContent}>
                      <div className={styles.numberWrapper}>
                        <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                      </div>
                      <h3 className={styles.label}>{stat.label}</h3>
                      
                      <div className={styles.miniStatsRow}>
                        <div className={styles.miniStat}>
                           <FiCheck size={12}/> {stat.subtext}
                        </div>
                      </div>
                    </div>

                    {/* Screen Reflection Overlay */}
                    <div className={styles.reflection}></div>
                    
                    {/* Bottom Indicator */}
                    <div className={styles.homeIndicator}></div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}