'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section id="contact" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div
            className="contact-grid"
            ref={ref}
          >
            {/* Left — Info */}
            <motion.div
              className={isInView ? 'fade-in visible' : 'fade-in'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Contact</span>
              <h2>Let&apos;s build something great</h2>
              <div className="section-divider" />
              <p style={{ fontSize: '15px', marginBottom: '0.5rem' }}>
                Open to new projects, creative collaborations, and full-time
                opportunities. Whether it&apos;s a complete product build or a quick
                consultation — reach out.
              </p>

              <div className="flex flex-col gap-4" style={{ marginTop: '2rem' }}>
                {/* Email */}
                <div
                  className="flex gap-4 items-start"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-ink-muted)',
                      minWidth: 80,
                      paddingTop: '2px',
                    }}
                  >
                    Email
                  </span>
                  <a
                    href="mailto:work.oasis@gmail.com"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                    }}
                  >
                    work.oasis@gmail.com
                  </a>
                </div>

                {/* Location */}
                <div
                  className="flex gap-4 items-start"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-ink-muted)',
                      minWidth: 80,
                      paddingTop: '2px',
                    }}
                  >
                    Location
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                    }}
                  >
                    Bengaluru, India
                  </span>
                </div>

                {/* Status */}
                <div
                  className="flex gap-4 items-start"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-ink-muted)',
                      minWidth: 80,
                      paddingTop: '2px',
                    }}
                  >
                    Status
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-risk-green)',
                    }}
                  >
                    Open for Opportunities
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className={isInView ? 'fade-in visible' : 'fade-in'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="form-field">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {submitted ? (
                  <div
                    className="btn-primary text-center"
                    style={{
                      alignSelf: 'flex-start',
                      background: 'var(--color-risk-green)',
                      color: '#fff',
                    }}
                  >
                    Message Sent!
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ alignSelf: 'flex-start', cursor: 'pointer' }}
                  >
                    Send Message
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center"
        style={{
          padding: '2.5rem 0',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div
          className="flex justify-between items-center"
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--color-ink-muted)',
            }}
          >
            &copy; 2026 Preetam Hosamani. All rights reserved.
          </span>
          <div className="hidden md:flex gap-6">
            <a
              href="https://github.com/preetamhosamani"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ fontSize: '12px', color: 'var(--color-ink-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink-muted)';
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/preetam-hosamani"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ fontSize: '12px', color: 'var(--color-ink-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink-muted)';
              }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:work.oasis@gmail.com"
              className="transition-colors duration-200"
              style={{ fontSize: '12px', color: 'var(--color-ink-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink-muted)';
              }}
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
