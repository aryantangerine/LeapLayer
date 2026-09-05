/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';
import {
  Menu, X, ArrowRight, Shield, MousePointer2, LayoutGrid,
  CheckCircle2, Clock, Zap, Target, Lock, ArrowDown,
  ChevronLeft, ChevronRight, TrendingUp, Building2, ShieldCheck, Users, Phone,
  Linkedin, Play, MessageSquareText, Smartphone
} from 'lucide-react';

import outlook_icon from './assets/outlook.png';
import teams_icon from './assets/teams.png';
import excel_icon from './assets/excel.png';
import powerpoint_icon from './assets/powerpoint.png';
import word_icon from './assets/word.png';
import salesforce_icon from './assets/salesforce.png';
import jira_icon from './assets/jira.png';
import googledrive_icon from './assets/googledrive.png';
import aryan_portrait from './assets/aryan.png';
import aryan_avatar from './assets/aryan_picture.jpg';
import logo_black from './assets/logoblack.png';

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  textGlow = true,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline', textGlow?: boolean }) => {
  const baseStyles = "relative overflow-hidden px-8 py-3 rounded-full font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98]";
  const variants = {
    primary: "bg-accent text-white/90 hover:text-white hover:bg-[#1a1a1a] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
    secondary: "bg-white text-black/90 hover:text-black hover:bg-[#F9F9F9] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)]",
    outline: "border border-accent/10 text-accent hover:bg-accent/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className={`relative z-10 transition-all duration-300 ${textGlow ? 'drop-shadow-sm group-hover:drop-shadow-[0_0_8px_currentColor]' : ''}`}>
        {children}
      </span>
      {/* Expressive loading/shine overlay */}
      <div className={`absolute inset-0 -translate-x-[150%] skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out ${variant === 'primary' ? 'bg-white/20' : 'bg-black/10'}`} />
    </button>
  );
};

const Card = ({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -10,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }}
    className={`bg-white border-[1.5px] border-[#E5E5E0] rounded-2xl p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  dark = false,
  className = '',
  titleClassName = '',
}: { title: React.ReactNode, subtitle?: string, centered?: boolean, dark?: boolean, className?: string, titleClassName?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    className={`mb-10 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}
  >
    <h2 className={`${titleClassName || 'text-3xl md:text-5xl lg:text-6xl'} mb-4 md:mb-6 font-bold tracking-tighter ${dark ? 'text-white' : 'text-heading'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-base md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-secondary' : 'text-body'}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);


// --- Sections ---

const Navbar = ({ setView, currentView }: { setView: (v: 'home' | 'about' | 'booking') => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl md:max-w-[73.6rem] px-6 py-3 md:py-4 rounded-2xl md:rounded-full overflow-hidden transition-[box-shadow] duration-500"
        style={{
          background: isScrolled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: isScrolled
            ? 'inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(255,255,255,0.12), inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'
            : 'inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.07)',
        }}
      >
        {/* Liquid glass surface sheen */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.06) 100%)', borderRadius: 'inherit' }} />
        {/* Logo (Left) */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center"
          >
            <img src={logo_black} alt="LeapLayer" className="h-7 md:h-9 w-auto" />
          </button>
        </div>

        {/* Nav Links (Center) */}
        <div className="hidden md:flex items-center justify-center gap-6 flex-none whitespace-nowrap">
          {['Products', 'About Us', 'Why Now'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'About Us') {
                  setView('about');
                  window.scrollTo(0, 0);
                } else {
                  setView('home');
                  const id = item.toLowerCase().replace(/\s+/g, '-');
                  setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                (item === 'About Us' && currentView === 'about') || (item !== 'About Us' && currentView === 'home')
                  ? 'text-heading'
                  : 'text-heading/60 hover:text-heading'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle (Right) */}
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:block">
            <Button
              onClick={goToBooking}
              className="!py-3 !px-7 text-sm shadow-lg"
            >
              Book A Call
            </Button>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-heading"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-20 left-6 right-6 md:hidden bg-white/80 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="p-8 flex flex-col gap-6">
              {['Products', 'About Us', 'Why Now'].map((item) => (
                <button
                  key={item}
                  className="text-xl font-bold text-heading tracking-tight text-left"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item === 'About Us') {
                      setView('about');
                      window.scrollTo(0, 0);
                    } else {
                      setView('home');
                      const id = item.toLowerCase().replace(/\s+/g, '-');
                      setTimeout(() => {
                        const el = document.getElementById(id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  {item}
                </button>
              ))}
              <Button className="w-full py-4 text-lg rounded-2xl" onClick={goToBooking}>Book A Call</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const Hero = () => {
  const words = "Leap Your Business Ahead".split(" ");

  const handleSeeHow = () => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sm:min-h-[100dvh] bg-page-bg flex items-start sm:items-center xl:items-start pt-36 pb-28 md:pt-52 md:pb-40 overflow-hidden relative">
      {/* WebGL shader background (mobile: static, unchanged) */}
      <Shader className="absolute inset-0 z-0 pointer-events-none md:hidden">
        <Swirl colorA="#f0faf5" colorB="#c2e8d4" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#2DAC65"
          leftColor="#2DAC65"
          momentum={13}
          radius={3.5}
          rightColor="#2DAC65"
          upColor="#2DAC65"
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>

      {/* WebGL shader background (desktop: aberration/highlight track cursor x-position — strong baseline on the right at rest, intensifies further on hover) */}
      <Shader className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <Swirl colorA="#f0faf5" colorB="#c2e8d4" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#2DAC65"
          leftColor="#2DAC65"
          momentum={13}
          radius={3.5}
          rightColor="#2DAC65"
          upColor="#2DAC65"
        />
        <FlutedGlass
          aberration={{ type: 'mouse', axis: 'x', outputMin: 0.55, outputMax: 1.6, smoothing: 0.2, momentum: 0.15 }}
          angle={31}
          frequency={8}
          highlight={{ type: 'mouse', axis: 'x', outputMin: 0.35, outputMax: 0.85, smoothing: 0.2, momentum: 0.15 }}
          highlightSoftness={0.2}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>

      {/* White radial glow behind text for contrast against shader (mobile: centered) */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none md:hidden"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,245,240,0.95) 35%, rgba(245,245,240,0.65) 62%, transparent 100%)',
        }}
      />

      {/* Desktop: dense/white behind the left-aligned text, fading out to let the animation read stronger on the right */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to right, rgba(245,245,240,0.97) 0%, rgba(245,245,240,0.88) 20%, rgba(245,245,240,0.45) 38%, rgba(245,245,240,0.1) 54%, transparent 68%)',
        }}
      />

      <div className="max-w-[85rem] mx-auto px-6 text-center md:text-left relative z-10 w-full min-w-0">
        <div className="z-10 max-w-5xl mx-auto md:mx-0 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <h1 className="text-heading text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] md:leading-[0.92] font-bold tracking-tighter mb-6 md:mb-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`inline-block ${word.toLowerCase().includes('leap') ? 'font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -my-[0.15em] -ml-[0.15em] mr-[0.05em]' : 'mr-[0.2em]'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-[#3A3A3A]/80 text-[0.95rem] md:text-[1.15rem] lg:text-[1.3rem] max-w-2xl lg:max-w-4xl mx-auto md:mx-0 mb-7 md:mb-10 leading-[1.55] font-semibold px-1"
          >
            Done-for-you <span className="text-[#1a1a1a]">systems</span> that get you more <span className="text-[#1a1a1a]">Google reviews</span>, a <span className="text-[#1a1a1a]">smart website</span> with <span className="text-[#1a1a1a]">lead capture</span> and <span className="text-[#1a1a1a]">AI automations</span> that <span className="text-[#1a1a1a]">attract and convert viewers into customers</span>. Designed for your business to grow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center md:items-stretch justify-center md:justify-start gap-4"
          >
            <Button
              variant="secondary"
              onClick={handleSeeHow}
              textGlow={false}
              className="text-base md:text-[1.2rem] px-8 py-3.5 md:px-10 md:py-4 shadow-2xl transition-all"
            >
              See How
            </Button>
            <div className="relative">
              <img
                src={aryan_avatar}
                alt="Aryan"
                className="absolute z-10 left-1/2 -translate-x-1/2 -top-7 w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
              />
              <button
                onClick={goToBooking}
                className="group inline-flex items-center justify-between gap-4 md:gap-6 pl-7 md:pl-9 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] active:scale-[0.98]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-base md:text-[1.2rem] font-semibold">Book A Call</span>
                <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const spotlightFeatures = [
  { text: "24/7 always on... Never lose a customer after hours" },
  { text: "Books, reschedules and cancels appointments through natural conversation" },
  { text: "Follows up and reminds customers automatically" },
  { text: "Escalates to a human when it matters" },
];

// [x%, size(px), duration(s), delay(s), drift(px), startY%]
const SPARKS: [number, number, number, number, number, number][] = [
  [4,  1.5, 5.2, 0.0,  12, 12], [11, 1.0, 4.8, 1.2,  -8, 22],
  [17, 2.0, 6.1, 0.4,  15,  8], [24, 1.0, 4.5, 2.0, -11, 28],
  [30, 1.5, 5.8, 0.7,   8, 18], [37, 1.0, 4.2, 1.5, -10, 12],
  [43, 2.0, 5.5, 0.2,  13, 24], [50, 1.0, 4.9, 1.8,  -6,  8],
  [56, 2.5, 6.3, 0.5,  10, 30], [63, 1.5, 4.6, 2.2, -14, 18],
  [69, 1.0, 5.1, 0.9,  11, 14], [75, 2.0, 6.0, 1.4,  -8, 26],
  [81, 1.5, 4.4, 0.3,  16,  9], [87, 1.0, 5.7, 1.7, -10, 28],
  [93, 2.0, 4.8, 0.8,   7, 20], [7,  1.0, 5.4, 2.5, -12, 35],
  [21, 1.5, 4.7, 3.0,  10, 38], [34, 2.0, 5.9, 2.8,  -7, 26],
  [47, 1.0, 4.3, 3.5,  13, 16], [58, 1.5, 6.2, 2.3, -10, 34],
  [72, 1.0, 5.0, 3.8,   8, 22], [84, 2.0, 4.6, 2.7, -13, 32],
  [91, 1.5, 5.3, 3.2,  11, 14], [15, 1.0, 6.4, 4.0,  -6, 40],
  [60, 1.5, 4.9, 3.6,   9, 28],
];

const SparkParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
    {SPARKS.map(([x, size, duration, delay, drift, startY], i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ width: size, height: size, left: `${x}%`, bottom: `${startY}%` }}
        animate={{
          y: [0, -(260 + size * 35)],
          x: [0, drift],
          opacity: [0, 0.72, 0.5, 0.18, 0],
          scale: [0.7, 1.3, 1.0, 0.5, 0.1],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: duration * 0.25,
          ease: [0.2, 0.8, 0.5, 1],
        }}
      />
    ))}
  </div>
);

const GreenFluidButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const [ripples, setRipples] = useState<number[]>([]);
  const handleClick = useCallback(() => {
    const id = Date.now();
    setRipples(r => [...r, id]);
    setTimeout(() => setRipples(r => r.filter(x => x !== id)), 900);
    onClick?.();
  }, [onClick]);

  return (
    <motion.button
      className="relative px-8 py-3 rounded-full font-semibold border border-white/10 shadow-lg cursor-pointer"
      style={{ backgroundColor: '#ffffff', color: '#111111' }}
      whileHover={{ backgroundColor: '#2DAC65', color: '#ffffff', y: -6, boxShadow: '0 18px 52px rgba(45,172,101,0.45)' }}
      whileTap={{ y: -3, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      onClick={handleClick}
    >
      <span className="relative z-10 font-semibold">{children}</span>
      {ripples.map(id => (
        <motion.div
          key={id}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: '2px solid rgba(45,172,101,0.7)' }}
          initial={{ scale: 1, opacity: 0.9 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
};

const VoiceAICard = () => (
  <motion.div className="relative w-full max-w-2xl" initial="rest" whileHover="hover" animate="rest">
    {/* Green glow — intensifies from centre-bottom on hover */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        inset: '40% -8% -30% -8%',
        background: 'radial-gradient(ellipse at 50% 90%, rgba(45,172,101,0.5) 0%, rgba(52,179,108,0.22) 45%, transparent 72%)',
        filter: 'blur(48px)',
      }}
      variants={{
        rest: { opacity: 1, scale: 1 },
        hover: { opacity: 1.9, scale: 1.18 },
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    variants={{
      rest: { y: 0, scale: 1 },
      hover: { y: -10, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 15 } },
    }}
    className="relative overflow-hidden rounded-[2.5rem] bg-[#060808] border border-white/[0.07] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] w-full cursor-default"
  >
    {/* Animated green fire blobs rising from the bottom */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute"
        style={{
          width: '55%', height: '85%', bottom: '-35%', left: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,172,101,0.65) 0%, transparent 68%)',
          filter: 'blur(52px)',
        }}
        animate={{ y: [0, -20, 6, 0], scale: [1, 1.08, 0.96, 1], x: [0, 7, -5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '65%', height: '80%', bottom: '-30%', left: '22%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(103,203,83,0.55) 0%, transparent 68%)',
          filter: 'blur(65px)',
        }}
        animate={{ y: [0, -25, 9, 0], scale: [0.94, 1.1, 0.97, 0.94], x: [0, -9, 7, 0] }}
        transition={{ duration: 6.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '50%', height: '70%', bottom: '-22%', right: '-4%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,179,108,0.5) 0%, transparent 68%)',
          filter: 'blur(48px)',
        }}
        animate={{ y: [0, -16, 7, 0], scale: [1, 0.92, 1.07, 1] }}
        transition={{ duration: 4.8, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Gradient: card-colour at top fades to transparent, revealing blobs below */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #060808 0%, #060808 28%, rgba(6,8,8,0.78) 48%, rgba(6,8,8,0.22) 68%, transparent 100%)' }}
      />
    </div>

    {/* Content */}
    <div className="relative z-10 p-8 md:p-10">
      <ul className="space-y-4">
        {spotlightFeatures.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2DAC65] flex-shrink-0" />
            <span className="text-white/90 text-[0.95rem] md:text-[1.2rem] font-bold leading-snug">{f.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
  </motion.div>
);

const Integrations = ({ title, spotlight, zIndex = 'z-20' }: { title?: React.ReactNode, spotlight?: boolean, zIndex?: string } = {}) => {
  const apps = [
    { name: "Google Drive", iconUrl: googledrive_icon, color: "34A853" },
    { name: "Gmail", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg", color: "EA4335" },
    { name: "Slack", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", color: "4A154B" },
    { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
    { name: "Salesforce", iconUrl: salesforce_icon, color: "00A1E0" },
    { name: "Outlook", iconUrl: outlook_icon, color: "0078D4" },
    { name: "Excel", iconUrl: excel_icon, color: "217346" },
    { name: "PowerPoint", iconUrl: powerpoint_icon, color: "D24726" },
    { name: "Word", iconUrl: word_icon, color: "2B579A" },
    { name: "Google Calendar", slug: "googlecalendar", color: "4285F4" },
    { name: "Notion", slug: "notion", color: "000000" },
    { name: "Jira", iconUrl: jira_icon, color: "0052CC" },
    { name: "Xero", slug: "xero", color: "13B5EA" },
    { name: "Microsoft Teams", iconUrl: teams_icon, color: "6264A7" },
    { name: "Instagram", slug: "instagram", color: "E4405F" },
    { name: "Facebook", slug: "facebook", color: "1877F2" }
  ];

  return (
    <section id="solutions" className={`${spotlight ? 'pt-12 pb-12' : 'py-16'} bg-black overflow-hidden relative ${zIndex} -mt-20 rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)]`} style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
      {spotlight && <SparkParticles />}
      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        <SectionHeading
          dark
          className={spotlight ? '!mb-6' : ''}
          title={title ?? (
            <div className="flex flex-col items-center">
              <span className="text-white">
                <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Integrating Automations</span> across your specific
              </span>
              <span>systems and workflows</span>
            </div>
          )}
        />
      </div>

      {spotlight ? (
        <div className="max-w-[85rem] mx-auto px-6 -mt-4 pb-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <VoiceAICard />
            <iframe
              src="/voice-widget.html"
              title="Voice AI Widget"
              className="w-full border-0 rounded-[2rem] md:rounded-[2.5rem]"
              style={{ height: '320px', background: 'transparent' }}
            />
          </div>
        </div>
      ) : (
        <div className="relative mt-6 overflow-hidden">
          <div className="marquee-track flex gap-8 py-6">
            {[...apps, ...apps].map((app, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.15,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 12 }
                }}
                className="group bg-white border border-black/5 rounded-[2.5rem] w-32 h-32 card-shadow flex items-center justify-center cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: `#${app.color}` }}
                />
                <div
                  className="absolute w-16 h-16 blur-2xl opacity-20"
                  style={{ backgroundColor: `#${app.color}` }}
                />
                <div className="relative z-10">
                  <img
                    src={app.iconUrl || `https://cdn.simpleicons.org/${app.slug}`}
                    alt={app.name}
                    className="w-14 h-14 object-contain transition-all duration-500 group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 12px 20px #${app.color}77)` }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-48 md:w-96 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-48 md:w-96 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />
        </div>
      )}
    </section>
  );
};

const PropTechGraphic = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Main Card */}
      <div className="relative w-full max-w-[280px] aspect-[1/1.1] bg-[#2A2A2A]/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
              <Building2 className="text-white/80 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">Start?</h4>
              <p className="text-white/40 text-sm">Don't know where to begin?</p>
            </div>
          </div>
          <span className="text-white/30 font-mono text-sm mt-1">02</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-auto h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "35%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="h-full bg-white/60 rounded-full"
          />
        </div>
      </div>

      {/* Pill Labels Below */}
      <div className="mt-6 flex flex-row items-center justify-center gap-3">
        <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2.5 shadow-xl">
          <span className="text-white/90 text-[12px] font-medium tracking-tight">
            How?
          </span>
        </div>
        <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2.5 shadow-xl">
          <span className="text-white/90 text-[12px] font-medium tracking-tight whitespace-nowrap">
            Time Investment?
          </span>
        </div>
      </div>
    </div>
  );
};

const FluidCardBg = ({
  momentum = 13,
  detail = 1.7,
  mountDelay = 0,
  swirlA = '#f0faf5',
  swirlB = '#c2e8d4',
  accent = '#2DAC65',
  overlayStart = '58%',
  intensity = 1,
}: {
  momentum?: number;
  detail?: number;
  mountDelay?: number;
  swirlA?: string;
  swirlB?: string;
  accent?: string;
  overlayStart?: string;
  intensity?: number;
}) => {
  const [ready, setReady] = useState(mountDelay === 0);

  useEffect(() => {
    if (mountDelay > 0) {
      const t = setTimeout(() => setReady(true), mountDelay * 1000);
      return () => clearTimeout(t);
    }
  }, [mountDelay]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.8rem]">
      {ready && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity }}
          transition={{ duration: 1.2 }}
        >
          <Shader className="absolute inset-0">
            <Swirl colorA={swirlA} colorB={swirlB} detail={detail} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor={accent}
              leftColor={accent}
              momentum={momentum}
              radius={0}
              rightColor={accent}
              upColor={accent}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </motion.div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, white ${overlayStart}, rgba(255,255,255,0.82) calc(${overlayStart} + 12%), rgba(255,255,255,0.32) calc(${overlayStart} + 25%), rgba(255,255,255,0.0) calc(${overlayStart} + 36%), transparent 100%)`,
        }}
      />
    </div>
  );
};

const goToBooking = () => window.dispatchEvent(new CustomEvent('navigate-to-booking'));

const FeatureCard = ({
  title,
  description,
  learnMore,
  delay = 0,
  momentum,
  detail,
  mountDelay,
  icon: Icon,
}: {
  title: string,
  description?: string,
  learnMore?: boolean,
  delay?: number,
  momentum?: number,
  detail?: number,
  mountDelay?: number,
  icon?: React.ElementType,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -10, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 15 } }}
    className="relative overflow-hidden bg-white rounded-[2.5rem] p-4 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border-[8px] border-white flex flex-col h-full cursor-pointer group transition-shadow duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
  >
    <FluidCardBg momentum={momentum} detail={detail} mountDelay={mountDelay} />
    {/* Floating decorative shape */}
    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#2DAC65]/15 blur-3xl pointer-events-none" />
    <div className="relative z-10 p-7 md:p-9 flex flex-col h-full">
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center mb-4">
          <Icon className="text-[#2DAC65]" size={20} />
        </div>
      )}
      <h3 className="text-[1.5rem] md:text-[2.2rem] font-bold text-heading mb-3 md:mb-4 leading-[1.15] tracking-tight group-hover:text-accent transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-[#2A2A2A] text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {description}
        </p>
      )}
      {learnMore && (
        <div className="mt-auto pt-2">
          <button
            onClick={goToBooking}
            className="group/btn inline-flex items-center gap-3 md:gap-4 pl-6 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] active:scale-[0.98]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-sm md:text-base font-semibold">Learn More</span>
            <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-black flex-shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  </motion.div>
);

// --- Graphic Components ---

const ToolsGraphic = () => {
  const icons = [
    Zap, Target, Lock, Shield, MousePointer2, LayoutGrid, CheckCircle2, Clock,
    Zap, Target, Lock, Shield, MousePointer2, LayoutGrid, CheckCircle2, Clock,
    Zap, Target, Lock, Shield
  ];
  return (
    <div className="relative w-full h-full overflow-hidden">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-black"
          initial={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: Math.random() * 0.3 + 0.2,
            opacity: 0.03
          }}
          animate={{
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-20 h-20 bg-black rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-10"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="text-white" size={40} />
        </motion.div>
      </div>
      {/* Subtle, cleaner shadow that won't clip */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-4 bg-black/10 blur-xl rounded-full translate-y-12" />
      </div>
    </div>
  );
};

const StackGraphic = () => {
  const stampedStyle = {
    textShadow: "0px 1px 1px rgba(255,255,255,0.6), 0px -1px 1px rgba(0,0,0,0.15)"
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-32">
        {/* Card 3 (Bottom) */}
        <motion.div
          className="absolute inset-0 bg-white border border-black/[0.03] rounded-2xl shadow-sm flex items-center justify-center"
          animate={{
            y: [24, 0, -24, 24],
            scale: [0.85, 0.92, 1, 0.85],
            opacity: [0.3, 0.6, 1, 0.3],
            zIndex: [0, 10, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-2 bg-black/[0.03] rounded-full" />
        </motion.div>

        {/* Card 2 (Middle) */}
        <motion.div
          className="absolute inset-0 bg-white border border-black/[0.03] rounded-2xl shadow-md flex items-center justify-center"
          animate={{
            y: [0, -24, 24, 0],
            scale: [0.92, 1, 0.85, 0.92],
            opacity: [0.6, 1, 0.3, 0.6],
            zIndex: [10, 20, 0, 10]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-[#3A3A3A] font-bold text-xl tracking-tighter uppercase opacity-80"
            style={stampedStyle}
          >
            How?
          </span>
        </motion.div>

        {/* Card 1 (Top) */}
        <motion.div
          className="absolute inset-0 bg-white border border-black/[0.03] rounded-2xl shadow-xl flex items-center justify-center"
          animate={{
            y: [-24, 24, 0, -24],
            scale: [1, 0.85, 0.92, 1],
            opacity: [1, 0.3, 0.6, 1],
            zIndex: [20, 0, 10, 20]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="text-[#2A2A2A] font-bold text-2xl tracking-tighter uppercase"
            style={stampedStyle}
            animate={{
              opacity: [0.85, 1, 0.85],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Start?
          </motion.span>
        </motion.div>

        {/* Translucent Shadow */}
        <div className="absolute inset-x-0 -bottom-12 h-12 bg-black/[0.04] blur-3xl rounded-full" />
      </div>
    </div>
  );
};

const FolderGraphic = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="relative w-44 h-32 cursor-pointer"
      whileHover="open"
    >
      {/* Back of folder */}
      <div className="absolute inset-0 bg-[#E5E5E0] rounded-2xl shadow-sm" />
      <div className="absolute -top-3 left-0 w-20 h-8 bg-[#E5E5E0] rounded-t-xl" />

      {/* Papers inside */}
      <motion.div
        className="absolute inset-x-4 top-2 h-24 bg-white rounded-lg shadow-sm border border-black/5"
        variants={{
          open: { y: -20, rotate: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
      />
      <motion.div
        className="absolute inset-x-6 top-4 h-24 bg-white/90 rounded-lg shadow-sm border border-black/5"
        variants={{
          open: { y: -35, rotate: 3, transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.05 } }
        }}
      />
      <motion.div
        className="absolute inset-x-8 top-6 h-24 bg-white/80 rounded-lg shadow-sm border border-black/5"
        variants={{
          open: { y: -45, rotate: -1, transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 } }
        }}
      />

      {/* Front of folder */}
      <motion.div
        className="absolute inset-0 bg-[#F5F5F0] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-white/60 flex items-center justify-center z-30"
        variants={{
          open: { rotateX: -25, y: 5, transition: { type: "spring", stiffness: 200, damping: 25 } }
        }}
        style={{ transformOrigin: "bottom" }}
      >
        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center">
          <Lock className="text-black/20" size={24} />
        </div>
      </motion.div>

      {/* Translucent Shadow */}
      <div className="absolute inset-x-0 -bottom-10 h-10 bg-black/5 blur-3xl rounded-full" />
    </motion.div>
  </div>
);

const HomeFounderIntro = () => {

  return (
  <section className="pt-16 pb-24 md:pt-28 md:pb-40 bg-page-bg relative z-[8] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-[85rem] mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left: heading, name + LinkedIn, bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center sm:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 md:mb-8 leading-[1.05] tracking-tight">
            Meet the Founder
          </h2>

          <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
            <span className="text-xl md:text-2xl font-bold text-heading">Aryan</span>
            <a
              href="https://www.linkedin.com/in/aryan-parekh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aryan's LinkedIn profile"
              className="w-9 h-9 rounded-full bg-[#1a1a1a]/10 text-[#1a1a1a]/60 flex items-center justify-center flex-shrink-0 transition-colors duration-300 hover:bg-[#1a1a1a]/20 hover:text-[#1a1a1a]"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <p className="text-[#3A3A3A]/80 text-base md:text-xl font-medium max-w-xl sm:max-w-none mx-auto sm:mx-0 leading-relaxed mb-8 md:mb-10">
            Aryan has a background at <span className="relative inline-block text-[#1a1a1a] whitespace-nowrap">
              Jaguar Land Rover
              <svg
                className="absolute pointer-events-none"
                style={{ left: '-12%', right: '-12%', top: '-28%', bottom: '-22%', width: '124%', height: '150%' }}
                viewBox="0 0 220 80"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M14,42 C11,17 46,6 111,5 C176,4 209,15 211,39 C213,63 179,74 111,75 C43,76 9,65 13,43 C15,31 31,21 56,17"
                  stroke="#2DAC65"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span> as an <span className="text-[#1a1a1a]">Engineer</span>, working across <span className="text-[#1a1a1a]">AI teams</span>, <span className="text-[#1a1a1a]">Investment teams</span>, and <span className="text-[#1a1a1a]">Marketing teams</span>. Graduated from a top Russell Group university in Mechanical Engineering with Computer Science, and regularly works with entrepreneurs and businesses on their technology adoption.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <a
              href="https://www.linkedin.com/in/aryan-parekh/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 md:gap-6 pl-7 md:pl-9 pr-1.5 py-1.5 rounded-full bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(45,172,101,0.4)] active:scale-[0.98]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-base md:text-[1.2rem] font-semibold">See LinkedIn Profile</span>
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={20} />
              </span>
            </a>

            <button
              onClick={goToBooking}
              className="group inline-flex items-center gap-4 md:gap-6 pl-7 md:pl-9 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] active:scale-[0.98]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-base md:text-[1.2rem] font-semibold">Let's Talk</span>
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={20} />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right: rounded video container — embed goes here once video is sent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <Play className="text-white/70 ml-1" size={28} fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const PainPoints = () => (
  <section className="pt-16 pb-24 md:pt-28 md:pb-40 bg-page-bg relative z-10 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-[85rem] mx-auto px-6">
      <div className="flex justify-center">
        <span className="inline-flex items-center px-5 py-2.5 mb-5 md:mb-6 rounded-full bg-[#2DAC65]/10 border-[1.5px] border-[#2DAC65]/40 text-[#2DAC65] text-sm font-bold uppercase tracking-wider">
          Local Business Package
        </span>
      </div>
      <SectionHeading centered={true} className="!mb-4 md:!mb-6" titleClassName="text-4xl md:text-5xl lg:text-6xl" title={<>Built for <motion.span className="inline-block font-serif italic font-bold text-[1.1em] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}>You,</motion.span> No Effort.</>} />
      <p className="text-[0.95rem] md:text-[1.3rem] font-semibold text-[#3A3A3A]/80 text-center max-w-5xl mx-auto mb-8 md:mb-10 leading-[1.55] px-1">
        There is no reason to use marketing systems, automations, AI or a smart website if they don't have clear return on investment. That's why everything below exists for one core outcome, making your business more money.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {[
          { title: "Attract New Customers", description: "Personalised review follow-ups automated for you, a physical tap-to-review card, and auto-posted review graphics on social media.", learnMore: true, momentum: 9,  detail: 1.2, mountDelay: 0 },
          { title: "Convert More Leads",     description: "A smart website with instant lead capture, automations and missed-call text-back, so inbound interest doesn't go cold.", learnMore: true, momentum: 13, detail: 1.7, mountDelay: 4 },
          { title: "Retain More Customers",  description: "Automated follow-up sequences and database reactivation, bringing back past customers automatically.", learnMore: true, momentum: 18, detail: 2.4, mountDelay: 8 },
        ].map((card, i) => (
          <motion.div key={i} className="h-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}>
            <FeatureCard {...card} />
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);



const WantToLearn = () => (
  <section className="pt-14 pb-20 md:pt-20 md:pb-28 bg-page-bg relative z-[35] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-[85rem] mx-auto px-6">
      <SectionHeading centered className="!mb-0" titleClassName="text-4xl md:text-5xl lg:text-6xl" title={<>Want to <motion.span className="inline-block font-serif italic font-bold text-[1.1em] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}>learn</motion.span> it yourself?</>} />

      {/* Coming Soon banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mt-10 md:mt-16 px-8 py-12 md:px-16 md:py-16 text-center shadow-[0_30px_60px_-15px_rgba(6,95,70,0.4)]"
        style={{ background: 'linear-gradient(120deg, #064E3B 0%, #0D9467 32%, #14B8A6 62%, #2DD4C6 100%)' }}
      >
        {/* Decorative wavy line texture */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          viewBox="0 0 1500 460"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M-50,380 C250,280 450,480 750,360 C1050,240 1250,420 1550,300" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />
          <path d="M-50,320 C250,220 450,420 750,300 C1050,180 1250,360 1550,240" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
          <path d="M-50,440 C250,340 450,540 750,420 C1050,300 1250,480 1550,360" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
          <path d="M-50,60 C250,140 450,-20 750,60 C1050,140 1250,-20 1550,60" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
          <circle cx="130" cy="110" r="55" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="230" cy="200" r="28" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
        </svg>

        <div className="relative z-10">
          <h3 className="text-white font-extrabold tracking-tight leading-[1.15] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 max-w-3xl mx-auto">
            We teach business leaders practical AI to grow sales, marketing and operations.
          </h3>
          <p className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-10">
            <span className="text-white">Stay </span>
            <span style={{ color: '#A7F3D0' }}>Tuned</span>
            <span style={{ color: '#5EEAD4' }}>!</span>
          </p>

          <button
            onClick={goToBooking}
            className="group inline-flex items-center gap-3 md:gap-4 pl-6 md:pl-7 pr-1.5 py-1.5 rounded-full bg-white/15 border border-white/40 backdrop-blur-sm text-white shadow-lg transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-sm md:text-base font-semibold">Join The Waitlist</span>
            <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/25 text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Discovery = ({ standalone = false }: { standalone?: boolean } = {}) => (
  <section
    id="discovery"
    className={
      standalone
        ? "pt-32 pb-20 md:pt-44 md:pb-32 bg-page-bg relative min-h-screen"
        : "pt-16 pb-20 md:pt-28 md:pb-32 bg-page-bg relative z-[60] rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20"
    }
  >
    <div className="max-w-6xl mx-auto px-6 md:px-10">
      <SectionHeading
        centered
        title={<>Schedule your <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">leap</span> with a strategy call</>}
        subtitle="Book a time that works for you — no pressure, just a clear look at how LeapLayer can help your business grow."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[2.5rem] border border-[#E5E5E0] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/OAg9PWUFqdMh8BKeredT"
          style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '800px' }}
          scrolling="no"
          id="OAg9PWUFqdMh8BKeredT_1788551245494"
          title="Book a Discovery Call"
          allow="payment"
        />
      </motion.div>
    </div>
  </section>
);

const BookingPage = () => (
  <main>
    <Discovery standalone />
  </main>
);

const Footer = ({ setView }: { setView: (v: 'home' | 'about' | 'booking') => void }) => {
  return (
    <footer className="bg-dark-bg pt-20 pb-10 md:pt-48 md:pb-12 border-t border-white/5 relative z-[70] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] -mt-20">
      <div className="max-w-[85rem] mx-auto px-6">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <a href="#" className="text-3xl font-bold tracking-tighter text-white mb-6 block">LeapLayer</a>
            <p className="text-secondary max-w-sm mb-8">
              Done-for-you systems that get you more Google reviews, a smart website with lead capture and AI automations that attract and convert viewers into customers. Designed for your business to grow.
            </p>
            <Button
              variant="secondary"
              className="!px-6 !py-2 text-xs"
              onClick={goToBooking}
            >
              Book Strategy Call
            </Button>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Smart Websites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Magic Review Collection Automations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Re-Marketing Systems</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li>
                <button
                  onClick={() => {
                    setView('about');
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-secondary text-xs">
          <p>© 2026 LeapLayer Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FounderSection = ({ onBookCall, zIndex = 'z-[60]' }: { onBookCall: () => void, zIndex?: string }) => (
  <section className={`bg-black py-20 md:py-48 overflow-hidden relative ${zIndex} rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.2)] -mt-20`}>
    <div className="max-w-[85rem] mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Right side (Desktop) / TOP (Mobile) - Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:order-last"
        >
          <div className="bg-[#151515] rounded-[2.5rem] p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border-[8px] border-white/5 max-w-md mx-auto relative overflow-hidden group">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#1E1E1E] mb-8 border border-white/5 flex items-center justify-center group">
              <motion.img
                src={aryan_portrait}
                alt="Aryan - Founder"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.placeholder-icon')?.classList.remove('hidden');
                }}
              />
              <div className="placeholder-icon hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#111111]">
                <Users className="text-white/5 w-32 h-32" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-white text-2xl font-bold">Aryan</h3>
              <p className="text-secondary font-medium">Founder, LeapLayer</p>
            </div>

            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 blur-[120px] rounded-full -z-10 group-hover:bg-white/10 transition-colors duration-500" />
          </div>
        </motion.div>

        {/* Left side (Desktop) / Bottom (Mobile) - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-5 md:mb-8 leading-[1.05] tracking-tight text-left">
            Meet the <br />
            <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Founder</span>
          </h2>

          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <p className="text-[#9CA3AF] text-base md:text-xl max-w-lg leading-relaxed">
              An engineer with a dual background in Mechanical Engineering and Computer Science, built with experience at Jaguar Land Rover. Proactively engaged with JLR's senior AI leadership; including the Chief of Data & AI and Head of AI, on enterprise agentic AI adoption, with a dedicated AI team placement in progress.
            </p>
            <p className="text-[#9CA3AF] text-base md:text-xl max-w-lg leading-relaxed">
              Early commercial perspective from internships spanning engineering, software, and venture capital.
            </p>
            <p className="text-[#9CA3AF] text-base md:text-xl max-w-lg leading-relaxed">
              Founded LeapLayer after seeing a widening gap: large enterprises are investing heavily in AI, while the businesses that stand to benefit most are being left behind. LeapLayer exists to close that gap.
            </p>
          </div>

          <div className="flex justify-start">
            <Button
              variant="secondary"
              className="!px-10 !py-4 text-lg border border-white/20"
              onClick={onBookCall}
            >
              Book Strategy Call
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AboutPage = ({ setView }: { setView: (v: 'home' | 'about' | 'booking') => void }) => {
  return (
    <main>
      {/* Section 1: Founder Hero */}
      <FounderSection onBookCall={goToBooking} />

      {/* Section 2: Strategy Layer CTA (Merged) */}
      <section className="py-20 md:py-48 bg-page-bg relative z-[50] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)'
          }}
        />

        <div className="max-w-[85rem] mx-auto px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-heading max-w-5xl mx-auto leading-[1.1]"
          >
            Ready to Build Your <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.1em] -m-[0.1em] text-[1.1em]">AI</span> <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.1em] -m-[0.1em] text-[1.1em]">Layer?</span>
          </motion.h2>
          <p className="text-lg md:text-3xl lg:text-4xl text-heading/50 mt-2 font-bold tracking-tighter leading-[1.1]">
            Save Time and Pain across Your Business Today
          </p>
        </div>
      </section>
    </main>
  );
};

const HomePage = () => (
  <main>
    <Hero />
    <PainPoints />
    <Integrations spotlight title={
      <div className="flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-[0.3em] px-5 py-2.5 rounded-full bg-[#2DAC65]/10 border-[1.5px] border-[#2DAC65]/40 text-[#2DAC65] text-sm font-bold uppercase tracking-wider whitespace-nowrap shadow-[0_10px_25px_-5px_rgba(45,172,101,0.25)]">
          <motion.span className="inline-block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}>Try One</motion.span>
          <span>of our systems</span>
          <motion.span className="inline-block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: 1.5, ease: 'easeInOut' }}>Now</motion.span>
        </span>
        <span className="text-white"><motion.span className="inline-block font-serif italic font-bold bg-clip-text text-transparent p-[0.15em] -m-[0.15em]" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}>Voice AI</motion.span> system for <motion.span className="inline-block font-serif italic font-bold bg-clip-text text-transparent p-[0.15em] -m-[0.15em]" style={{ backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 40%, #eeff99 50%, #67CB53 60%, #34B36C 70%, #2DAC65 100%)', backgroundSize: '250% 100%', backgroundPosition: '100% center' }} animate={{ backgroundPosition: ['100% center', '0% center'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: 1.5, ease: 'easeInOut' }}>24/7 booking</motion.span></span>
      </div>
    } />
    <Integrations />
    <Discovery />
  </main>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'about' | 'booking'>('home');

  useEffect(() => {
    // Basic path routing for SEO/Sitemap support
    if (window.location.pathname === '/about' || window.location.pathname === '/about/') {
      setView('about');
    }
  }, []);

  useEffect(() => {
    const handleNavigateToBooking = () => {
      setView('booking');
      window.scrollTo(0, 0);
    };
    window.addEventListener('navigate-to-booking', handleNavigateToBooking);
    return () => window.removeEventListener('navigate-to-booking', handleNavigateToBooking);
  }, []);

  useEffect(() => {
    // Cal.com initialization
    (function (C, A, L) {
      // @ts-ignore
      let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // @ts-ignore
    window.Cal("init", "discovery-strategy-call", { origin: "https://app.cal.com" });
    // @ts-ignore
    window.Cal.ns["discovery-strategy-call"]("ui", { 
      "hideEventTypeDetails": true, 
      "layout": "month_view",
      "theme": "dark"
    });
  }, []);

  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar setView={setView} currentView={view} />
      {view === 'home' ? (
        <main>
          <Hero />
          <HomeFounderIntro />
          <PainPoints />
          <WantToLearn />
        </main>
      ) : view === 'about' ? (
        <AboutPage setView={setView} />
      ) : (
        <BookingPage />
      )}
      <div className={view === 'home' ? "bg-black" : "bg-page-bg"}>
        <Footer setView={setView} />
      </div>
    </div>
  );
}
