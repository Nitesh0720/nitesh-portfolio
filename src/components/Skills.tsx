import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/config';

const categoryConfig = [
  {
    key: 'programming' as const,
    label: 'Programming & Web',
    description: 'Languages and markup I have used in projects and coursework.',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.06)',
    border: 'rgba(56,189,248,0.12)',
  },
  {
    key: 'tools' as const,
    label: 'Developer Tools',
    description: 'Tools that support my development and version control workflow.',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.06)',
    border: 'rgba(34,211,238,0.12)',
  },
  {
    key: 'cloud' as const,
    label: 'AWS Cloud',
    description: 'AWS services I have worked with through practical lab exercises.',
    note: 'All marked as hands-on lab experience, not production deployments.',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.12)',
  },
  {
    key: 'fundamentals' as const,
    label: 'Fundamentals',
    description: 'Core concepts I practice and apply regularly.',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.06)',
    border: 'rgba(244,114,182,0.12)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 md:py-32 relative">
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
            <p className="section-label">What I work with</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
            <p className="text-base max-w-xl" style={{ color: '#64748b' }}>
              Skills organized by category. No arbitrary proficiency scores — only honest
              descriptions of what I've used and how.
            </p>
          </motion.div>

          {/* Skill categories grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {categoryConfig.map(cat => {
              const items = skills[cat.key] as Array<{ name: string; note?: string }>;
              return (
                <motion.div
                  key={cat.key}
                  variants={cardVariants}
                  className="glass-card-hover rounded-2xl p-6 md:p-7"
                  style={{ borderColor: cat.border }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Category header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3
                        className="text-base font-semibold mb-1"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                        {cat.description}
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full shrink-0 mt-1"
                      style={{ background: cat.color, opacity: 0.6 }}
                    />
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {items.map(skill => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.15 }}
                        title={skill.note}
                        style={{
                          padding: '0.3rem 0.75rem',
                          borderRadius: 999,
                          background: cat.bg,
                          border: `1px solid ${cat.border}`,
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          color: cat.color,
                          cursor: 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}
                      >
                        {skill.name}
                        {skill.note && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              color: cat.color,
                              opacity: 0.6,
                            }}
                          >
                            (lab)
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {cat.note && (
                    <p className="mt-4 text-xs italic" style={{ color: '#64748b' }}>
                      {cat.note}
                    </p>
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
