import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personal } from '../data/config';

export default function Footer() {
  return (
    <footer
      className="py-10 relative"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <div>
            <span
              className="font-bold text-base tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personal.wordmark}
            </span>
            <p className="text-xs mt-1 text-slate-400">
              Computer Engineering Student · MITAOE, Alandi
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="GitHub profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Send email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs flex items-center gap-1.5 text-slate-500">
            Built by Nitesh Nitin Dere
          </p>
        </div>
      </div>
    </footer>
  );
}
