import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Cloud, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';
import { GithubIcon } from './Icons';
import { cloudLabs } from '../data/config';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function LabCard({ lab }: { lab: typeof cloudLabs[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card rounded-xl overflow-hidden"
      whileHover={{ borderColor: 'rgba(167,139,250,0.2)' }}
      transition={{ duration: 0.3 }}
      style={{ border: '1px solid rgba(167,139,250,0.08)' }}
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {lab.status === 'Completed' ? (
                <span className="completed-badge">Completed</span>
              ) : (
                <span className="inprogress-badge">In Progress</span>
              )}
            </div>
            <h3 className="text-base font-semibold text-white leading-tight">
              {lab.title}
            </h3>
          </div>
          {lab.status === 'Completed' ? (
            <CheckCircle size={18} style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
          ) : (
            <Clock size={18} style={{ color: '#fbbf24', flexShrink: 0, marginTop: 2 }} />
          )}
        </div>

        {/* Services used */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lab.services.map(s => (
            <span key={s} className="cloud-badge">{s}</span>
          ))}
        </div>

        {/* Objective — always visible */}
        <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
          <strong style={{ color: '#94a3b8' }}>Objective: </strong>
          {lab.objective}
        </p>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
          style={{ color: expanded ? '#a78bfa' : '#475569' }}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Show less' : 'Show details'}
        </button>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#94a3b8' }}>
                    What I Configured
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {lab.configured}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#94a3b8' }}>
                    What I Learned
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {lab.learned}
                  </p>
                </div>
                {lab.githubUrl && (
                  <a
                    href={lab.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
                  >
                    <GithubIcon size={13} />
                    View Documentation
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CloudLabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cloud-labs" className="py-24 md:py-32 relative">
      {/* Distinct background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(167,139,250,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}
              >
                <Cloud size={18} style={{ color: '#a78bfa' }} />
              </div>
              <p className="section-label mb-0" style={{ color: '#a78bfa' }}>
                AWS Hands-on Practice
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cloud Labs & Experiments</h2>
            <p className="text-base max-w-xl" style={{ color: '#64748b' }}>
              Practical AWS lab exercises completed through hands-on exploration.
              These are learning exercises, not production infrastructure or commercial deployments.
            </p>
          </motion.div>

          {/* Lab cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cloudLabs.map(lab => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
