import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { certifications } from '../data/config';

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  'Virtual Internship': {
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.15)',
    text: '#38bdf8',
  },
  'Job Simulation': {
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.15)',
    text: '#fbbf24',
  },
  'Course Certificate': {
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.15)',
    text: '#a78bfa',
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.15), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="mb-16">
            <p className="section-label">Training & Credentials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
            <p className="text-base max-w-xl" style={{ color: '#64748b' }}>
              Internships, simulations, and courses completed. Each is accurately labeled
              as training or simulation — not professional employment.
            </p>
          </motion.div>

          {/* Cert cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map(cert => {
              const colors = typeColors[cert.type] ?? typeColors['Course Certificate'];
              return (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  className="glass-card-hover rounded-xl p-5 md:p-6 flex flex-col"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Type badge + icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                    >
                      <Award size={18} style={{ color: colors.text }} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 999,
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cert.type}
                    </span>
                  </div>

                  {/* Title & provider */}
                  <h3 className="text-base font-semibold text-white mb-1 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>
                    {cert.provider}
                  </p>

                  {/* Date */}
                  <div
                    className="flex items-center gap-1.5 mb-4"
                    style={{ color: '#475569', fontSize: '0.8rem' }}
                  >
                    <Calendar size={13} />
                    {'period' in cert ? cert.period : cert.date}
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed flex-1" style={{ color: '#64748b' }}>
                    {cert.description}
                  </p>

                  {/* Verify link — only if provided */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                      style={{ color: colors.text }}
                    >
                      <ExternalLink size={12} />
                      Verify Certificate
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
