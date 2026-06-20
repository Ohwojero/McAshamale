'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const allImages = [
  { id: 1, src: '/mc1 (1).jpeg', alt: 'MC Ashamale portrait 1', category: 'Host' },
  { id: 2, src: '/mc1 (2).jpeg', alt: 'MC Ashamale portrait 2', category: 'Host' },
  { id: 3, src: '/mc1 (3).jpeg', alt: 'MC Ashamale portrait 3', category: 'Host' },
  { id: 4, src: '/WhatsApp Image 2026-06-21 at 1.33.04 PM.jpeg',    alt: 'MC Ashamale lifestyle 1', category: 'Lifestyle' },
  { id: 5, src: '/WhatsApp Image 2026-06-21 at 1.33.04 PM (1).jpeg', alt: 'MC Ashamale lifestyle 2', category: 'Lifestyle' },
  { id: 6, src: '/WhatsApp Image 2026-06-21 at 1.33.04 PM (2).jpeg', alt: 'MC Ashamale lifestyle 3', category: 'Lifestyle' },
  { id: 7, src: '/WhatsApp Image 2026-06-21 at 1.33.05 PM.jpeg',    alt: 'MC Ashamale lifestyle 4', category: 'Lifestyle' },
  { id: 8, src: '/WhatsApp Image 2026-06-21 at 1.33.05 PM (1).jpeg', alt: 'MC Ashamale lifestyle 5', category: 'Lifestyle' },
  { id: 9, src: '/WhatsApp Image 2026-06-21 at 1.33.05 PM (2).jpeg', alt: 'MC Ashamale lifestyle 6', category: 'Lifestyle' },
  { id: 10, src: '/WhatsApp Image 2026-06-21 at 1.33.06 PM.jpeg',    alt: 'MC Ashamale lifestyle 7', category: 'Lifestyle' },
  { id: 11, src: '/WhatsApp Image 2026-06-21 at 1.33.06 PM (1).jpeg', alt: 'MC Ashamale lifestyle 8', category: 'Lifestyle' },
  { id: 12, src: '/WhatsApp Image 2026-06-21 at 1.33.06 PM (2).jpeg', alt: 'MC Ashamale lifestyle 9', category: 'Lifestyle' },
];

// First 3 shown in the portrait grid, rest in the carousel
const gridImages    = allImages.slice(0, 3);
const carouselImages = allImages.slice(3);

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Lightbox({ images, startIndex, onClose }: { images: typeof allImages; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const touchStart = useRef<number | null>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [prev, next, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        touchStart.current = null;
      }}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition" aria-label="Close">
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/60 text-sm font-semibold">
        {index + 1} / {images.length}
      </div>

      {/* Image */}
      <div className="relative w-full max-w-4xl max-h-[85vh] aspect-square sm:aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index].src} alt={images[index].alt} fill className="object-contain" priority />
      </div>

      {/* Prev / Next */}
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 sm:left-6 p-3 bg-white/10 hover:bg-white/25 rounded-full transition backdrop-blur-sm" aria-label="Previous">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 sm:right-6 p-3 bg-white/10 hover:bg-white/25 rounded-full transition backdrop-blur-sm" aria-label="Next">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Thumbnails strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${i === index ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [lightboxImages, setLightboxImages] = useState(allImages);
  const touchStart = useRef<number | null>(null);
  const headerReveal = useReveal();
  const gridReveal   = useReveal();
  const carouselReveal = useReveal();
  const ctaReveal    = useReveal();

  const openLightbox = (images: typeof allImages, index: number) => {
    setLightboxImages(images);
    setLightboxStart(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => setCarouselIndex((p) => (p - 1 + carouselImages.length) % carouselImages.length);
  const handleNext = () => setCarouselIndex((p) => (p + 1) % carouselImages.length);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-3">The Host</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Meet <span className="text-primary">MC Ashamale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your host for an unforgettable comedy experience from around the world
          </p>
        </div>

        {/* Portrait Grid — scroll reveal with stagger */}
        <div
          ref={gridReveal.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gridImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                gridReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
              onClick={() => openLightbox(gridImages, index)}
            >
              <div className="relative w-full aspect-square overflow-hidden bg-muted">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{image.category}</p>
                <p className="text-white font-bold">{image.alt}</p>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 p-1.5 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Lifestyle Carousel */}
        <div
          ref={carouselReveal.ref}
          className={`mt-20 pt-12 border-t border-muted transition-all duration-700 ${carouselReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-2">Gallery</p>
            <h3 className="text-3xl sm:text-4xl font-black mb-2">
              MC Ashamale's <span className="text-primary">Lifestyle</span>
            </h3>
            <p className="text-muted-foreground">Moments from around the world</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl bg-muted/20 cursor-pointer"
              onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStart.current === null) return;
                const diff = touchStart.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
                touchStart.current = null;
              }}
              onClick={() => openLightbox(carouselImages, carouselIndex)}
            >
              <div className="relative w-full aspect-square md:aspect-video">
                {carouselImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === carouselIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === carouselIndex} />
                  </div>
                ))}

                {/* Zoom hint */}
                <div className="absolute top-3 right-3 p-2 bg-black/40 rounded-full backdrop-blur-sm opacity-70 hover:opacity-100 transition pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

                {/* Nav buttons */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={handlePrev} className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition backdrop-blur-sm" aria-label="Previous">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={handleNext} className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition backdrop-blur-sm" aria-label="Next">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Counter */}
                <div className="absolute bottom-4 left-4 z-20 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {carouselIndex + 1} / {carouselImages.length}
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {carouselImages.map((_, i) => (
                <button key={i} onClick={() => setCarouselIndex(i)} aria-label={`Slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${i === carouselIndex ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-muted hover:bg-muted-foreground'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaReveal.ref}
          className={`mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 transition-all duration-700 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Experience the Comedy?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don&apos;t miss out on this hilarious evening with MC Ashamale and special guests. Secure your tickets today!
          </p>
          <a
            href="https://wa.me/2347080979456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-foreground font-bold rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            Get Your Tickets on WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox images={lightboxImages} startIndex={lightboxStart} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}
