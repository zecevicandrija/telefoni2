'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiSmartphone, FiDollarSign, FiCpu } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
  const targetRef = useRef(null);
  // Definiše opseg skrolovanja za targetRef: od početka elementa do kraja elementa
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Parallax efekti za elemente (tekst ide gore, slika ide dole)
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Opacitet se smanjuje tokom prve polovine skrolovanja
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Varijante za pojavljivanje (Staggered fade-in)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <section className={styles.heroSection} ref={targetRef}>
      {/* --- Dynamic Background --- */}
      <div className={styles.bgGrid}></div>
      <motion.div
        className={styles.bgGlow}
        // Animacija pozadine za pulsirajući efekat
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={styles.container}>
        {/* --- Left Content (Tekst & Dugmad) --- */}
        <motion.div
          className={styles.contentWrapper}
          // Primenjuje Parallax efekte na tekstualni sadržaj
          style={{ y: yText, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Lider u otkupu i prodaji
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.title}>
            TVOJ STARI TELEFON <br />
            <span className={styles.gradientText}>VREDI VISE.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.description}>
            Najbrži put do keša ili novog uređaja. Bez čekanja, bez komplikacija.
            Direktna isplata i premium ponuda telefona na jednom mestu.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.buttonGroup}>
            <button className={styles.primaryBtn}>
              <span>POGLEDAJ PONUDU</span>
              <div className={styles.btnGlow}></div>
            </button>
            <button className={styles.secondaryBtn}>
              <FiDollarSign className={styles.btnIcon} />
              <span>PRODAJ UREĐAJ</span>
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            <div className={styles.statItem}>
              <h3>15min</h3>
              <p>Prosečna isplata</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.statItem}>
              <h3>24/7</h3>
              <p>Podrška</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.statItem}>
              <h3>100%</h3>
              <p>Sigurna kupovina</p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- Right Visuals (3D Composition) --- */}
        <motion.div
          className={styles.visualWrapper}
          // Primenjuje Parallax efekat na sliku
          style={{ y: yImage }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.circleBackdrop}></div>
          
          {/* Glavni Telefon (Floating Card Representation) */}
          <motion.div
            className={styles.phoneCard}
            // Lagano plutanje i rotacija (hover efekat)
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            {/* Ovi divovi simuliraju izgled modernog telefona, zameni sa <img> ako zelis pravu sliku */}
            <div className={styles.phoneScreen}>
              <div className={styles.screenHeader}>
                <div className={styles.notch}></div>
              </div>
              <div className={styles.screenContent}>
                <div className={styles.widget1}></div>
                <div className={styles.widget2}></div>
                <div className={styles.priceTag}>
                  <span>iPhone 17 Pro</span>
                  <strong>1299€</strong>
                </div>
              </div>
              <div className={styles.reflection}></div>
            </div>
          </motion.div>

          {/* Floating Elements around phone */}
          <motion.div
            className={`${styles.floatingIcon} ${styles.iconCpu}`}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <FiCpu />
          </motion.div>

          <motion.div
            className={`${styles.floatingIcon} ${styles.iconMobile}`}
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            <FiSmartphone />
          </motion.div>

        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </motion.div>
    </section>
  );
}