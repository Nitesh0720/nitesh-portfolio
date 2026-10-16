import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personal } from '../data/config';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.15), transparent)',
        }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 400,
          background: 'radial-gradient(ellipse at bottom, rgba(14,165,233,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center"
        >
          {/* Section label */}
          <motion.p variants={itemVariants} className="section-label">
            Get in touch
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Have an opportunity or an{' '}
            <span className="gradient-text">interesting project</span>
            {' '}in mind?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
            style={{ color: '#64748b' }}
          >
            I'm open to software development and cloud-related internship opportunities,
            collaborative projects, and conversations about technology.
          </motion.p>

          {/* Email CTA */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <a
              href={`mailto:${personal.email}`}
              className="btn-primary text-base py-3.5 px-8"
            >
              <Mail size={18} />
              Say Hello
            </a>
          </motion.div>

          {/* Contact info cards */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {/* Email */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-5 text-center group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(56,189,248,0.07)' }}
              >
                <Mail size={18} style={{ color: '#38bdf8' }} />
              </div>
              <p className="text-xs mb-2" style={{ color: '#475569' }}>Email</p>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={`mailto:${personal.email}`}
                  className="text-xs font-medium text-white hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded break-all"
                >
                  {personal.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="shrink-0 p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 relative"
                  aria-label="Copy email address"
                  title={copied ? "Copied to clipboard!" : "Copy email address"}
                >
                  {copied ? (
                    <Check size={14} style={{ color: '#22c55e' }} />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 bg-slate-900 border border-emerald-500/30 px-1.5 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              variants={itemVariants}
              className="glass-card-hover rounded-xl p-5 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(56,189,248,0.07)' }}
              >
                <LinkedinIcon size={18} style={{ color: '#38bdf8' }} />
              </div>
              <p className="text-xs mb-2" style={{ color: '#64748b' }}>LinkedIn</p>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              >
                nitesh-dere
                <ExternalLink size={11} />
              </a>
            </motion.div>

            {/* GitHub */}
            <motion.div
              variants={itemVariants}
              className="glass-card-hover rounded-xl p-5 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(56,189,248,0.07)' }}
              >
                <GithubIcon size={18} style={{ color: '#38bdf8' }} />
              </div>
              <p className="text-xs mb-2" style={{ color: '#64748b' }}>GitHub</p>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              >
                Nitesh0720
                <ExternalLink size={11} />
              </a>
            </motion.div>
          </motion.div>

          {/* Note: No fake contact form */}
          <motion.p variants={itemVariants} className="text-xs text-slate-400">
            Prefer direct email? Reach me at{' '}
            <a
              href={`mailto:${personal.email}`}
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              {personal.email}
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
