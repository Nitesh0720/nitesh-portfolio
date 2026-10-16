import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad) and user doesn't prefer reduced motion
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    let raf: number;
    let tx = -100, ty = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isHoverable = el?.closest('a, button, [role="button"], input, textarea, label');
      setHovering(!!isHoverable);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    const lerp = () => {
      setTrail(prev => {
        const nx = prev.x + (tx - prev.x) * 0.15;
        const ny = prev.y + (ty - prev.y) * 0.15;
        return { x: nx, y: ny };
      });
      raf = requestAnimationFrame(lerp);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(lerp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing glow */}
      <div
        style={{
          position: 'fixed',
          left: trail.x,
          top: trail.y,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'width 0.3s, height 0.3s',
          mixBlendMode: 'screen',
        }}
      />
      {/* Sharp dot */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: clicking ? 6 : hovering ? 10 : 8,
          height: clicking ? 6 : hovering ? 10 : 8,
          borderRadius: '50%',
          background: hovering ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.9)',
          border: hovering ? '1px solid rgba(56,189,248,0.5)' : 'none',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      />
    </>
  );
}
