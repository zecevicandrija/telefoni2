'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiShoppingCart, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import styles from './CTA.module.css';

export default function CTA() {
  const containerRef = useRef(null);
  
  // Parallax za pozadinski tekst
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xMoveReverse = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section className={styles.ctaSection} ref={containerRef}>
      
      {/* --- Dynamic Background --- */}
      <div className={styles.ambientGlow}></div>
      <div className={styles.noiseOverlay}></div>

      {/* --- Scrolling Marquee Text (Background) --- */}
      <div className={styles.marqueeWrapper}>
        <motion.div className={styles.marqueeTrack} style={{ x: xMove }}>
          <span>KUPI • PRODAJ • ZAMENI • KUPI • PRODAJ • ZAMENI •</span>
          <span>KUPI • PRODAJ • ZAMENI • KUPI • PRODAJ • ZAMENI •</span>
        </motion.div>
        <motion.div className={`${styles.marqueeTrack} ${styles.trackBottom}`} style={{ x: xMoveReverse }}>
          <span>PREMIUM • GARANCIJA • BRZINA • PREMIUM • GARANCIJA • BRZINA •</span>
          <span>PREMIUM • GARANCIJA • BRZINA • PREMIUM • GARANCIJA • BRZINA •</span>
        </motion.div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.contentCard}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative lines */}
          <div className={styles.cornerTL}></div>
          <div className={styles.cornerBR}></div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            VREME JE ZA <br />
            <span className={styles.gradientText}>NADOGRADNJU.</span>
          </motion.h2>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ne dozvoli da ti stari uređaj skuplja prašinu. <br />
            Pretvori ga u keš ili ga zameni za noviji model u par klikova.
          </motion.p>

          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className={styles.primaryBtn}>
              <span className={styles.btnContent}>
                <FiShoppingCart /> POGLEDAJ PONUDU
              </span>
              <div className={styles.btnGlow}></div>
            </button>
            
            <button className={styles.secondaryBtn}>
              <FiDollarSign /> PROCENI MOJ UREĐAJ
            </button>
          </motion.div>

          {/* Social Proof / Trust Indicators */}
          <motion.div 
            className={styles.trustRow}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.avatars}>
              <img src="https://i.pravatar.cc/100?img=33" alt="User" />
              <img src="https://i.pravatar.cc/100?img=47" alt="User" />
              <img src="https://i.pravatar.cc/100?img=12" alt="User" />
              <div className={styles.avatarMore}>+2k</div>
            </div>
            <p className={styles.trustText}>
              Pridruži se zadovoljnim korisnicima ove nedelje
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}