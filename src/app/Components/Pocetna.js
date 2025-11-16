'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  FiShoppingCart,
  FiDollarSign,
  FiShield,
  FiTrendingUp,
  FiClock,
  FiPackage,
  FiCheckCircle,
  FiStar,
  FiAward,
  FiThumbsUp,
  FiCreditCard,
  FiRefreshCw,
  FiTruck
} from 'react-icons/fi';
import {
  IoMdPhonePortrait,
  IoMdCheckmarkCircle,
  IoMdStar
} from 'react-icons/io';
import {
  BsLightningChargeFill,
  BsShieldCheck,
  BsBoxSeam,
  BsCashStack
} from 'react-icons/bs';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import Navbar from './Navbar';
import styles from './Pocetna.module.css';

// Loading Component
function Loader() {
  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.loaderContent}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className={styles.loaderIcon}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <IoMdPhonePortrait />
        </motion.div>
        <motion.h2
          className={styles.loaderText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          tehnoKrug
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
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

export default function Pocetna() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);

  // How It Works scroll tracking
  const howItWorksRef = useRef(null);
  const { scrollYProgress: howItWorksProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      comment: "Najbolji odnos cene i kvaliteta. Telefon prošao sve testove, radi besprekorno. Garancija od 12 meseci daje osećaj sigurnosti.",
      avatar: "https://i.pravatar.cc/150?img=33",
      date: "Pre 3 dana"
    },
    {
      name: "Jelena Đorđević",
      role: "Klijent",
      rating: 5,
      comment: "Profesionalna usluga, brza dostava i odlična komunikacija! Kupila sam iPhone 13 i prezadovoljna sam. Sve pohvale!",
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

  const stats = [
    { number: 15000, suffix: '+', label: 'Prodatih telefona', icon: <IoMdPhonePortrait /> },
    { number: 98, suffix: '%', label: 'Zadovoljnih klijenata', icon: <FiThumbsUp /> },
    { number: 12, suffix: 'mес', label: 'Garancija', icon: <BsShieldCheck /> },
    { number: 24, suffix: 'h', label: 'Dostava', icon: <FiTruck /> },
  ];

  const whyBuyReasons = [
    {
      icon: <FiCreditCard />,
      title: "Plaćanje na rate",
      description: "Možeš da platiš na 3 do 12 rata ukoliko si Banca Intesa korisnik",
      color: "#667eea"
    },
    {
      icon: <BsShieldCheck />,
      title: "Garancija 12 meseci",
      description: "Garantujemo 12 meseci na ceo uređaj sa punom podrškom",
      color: "#f093fb"
    },
    {
      icon: <FiRefreshCw />,
      title: "Povrat novca u 14 dana",
      description: "Vraćamo novac u 14 dana ukoliko se predomisliš, bez pitanja",
      color: "#4facfe"
    },
    {
      icon: <IoMdCheckmarkCircle />,
      title: "Proveren kvalitet",
      description: "Detaljno provereni telefoni kroz 90+ profesionalnih testova",
      color: "#43e97b"
    },
    {
      icon: <FiTruck />,
      title: "Besplatna dostava",
      description: "Danas-za-sutra, besplatna i osigurana dostava širom Srbije",
      color: "#fa709a"
    },
    {
      icon: <FiAward />,
      title: "Originalna oprema",
      description: "Svi telefoni dolaze sa originalnim punjačem i pakovanjem",
      color: "#feca57"
    }
  ];

  const whySellReasons = [
    {
      icon: <BsLightningChargeFill />,
      title: "Saznaj odmah cenu",
      description: "Trenutna procena vrednosti tvog telefona bez čekanja",
      color: "#f093fb"
    },
    {
      icon: <BsCashStack />,
      title: "Isplata isti dan",
      description: "Isplaćujemo novac isti dan nakon provere uređaja",
      color: "#43e97b"
    },
    {
      icon: <FiShield />,
      title: "Garantovana isplata",
      description: "Garantovana isplata dogovorene cene ako uređaj odgovara opisu*",
      color: "#667eea"
    },
    {
      icon: <BsBoxSeam />,
      title: "Besplatno slanje",
      description: "Brzo, besplatno, osigurano slanje ili dođi kod nas",
      color: "#4facfe"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      icon: <HiDevicePhoneMobile />,
      title: "Izaberi telefon",
      description: "Pretraži našu ponudu i pronađi savršen telefon za sebe",
      color: "#667eea"
    },
    {
      step: 2,
      icon: <FiCheckCircle />,
      title: "Proveri detalje",
      description: "Pogledaj sve specifikacije, slike i stanje uređaja",
      color: "#f093fb"
    },
    {
      step: 3,
      icon: <FiShoppingCart />,
      title: "Naruči online",
      description: "Jednostavna kupovina u par klikova ili pozovi nas",
      color: "#43e97b"
    },
    {
      step: 4,
      icon: <FiPackage />,
      title: "Primi dostavu",
      description: "Besplatna dostava danas-za-sutra direktno na adresu",
      color: "#4facfe"
    }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Navbar />

      {/* Mouse follower effect */}
      <motion.div
        className={styles.mouseFollower}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
      />

      {/* Hero Section */}
      <section className={styles.hero} id="kupi">
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className={styles.heroSubheading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Dobrodošli u budućnost kupovine telefona
            </motion.span>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Najbolji <span className={styles.gradientText}>polovni telefoni</span> sa garancijom
            </motion.h1>

            <motion.p
              className={styles.heroDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Proveren kvalitet, 12 meseci garancije, besplatna dostava i povrat novca u 14 dana.
              Tvoj pouzdan partner za kupovinu i prodaju telefona u Srbiji.
            </motion.p>

            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                className={`${styles.btn} ${styles.btnPrimary}`}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingCart />
                Pretraži telefone
              </motion.button>

              <motion.button
                className={`${styles.btn} ${styles.btnSecondary}`}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(240, 147, 251, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDollarSign />
                Prodaj telefon
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className={styles.phoneShowcase}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={styles.phone3d}>
                <div className={styles.phoneScreen}>
                  <div className={styles.phoneNotch}></div>
                  <div className={styles.phoneContent}>
                    <motion.div
                      className={styles.phoneLogo}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <IoMdPhonePortrait />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className={styles.floatingBadge}
              style={{ top: '10%', right: '10%' }}
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BsShieldCheck />
              <span>12 meseci garancije</span>
            </motion.div>

            <motion.div
              className={styles.floatingBadge}
              style={{ bottom: '20%', left: '5%' }}
              animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <FiTruck />
              <span>Besplatna dostava</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Background elements */}
        <div className={styles.heroBackground}>
          <motion.div
            className={styles.floatingShape}
            style={{ y: parallaxY }}
          />
          <motion.div
            className={styles.floatingShape}
            style={{ y: parallaxY2 }}
          />
          <motion.div
            className={styles.floatingShape}
            style={{ y: parallaxY3 }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <motion.div
                className={styles.statIcon}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>
              <div className={styles.statNumber}>
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section - Apple Style Scroll */}
      <section ref={howItWorksRef} className={styles.howItWorksWrapper} id="kako-radi">
        <div className={styles.howItWorksStickyContainer}>
          {/* Header */}
          <motion.div
            className={styles.howItWorksHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>Kako radi?</h2>
            <p className={styles.sectionSubtitle}>Jednostavan proces u 4 koraka</p>
          </motion.div>

          {/* Sticky Content */}
          <div className={styles.howItWorksStickyContent}>
            {/* Progress Line */}
            <div className={styles.progressLineContainer}>
              <motion.div
                className={styles.progressLine}
                style={{
                  scaleY: howItWorksProgress
                }}
              />
            </div>

            {/* Steps Cards */}
            <div className={styles.stepsCardsContainer}>
              {howItWorks.map((step, index) => {
                const stepProgress = index / (howItWorks.length - 1);
                const nextStepProgress = (index + 1) / (howItWorks.length - 1);

                const opacity = useTransform(
                  howItWorksProgress,
                  [
                    Math.max(0, stepProgress - 0.15),
                    stepProgress,
                    nextStepProgress,
                    Math.min(1, nextStepProgress + 0.15)
                  ],
                  [0, 1, 1, 0]
                );

                const y = useTransform(
                  howItWorksProgress,
                  [
                    Math.max(0, stepProgress - 0.15),
                    stepProgress,
                    nextStepProgress,
                    Math.min(1, nextStepProgress + 0.15)
                  ],
                  [50, 0, 0, -50]
                );

                const scale = useTransform(
                  howItWorksProgress,
                  [
                    Math.max(0, stepProgress - 0.15),
                    stepProgress,
                    nextStepProgress,
                    Math.min(1, nextStepProgress + 0.15)
                  ],
                  [0.9, 1, 1, 0.9]
                );

                return (
                  <motion.div
                    key={index}
                    className={styles.stepCardApple}
                    style={{
                      opacity,
                      y,
                      scale
                    }}
                  >
                    <div className={styles.stepCardInner}>
                      {/* Step Number Badge */}
                      <motion.div
                        className={styles.stepBadge}
                        style={{ background: step.color }}
                      >
                        {step.step}
                      </motion.div>

                      {/* Icon */}
                      <motion.div
                        className={styles.stepIconLarge}
                        style={{ color: step.color }}
                      >
                        {step.icon}
                      </motion.div>

                      {/* Content */}
                      <h3 className={styles.stepTitleLarge}>{step.title}</h3>
                      <p className={styles.stepDescriptionLarge}>{step.description}</p>

                      {/* Decorative Glow */}
                      <div
                        className={styles.stepGlow}
                        style={{ background: step.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Šta kažu naši klijenti</h2>
          <p className={styles.sectionSubtitle}>Pridružite se hiljadama zadovoljnih korisnika</p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={styles.testimonialHeader}>
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={styles.testimonialAvatar}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <div className={styles.testimonialInfo}>
                  <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                  <p className={styles.testimonialRole}>{testimonial.role}</p>
                  <div className={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        className={styles.star}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.3, rotate: 15 }}
                      >
                        <IoMdStar />
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.testimonialComment}>"{testimonial.comment}"</p>
              <div className={styles.testimonialDate}>{testimonial.date}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Buy Section */}
      <section className={styles.whyBuy}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Zašto kupiti kod nas?</h2>
          <p className={styles.sectionSubtitle}>Pružamo najkvalitetniju uslugu na tržištu</p>
        </motion.div>

        <div className={styles.reasonsGrid}>
          {whyBuyReasons.map((reason, index) => (
            <motion.div
              key={index}
              className={styles.reasonCard}
              initial={{ opacity: 0, y: 50, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
            >
              <motion.div
                className={styles.reasonIcon}
                style={{ color: reason.color }}
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {reason.icon}
              </motion.div>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonDescription}>{reason.description}</p>
              <motion.div
                className={styles.reasonGlow}
                style={{ background: reason.color }}
                whileHover={{ scale: 1.5, opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Sell Section */}
      <section className={styles.whySell} id="prodaj">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Zašto prodati sa tehnoKrug-om?</h2>
          <p className={styles.sectionSubtitle}>Brz, pouzdan i transparentan otkup telefona</p>
        </motion.div>

        <div className={styles.reasonsGrid}>
          {whySellReasons.map((reason, index) => (
            <motion.div
              key={index}
              className={styles.reasonCard}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
            >
              <motion.div
                className={styles.reasonIcon}
                style={{ color: reason.color }}
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {reason.icon}
              </motion.div>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonDescription}>{reason.description}</p>
              <motion.div
                className={styles.reasonGlow}
                style={{ background: reason.color }}
                whileHover={{ scale: 1.5, opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.disclaimer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          *Ukoliko uređaj odgovara opisu, ili ti vraćamo uređaj
        </motion.p>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Spreman da počneš?
          </motion.h2>
          <motion.p
            className={styles.ctaText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pridruži se hiljadama zadovoljnih korisnika i pronađi svoj savršeni telefon danas!
          </motion.p>
          <motion.div
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingCart />
              Pregledaj ponudu
            </motion.button>
            <motion.button
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnLarge}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDollarSign />
              Proceni telefon
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer} id="kontakt">
        <div className={styles.footerContent}>
          <motion.div
            className={styles.footerSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.footerLogo}>
              <IoMdPhonePortrait className={styles.footerLogoIcon} />
              <span>tehno<span className={styles.gradientText}>Krug</span></span>
            </h3>
            <p className={styles.footerDescription}>
              Tvoj pouzdan partner za kupovinu i prodaju telefona u Srbiji.
              Kvalitet, sigurnost i transparentnost su naši prioriteti.
            </p>
            <div className={styles.socialLinks}>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                Facebook
              </motion.a>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                Instagram
              </motion.a>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                Twitter
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className={styles.footerSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4>Kontakt</h4>
            <p>📧 info@tehnokrug.rs</p>
            <p>📞 +381 11 123 4567</p>
            <p>📱 +381 64 123 4567</p>
            <p>📍 Knez Mihailova 15, Beograd</p>
          </motion.div>

          <motion.div
            className={styles.footerSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Radno vreme</h4>
            <p><FiClock /> Ponedeljak - Petak</p>
            <p>09:00 - 20:00</p>
            <p><FiClock /> Subota</p>
            <p>10:00 - 18:00</p>
            <p><FiClock /> Nedelja: Zatvoreno</p>
          </motion.div>

          <motion.div
            className={styles.footerSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4>Brzi linkovi</h4>
            <a href="#kupi" className={styles.footerLink}>Kupi telefon</a>
            <a href="#prodaj" className={styles.footerLink}>Prodaj telefon</a>
            <a href="#kako-radi" className={styles.footerLink}>Kako radi?</a>
            <a href="#kontakt" className={styles.footerLink}>Kontakt</a>
          </motion.div>
        </div>

        <motion.div
          className={styles.footerBottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>&copy; 2024 tehnoKrug. Sva prava zadržana.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Politika privatnosti</a>
            <a href="#">Uslovi korišćenja</a>
            <a href="#">Kolačići</a>
          </div>
        </motion.div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        className={styles.scrollToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, scale: scrollYProgress.get() > 0.2 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>
    </div>
  );
}
