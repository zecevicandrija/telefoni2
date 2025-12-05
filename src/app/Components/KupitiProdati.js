'use client';

import { motion } from 'framer-motion';
import {
  FiCreditCard,
  FiRefreshCw,
  FiTruck,
  FiAward,
  FiShield,
  FiArrowRight
} from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import {
  BsLightningChargeFill,
  BsShieldCheck,
  BsBoxSeam,
  BsCashStack
} from 'react-icons/bs';
import styles from './KupitiProdati.module.css';

// Varijante za animaciju kontejnera (da se kartice učitavaju jedna po jedna)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

export default function KupitiProdati() {
  const whyBuyReasons = [
    {
      icon: <FiCreditCard />,
      title: "Plaćanje na rate",
      description: "Do 12 rata bez kamate za korisnike Banca Intesa kartica.",
      color: "#667eea"
    },
    {
      icon: <BsShieldCheck />,
      title: "12 Meseci Garancije",
      description: "Potpuna sigurnost. Pokrivamo sve kvarove na uređaju.",
      color: "#f093fb"
    },
    {
      icon: <FiRefreshCw />,
      title: "14 Dana Povrat",
      description: "Niste zadovoljni? Vraćamo novac bez suvišnih pitanja.",
      color: "#4facfe"
    },
    {
      icon: <IoMdCheckmarkCircle />,
      title: "Strogo Testirano",
      description: "Svaki uređaj prolazi kroz 90+ rigoroznih testova ispravnosti.",
      color: "#43e97b"
    }
  ];

  const whySellReasons = [
    {
      icon: <BsLightningChargeFill />,
      title: "Instant Procena",
      description: "Saznaj vrednost svog telefona za manje od 30 sekundi.",
      color: "#ffd700"
    },
    {
      icon: <BsCashStack />,
      title: "Isplata Odmah",
      description: "Novac leže na tvoj račun isti dan nakon provere uređaja.",
      color: "#00f2ff"
    },
    {
      icon: <FiShield />,
      title: "Sigurnost",
      description: "Garantujemo dogovorenu cenu ako je uređaj kao u opisu.",
      color: "#ff0080"
    },
    {
      icon: <BsBoxSeam />,
      title: "Mi Plaćamo Poštarinu",
      description: "Pošalji nam uređaj besplatno ili ga donesi lično.",
      color: "#7928ca"
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Background Ambience */}
      <div className={styles.ambientGlowTop}></div>
      <div className={styles.ambientGlowBottom}></div>

      {/* ===== SECTION 1: KUPOVINA ===== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`${styles.badge} ${styles.badgeBlue}`}>
              <span className={styles.badgeDot}></span>
              KUPOVINA
            </div>
            <h2 className={styles.title}>
              ZAŠTO KUPITI <br />
              <span className={styles.gradientBlue}>KOD NAS?</span>
            </h2>
            <p className={styles.subtitle}>
              Rizik kupovine polovnog telefona svodimo na nulu. 
              Premium iskustvo kao da kupuješ nov uređaj.
            </p>
          </motion.div>

          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {whyBuyReasons.map((item, index) => (
              <motion.div 
                key={index} 
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.iconWrapper} style={{ boxShadow: `0 0 20px ${item.color}40` }}>
                  <div className={styles.iconInner} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.cardBorder} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}><FiRefreshCw /></div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* ===== SECTION 2: PRODAJA ===== */}
      <section className={styles.section} id="prodaj">
        <div className={styles.container}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`${styles.badge} ${styles.badgeGreen}`}>
              <span className={`${styles.badgeDot} ${styles.dotGreen}`}></span>
              OTKUP UREĐAJA
            </div>
            <h2 className={styles.title}>
              PRODAJ SVOJ TELEFON <br />
              <span className={styles.gradientGreen}>BRZO & SIGURNO.</span>
            </h2>
            <p className={styles.subtitle}>
              Bez cenkana, bez nalaženja sa kupcima po gradu. 
              Mi smo tvoj siguran partner.
            </p>
          </motion.div>

          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {whySellReasons.map((item, index) => (
              <motion.div 
                key={index} 
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.iconWrapper} style={{ boxShadow: `0 0 20px ${item.color}40` }}>
                  <div className={styles.iconInner} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                
                {/* Special accent for Sell cards */}
                <div className={`${styles.cardBorder} ${styles.cardBorderGreen}`} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className={styles.ctaWrapper}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className={styles.ctaButton}>
              Započni Procenu <FiArrowRight />
            </button>
            <p className={styles.disclaimer}>*Garantujemo isplatu ako uređaj odgovara opisu.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}