'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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
      'Founding a next-generation platform focusing on seamless user experiences, cutting-edge AI integrations, and beautiful design architectures.',
  },
  {
    period: '2025',
    role: 'Hackathon Champion',
    company: 'Various Global Hackathons',
    description:
      'Won multiple global hackathons by building innovative tech solutions in record time, showcasing both engineering prowess and product design.',
  },
  {
    period: '2024',
    role: 'Open Source Contributor',
    company: 'GitHub Ecosystem',
    description:
      'Actively contributed to the open-source community, building tools, component libraries, and improving the developer experience for thousands of engineers.',
  },
];

function TimelineCard({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <div
      ref={cardRef}
      className="relative pl-16 pb-14 last:pb-0 md:pl-20"
    >
      {/* Timeline dot */}
      <motion.div
        className="timeline-dot absolute left-0 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#00e5ff] bg-[#0a0a0f] md:left-1"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      >
        <motion.div
          className="h-2 w-2 rounded-full bg-[#00e5ff]"
          animate={
            isInView
              ? {
                  boxShadow: [
                    '0 0 4px #00e5ff, 0 0 8px #00e5ff',
                    '0 0 8px #00e5ff, 0 0 20px #00e5ff',
                    '0 0 4px #00e5ff, 0 0 8px #00e5ff',
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Connector line from dot to card */}
      <motion.div
        className="absolute left-5 top-[0.6rem] h-px w-8 bg-gradient-to-r from-[#00e5ff]/60 to-[#00e5ff]/0 md:left-6 md:w-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Glass card */}
      <motion.div
        className="glass-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#00e5ff]/20 hover:bg-white/[0.05] md:p-8"
        initial={{ opacity: 0, x: 60, y: 10 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: 60, y: 10 }
        }
        transition={{
          duration: 0.7,
          delay: index * 0.15 + 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Hover glow effect */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,229,255,0.06), transparent 60%)',
          }}
        />

        {/* Top edge glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Period */}
        <span className="glow-text mb-3 inline-block text-sm font-semibold tracking-widest text-[#00e5ff] uppercase"
          style={{
            textShadow: '0 0 10px rgba(0,229,255,0.4)',
          }}
        >
          {item.period}
        </span>

        {/* Role */}
        <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">
          {item.role}
        </h3>

        {/* Company */}
        <p className="mb-3 text-sm font-medium text-white/40">
          {item.company}
        </p>

        {/* Description */}
        <p className="leading-relaxed text-white/55 text-[0.95rem]">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              'radial-gradient(circle, #00e5ff 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.02]"
          style={{
            background:
              'radial-gradient(circle, #00e5ff 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2
            className="section-title mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            My Journey
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            A chronicle of milestones, growth, and the relentless pursuit of
            crafting exceptional digital experiences.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line (static track) */}
          <div className="timeline-line absolute left-[9px] top-0 bottom-0 w-px bg-white/[0.06] md:left-[13px]" />

          {/* Animated line fill */}
          <motion.div
            className="absolute left-[9px] top-0 w-px origin-top bg-gradient-to-b from-[#00e5ff] via-[#00e5ff]/60 to-transparent md:left-[13px]"
            style={{ height: lineHeight }}
          />

          {/* Timeline items */}
          {experiences.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
