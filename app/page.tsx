'use client';

import { useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import ImageCarousel from '@/components/ImageCarousel';
import Tickets from '@/components/Tickets';
import Gallery from '@/components/Gallery';
import Countdown from '@/components/Countdown';
import Venue from '@/components/Venue';
import Contact from '@/components/Contact';

export default function Page() {
  const ticketsRef = useRef<HTMLDivElement>(null);
  const [mounted] = useState(true);

  const scrollToTickets = () => {
    ticketsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ImageCarousel />
      <Countdown />
      <div ref={ticketsRef}>
        <Tickets />
      </div>
      <Gallery />
      <Venue />
      <Contact />
    </main>
  );
}
