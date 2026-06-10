'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

const experiences: TimelineItem[] = [
  {
    period: '2026',
    role: 'Founder',
    company: 'Solus',
    description:
      'Founded a next-generation platform focusing on seamless user experiences, cutting-edge AI integrations, and beautiful design architecture.',
  },
  {
    period: '2025',
    role: 'Hackathon Champion',
    company: 'Various Global Hackathons',
    description:
      'Won multiple global hackathons by building innovative tech solutions in record time, showcasing engineering prowess and product design thinking.',
  },
  {
    period: '2024',
    role: 'Open Source Contributor',
    company: 'GitHub Ecosystem',
    description:
      'Actively contributed to the open-source community, building tools, component libraries, and improving the developer experience for thousands of engineers.',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience">
      <div className="container">
        <span className="section-label">Journey</span>
        <h2>Experience &amp; Milestones</h2>

        <div
          ref={ref}
          className="relative"
          style={{ marginTop: '3rem', paddingLeft: '2rem' }}
        >
          {/* Timeline line */}
          <div
            className="absolute left-0 top-2 bottom-0"
            style={{ width: '1px', background: 'var(--color-border)' }}
          />

          {experiences.map((item, i) => (
            <motion.div
              key={i}
              className={isInView ? 'fade-in visible' : 'fade-in'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ position: 'relative', paddingBottom: '3rem' }}
            >
              {/* Dot */}
              <div
                className="absolute"
                style={{
                  left: '-2rem',
                  top: '6px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  transform: 'translateX(-4px)',
                  border: '2px solid var(--color-cream)',
                  outline: '1px solid var(--color-gold)',
                }}
              />

              {/* Year */}
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: '0.5rem',
                }}
              >
                {item.period}
              </div>

              {/* Role */}
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                {item.role}
              </h3>

              {/* Company */}
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--color-ink-muted)',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.04em',
                }}
              >
                {item.company}
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', maxWidth: 580 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
