'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ROLES = ['Frontend Developer', 'UI/UX Designer', 'Creative Technologist'] as const;
const ROLE_CYCLE_MS = 3200;
const PARTICLE_COUNT = 18;
const ACCENT = '#00e5ff';

// ─── Animation Variants ─────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const roleVariants: Variants = {
  enter: { opacity: 0, y: 24, filter: 'blur(8px)', scale: 0.95 },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(8px)',
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const hexagonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

// ─── Social Icon SVG Paths ──────────────────────────────────────────────────

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/preetamhosamani',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/preetamhosamani/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/preetam-hosamani',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1.5,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.5 + 0.15,
  }));
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function GeometricSVGPattern() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring of connected nodes */}
      <g filter="url(#glow)" opacity="0.6">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 72 * Math.cos(rad);
          const y = 100 + 72 * Math.sin(rad);
          const nextAngle = ((angle + 60) * Math.PI) / 180;
          const nx = 100 + 72 * Math.cos(nextAngle);
          const ny = 100 + 72 * Math.sin(nextAngle);
          return (
            <line
              key={`outer-line-${i}`}
              x1={x}
              y1={y}
              x2={nx}
              y2={ny}
              stroke={ACCENT}
              strokeWidth="0.7"
              strokeOpacity="0.5"
            />
          );
        })}
      </g>

      {/* Inner triangle structure */}
      <g filter="url(#glow)" opacity="0.45">
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 45 * Math.cos(rad);
          const y = 100 + 45 * Math.sin(rad);
          const nextAngle = ((angle + 120) * Math.PI) / 180;
          const nx = 100 + 45 * Math.cos(nextAngle);
          const ny = 100 + 45 * Math.sin(nextAngle);
          return (
            <line
              key={`inner-tri-${i}`}
              x1={x}
              y1={y}
              x2={nx}
              y2={ny}
              stroke={ACCENT}
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
          );
        })}
      </g>

      {/* Connecting spokes — outer to inner */}
      <g filter="url(#glow)" opacity="0.35">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const ox = 100 + 72 * Math.cos(rad);
          const oy = 100 + 72 * Math.sin(rad);
          const ix = 100 + 45 * Math.cos(rad);
          const iy = 100 + 45 * Math.sin(rad);
          return (
            <line
              key={`spoke-${i}`}
              x1={ox}
              y1={oy}
              x2={ix}
              y2={iy}
              stroke={ACCENT}
              strokeWidth="0.5"
              strokeOpacity="0.35"
            />
          );
        })}
      </g>

      {/* Inner star connections */}
      <g filter="url(#glow)" opacity="0.3">
        {[30, 90, 150, 210, 270, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 28 * Math.cos(rad);
          const y = 100 + 28 * Math.sin(rad);
          return (
            <line
              key={`star-${i}`}
              x1={100}
              y1={100}
              x2={x}
              y2={y}
              stroke={ACCENT}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          );
        })}
      </g>

      {/* Cross connections — inner to offset outer */}
      <g filter="url(#glow)" opacity="0.2">
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const ix = 100 + 45 * Math.cos(rad);
          const iy = 100 + 45 * Math.sin(rad);
          const crossAngle = ((angle + 60) * Math.PI) / 180;
          const cx = 100 + 72 * Math.cos(crossAngle);
          const cy = 100 + 72 * Math.sin(crossAngle);
          return (
            <line
              key={`cross-${i}`}
              x1={ix}
              y1={iy}
              x2={cx}
              y2={cy}
              stroke={ACCENT}
              strokeWidth="0.4"
              strokeOpacity="0.25"
            />
          );
        })}
      </g>

      {/* Outer nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 72 * Math.cos(rad);
        const y = 100 + 72 * Math.sin(rad);
        return (
          <g key={`outer-node-${i}`}>
            <circle cx={x} cy={y} r="6" fill="url(#nodeGlow)" opacity="0.5" />
            <circle
              cx={x}
              cy={y}
              r="2.5"
              fill={ACCENT}
              filter="url(#glow)"
              opacity="0.9"
            />
          </g>
        );
      })}

      {/* Inner triangle nodes */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 45 * Math.cos(rad);
        const y = 100 + 45 * Math.sin(rad);
        return (
          <g key={`inner-node-${i}`}>
            <circle cx={x} cy={y} r="5" fill="url(#nodeGlow)" opacity="0.4" />
            <circle
              cx={x}
              cy={y}
              r="2"
              fill={ACCENT}
              filter="url(#glow)"
              opacity="0.85"
            />
          </g>
        );
      })}

      {/* Inner star nodes */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 28 * Math.cos(rad);
        const y = 100 + 28 * Math.sin(rad);
        return (
          <g key={`star-node-${i}`}>
            <circle cx={x} cy={y} r="4" fill="url(#nodeGlow)" opacity="0.3" />
            <circle
              cx={x}
              cy={y}
              r="1.5"
              fill={ACCENT}
              filter="url(#glow)"
              opacity="0.7"
            />
          </g>
        );
      })}

      {/* Center node — focal point */}
      <circle cx="100" cy="100" r="14" fill="url(#nodeGlow)" opacity="0.4" />
      <circle
        cx="100"
        cy="100"
        r="4.5"
        fill={ACCENT}
        filter="url(#softGlow)"
        opacity="1"
      />
      <circle
        cx="100"
        cy="100"
        r="8"
        fill="none"
        stroke={ACCENT}
        strokeWidth="0.6"
        strokeOpacity="0.3"
      />

      {/* Animated pulse rings */}
      <circle
        cx="100"
        cy="100"
        r="20"
        fill="none"
        stroke={ACCENT}
        strokeWidth="0.3"
        strokeOpacity="0.15"
      >
        <animate
          attributeName="r"
          values="20;35;20"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.15;0.05;0.15"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="100"
        cy="100"
        r="55"
        fill="none"
        stroke={ACCENT}
        strokeWidth="0.2"
        strokeOpacity="0.08"
      >
        <animate
          attributeName="r"
          values="55;68;55"
          dur="5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.08;0.03;0.08"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function FloatingParticles({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: ACCENT,
            boxShadow: `0 0 ${p.size * 3}px ${ACCENT}`,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -8, 5, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity, p.opacity * 0.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

// ─── Hero Component ─────────────────────────────────────────────────────────

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [particles] = useState<Particle[]>(() => generateParticles(PARTICLE_COUNT));

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hexX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const hexY = useTransform(mouseY, [-1, 1], [-12, 12]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) / centerX);
      mouseY.set((clientY - centerY) / centerY);
    },
    [mouseX, mouseY],
  );

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % ROLES.length),
      ROLE_CYCLE_MS,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Ambient Background Effects ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-left radial glow */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          }}
        />
        {/* Bottom-right radial glow */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(${ACCENT} 1px, transparent 1px),
              linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main Grid ──────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ── Left: Content ───────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base tracking-[0.25em] uppercase"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Hello, It&apos;s Me
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-[2.5rem] sm:text-[3.2rem] lg:text-[4rem] leading-[1.08] tracking-tight"
            style={{ fontWeight: 800, color: '#ffffff' }}
          >
            Preetam Hosamani
          </motion.h1>

          {/* Role cycling */}
          <motion.div variants={fadeInUp} className="flex items-baseline gap-2 flex-wrap">
            <span
              className="text-lg sm:text-xl lg:text-2xl"
              style={{ fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}
            >
              And I&apos;m a
            </span>
            <div className="relative h-[1.9em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  variants={roleVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="glow-text inline-block text-lg sm:text-xl lg:text-2xl whitespace-nowrap"
                  style={{
                    fontWeight: 700,
                    color: ACCENT,
                    textShadow: `0 0 20px ${ACCENT}80, 0 0 40px ${ACCENT}40`,
                  }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-md text-sm sm:text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            I craft immersive digital experiences at the intersection of design
            and engineering — pixel-perfect interfaces, fluid animations, and
            systems that feel alive.
          </motion.p>

          {/* Social Icons */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="social-icon group relative flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300"
                style={{
                  borderColor: `${ACCENT}35`,
                  background: 'rgba(0, 229, 255, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.12)';
                  e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}30`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${ACCENT}35`;
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.04)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] transition-colors duration-300"
                  fill="currentColor"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.style.color = ACCENT);
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.55)');
                  }}
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/Preetam_Hosamani_CV.pdf"
              download="Preetam_Hosamani_CV.pdf"
              className="neon-btn relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #00b8d4)`,
                color: '#0a0e17',
                boxShadow: `0 0 24px ${ACCENT}40, 0 0 60px ${ACCENT}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 32px ${ACCENT}70, 0 0 80px ${ACCENT}30`;
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 24px ${ACCENT}40, 0 0 60px ${ACCENT}15`;
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download CV
            </a>
            <a
              href="#projects"
              className="neon-btn-outline relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300"
              style={{
                borderColor: `${ACCENT}50`,
                color: ACCENT,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${ACCENT}12`;
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}25, inset 0 0 20px ${ACCENT}08`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `${ACCENT}50`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Projects
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Hexagonal Visual ─────────────────────────────────── */}
        <div className="relative flex items-center justify-center order-1 lg:order-2">
          <motion.div
            variants={hexagonVariants}
            initial="hidden"
            animate="visible"
            style={{ x: hexX, y: hexY }}
            className="hexagon-container animate-float relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px]"
          >
            {/* Glow layer behind hexagon */}
            <div
              className="hexagon-glow absolute inset-[-20%] rounded-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${ACCENT} 0%, transparent 65%)`,
              }}
            />

            {/* Hexagon clip container */}
            <div
              className="hexagon relative w-full h-full overflow-hidden"
              style={{
                clipPath:
                  'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(10,14,23,0.9) 50%, rgba(0,229,255,0.05) 100%)',
              }}
            >
              {/* Inner border glow */}
              <div
                className="absolute inset-[2px]"
                style={{
                  clipPath:
                    'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                  background: 'rgba(10,14,23,0.85)',
                }}
              >
                <GeometricSVGPattern />
              </div>

              {/* Edge highlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath:
                    'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                  background: `linear-gradient(135deg, ${ACCENT}18 0%, transparent 40%, transparent 60%, ${ACCENT}10 100%)`,
                }}
              />
            </div>

            {/* Hexagon border SVG overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                fill="none"
                stroke={ACCENT}
                strokeWidth="0.4"
                strokeOpacity="0.35"
              />
            </svg>

            {/* Floating particles */}
            <FloatingParticles particles={particles} />

            {/* Corner accent dots */}
            {[
              { x: '50%', y: '-2%' },
              { x: '96%', y: '23%' },
              { x: '96%', y: '77%' },
              { x: '50%', y: '102%' },
              { x: '4%', y: '77%' },
              { x: '4%', y: '23%' },
            ].map((pos, i) => (
              <motion.div
                key={`corner-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: pos.x,
                  top: pos.y,
                  background: ACCENT,
                  boxShadow: `0 0 8px ${ACCENT}, 0 0 16px ${ACCENT}60`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Orbit ring */}
          <motion.div
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: '110%',
              height: '110%',
              borderColor: `${ACCENT}10`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="absolute w-1.5 h-1.5 rounded-full -top-[3px] left-1/2 -translate-x-1/2"
              style={{
                background: ACCENT,
                boxShadow: `0 0 6px ${ACCENT}`,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8"
          style={{ background: `linear-gradient(to bottom, ${ACCENT}60, transparent)` }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
