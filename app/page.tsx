'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCheck, 
  ImageOff, 
  Menu, 
  X, 
  BadgeCheck, 
  FlaskConical, 
  Moon,
  ChevronRight
} from 'lucide-react';

const BRAND = {
  name: "SUMMERCARE",
  fullName: "SUMMERCARE BEAUTY & MEDSPA",
  tagline: "Where Science Meets Serenity.",
  description: "Elevating your natural radiance through advanced dermatological treatments and luxurious, restorative spa experiences, tailored for the vibrant Lagos lifestyle.",
  industry: "Beauty & Wellness",
  address: "Egbeda, Lagos, Nigeria",
  instagram: "@summercarebeautyspa",
  cta: "Book Your Consultation"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1710125866871-a65ad88d4780?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1565589511688-9dbd06d52a7b?q=80&w=1080",
    "https://images.unsplash.com/photo-1530011840427-91d6de7d0271?q=80&w=1080",
    "https://images.unsplash.com/photo-1540360146783-1c3eb9be57e6?q=80&w=1080",
    "https://images.unsplash.com/photo-1649342979152-e5b4296a6b87?q=80&w=1080"
  ]
};

const PRODUCTS = [
  { name: "Signature Gold Radiance Facial", price: "₦45,000", description: "A luxurious deep-cleansing facial infused with genuine gold extracts to rejuvenate and brighten dull skin." },
  { name: "Advanced TCA Chemical Peel", price: "₦65,000", description: "Targeted chemical exfoliation for significant reduction of hyperpigmentation, fine lines, and acne scarring." },
  { name: "Hydra-Dew Infusion Facial", price: "₦38,500", description: "Intense hydration therapy that replenishes moisture barriers, leaving skin plump, supple, and glowing." },
  { name: "Micro-Needling Collagen Boost", price: "₦80,000", description: "A medical-grade treatment stimulating collagen production to improve texture, scars, and firmness." }
];

const REVIEWS = [
  { name: "Tosin M.", role: "Lagos Resident", text: "My skin has never felt this smooth! The chemical peel was expertly done, and the aftercare advice was perfect." },
  { name: "Amara O.", role: "Spa Enthusiast", text: "The ambiance alone is worth the visit. I felt pampered from start to finish. The facial was incredibly relaxing." },
  { name: "Kunle F.", role: "Medical Client", text: "Impressive professionalism. I usually avoid MedSpas, but SUMMERCARE's clear process built instant trust." }
];

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, className, priority }: { src: string; alt: string; fill?: boolean; className?: string; priority?: boolean }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-zinc-700" />
      </div>
    );
  }
  return <Image src={src} alt={alt} fill={fill} width={fill ? undefined : 800} height={fill ? undefined : 600} className={className} priority={priority} onError={() => setError(true)} />;
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const reviewsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading text-2xl font-bold tracking-tighter text-primary">
            SUMMERCARE<span className="text-white">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Reviews'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-primary transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
              {BRAND.cta}
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-black transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-bold text-primary">SUMMERCARE</span>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Services', 'About', 'Reviews'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-4xl font-heading font-bold text-white">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="mt-8 bg-primary text-black py-4 rounded-xl text-center font-bold text-xl">
              {BRAND.cta}
            </a>
          </div>
        </div>
      </div>

      {/* HERO-C */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-[#0F0F0F] overflow-hidden pt-20">
        <div className="flex flex-col justify-center px-8 md:px-20 py-20 relative z-10">
          <div className={`transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} ref={heroReveal.ref}>
            <p className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-6">
              Lagos Premier MedSpa
            </p>
            <h1 className="font-heading text-5xl md:text-[5.5rem] font-bold text-white leading-[0.95] mb-8">
              Reveal Your <br/><span className="italic text-secondary">Luminosity</span>
            </h1>
            <p className="text-white/50 text-xl max-w-md leading-relaxed mb-10">
              Discover world-class MedSpa precision meets bespoke beauty rituals at SUMMERCARE. Your radiance is sorted.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-primary text-black px-10 py-4 font-bold rounded-full hover:brightness-110 transition-all duration-300">
                {BRAND.cta}
              </a>
              <a href="#services" className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                Explore Services
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src={IMAGES.hero} alt={BRAND.fullName} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent" />
        </div>
      </section>

      {/* D-STAT DIVIDER */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Successful Facials", val: "5000+" },
              { label: "Expert Clinicians", val: "12" },
              { label: "Satisfied Clients", val: "99%" },
              { label: "Years Excellence", val: "8" }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-black font-heading text-4xl font-bold">{stat.val}</p>
                <p className="text-black/60 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* F-BENTO (Features) */}
      <section id="about" ref={featuresReveal.ref} className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">Our Commitment to Excellence</h2>
            <p className="text-white/40 text-lg uppercase tracking-widest">The SUMMERCARE Difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-zinc-900/50 rounded-3xl p-10 border border-white/5 flex flex-col justify-between group transition-all duration-700 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-12 group-hover:scale-110 transition-transform">
                <BadgeCheck size={32} />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">Certified Aestheticians</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                  Our treatments are administered exclusively by licensed and highly experienced medical spa professionals, ensuring every ritual is rooted in dermatological expertise.
                </p>
              </div>
            </div>

            <div className={`bg-zinc-900/50 rounded-3xl p-10 border border-white/5 flex flex-col items-center text-center transition-all duration-700 delay-200 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-12">
                <FlaskConical size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Clinical Grade</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We source only the highest quality, clinically-proven skincare ingredients for maximum efficacy in every session.
              </p>
            </div>

            <div className={`md:col-span-3 bg-zinc-900/50 rounded-3xl p-10 border border-white/5 flex flex-col md:flex-row items-center gap-10 transition-all duration-700 delay-400 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-20 h-20 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Moon size={40} />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-white mb-2">Private Sanctuary</h3>
                <p className="text-white/50 text-lg">Experience total relaxation in our serene, temperature-controlled, and exceptionally clean treatment suites in the heart of Egbeda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* P-ASYMMETRIC (Services) */}
      <section id="services" ref={servicesReveal.ref} className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className={`transition-all duration-1000 ${servicesReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="font-heading text-6xl font-bold text-white mb-4">Curated Skin Rituals</h2>
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Select your path to flawless skin</p>
            </div>
            <a href="#contact" className="flex items-center gap-3 text-white hover:text-primary transition-colors group pb-2 border-b border-white/10">
              <span className="font-bold">View Full Price List</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className={`md:col-span-7 group relative h-[500px] rounded-[2rem] overflow-hidden transition-all duration-1000 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <SafeImage src={IMAGES.products[0]} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <span className="bg-primary text-black px-4 py-1 text-xs font-bold rounded-full mb-4 inline-block">Most Popular</span>
                <h3 className="font-heading text-4xl font-bold text-white mb-3">{PRODUCTS[0].name}</h3>
                <p className="text-white/60 mb-6 max-w-sm line-clamp-2">{PRODUCTS[0].description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-primary">{PRODUCTS[0].price}</span>
                  <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors">Book Now</button>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              {PRODUCTS.slice(1, 3).map((product, i) => (
                <div key={i} className={`group relative rounded-[2rem] overflow-hidden transition-all duration-1000 delay-${(i + 1) * 200} ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <SafeImage src={IMAGES.products[i + 1]} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="font-bold text-primary">{product.price}</span>
                      <span className="text-xs uppercase font-bold tracking-widest border-b border-primary text-primary">Details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* T-MASONRY (Testimonials) */}
      <section id="reviews" ref={reviewsReveal.ref} className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl font-bold text-white mb-6">Client Transformations</h2>
            <div className="flex justify-center gap-1.5">
              {[1,2,3,4,5].map(star => <div key={star} className="w-2 h-2 rounded-full bg-primary" />)}
            </div>
          </div>

          <div className="columns-1 md:columns-3 gap-8 space-y-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className={`break-inside-avoid bg-zinc-900/30 p-10 rounded-[2rem] border border-white/5 transition-all duration-700 ${reviewsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="text-white/80 text-xl font-heading leading-relaxed mb-8 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{review.name}</p>
                    <p className="text-white/30 text-xs uppercase tracking-tighter">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C2 (Contact - Diagonal Split) */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden min-h-[800px] flex items-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[#0F0F0F] [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        <div className="absolute inset-0 bg-[#0F0F0F] md:hidden" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-20 py-24">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-bold text-white leading-[0.85] mb-12">
              Reserve Your <br/><span className="text-primary italic">Moment</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/60">
                <MapPin className="text-primary shrink-0" />
                <p className="text-lg">{BRAND.address}</p>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Instagram className="text-primary shrink-0" />
                <p className="text-lg">{BRAND.instagram}</p>
              </div>
            </div>
          </div>

          <div className={`bg-black/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/30">
                  <CheckCheck size={40} className="text-primary" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">Request Received</h3>
                <p className="text-white/50 max-w-xs mx-auto">We&apos;ll be in touch shortly to confirm your serenity session.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-primary font-bold border-b border-primary/30 pb-1">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" placeholder="Name" required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <input 
                    type="tel" placeholder="Phone" required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <input 
                  type="email" placeholder="Email Address" required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                />
                <textarea 
                  rows={4} placeholder="Tell us about your skin goals..." required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-all resize-none"
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                />
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-primary text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Request Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-16">
          <div>
            <span className="font-heading text-3xl font-bold text-primary mb-6 block">SUMMERCARE</span>
            <p className="text-white/40 leading-relaxed max-w-xs mb-8">
              Elevating natural radiance for the vibrant Lagos lifestyle. Where science meets serenity.
            </p>
            <p className="text-primary font-bold text-sm">Stay glowing, Lagos.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About', 'Reviews'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li>{BRAND.address}</li>
              {BRAND.instagram && <li className="flex items-center gap-2"><Instagram size={14} /> {BRAND.instagram}</li>}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Hours</h4>
            <ul className="space-y-2 text-white/40 text-sm">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>9am - 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10am - 6pm</span></li>
              <li className="flex justify-between text-primary"><span>Sunday</span> <span>By Appointment</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} {BRAND.fullName}. All Rights Reserved.</p>
          <div className="flex gap-8 text-white/20 text-xs font-bold tracking-widest uppercase">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}