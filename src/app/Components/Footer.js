'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion';
import { FiClock, FiMapPin, FiMail, FiPhone, FiArrowUp, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
import styles from './Footer.module.css';

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const [showScroll, setShowScroll] = useState(false);

  // Logika za prikazivanje dugmeta "Nazad na vrh"
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowScroll(latest > 0.1);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} id="kontakt">
      {/* Decorative Top Border Gradient */}
      <div className={styles.topBorder}></div>
      <div className={styles.bgGrid}></div>

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* --- Brand Section --- */}
          <motion.div 
            className={styles.brandColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.logoWrapper}>
              <IoMdPhonePortrait className={styles.logoIcon} />
              <span className={styles.logoText}>tehno<span className={styles.gradientText}>Krug</span></span>
            </div>
            <p className={styles.description}>
              Premium destinacija za pametnu kupovinu i prodaju mobilnih uređaja. 
              Sigurnost, brzina i kvalitet na jednom mestu.
            </p>
            
            <div className={styles.socialRow}>
              {['Facebook', 'Instagram', 'Twitter'].map((network, index) => (
                <motion.a 
                  key={network} 
                  href="#" 
                  className={styles.socialBtn}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {network === 'Facebook' && <FiFacebook />}
                  {network === 'Instagram' && <FiInstagram />}
                  {network === 'Twitter' && <FiTwitter />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* --- Contact Info --- */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className={styles.columnTitle}>Kontakt</h4>
            <ul className={styles.linkList}>
              <li>
                <FiMail className={styles.icon} />
                <a href="mailto:info@tehnokrug.rs">info@tehnokrug.rs</a>
              </li>
              <li>
                <FiPhone className={styles.icon} />
                <span>+381 11 123 4567</span>
              </li>
              <li>
                <FiPhone className={styles.icon} />
                <span>+381 64 123 4567</span>
              </li>
              <li>
                <FiMapPin className={styles.icon} />
                <span>Knez Mihailova 15, BG</span>
              </li>
            </ul>
          </motion.div>

          {/* --- Working Hours --- */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className={styles.columnTitle}>Radno Vreme</h4>
            <ul className={styles.linkList}>
              <li>
                <FiClock className={styles.icon} />
                <div className={styles.timeRow}>
                  <span>Pon - Pet</span>
                  <span className={styles.highlight}>09:00 - 20:00</span>
                </div>
              </li>
              <li>
                <FiClock className={styles.icon} />
                <div className={styles.timeRow}>
                  <span>Subota</span>
                  <span className={styles.highlight}>10:00 - 18:00</span>
                </div>
              </li>
              <li className={styles.closed}>
                <FiClock className={styles.icon} />
                <span>Nedelja: Zatvoreno</span>
              </li>
            </ul>
          </motion.div>

          {/* --- Quick Links --- */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className={styles.columnTitle}>Meni</h4>
            <div className={styles.navLinks}>
              <a href="#kupi" className={styles.navLink}>Kupi Telefon</a>
              <a href="#prodaj" className={styles.navLink}>Prodaj Telefon</a>
              <a href="#kako-radi" className={styles.navLink}>Proces</a>
              <a href="#faq" className={styles.navLink}>Česta pitanja</a>
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className={styles.footerBottom}>
          <p>&copy; 2024 tehnoKrug. Designed for performance.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privatnost</a>
            <span className={styles.separator}>•</span>
            <a href="#">Uslovi</a>
            <span className={styles.separator}>•</span>
            <a href="#">Kolačići</a>
          </div>
        </div>
      </div>

      {/* --- Scroll To Top Button --- */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            className={styles.scrollTopBtn}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 242, 255, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}