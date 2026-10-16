import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, MapPin, Star, BookOpen, Code, Cloud } from 'lucide-react';
import { personal } from '../data/config';

const infoItems = [
  { icon: GraduationCap, label: 'Degree', value: 'B.Tech Computer Engineering' },
  { icon: BookOpen, label: 'College', value: 'MITAOE, Alandi' },
  { icon: Star, label: 'CGPA', value: `${personal.cgpa} / 10` },
  { icon: GraduationCap, label: 'Graduation', value: personal.graduation },
  { icon: MapPin, label: 'Location', value: 'Pune, India' },
  { icon: Code, label: 'Primary Interest', value: 'Software Development' },
  { icon: Cloud, label: 'Secondary Interest', value: 'AWS Cloud' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Section divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="section-label">Get to know me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#94a3b8' }}
              >
                I'm a{' '}
                <span style={{ color: '#f1f5f9', fontWeight: 500 }}>
                  third-year Computer Engineering student
                </span>{' '}
                at MIT Academy of Engineering, Alandi. My primary interest is software
                development, and I'm also building my understanding of AWS cloud services
                and infrastructure.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#94a3b8' }}
              >
                Through projects and practical labs, I enjoy learning by building,
                testing, and improving real applications. I recently led the development
                of{' '}
                <span style={{ color: '#38bdf8', fontWeight: 500 }}>CivicFix</span>
                , which was selected among 20 teams from 132 teams for the offline round
                of the Global SDG + AI Hackathon 2026.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#94a3b8' }}
              >
                I use tools like{' '}
                <span style={{ color: '#f1f5f9' }}>Antigravity</span> for AI-assisted
                development, which has accelerated how I build and iterate on projects.
                I'm actively looking for software development and cloud internship
                opportunities where I can contribute, learn, and grow.
              </motion.p>

              {/* Year badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    background: 'rgba(56,189,248,0.07)',
                    border: '1px solid rgba(56,189,248,0.15)',
                    fontSize: '0.875rem',
                    color: '#7dd3fc',
                    fontWeight: 500,
                  }}
                >
                  {personal.year} Student
                </div>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    background: 'rgba(167,139,250,0.07)',
                    border: '1px solid rgba(167,139,250,0.15)',
                    fontSize: '0.875rem',
                    color: '#c4b5fd',
                    fontWeight: 500,
                  }}
                >
                  Expected Graduation: {personal.graduation}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Info panel */}
            <motion.div variants={itemVariants}>
              <div
                className="glass-card glow-blue rounded-2xl p-6 md:p-8 space-y-0"
              >
                <h3
                  className="text-sm font-semibold mb-5 uppercase tracking-widest"
                  style={{ color: '#475569', fontSize: '0.7rem' }}
                >
                  Quick Info
                </h3>
                <div className="divide-y divide-white/5">
                  {infoItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 py-3">
                      <div
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(56,189,248,0.07)' }}
                      >
                        <Icon size={15} style={{ color: '#38bdf8' }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs" style={{ color: '#475569' }}>{label}</p>
                        <p className="text-sm font-medium truncate" style={{ color: '#e2e8f0' }}>
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
