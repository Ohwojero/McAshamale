'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin, Mic2, Sparkles, Clapperboard, Zap } from 'lucide-react';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const detailCards = [
  {
    icon: Calendar,
    title: 'Date',
    sub: 'Sunday',
    value: 'July 5th, 2026',
    extra: null,
  },
  {
    icon: Clock,
    title: 'Time',
    sub: 'Show Starts',
    value: '4:00 PM',
    extra: 'Ends at 8:00 PM',
  },
  {
    icon: MapPin,
    title: 'Venue',
    sub: null,
    value: 'Fiesta Cinema',
    extra: 'Premium cinema experience',
  },
];

const features = [
  {
    icon: Mic2,
    title: 'Hilarious Comedy',
    desc: 'MC Ashamale brings stories and humor from his abroad experiences',
  },
  {
    icon: Sparkles,
    title: 'Surprise Guests',
    desc: 'Featured surprise guests joining the show for extra entertainment',
  },
  {
    icon: Clapperboard,
    title: 'Premium Experience',
    desc: 'Enjoy the show in a comfortable, state-of-the-art cinema',
  },
  {
    icon: Zap,
    title: 'Electrifying Vibe',
    desc: 'An unforgettable evening filled with laughter and good energy',
  },
];

export default function Venue() {
  const headerReveal  = useReveal();
  const cardsReveal   = useReveal();
  const featReveal    = useReveal();

  return (
    <section id="venue" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-3">Mark Your Calendar</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Event Details & Highlights</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to know about the biggest comedy night of the year</p>
        </div>

        {/* Detail cards — stagger */}
        <div ref={cardsReveal.ref} className="grid md:grid-cols-3 gap-6 mb-10">
          {detailCards.map(({ icon: Icon, title, sub, value, extra }, i) => (
            <div
              key={title}
              className={`group relative bg-background rounded-2xl p-8 border border-muted hover:border-primary/60 transition-all duration-500 overflow-hidden cursor-default ${
                cardsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-2xl pointer-events-none" />

              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon — bounces on hover */}
              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="text-lg font-bold mb-1 text-muted-foreground">{title}</h3>
              {sub && <p className="text-sm text-muted-foreground mb-1">{sub}</p>}
              <p className="text-2xl font-black text-primary">{value}</p>
              {extra && <p className="text-sm text-muted-foreground mt-1">{extra}</p>}
            </div>
          ))}
        </div>

        {/* What to Expect */}
        <div
          ref={featReveal.ref}
          className={`bg-background rounded-2xl border border-muted overflow-hidden transition-all duration-700 ${featReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Header bar */}
          <div className="px-8 py-5 border-b border-muted flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="text-2xl font-black">What to Expect</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`group flex gap-4 p-7 border-b border-r border-muted/50 last:border-b-0 hover:bg-primary/5 transition-all duration-300 ${
                  featReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Icon container — spins slightly on hover */}
                <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 group-hover:text-primary transition-colors duration-300">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
