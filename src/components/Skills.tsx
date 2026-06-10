'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'TensorFlow', category: 'AI / ML' },
  { name: 'AWS / Cloud', category: 'Infrastructure' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'D3.js', category: 'Visualisation' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Cybersecurity', category: 'Security' },
  { name: 'GitHub', category: 'DevOps' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills">
      <div className="container">
        <span className="section-label">Tech Stack</span>
        <h2>Technologies I work with</h2>

        <motion.div
          ref={ref}
          className={isInView ? 'fade-in visible' : 'fade-in'}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '3rem' }}
        >
          <div
            className="grid overflow-hidden"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
              borderRadius: 4,
            }}
          >
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex justify-between items-center transition-colors duration-150"
                style={{
                  background: 'var(--color-cream)',
                  padding: '1.25rem 1.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-cream)';
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                    background: 'var(--color-surface-2)',
                    padding: '3px 8px',
                    borderRadius: 2,
                  }}
                >
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
