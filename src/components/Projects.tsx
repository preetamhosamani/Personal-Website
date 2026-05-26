'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Quantum Wall',
    description: 'A secure cloud-native password manager with zero-knowledge encryption, biometric authentication, and military-grade security protocols.',
    tech: ['React', 'Node.js', 'AWS', 'Encryption'],
    gradient: 'from-cyan-500/20 to-blue-600/10',
    repoUrl: 'https://github.com/preetamhosamani/Quantam-Wall',
    demoUrl: 'http://localhost:5173',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="16" y="22" width="48" height="40" rx="4" stroke="#00e5ff" strokeWidth="1.5" fill="none" />
        <path d="M30 22V16a10 10 0 0120 0v6" stroke="#00e5ff" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="42" r="6" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.1)" />
        <line x1="40" y1="48" x2="40" y2="54" stroke="#00e5ff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Neural Flow',
    description: 'AI-powered analytics dashboard with real-time data visualization, predictive modeling, and intelligent anomaly detection systems.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
    gradient: 'from-purple-500/20 to-cyan-600/10',
    repoUrl: 'https://github.com/preetamhosamani/Neural-Flow',
    demoUrl: 'http://localhost:5174',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="30" r="8" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.08)" />
        <circle cx="24" cy="54" r="6" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.08)" />
        <circle cx="56" cy="54" r="6" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.08)" />
        <line x1="36" y1="36" x2="27" y2="49" stroke="#00e5ff" strokeWidth="1" opacity="0.6" />
        <line x1="44" y1="36" x2="53" y2="49" stroke="#00e5ff" strokeWidth="1" opacity="0.6" />
        <line x1="30" y1="54" x2="50" y2="54" stroke="#00e5ff" strokeWidth="1" opacity="0.6" />
        <circle cx="40" cy="30" r="3" fill="#00e5ff" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'CyberShield',
    description: 'Enterprise-grade cybersecurity monitoring platform with real-time threat detection, automated incident response, and compliance reporting.',
    tech: ['TypeScript', 'Go', 'Docker', 'Kubernetes'],
    gradient: 'from-emerald-500/20 to-cyan-600/10',
    repoUrl: 'https://github.com/preetamhosamani/Cybershield',
    demoUrl: 'http://localhost:5175',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M40 12L60 24V44C60 54 50 62 40 66C30 62 20 54 20 44V24L40 12Z" stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.06)" />
        <path d="M34 40L38 44L46 36" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'MetaCanvas',
    description: 'Creative collaboration platform with real-time whiteboarding, AI-assisted design tools, and seamless multi-user editing capabilities.',
    tech: ['React', 'WebSocket', 'AI/ML', 'Canvas'],
    gradient: 'from-orange-500/20 to-cyan-600/10',
    repoUrl: 'https://github.com/preetamhosamani/Meta-Canvas',
    demoUrl: 'http://localhost:5176',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="14" y="18" width="52" height="38" rx="3" stroke="#00e5ff" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="36" r="4" stroke="#00e5ff" strokeWidth="1" fill="rgba(0,229,255,0.1)" />
        <rect x="40" y="30" width="16" height="12" rx="2" stroke="#00e5ff" strokeWidth="1" fill="rgba(0,229,255,0.06)" />
        <path d="M20 62L34 56H46L60 62" stroke="#00e5ff" strokeWidth="1.5" fill="none" />
        <line x1="40" y1="56" x2="40" y2="62" stroke="#00e5ff" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-28 px-6" ref={ref}>
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title text-white mb-4">
            Featured <span className="glow-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A curated selection of projects that showcase my expertise in building scalable, premium digital products.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
            >
              {/* Thumbnail */}
              <div className={`project-thumbnail bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="relative z-10 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                  {project.icon}
                </div>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="neon-btn-outline !py-2.5 !px-5 !text-xs !rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="neon-btn !py-2.5 !px-5 !text-xs !rounded-lg">
                    Live Demo →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
