import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, X, ChevronRight, Trophy, AlertTriangle } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/config';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function WorkflowDiagram({ workflow }: { workflow: typeof projects[0]['workflow'] }) {
  return (
    <div className="mt-6">
      <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
        Processing Flow
      </h4>
      <div className="grid gap-2">
        {workflow.map((step, i) => (
          <div key={step.step} className="flex items-center gap-3">
            <div
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}
            >
              {step.step}
            </div>
            {i < workflow.length - 1 && (
              <div className="sr-only">then</div>
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-white">{step.label}</span>
              <span className="text-xs ml-2" style={{ color: '#475569' }}>{step.desc}</span>
            </div>
            {i < workflow.length - 1 && (
              <ChevronRight size={14} style={{ color: '#1e3a5f', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: {
  project: typeof projects[0];
  onClose: () => void;
}) {
  // Lock body scroll while open and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
          className="glass-card rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl"
          style={{ background: 'rgba(10, 15, 30, 0.98)', border: '1px solid rgba(56,189,248,0.2)' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="prototype-badge">{project.status}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 999,
                      background: 'rgba(251,191,36,0.1)',
                      border: '1px solid rgba(251,191,36,0.2)',
                      color: '#fde68a',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Hackathon Selection
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p style={{ color: '#38bdf8', fontSize: '0.9rem' }}>{project.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Hackathon callout */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}
            >
              <Trophy size={16} style={{ color: '#fbbf24', marginTop: 1, flexShrink: 0 }} />
              <p className="text-sm" style={{ color: '#fde68a' }}>{project.hackathon}</p>
            </div>

            {/* Long description */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8', whiteSpace: 'pre-line' }}>
              {project.longDescription}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#94a3b8' }}>
                    <span style={{ color: '#38bdf8', marginTop: 1 }}>›</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow */}
            <WorkflowDiagram workflow={project.workflow} />

            {/* Tech stack */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
                Project Stack
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
              <p className="text-xs italic" style={{ color: '#334155' }}>{project.techNote}</p>
            </div>

            {/* Known limitations */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mt-6"
              style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.12)' }}
            >
              <AlertTriangle size={15} style={{ color: '#fb7185', marginTop: 1, flexShrink: 0 }} />
              <p className="text-xs" style={{ color: '#fda4af' }}>
                <strong>Known limitation:</strong> The map-based location feature is still in development
                and not yet working reliably.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-sm py-2 px-4"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
              )}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2 px-4"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              ) : (
                <span
                  className="text-xs flex items-center gap-1.5 px-4"
                  style={{ color: '#334155' }}
                >
                  Live demo not available
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
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
            <p className="section-label">What I've built</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Project</h2>
          </motion.div>

          {/* CivicFix featured card */}
          {projects.filter(p => p.featured).map(project => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
              whileHover={{ borderColor: 'rgba(56,189,248,0.25)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 right-0 pointer-events-none"
                style={{
                  width: 400,
                  height: 400,
                  background: 'radial-gradient(circle at top right, rgba(56,189,248,0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative p-6 md:p-10">
                {/* Top meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="prototype-badge">{project.status}</span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 999,
                      background: 'rgba(251,191,36,0.1)',
                      border: '1px solid rgba(251,191,36,0.2)',
                      color: '#fde68a',
                      fontWeight: 600,
                    }}
                  >
                    <Trophy size={11} />
                    Top 20 / 132 Teams — Global SDG + AI Hackathon 2026
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Left */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-base mb-6" style={{ color: '#38bdf8' }}>
                      {project.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                      {project.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-8">
                      {project.features.slice(0, 5).map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#64748b' }}>
                          <span style={{ color: '#38bdf8', fontWeight: 700, marginTop: 1 }}>›</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map(t => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-primary text-sm py-2.5 px-5"
                      >
                        View Details
                        <ChevronRight size={15} />
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-sm py-2.5 px-5"
                        >
                          <GithubIcon size={15} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Workflow */}
                  <div
                    className="rounded-xl p-5 md:p-6"
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <h4
                      className="text-xs font-semibold uppercase tracking-widest mb-5"
                      style={{ color: '#334155' }}
                    >
                      Processing Pipeline
                    </h4>
                    <div className="space-y-3">
                      {project.workflow.map((step, i) => (
                        <div key={step.step} className="flex items-start gap-3">
                          <div
                            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: i === 0 ? 'rgba(56,189,248,0.2)' : 'rgba(56,189,248,0.07)',
                              color: '#38bdf8',
                            }}
                          >
                            {step.step}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{step.label}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Known limitation note */}
                    <div
                      className="flex items-start gap-2 mt-5 p-3 rounded-lg"
                      style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.1)' }}
                    >
                      <AlertTriangle size={12} style={{ color: '#fb7185', marginTop: 1, flexShrink: 0 }} />
                      <p className="text-xs" style={{ color: '#fda4af' }}>
                        Map-based location feature is still in development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
