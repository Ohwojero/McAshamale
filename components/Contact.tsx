'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Mail, Share2, ExternalLink, MapPin, Calendar, Clock, Users } from 'lucide-react';

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

const contactRows = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/2347080979456',
    text: '+234 708 097 9456',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:hello@teamloyalty.ng',
    text: 'hello@teamloyalty.ng',
    external: false,
  },
  {
    icon: Share2,
    label: 'Instagram',
    href: '#',
    text: 'Follow us on Instagram',
    external: true,
  },
];

const eventDetails = [
  { icon: MapPin,   label: 'VENUE', value: 'Fiesta Cinema, Ughelli' },
  { icon: Calendar, label: 'DATE',  value: 'Sunday, July 5th, 2026' },
  { icon: Clock,    label: 'TIME',  value: '4:00 PM – 8:00 PM' },
];

export default function Contact() {
  const headerReveal  = useReveal();
  const leftReveal    = useReveal();
  const rightReveal   = useReveal();
  const footerReveal  = useReveal();

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-3">Reach Out</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions about tickets, group bookings, or sponsorship? Team Loyalty is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left — Contact rows */}
          <div
            ref={leftReveal.ref}
            className={`space-y-4 transition-all duration-700 ${leftReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            {contactRows.map(({ icon: Icon, label, href, text, external }, i) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 p-5 rounded-2xl border border-muted bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ${
                  leftReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{label}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                    {text}
                    {external && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                  </p>
                </div>

                {/* Right arrow indicator */}
                <div className="w-8 h-8 rounded-full border border-muted group-hover:border-primary/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/10">
                  <svg className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Right — Event details + group booking */}
          <div
            ref={rightReveal.ref}
            className={`space-y-5 transition-all duration-700 ${rightReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            {/* Event Details card */}
            <div className="bg-card rounded-2xl border border-muted overflow-hidden">
              <div className="px-6 py-4 border-b border-muted flex items-center gap-3">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                <h3 className="text-lg font-black">Event Details</h3>
              </div>

              <div className="divide-y divide-muted">
                {eventDetails.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`group flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-all duration-300 cursor-default ${
                      rightReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Booking card */}
            <div
              className={`group relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                rightReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Sweep shine */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-15deg] pointer-events-none" />

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-primary/20 group-hover:bg-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-black text-foreground mb-1">Group Bookings Available</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get special discounts for group bookings of 5 or more. Contact us via WhatsApp for details.
                  </p>
                  <a
                    href="https://wa.me/2347080979456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Chat on WhatsApp <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          ref={footerReveal.ref}
          className={`mt-16 pt-8 border-t border-muted flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground transition-all duration-700 ${footerReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p>
            © 2026 <span className="font-bold text-foreground">Team Loyalty</span>. All rights reserved.
          </p>
          <p className="text-center">
            Comedy Special: My <span className="text-primary font-semibold">Abroad</span> Xperience — July 5th, Fiesta Cinema
          </p>
          <a
            href="https://wa.me/2347080979456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" /> Get Tickets
          </a>
        </div>

      </div>
    </section>
  );
}
