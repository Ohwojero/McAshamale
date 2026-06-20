'use client';

import { useEffect, useRef, useState } from 'react';
import { Crown, Star, CheckCircle, Flame, Zap } from 'lucide-react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const tickets = [
  {
    id: 'vvip',
    label: 'V-VIP',
    icon: Crown,
    price: '₦50,000',
    tagline: 'Premium experience with exclusive perks',
    badge: { text: 'Most Exclusive', icon: Flame },
    perks: [
      'Exclusive seating near the stage',
      'Complimentary abroad goodies package',
      'Meet & greet opportunity',
      'Premium refreshments included',
      'VIP parking',
    ],
  },
  {
    id: 'vip',
    label: 'VIP',
    icon: Star,
    price: '₦20,000',
    tagline: 'Great experience with premium benefits',
    badge: { text: 'Fast Selling', icon: Zap },
    perks: [
      'Priority seating',
      'Access to VIP section',
      'Complimentary drinks',
      'Priority customer service',
      'Event merchandise',
    ],
  },
];

export default function Tickets() {
  const headerReveal = useReveal();
  const card0Reveal  = useReveal();
  const card1Reveal  = useReveal();
  const tipReveal    = useReveal();

  const cardReveals = [card0Reveal, card1Reveal];

  const handleTicketClick = (type: string) => {
    const message = `Hi, I'm interested in buying ${type} tickets for Comedy Special: My Abroad Xperience`;
    window.open(`https://wa.me/2347080979456?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="tickets" className="py-20 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-3">Secure Your Spot</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Get Your Tickets</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose your experience and secure your spot for an unforgettable night!
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tickets.map((ticket, i) => {
            const { ref, visible } = cardReveals[i];
            const Icon = ticket.icon;
            const BadgeIcon = ticket.badge.icon;
            return (
              <div
                key={ticket.id}
                ref={ref}
                className={`relative group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Glow shadow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 blur-xl pointer-events-none" />

                {/* Card */}
                <div className="relative overflow-hidden bg-card border-2 border-primary/40 group-hover:border-primary rounded-2xl p-8 transition-all duration-300 group-hover:scale-[1.02] shimmer-hover">

                  {/* Top accent bar */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-t-2xl" />

                  {/* Urgency badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary/15 border border-primary/30 text-primary px-2.5 py-1 rounded-full">
                    <BadgeIcon className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-wide">{ticket.badge.text}</span>
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-black text-primary">{ticket.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{ticket.tagline}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-5xl font-black text-primary mb-1">{ticket.price}</div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">per ticket</p>
                  </div>

                  {/* Perks */}
                  <ul className="space-y-3 mb-8">
                    {ticket.perks.map((perk, pi) => (
                      <li
                        key={pi}
                        className={`flex items-start gap-3 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: `${i * 150 + pi * 60 + 300}ms` }}
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleTicketClick(ticket.label)}
                    className="relative w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Buy {ticket.label} Ticket</span>
                    {/* Sweep shine on button hover */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-15deg]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro tip */}
        <div
          ref={tipReveal.ref}
          className={`mt-12 text-center p-5 bg-primary/8 rounded-xl border border-primary/20 transition-all duration-700 ${tipReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-muted-foreground text-sm">
            <span className="font-bold text-foreground">💡 Pro Tip:</span> V-VIP tickets include exclusive abroad goodies perfect for travel enthusiasts! Get yours before they sell out.
          </p>
        </div>
      </div>
    </section>
  );
}
