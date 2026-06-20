'use client';

import { MapPin, Calendar, Clock } from 'lucide-react';

interface HeroProps {
  onGetTickets: () => void;
}

export default function Hero({ onGetTickets }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-block">
          <span className="text-accent text-sm font-bold tracking-widest">PRESENTED BY</span>
          <h2 className="text-accent text-xl font-bold">TEAM LOYALTY</h2>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance leading-tight">
          Comedy Special: My <span className="text-primary">Abroad</span> Xperience
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
          Hosted by <span className="text-foreground font-bold">MC Ashamale</span>
        </p>

        <p className="text-lg text-muted-foreground mb-8 text-balance">
          An unforgettable comedy experience with surprise guests and hilarious stories from around the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onGetTickets}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-foreground font-bold text-lg rounded-lg transition transform hover:scale-105"
          >
            Get Tickets Now
          </button>
          <button className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary/10 font-bold text-lg rounded-lg transition">
            Learn More
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Fiesta Cinema, Ughelli, Delta State</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            <span>Sunday, July 5th</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            <span>4PM - 8PM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
