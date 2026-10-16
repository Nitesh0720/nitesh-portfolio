import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Code, Users, Terminal } from 'lucide-react';
import { achievements } from '../data/config';

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  code: Code,
  users: Users,
  terminal: Terminal,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="py-24 md:py-32 relative">
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
          <motion.div variants={itemVariants} className="mb-16">
            <p className="section-label">Milestones</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Achievements & Leadership</h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.2), transparent)' }}
            />

            <div className="space-y-6 md:space-y-8">
              {achievements.map((item) => {
                const Icon = iconMap[item.icon] || Trophy;
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group relative flex gap-5 md:gap-8"
                  >
                    {/* Icon node */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: item.highlight
                            ? 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.08))'
                            : 'rgba(56,189,248,0.07)',
                          border: item.highlight
                            ? '1px solid rgba(251,191,36,0.25)'
                            : '1px solid rgba(56,189,248,0.12)',
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: item.highlight ? '#fbbf24' : '#38bdf8' }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <motion.div
                      className="flex-1 glass-card-hover rounded-xl p-5 md:p-6"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        borderColor: item.highlight
                          ? 'rgba(251,191,36,0.12)'
                          : 'rgba(255,255,255,0.07)',
                      }}
                    >
                      {item.highlight && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            style={{
                              fontSize: '0.65rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 999,
                              background: 'rgba(251,191,36,0.1)',
                              border: '1px solid rgba(251,191,36,0.2)',
                              color: '#fde68a',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Highlight
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.04)',
                            color: '#475569',
                            fontWeight: 500,
                          }}
                        >
                          {item.role}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
