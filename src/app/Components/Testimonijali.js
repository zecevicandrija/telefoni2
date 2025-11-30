'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IoMdStar, IoMdQuote } from 'react-icons/io';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './Testimonijali.module.css';

export default function Testimonijali() {
  const containerRef = useRef(null);
  
  // Parallax logika
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  const testimonials = [
    {
      name: "Marko Petrović",
      role: "Klijent",
      rating: 5,
      comment: "Odličan servis! Telefon stigao za 24h, u perfektnom stanju. Garancija od 12 meseci je ono što me je ubedilo. Preporučujem!",
      avatar: "https://i.pravatar.cc/150?img=12",
      date: "Pre 2 dana"
    },
    {
      name: "Ana Jovanović",
      role: "Klijent",
      rating: 5,
      comment: "Prodala sam telefon brzo i jednostavno. Isplata odmah nakon provere. Profesionalna ekipa i fer cene. Top iskustvo!",
      avatar: "https://i.pravatar.cc/150?img=5",
      date: "Pre nedelju dana"
    },
    {
      name: "Stefan Nikolić",
      role: "Klijent",
      rating: 5,
      comment: "Najbolji odnos cene i kvaliteta. Telefon prošao sve testove, radi besprekorno. Garancija daje osećaj sigurnosti.",
      avatar: "https://i.pravatar.cc/150?img=33",
      date: "Pre 3 dana"
    },
    {
      name: "Jelena Đorđević",
      role: "Klijent",
      rating: 5,
      comment: "Profesionalna usluga, brza dostava i odlična komunikacija! Kupila sam iPhone 13 i prezadovoljna sam.",
      avatar: "https://i.pravatar.cc/150?img=9",
      date: "Pre 5 dana"
    },
    {
      name: "Nikola Jovanović",
      role: "Klijent",
      rating: 5,
      comment: "Otkup telefona je bio neverovatno brz. Procenili cenu odmah, poslao telefon i dobio pare isti dan. Vrhunski!",
      avatar: "https://i.pravatar.cc/150?img=51",
      date: "Pre 4 dana"
    },
    {
      name: "Milica Stanković",
      role: "Klijent",
      rating: 5,
      comment: "Kupovina na rate uz Banca Intesa je bila idealno rešenje za mene. Telefon stigao brzo, sve uredno upakovano!",
      avatar: "https://i.pravatar.cc/150?img=23",
      date: "Pre nedelju dana"
    }
  ];

  return (
    <section className={styles.section} ref={containerRef}>
      {/* --- Dynamic Background Elements --- */}
      <div className={styles.bgGrid}></div>
      <div className={styles.bgGlow}></div>
      
      {/* Floating Orbs */}
      <motion.div style={{ y: y1 }} className={`${styles.orb} ${styles.orb1}`} />
      <motion.div style={{ y: y2 }} className={`${styles.orb} ${styles.orb2}`} />

      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            REČI KORISNIKA
          </div>
          <h2 className={styles.title}>
            ISKUSTVA IZ <br />
            <span className={styles.gradientText}>PRVE RUKE.</span>
          </h2>
          <p className={styles.subtitle}>
            Pridružite se hiljadama zadovoljnih korisnika koji su pametno unovčili ili kupili uređaj.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Card Glow Effect */}
              <div className={styles.cardGlow}></div>
              
              {/* Quote Icon Background */}
              <IoMdQuote className={styles.bgQuote} />

              <div className={styles.cardHeader}>
                <div className={styles.avatarWrapper}>
                  <img src={item.avatar} alt={item.name} className={styles.avatar} />
                  <div className={styles.verifiedBadge}>
                    <FiCheckCircle />
                  </div>
                </div>
                <div>
                  <h4 className={styles.name}>{item.name}</h4>
                  <div className={styles.ratingRow}>
                    <div className={styles.stars}>
                      {[...Array(item.rating)].map((_, starIndex) => (
                        <IoMdStar key={starIndex} />
                      ))}
                    </div>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className={styles.divider}></div>

              <p className={styles.comment}>{item.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}