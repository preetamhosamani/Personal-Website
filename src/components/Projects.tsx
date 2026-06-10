'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    number: '01',
    title: 'Quantum Wall',
    description:
      'A secure cloud-native password manager with zero-knowledge encryption, biometric authentication, and military-grade security protocols.',
    tech: ['React', 'Node.js', 'AWS', 'Encryption'],
    repoUrl: 'https://github.com/preetamhosamani/Quantam-Wall',
  },
  {
    number: '02',
    title: 'Neural Flow',
    description:
      'AI-powered analytics dashboard with real-time data visualisation, predictive modelling, and intelligent anomaly detection systems.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
    repoUrl: 'https://github.com/preetamhosamani/Neural-Flow',
  },
  {
    number: '03',
    title: 'CyberShield',
    description:
      'Enterprise-grade cybersecurity monitoring platform with real-time threat detection, automated incident response, and compliance reporting.',
    tech: ['TypeScript', 'Go', 'Docker', 'Kubernetes'],
    repoUrl: 'https://github.com/preetamhosamani/Cybershield',
  },
  {
    number: '04',
    title: 'MetaCanvas',
    description:
      'Creative collaboration platform with real-time whiteboarding, AI-assisted design tools, and seamless multi-user editing capabilities.',
    tech: ['React', 'WebSocket', 'AI/ML', 'Canvas'],
    repoUrl: 'https://github.com/preetamhosamani/Meta-Canvas',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <span className="section-label">Work</span>
        <h2>Featured Projects</h2>

        <div
          ref={ref}
          className="projects-grid"
          style={{ marginTop: '3rem' }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={isInView ? 'fade-in visible' : 'fade-in'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--color-cream)',
                border: '1px solid var(--color-border)',
                borderRadius: 4,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: 'var(--color-gold)',
                  marginBottom: '1rem',
                  letterSpacing: '0.1em',
                }}
              >
                {project.number}
              </div>

              {/* Title */}
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '1.5rem',
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
                {project.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 pb-0.5"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-ink-muted)',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-ink)';
                    e.currentTarget.style.borderBottomColor = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-ink-muted)';
                    e.currentTarget.style.borderBottomColor = 'var(--color-border)';
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
