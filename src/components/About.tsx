'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '50', label: 'Projects Built' },
  { value: '10', label: 'Hackathons Won' },
  { value: '3', label: 'Years Experience' },
  { value: '20', label: 'Technologies' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <div
          className="about-grid"
          ref={ref}
        >
          {/* Left — Bio */}
          <motion.div
            className={isInView ? 'fade-in visible' : 'fade-in'}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About</span>
            <h2>
              Developer,
              <br />
              Creator &amp; Innovator
            </h2>
            <div className="section-divider" />
            <p style={{ fontSize: '15px', marginBottom: '1.25rem' }}>
              I&apos;m a full-stack developer and creative technologist with a passion for
              building premium digital products that make a lasting impact. With expertise
              spanning React, Next.js, cloud architecture, and AI/ML, I bring a holistic
              approach to every project.
            </p>
            <p style={{ fontSize: '15px', marginBottom: '1.25rem' }}>
              My journey started with curiosity about how things work under the hood.
              Today, I architect and build scalable systems, contribute to open-source
              projects, and explore the intersection of design and technology.
            </p>
            <p style={{ fontSize: '15px' }}>
              When I&apos;m not coding, I&apos;m mentoring aspiring developers or speaking at
              tech events about building for scale.
            </p>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="grid overflow-hidden"
              style={{
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                background: 'var(--color-border)',
                border: '1px solid var(--color-border)',
                borderRadius: 4,
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--color-cream)',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '2.2rem',
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      lineHeight: 1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stat.value}
                    <span style={{ color: 'var(--color-gold)' }}>+</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-ink-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
