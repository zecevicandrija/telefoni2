'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingCart,
  FiDollarSign,
  FiPhone,
  FiMail,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
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
    { name: 'Kupi', href: '#kupi', icon: <FiShoppingCart /> },
    { name: 'Prodaj', href: '#prodaj', icon: <FiDollarSign /> },
    { name: 'Kako radi?', href: '#kako-radi', icon: <IoMdPhonePortrait /> },
    { name: 'Kontakt', href: '#kontakt', icon: <FiMail /> },
  ];

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoMdPhonePortrait className={styles.logoIcon} />
          <span className={styles.logoText}>
            tehno<span className={styles.logoAccent}>Krug</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={styles.navLink}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <span className={styles.navLinkIcon}>{link.icon}</span>
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className={styles.navCta}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.a
            href="tel:+381111234567"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPhone className={styles.ctaIcon} />
            <span>011 123 4567</span>
          </motion.a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={styles.mobileNavLink}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.navLinkIcon}>{link.icon}</span>
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="tel:+381111234567"
              className={styles.mobileCtaButton}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiPhone className={styles.ctaIcon} />
              <span>011 123 4567</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
