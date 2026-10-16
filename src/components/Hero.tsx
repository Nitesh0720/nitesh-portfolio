import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, MapPin } from 'lucide-react';
import { GithubIcon } from './Icons';
import { personal, heroRoles } from '../data/config';

const ROLES = heroRoles;

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        color: '#38bdf8',
        whiteSpace: 'nowrap',
      }}
    >
      {ROLES[index]}
    </span>
  );
}

// Simple ambient orbs as pure CSS — no heavy JS
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
          top: '-10%',
          left: '-15%',
          animation: 'float-a 18s ease-in-out infinite',
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
          top: '30%',
          right: '-10%',
          animation: 'float-b 22s ease-in-out infinite',
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
          bottom: '10%',
          left: '30%',
          animation: 'float-c 16s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, 30px) scale(1.05); }
          66% { transform: translate(-20px, 50px) scale(0.95); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.08); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-30px, 20px); }
        }
      `}</style>
    </div>
  );
}

// Floating code snippets
function FloatingCode() {
  const snippets = [
    'const solve = (input) => {',
    'aws s3 sync . s3://bucket',
    'git push origin main',
    'docker build -t app .',
    'SELECT * FROM complaints',
    'npm run build',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {snippets.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${15 + i * 13}%`,
            right: i % 2 === 0 ? `${2 + i * 2}%` : 'auto',
            left: i % 2 !== 0 ? `${1 + i}%` : 'auto',
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: 'rgba(56,189,248,0.22)',
            whiteSpace: 'nowrap',
            animation: `float-code-${i} ${14 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        >
          {s}
        </div>
      ))}
      <style>{`
        ${snippets.map((_, i) => `
          @keyframes float-code-${i} {
            0%, 100% { opacity: 0.6; transform: translateY(0px); }
            50% { opacity: 1; transform: translateY(-${8 + i * 2}px); }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) * 0.015);
      mouseY.set((e.clientY - cy) * 0.015);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = personal.resumePublicPath;
    link.download = personal.resumeFilename;
    link.click();
  };

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden"
      style={{ paddingTop: '4rem' }}
    >
      <AmbientOrbs />
      <FloatingCode />

      {/* Mouse-responsive subtle tilt on content */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.875rem',
              borderRadius: '999px',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.18)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#86efac',
            }}
          >
            <div className="status-dot" />
            Open to Internship Opportunities
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          Building{' '}
          <span className="gradient-text">Digital Experiences.</span>
          <br />
          Exploring{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            the Cloud.
          </span>
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl font-medium mb-8"
          style={{ minHeight: '2em', color: '#94a3b8' }}
        >
          <RotatingText />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
          style={{ color: '#64748b' }}
        >
          I'm{' '}
          <span style={{ color: '#94a3b8', fontWeight: 500 }}>Nitesh Nitin Dere</span>
          , a Computer Engineering student passionate about software development,
          problem-solving, and cloud technologies. I enjoy building practical projects
          and exploring how software and AI can solve real-world problems.
        </motion.p>

        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-1.5 mb-10 text-sm"
          style={{ color: '#475569' }}
        >
          <MapPin size={14} />
          {personal.location}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <button onClick={scrollToProjects} className="btn-primary">
            Explore My Projects
            <ExternalLink size={16} />
          </button>
          <button onClick={handleResumeDownload} className="btn-ghost">
            <Download size={16} />
            Download Resume
          </button>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            style={{ color: '#475569' }}
          >
          <GithubIcon size={16} />
            View GitHub Profile
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded text-slate-400 hover:text-sky-300 transition-colors"
        aria-label="Scroll to About Me section"
      >
        <span className="text-[10px] tracking-widest font-semibold uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
