'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/preetamhosamani' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/preetam-hosamani' },
  { name: 'Instagram', href: 'https://instagram.com/preetamhosamani' },
];

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'TensorFlow'];

const codeLines = [
  'const developer = {',
  '  name: "Preetam Hosamani",',
  '  role: "Full-Stack Developer",',
  '  passion: "Building the future",',
  '  coffee: Infinity,',
  '};',
];

// Syntax highlighting for code lines
function colorCodeLine(line: string) {
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'export', 'from', 'new'];

  const parts: React.ReactNode[] = [];
  let remaining = line;
  let keyIdx = 0;

  // Simple token-based highlighting
  while (remaining.length > 0) {
    let matched = false;

    // Check for keyword at start
    for (const kw of keywords) {
      if (remaining.startsWith(kw + ' ') || remaining.startsWith(kw + '{') || remaining === kw) {
        parts.push(<span key={`kw-${keyIdx++}`} style={{ color: 'var(--color-gold)' }}>{kw}</span>);
        remaining = remaining.slice(kw.length);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Check for string
    if (remaining.startsWith('"')) {
      const endIdx = remaining.indexOf('"', 1);
      if (endIdx !== -1) {
        const str = remaining.slice(0, endIdx + 1);
        parts.push(<span key={`str-${keyIdx++}`} style={{ color: 'var(--color-risk-green)' }}>{str}</span>);
        remaining = remaining.slice(endIdx + 1);
        continue;
      }
    }

    // Check for number
    if (/^\d/.test(remaining)) {
      const numMatch = remaining.match(/^(\d+)/);
      if (numMatch) {
        parts.push(<span key={`num-${keyIdx++}`} style={{ color: '#C0392B' }}>{numMatch[1]}</span>);
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
    }

    // Check for property name before colon
    if (/^\s+[\w]+:/.test(remaining)) {
      const propMatch = remaining.match(/^(\s+)([\w]+)(:)/);
      if (propMatch) {
        parts.push(<span key={`ws-${keyIdx++}`}>{propMatch[1]}</span>);
        parts.push(<span key={`prop-${keyIdx++}`} style={{ color: 'var(--color-ink-muted)' }}>{propMatch[2]}</span>);
        parts.push(<span key={`colon-${keyIdx++}`}>{propMatch[3]}</span>);
        remaining = remaining.slice(propMatch[0].length);
        continue;
      }
    }

    // Check for Infinity
    if (remaining.startsWith('Infinity')) {
      parts.push(<span key={`num-${keyIdx++}`} style={{ color: '#C0392B' }}>Infinity</span>);
      remaining = remaining.slice(8);
      continue;
    }

    // Check for braces/brackets
    if (remaining[0] === '{' || remaining[0] === '}' || remaining[0] === '[' || remaining[0] === ']' || remaining[0] === ',' || remaining[0] === ';') {
      parts.push(<span key={`brace-${keyIdx++}`} style={{ color: 'var(--color-ink-muted)' }}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
      continue;
    }

    // Default: take one character
    parts.push(<span key={`ch-${keyIdx++}`}>{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return parts;
}

export default function Hero() {
  const [underlineVisible, setUnderlineVisible] = useState(false);
  const [techIndex, setTechIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  // Cycle tech stack
  useEffect(() => {
    const interval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % techStack.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for code block
  const startTyping = useCallback(() => {
    let lineIdx = 0;
    let charIdx = 0;
    const timer = setInterval(() => {
      if (lineIdx >= codeLines.length) {
        clearInterval(timer);
        return;
      }
      charIdx++;
      setDisplayedLines(codeLines.slice(0, lineIdx).concat(codeLines[lineIdx].slice(0, charIdx)));
      if (charIdx >= codeLines[lineIdx].length) {
        lineIdx++;
        charIdx = 0;
      }
    }, 45);
    return timer;
  }, []);

  useEffect(() => {
    const underlineTimer = setTimeout(() => setUnderlineVisible(true), 100);
    const typingTimer = startTyping();
    return () => {
      clearTimeout(underlineTimer);
      clearInterval(typingTimer);
    };
  }, [startTyping]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center"
      style={{ paddingTop: '64px', borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Availability Badge */}
            <div className="badge-available">
              <span className="badge-dot" />
              Open for opportunities
            </div>

            {/* Eyebrow */}
            <div
              className="flex items-center gap-2.5 mb-5"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
              }}
            >
              <span
                className="block"
                style={{ width: '28px', height: '1px', background: 'var(--color-gold)' }}
              />
              Frontend Developer — Bengaluru, India
            </div>

            {/* Name */}
            <h1 className="mb-2">
              <span className="relative inline-block">
                Preetam
                <br />
                Hosamani
                <span
                  className="absolute bottom-[2px] left-0 h-[3px]"
                  style={{
                    background: 'var(--color-gold)',
                    width: underlineVisible ? '100%' : '0',
                    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                  }}
                />
              </span>
            </h1>

            {/* Role */}
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: 'var(--color-ink-muted)',
                fontWeight: 400,
              }}
            >
              Developer, Creator &amp; Innovator
            </p>

            {/* Description */}
            <p
              className="mb-10"
              style={{
                fontSize: '15px',
                maxWidth: 440,
                color: 'var(--color-ink-muted)',
              }}
            >
              Crafting immersive digital experiences at the intersection of design
              and engineering — pixel-perfect interfaces, fluid animations, and
              systems that feel alive.
            </p>

            {/* Actions */}
            <div className="flex gap-4 items-center flex-wrap">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-ghost">
                Get in Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 mt-10">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 pb-0.5"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: 'var(--color-ink-muted)',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-ink)';
                    e.currentTarget.style.borderBottomColor = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-ink-muted)';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Bento Grid */}
          <motion.div
            className="hero-graphic"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="hero-bento-grid">
              {/* Card 1: Code Editor */}
              <motion.div
                className="bento-card bento-card-code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bento-code-header">
                  <span className="bento-code-dot" style={{ background: '#E5534B' }} />
                  <span className="bento-code-dot" style={{ background: '#C9A84C' }} />
                  <span className="bento-code-dot" style={{ background: '#1A6B3C' }} />
                  <span className="bento-code-filename">developer.js</span>
                </div>
                <div className="bento-code-body">
                  {displayedLines.map((line, i) => (
                    <div key={i} className="bento-code-line">
                      <span className="bento-line-number">{i + 1}</span>
                      <span className="bento-line-content">
                        {colorCodeLine(line)}
                      </span>
                    </div>
                  ))}
                  <span className="bento-cursor">|</span>
                </div>
              </motion.div>

              {/* Card 2: Tech Stack Orbit */}
              <motion.div
                className="bento-card bento-card-tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <div className="bento-card-label">Current Focus</div>
                <div className="bento-tech-value">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4 }}
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {techStack[techIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="bento-tech-dots">
                  {techStack.map((_, i) => (
                    <span
                      key={i}
                      className="bento-tech-dot"
                      style={{
                        background: i === techIndex ? 'var(--color-gold)' : 'var(--color-border)',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Card 3: Location */}
              <motion.div
                className="bento-card bento-card-location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="bento-card-label" style={{ marginBottom: 2 }}>Based in</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-ink)' }}>Bengaluru, IN</div>
                </div>
              </motion.div>

              {/* Card 4: Experience Counter */}
              <motion.div
                className="bento-card bento-card-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                <div style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                  3<span style={{ color: 'var(--color-gold)' }}>+</span>
                </div>
                <div className="bento-card-label">Years of Experience</div>
              </motion.div>

              {/* Card 5: Status */}
              <motion.div
                className="bento-card bento-card-status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <span className="badge-dot" style={{ width: 8, height: 8 }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-risk-green)' }}>
                  Available for Work
                </span>
              </motion.div>

              {/* Card 6: Projects Counter */}
              <motion.div
                className="bento-card bento-card-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.6 }}
              >
                <div style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                  50<span style={{ color: 'var(--color-gold)' }}>+</span>
                </div>
                <div className="bento-card-label">Projects Delivered</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
