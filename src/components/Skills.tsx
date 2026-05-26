'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Framework' },
  { name: 'TypeScript', icon: '📘', category: 'Language' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Language' },
  { name: 'Java', icon: '☕', category: 'Language' },
  { name: 'Cybersecurity', icon: '🔐', category: 'Security' },
  { name: 'AI / ML', icon: '🧠', category: 'Intelligence' },
  { name: 'Cloud', icon: '☁️', category: 'Infrastructure' },
  { name: 'GitHub', icon: '🐙', category: 'DevOps' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-28 px-6" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title text-white mb-4">
            Tech <span className="glow-text">Stack</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Technologies and tools I use to bring ideas to life and build exceptional digital products.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <h3 className="text-white font-semibold text-sm mb-1">{skill.name}</h3>
              <p className="text-[#94a3b8] text-xs">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
