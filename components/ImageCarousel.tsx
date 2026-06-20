'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const carouselImages: CarouselItem[] = [
  { id: 2, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m2-zPD051hWED87YJhN5X59ftprPtnJLM.jpg', alt: 'Team photo 1' },
  { id: 3, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m3-dlIyWmhHHvHL1eqqr67TDAdKh6rGdy.jpg', alt: 'Team photo 2' },
  { id: 4, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m5-51IiEH7w1rG6mPF0EIBIfpXVdm05FF.jpg', alt: 'Team photo 3' },
  { id: 5, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/m6-whbtFnSG01d9omTR8obcmp8VPF0UzI.jpg', alt: 'Team photo 4' },
];

const TYPEWRITER_TEXT = 'My Abroad Xperience';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const typingDone = typedText.length === TYPEWRITER_TEXT.length;
  const prevSeconds = useRef(-1);

  // Entrance delay
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!contentVisible) return;
    if (typedText.length >= TYPEWRITER_TEXT.length) return;
    const delay = typedText.length === 0 ? 800 : 60;
    const t = setTimeout(() => setTypedText(TYPEWRITER_TEXT.slice(0, typedText.length + 1)), delay);
    return () => clearTimeout(t);
  }, [typedText, contentVisible]);

  // Cursor blink — stop after typing done
  useEffect(() => {
    if (typingDone) { setShowCursor(false); return; }
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, [typingDone]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => setCurrentIndex((p) => (p + 1) % carouselImages.length), 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Countdown
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

  const goToPrevious = () => { setCurrentIndex((p) => (p - 1 + carouselImages.length) % carouselImages.length); setIsAutoPlay(false); };
  const goToNext    = () => { setCurrentIndex((p) => (p + 1) % carouselImages.length); setIsAutoPlay(false); };
  const goToSlide   = (i: number) => { setCurrentIndex(i); setIsAutoPlay(false); };

  const secondsChanged = timeLeft.seconds !== prevSeconds.current;
  if (secondsChanged) prevSeconds.current = timeLeft.seconds;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">

      {/* ── Floating ambient blobs ── */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-floatBlob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-floatBlobSlow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-floatBlob pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* ── Carousel background ── */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={`absolute inset-0 ${index === currentIndex ? 'animate-kenBurns' : ''}`}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          </div>
        ))}

        {/* Carousel nav */}
        <button onClick={goToPrevious} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/30" aria-label="Previous">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={goToNext} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/30" aria-label="Next">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselImages.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} aria-label={`Slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className={`relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 text-center pt-20 pb-16 sm:pt-28 sm:pb-20 transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>

        {/* Badge */}
        <div className="mb-3 sm:mb-5 inline-flex flex-col items-center animate-fadeInDown" style={{ animationDelay: '100ms' }}>
          <span className="text-[10px] font-bold tracking-[0.35em] text-white/60 uppercase">Presented by</span>
          <span className="text-primary text-sm sm:text-base font-black tracking-widest uppercase">Team Loyalty</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 leading-tight text-white animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          Comedy Special:<br />
          <span className="text-primary">
            {typedText}
            <span className={`inline-block w-[2px] sm:w-[3px] h-[0.85em] bg-primary ml-1 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-white/80 mb-5 sm:mb-6 font-light">
          {'Hosted by MC Ashamale'.split(' ').map((word, i) => (
            <span
              key={i}
              className="inline-block mr-1"
              style={{
                animation: contentVisible ? `wordReveal 0.4s ease-out forwards` : 'none',
                animationDelay: `${600 + i * 80}ms`,
                opacity: 0,
              }}
            >
              {word === 'MC' || word === 'Ashamale' ? <strong className="text-white font-bold">{word}</strong> : word}
            </span>
          ))}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center mb-5 sm:mb-7 animate-fadeInUp" style={{ animationDelay: '900ms' }}>
          <div className="relative inline-flex justify-center w-full xs:w-auto">
            <span className="absolute inset-0 rounded-lg bg-primary/40 animate-pulseRing" />
            <span className="absolute inset-0 rounded-lg bg-primary/20 animate-pulseRing" style={{ animationDelay: '0.6s' }} />
            <button
              onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative w-full xs:w-auto px-6 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 z-10"
            >
              🎟️ Get Tickets Now
            </button>
          </div>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full xs:w-auto px-6 py-3 sm:py-3.5 border border-white/30 text-white hover:bg-white/10 hover:border-white/60 font-bold text-sm sm:text-base rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>

        {/* Event info pills — hidden on mobile, visible sm+ */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 text-xs text-white/70 animate-fadeInUp" style={{ animationDelay: '1000ms' }}>
          {[
            { icon: <MapPin className="w-3 h-3 text-primary" />, text: 'Fiesta Cinema' },
            { icon: <Calendar className="w-3 h-3 text-primary" />, text: 'Sunday, July 5th' },
            { icon: <Clock className="w-3 h-3 text-primary" />, text: '4PM – 8PM' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Mini countdown — hidden on mobile, visible sm+ */}
        <div className="hidden sm:block mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/10 animate-fadeInUp" style={{ animationDelay: '1100ms' }}>
          <p className="text-white/50 text-[10px] mb-3 font-semibold tracking-[0.3em] uppercase">The Show Starts In</p>
          <div className="grid grid-cols-4 gap-2 max-w-[280px] sm:max-w-xs mx-auto">
            {[
              { value: timeLeft.days,    label: 'Days' },
              { value: timeLeft.hours,   label: 'Hrs' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs' },
            ].map((item) => (
              <div key={item.label} className="bg-black/30 border border-white/10 rounded-lg p-1.5 sm:p-2 text-center backdrop-blur-sm hover:border-primary/40 transition-colors duration-300">
                <div className="text-lg sm:text-xl font-black text-primary leading-none">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[9px] text-white/50 uppercase tracking-wider font-semibold mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
