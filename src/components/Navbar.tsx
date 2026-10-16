import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { personal } from '../data/config';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Cloud Labs', href: '#cloud-labs' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = personal.resumePublicPath;
    link.download = personal.resumeFilename;
    link.click();
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(5, 8, 18, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => scrollTo('#home')}
            className="font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            aria-label="Go to top"
          >
            <span className="gradient-text-blue">{personal.wordmark}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`nav-link focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded ${
                  activeSection === item.href.slice(1) ? 'active' : ''
                }`}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResumeDownload}
              className="hidden sm:flex btn-primary text-sm py-2 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Download Resume"
            >
              <Download size={15} />
              Resume
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(5, 8, 18, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left py-3 px-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    activeSection === item.href.slice(1)
                      ? 'text-white bg-white/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/3'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="mt-4 pt-4 border-t border-white/7">
                <button
                  onClick={handleResumeDownload}
                  className="btn-primary w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <Download size={16} />
                  Download Resume
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
