'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiCpu, FiRepeat, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'KUPI', href: '#kupi', icon: <FiShoppingBag /> },
    { name: 'PRODAJ', href: '#prodaj', icon: <FiCpu /> },
    { name: 'KAKO RADI', href: '#kako-radi', icon: <FiRepeat /> },
    { name: 'KONTAKT', href: '#kontakt', icon: <FiPhone /> },
  ];

  // Agresivnije "Tech" animacije
  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }
    })
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.navContainer}>
          
          {/* LOGO */}
          <a href="#" className={styles.logoLink}>
            <div className={styles.logoIconWrapper}>
              <FiCpu />
            </div>
            <div className={styles.logoText}>
              tehno<span className={styles.logoAccent}>KRUG</span>
            </div>
          </a>

          {/* DESKTOP MENU */}
          <div className={styles.desktopMenu}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={styles.navLink}>
                <span className={styles.linkText}>{link.name}</span>
                <span className={styles.linkUnderline}></span>
              </a>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className={styles.actionsWrapper}>
            
            {/* CTA BUTTON (Desktop only visuals mainly) */}
            <motion.a 
              href="tel:+381601234567" 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.ctaIcon}><FiPhone /></span>
              <span className={styles.ctaText}>060 123 4567</span>
              <div className={styles.ctaGlow}></div>
            </motion.a>

            {/* HAMBURGER */}
            <button 
              className={styles.menuToggle} 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenuOverlay}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background Grid Pattern (Consistency with Hero) */}
            <div className={styles.menuGrid}></div>
            
            <div className={styles.mobileContent}>
              <div className={styles.mobileHeader}>
                 <div className={styles.logoText}>
                    tehno<span className={styles.logoAccent}>KRUG</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className={styles.closeBtn}>
                   <FiX />
                 </button>
              </div>

              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={styles.mobileLink}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={styles.mobileLinkContent}>
                      <span className={styles.mobileLinkNumber}>0{i + 1}</span>
                      <span className={styles.mobileLinkText}>{link.name}</span>
                    </div>
                    <FiChevronRight className={styles.mobileArrow} />
                  </motion.a>
                ))}
              </div>

              <div className={styles.mobileFooter}>
                <div className={styles.footerInfo}>
                  <p>IMATE PITANJE?</p>
                  <a href="tel:+381601234567" className={styles.bigPhone}>060 123 4567</a>
                  <p className={styles.subText}>Dostupni smo 24/7 za otkup</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}