'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import styles from './KakoRadi.module.css';

export default function KakoRadi() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;

      // Progress računamo dok sticky kontejner scrolluje kroz wrapper
      const scrollStart = rect.top;
      const scrollEnd = rect.bottom - windowHeight;

      if (scrollStart <= 0 && scrollEnd >= 0) {
        // Wrapper je u view-u, računaj progress
        const totalScrollDistance = containerHeight - windowHeight;
        const currentScroll = Math.abs(scrollStart);
        const progress = currentScroll / totalScrollDistance;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (scrollStart > 0) {
        // Pre nego što wrapper uđe u view
        setScrollProgress(0);
      } else {
        // Nakon što wrapper izađe iz view-a
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Pozovi odmah za inicijalizaciju

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth easing funkcija
  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Funkcija za izračunavanje vidljivosti step-a sa smoothing efekatom
  const getStepVisibility = (index) => {
    const numSteps = howItWorks.length;
    const stepDuration = 1 / numSteps; // 0.25 za 4 step-a

    // Start i end za svaki step sa overlap-om
    const stepStart = index * stepDuration;
    const stepEnd = (index + 1) * stepDuration;

    // Transition zone - 15% na početku i kraju svakog step-a
    const transitionZone = stepDuration * 0.15;

    let visibility = 0;

    if (scrollProgress < stepStart) {
      // Pre step-a
      visibility = 0;
    } else if (scrollProgress >= stepStart && scrollProgress < stepStart + transitionZone) {
      // Fade in faza
      const fadeInProgress = (scrollProgress - stepStart) / transitionZone;
      visibility = easeInOut(fadeInProgress);
    } else if (scrollProgress >= stepStart + transitionZone && scrollProgress < stepEnd - transitionZone) {
      // Potpuno vidljiv
      visibility = 1;
    } else if (scrollProgress >= stepEnd - transitionZone && scrollProgress < stepEnd) {
      // Fade out faza
      const fadeOutProgress = (scrollProgress - (stepEnd - transitionZone)) / transitionZone;
      visibility = easeInOut(1 - fadeOutProgress);
    } else {
      // Posle step-a
      visibility = 0;
    }

    return visibility;
  };

  // Odredi trenutni step za indikatore
  const currentStep = Math.min(
    Math.floor(scrollProgress * howItWorks.length),
    howItWorks.length - 1
  );

  return (
    <section ref={containerRef} className={styles.howItWorksWrapper} id="kako-radi">
      <div className={styles.howItWorksStickyContainer}>
        {/* Header - fade out dok skroluješ */}
        <motion.div
          className={styles.howItWorksHeader}
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2)
          }}
        >
          <h2 className={styles.sectionTitle}>Kako radi?</h2>
          <p className={styles.sectionSubtitle}>Jednostavan proces u 4 koraka</p>
        </motion.div>

        {/* Sticky Content */}
        <div className={styles.howItWorksStickyContent}>
          {/* Progress Line */}
          <div className={styles.progressLineContainer}>
            <div
              className={styles.progressLine}
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />
          </div>

          {/* Steps Cards */}
          <div className={styles.stepsCardsContainer}>
            {howItWorks.map((step, index) => {
              const visibility = getStepVisibility(index);

              // Animiraj opacity, position, i scale baziran na vidljivosti
              const opacity = visibility;
              const y = (1 - visibility) * 80; // 80px pomeranje za dramatičniji efekat
              const scale = 0.85 + (visibility * 0.15); // Od 0.85 do 1.0
              const blur = (1 - visibility) * 20; // Jači blur efekat

              return (
                <div
                  key={index}
                  className={styles.stepCardApple}
                  style={{
                    opacity,
                    transform: `translate(-50%, calc(-50% + ${y}px)) scale(${scale})`,
                    filter: `blur(${blur}px)`,
                    pointerEvents: visibility > 0.5 ? 'auto' : 'none',
                  }}
                >
                  <div className={styles.stepCardInner}>
                    {/* Step Number Badge */}
                    <div
                      className={styles.stepBadge}
                      style={{ background: step.color }}
                    >
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div
                      className={styles.stepIconLarge}
                      style={{ color: step.color }}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className={styles.stepTitleLarge}>{step.title}</h3>
                    <p className={styles.stepDescriptionLarge}>{step.description}</p>

                    {/* Decorative Glow */}
                    <div
                      className={styles.stepGlow}
                      style={{
                        background: step.color,
                        opacity: visibility * 0.3
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step indicators */}
          <div className={styles.stepIndicators}>
            {howItWorks.map((_, index) => (
              <div
                key={index}
                className={styles.stepIndicator}
                style={{
                  opacity: currentStep === index ? 1 : 0.3,
                  transform: currentStep === index ? 'scale(1.3)' : 'scale(1)',
                  background: currentStep === index ? howItWorks[index].color : '#667eea',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
