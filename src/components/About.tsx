'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '50+', label: 'Projects Built', icon: '🚀' },
  { value: '10+', label: 'Hackathons Won', icon: '🏆' },
  { value: '3+', label: 'Years Experience', icon: '💼' },
  { value: '20+', label: 'Technologies', icon: '⚡' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-28 px-6" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title text-white mb-4">
            About <span className="glow-text">Me</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Passionate about crafting elegant digital experiences that push the boundaries of modern web technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Bio Card */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00e5ff]" style={{ boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
              <span className="text-[#00e5ff] text-sm font-semibold tracking-wider uppercase">Who I Am</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Developer, Creator & <span className="glow-text">Innovator</span>
            </h3>

            <div className="space-y-4 text-[#94a3b8] leading-relaxed text-[0.95rem]">
              <p>
                I&apos;m Preetam Hosamani — a full-stack developer and creative technologist with a passion for 
                building premium digital products that make a lasting impact. With expertise spanning 
                from React and Next.js to cloud architecture and AI/ML, I bring a holistic approach 
                to every project.
              </p>
              <p>
                My journey in tech started with a curiosity about how things work under the hood. 
                Today, I architect and build scalable systems that serve thousands of users, lead 
                engineering teams, and contribute to open-source projects that shape the developer ecosystem.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me mentoring aspiring developers, speaking at 
                tech conferences, or exploring the intersection of design and technology to create 
                experiences that feel truly magical.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Full-Stack', 'UI/UX', 'Cloud Architecture', 'AI/ML', 'Open Source'].map((tag) => (
                <span key={tag} className="tech-pill">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-5"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <span className="glow-text text-4xl font-extrabold block mb-2">{stat.value}</span>
                <span className="text-[#94a3b8] text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}

            {/* Extra credibility card */}
            <motion.div
              className="col-span-2 glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-lg">Open to Opportunities</p>
                  <p className="text-[#94a3b8] text-sm mt-1">Available for freelance & full-time roles</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">Available</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
