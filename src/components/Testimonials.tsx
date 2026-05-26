'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "Preetam is one of the most talented developers I've worked with. His attention to detail and ability to ship polished products is remarkable. He doesn't just write code — he crafts experiences.",
    name: 'Anjali Sharma',
    role: 'Student at NIT Surathkal',
    stars: 5,
  },
  {
    quote: "Exceptional problem-solving skills and a keen eye for design. Preetam consistently delivers beyond expectations and brings innovative solutions to complex technical challenges.",
    name: 'Rahul Desai',
    role: 'Junior Engineer',
    stars: 5,
  },
  {
    quote: "Working with Preetam was a game-changer for our project. His expertise in React and system architecture elevated our entire platform to a new level of performance and polish.",
    name: 'Priya Patel',
    role: 'Product Manager at Oracle',
    stars: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title text-white mb-4">
            What People <span className="glow-text">Say</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Trusted by industry leaders and teams who value quality, reliability, and innovation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card p-7 flex flex-col"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              {/* Quote mark */}
              <span className="glow-text text-5xl font-serif leading-none mb-3">&ldquo;</span>

              {/* Quote text */}
              <p className="text-[#c8d0dd] text-[0.92rem] leading-relaxed italic flex-1 mb-6">
                {t.quote}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-[#00e5ff]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'rgba(0,229,255,0.12)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#94a3b8] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
