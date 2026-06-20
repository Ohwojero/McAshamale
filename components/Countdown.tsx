'use client';

import { useEffect, useState, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');
  const [current, setCurrent] = useState(display);
  const [next, setNext] = useState(display);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(display);

  useEffect(() => {
    if (display === prevRef.current) return;
    setNext(display);
    setFlipping(true);
    const t = setTimeout(() => {
      setCurrent(display);
      setFlipping(false);
      prevRef.current = display;
    }, 500);
    return () => clearTimeout(t);
  }, [display]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card */}
      <div className="relative w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28" style={{ perspective: '400px' }}>

        {/* Static top half — shows current top */}
        <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl bg-card border border-muted z-10">
          <div className="w-full h-[200%] flex items-start justify-center pt-2 sm:pt-3">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-none select-none">
              {flipping ? current : current}
            </span>
          </div>
          {/* Shine line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-black/40" />
        </div>

        {/* Static bottom half — shows current bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl bg-card border border-muted border-t-0 z-10">
          <div className="w-full h-[200%] flex items-end justify-center pb-2 sm:pb-3" style={{ marginTop: '-100%' }}>
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-none select-none">
              {current}
            </span>
          </div>
        </div>

        {/* Flipping top half — old value flips away */}
        {flipping && (
          <div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl bg-card border border-muted z-20 animate-flipTop"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-[200%] flex items-start justify-center pt-2 sm:pt-3">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-none select-none">
                {current}
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-black/40" />
          </div>
        )}

        {/* Flipping bottom half — new value flips in */}
        {flipping && (
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-xl bg-primary/10 border border-primary/30 border-t-0 z-20 animate-flipBottom"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-[200%] flex items-end justify-center pb-2 sm:pb-3" style={{ marginTop: '-100%' }}>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-none select-none">
                {next}
              </span>
            </div>
          </div>
        )}

        {/* Center divider line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-px h-0.5 bg-black/60 z-30 pointer-events-none" />
      </div>

      {/* Label */}
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const dist = new Date(2026, 6, 5, 16, 0, 0).getTime() - Date.now();
      if (dist > 0) setTimeLeft({
        days:    Math.floor(dist / 86400000),
        hours:   Math.floor((dist / 3600000) % 24),
        minutes: Math.floor((dist / 60000) % 60),
        seconds: Math.floor((dist / 1000) % 60),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-40 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-3 animate-fadeInUp">
          Don't Miss It
        </p>
        <h2 className="text-4xl sm:text-5xl font-black mb-2 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          The Show Starts In
        </h2>
        <p className="text-muted-foreground mb-14 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          Comedy Special: My <span className="text-primary font-semibold">Abroad</span> Xperience — July 5th, 2026
        </p>

        {/* Flip cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
          <FlipCard value={timeLeft.days}    label="Days"    />
          <FlipCard value={timeLeft.hours}   label="Hours"   />
          <FlipCard value={timeLeft.minutes} label="Minutes" />
          <FlipCard value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="text-muted-foreground mt-14 text-sm animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          ✨ Don&apos;t miss this unforgettable comedy experience with surprise guests! ✨
        </p>
      </div>
    </section>
  );
}
