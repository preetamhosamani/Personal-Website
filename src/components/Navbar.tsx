'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navItems.map((item) => item.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        background: scrolled
          ? 'rgba(250, 248, 244, 0.92)'
          : 'rgba(250, 248, 244, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 0.3s ease',
      }}
    >
      <div
        className="flex items-center justify-between w-full"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick('#home');
          }}
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'var(--color-ink)' }}
        >
          Preetam<span style={{ color: 'var(--color-gold)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
                className="text-[13px] font-medium transition-colors duration-200"
                style={{
                  letterSpacing: '0.02em',
                  color:
                    active === item.href.slice(1)
                      ? 'var(--color-ink)'
                      : 'var(--color-ink-muted)',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Download CV Button */}
        <a
          href="/Preetam_Hosamani_CV.pdf"
          className="hidden md:inline-block text-[13px] font-medium px-[18px] py-2 border rounded-[3px] cursor-pointer transition-all duration-200"
          style={{
            borderColor: 'var(--color-ink)',
            color: 'var(--color-ink)',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-ink)';
            e.currentTarget.style.color = 'var(--color-cream)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-ink)';
          }}
        >
          Download CV
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-[2px] rounded-full origin-center"
            style={{ background: 'var(--color-ink)' }}
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-[2px] rounded-full"
            style={{ background: 'var(--color-ink)' }}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-[2px] rounded-full origin-center"
            style={{ background: 'var(--color-ink)' }}
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'rgba(250, 248, 244, 0.98)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className="text-[15px] font-medium"
                  style={{
                    color:
                      active === item.href.slice(1)
                        ? 'var(--color-ink)'
                        : 'var(--color-ink-muted)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="/Preetam_Hosamani_CV.pdf"
                className="btn-primary text-center mt-2"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
