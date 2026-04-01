/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, Shield, MousePointer2, LayoutGrid,
  CheckCircle2, Clock, Zap, Target, Lock, ArrowDown,
  ChevronLeft, ChevronRight, TrendingUp, Building2, ShieldCheck, Users
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

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseStyles = "relative overflow-hidden px-8 py-3 rounded-full font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98]";
  const variants = {
    primary: "bg-accent text-white/90 hover:text-white hover:bg-[#1a1a1a] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
    secondary: "bg-white text-black/90 hover:text-black hover:bg-[#F9F9F9] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)]",
    outline: "border border-accent/10 text-accent hover:bg-accent/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 drop-shadow-sm group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300">
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
  dark = false
}: { title: React.ReactNode, subtitle?: string, centered?: boolean, dark?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    className={`mb-16 ${centered ? 'text-center' : ''}`}
  >
    <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 font-bold tracking-tighter ${dark ? 'text-white' : 'text-heading'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-secondary' : 'text-body'}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

// --- Sections ---

const Navbar = ({ setView, currentView }: { setView: (v: 'home' | 'about') => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDiscoveryCall = () => {
    const el = document.getElementById('discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('trigger-booking'));
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`
          pointer-events-auto
          flex items-center justify-between
          w-full max-w-5xl
          px-6 py-3
          rounded-2xl md:rounded-full
          transition-all duration-500
          ${isScrolled
            ? 'bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
            : 'bg-white/20 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
          }
        `}
      >
        {/* Logo (Left) */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold tracking-tighter text-heading flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span>LeapLayer</span>
          </button>
        </div>

        {/* Nav Links (Center) */}
        <div className="hidden md:flex items-center justify-center gap-6 flex-none whitespace-nowrap">
          {['Why Now', 'Our Three Layer Solution', 'About Us'].map((item) => (
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
              onClick={handleDiscoveryCall}
              className="!py-2 !px-5 text-xs shadow-lg"
            >
              Book Strategy Call
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
              {['Why Now', 'Our Three Layer Solution', 'About Us'].map((item) => (
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
              <Button className="w-full py-4 text-lg rounded-2xl" onClick={handleDiscoveryCall}>Book Strategy Call</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const GridPulseLines = () => {
  const lines = [
    // Vertical lines (aligned to 4rem grid columns)
    { isVertical: true, position: '16rem', duration: 4.5, delay: 0.5, direction: 'down' },
    { isVertical: true, position: 'calc(100% - 12rem)', duration: 5.5, delay: 1.2, direction: 'up' },
    { isVertical: true, position: '32rem', duration: 6, delay: 2.5, direction: 'down' },
    { isVertical: true, position: 'calc(100% - 24rem)', duration: 4.2, delay: 0.2, direction: 'up' },

    // Horizontal lines (aligned to 4rem grid rows)
    { isVertical: false, position: '16rem', duration: 5, delay: 0.8, direction: 'right' },
    { isVertical: false, position: 'calc(100% - 12rem)', duration: 4.8, delay: 2.1, direction: 'left' },
    { isVertical: false, position: '28rem', duration: 6.5, delay: 3.5, direction: 'right' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            opacity: 0.6,
            ...(line.isVertical
              ? { left: line.position, top: 0, width: '1px', height: '35%', background: 'linear-gradient(to bottom, transparent, #2DAC65, transparent)' }
              : { top: line.position, left: 0, height: '1px', width: '35%', background: 'linear-gradient(to right, transparent, #2DAC65, transparent)' }),
          }}
          animate={{
            ...(line.isVertical
              ? { y: line.direction === 'down' ? ['-100%', '350%'] : ['350%', '-100%'] }
              : { x: line.direction === 'right' ? ['-100%', '350%'] : ['350%', '-100%'] })
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            repeatDelay: line.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const words = "The Layer That Leaps Your Business Ahead".split(" ");

  const handleDiscoveryCall = () => {
    const el = document.getElementById('discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('trigger-booking'));
    }
  };

  return (
    <section className="min-h-screen bg-page-bg flex items-center pt-40 pb-40 overflow-hidden relative">
      {/* Vercel-style fading grid background & pulses */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, black 100%)'
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
        <GridPulseLines />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="z-10 max-w-5xl mx-auto">
          <h1 className="text-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-bold tracking-tighter mb-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`inline-block ${word.toLowerCase().includes('leaps') ? 'font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -my-[0.15em] -ml-[0.15em] mr-[-0.05em] md:mr-[-0.1em]' : 'mr-[0.2em]'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-[#3A3A3A]/80 text-lg md:text-[1.3rem] max-w-2xl mx-auto mb-10 leading-[1.5] font-semibold"
          >
            What if everyone on your team got hours back a week? We save your team time and pain using AI solutions and autonomous agents. Safely and securely.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center"
          >
            <Button
              variant="primary"
              onClick={handleDiscoveryCall}
              className="text-lg md:text-[1.1rem] px-10 py-4 shadow-2xl transition-all"
            >
              Book Strategy Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Integrations = () => {
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
    { name: "Microsoft Teams", iconUrl: teams_icon, color: "6264A7" }
  ];

  return (
    <section id="solutions" className="py-24 bg-black overflow-hidden relative z-10 -mt-20 rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          dark
          title={
            <div className="flex flex-col items-center">
              <span className="text-white">
                <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Integrating AI</span> across your specific
              </span>
              <span>systems and workflows</span>
            </div>
          }
        />
      </div>

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
              {/* Animated Glow Background */}
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
                  style={{
                    filter: `drop-shadow(0 12px 20px #${app.color}77)`
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
        {/* Gradients for fade effect */}
        <div className="absolute inset-y-0 left-0 w-48 md:w-96 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 md:w-96 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />
      </div>
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

const FeatureCard = ({
  badge,
  image,
  graphic,
  title,
  description,
  delay = 0
}: {
  badge: string,
  image?: string,
  graphic?: React.ReactNode,
  title: string,
  description: string,
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{
      y: -10,
      scale: 1.01,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    }}
    className="bg-white rounded-[2.5rem] p-4 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border-[8px] border-page-bg flex flex-col h-full cursor-pointer group transition-shadow duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
  >
    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#F9F9F9] flex items-center justify-center mb-4">
      {graphic ? (
        <div className="w-full h-full flex items-center justify-center">
          {graphic}
        </div>
      ) : (
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          referrerPolicy="no-referrer"
        />
      )}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-heading border border-black/5">
          {badge}
        </span>
      </div>
    </div>
    <div className="p-7 flex flex-col flex-grow">
      <h3 className="text-[1.5rem] font-bold text-heading mb-3 leading-[1.2] tracking-tight group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-[1.05rem] text-body/80 leading-relaxed font-semibold">
        {description}
      </p>
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

const PainPoints = () => (
  <section className="pt-28 pb-48 bg-page-bg relative z-20 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading title={<><span className="block">Every firm knows AI matters</span><span className="block">Most don't know where to <span className="inline-block font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">start.</span></span></>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          delay={0.1}
          badge="CHALLENGE 01"
          graphic={<ToolsGraphic />}
          title="Too Many Tools, No Clear Path"
          description="Thousands of AI tools exist. We audit your workflows, find which specific tools actually move the needle, and implement custom agents. We make it simple and clear."
        />

        <FeatureCard
          delay={0.2}
          badge="CHALLENGE 02"
          graphic={<PropTechGraphic />}
          title="Where do I even begin?"
          description="We pinpoint the highest-impact implementations, develop your strategy and give your team hands-on workshops with clear documentation, then so everyone's confident from day one."
        />

        <FeatureCard
          delay={0.3}
          badge="CHALLENGE 03"
          graphic={<FolderGraphic />}
          title="What About Data Privacy?"
          description="We focus on systems that meet enterprise-grade standards such as GDPR and SOC 2 Type 2."
        />
      </div>
    </div>
  </section>
);

const Timeline = () => {
  return (
    <section className="pt-28 pb-56 bg-white relative z-30 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-black mb-8">
            What has <span className="inline-block font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">changed?</span>
          </h2>
          <p className="text-xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Enterprise agents just became real. This is the biggest leap since the internet,
            designed for seamless integration and ready to scale your growth.
          </p>
        </div>

        <div className="relative mt-40">
          {/* Horizontal Line */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#F0F0F0] rounded-full" />

          {/* Green pulse traveling along the line */}
          <motion.div
            className="absolute top-[-2px] w-[12px] h-[8px] rounded-full z-20"
            style={{ background: 'linear-gradient(90deg, transparent, #34B36C, transparent)' }}
            animate={{ left: ['0%', 'calc(50% + 2rem)'], opacity: [1, 1, 0] }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            {/* 2022 Point */}
            <div className="relative pt-16">
              <div className="absolute -top-[3px] w-[10px] h-[10px] bg-black rounded-full z-10 left-0" />
              <div className="absolute top-0 w-[1px] h-16 border-l border-dotted border-black/20 left-[4.5px]" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="max-w-md"
              >
                <h4 className="text-[26px] font-bold text-black mb-6 leading-[1.2] tracking-tight">
                  <span className="inline-block px-5 py-2 rounded-full bg-black/8 text-[13px] font-extrabold uppercase tracking-widest text-black border border-black/5 mb-4">
                    2022
                  </span><br />
                  <span className="text-[0.95em]">AI can talk. That's about it.</span>
                </h4>
                <p className="text-black/40 leading-relaxed text-[17px] font-medium">
                  The era of chatbots and creative writing was just the beginning of the wave.
                </p>
              </motion.div>
            </div>

            {/* 2026 Point - Two stacked milestones */}
            <div className="relative pt-16">
              {/* Green radiating pulse on 2026 dot */}
              <div className="absolute -top-[3px] left-0 z-[5]">
                <motion.div
                  className="absolute w-[10px] h-[10px] rounded-full border-2 border-[#34B36C]"
                  animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute w-[10px] h-[10px] rounded-full border-2 border-[#34B36C]"
                  animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, ease: 'easeOut', delay: 0.8 }}
                />
              </div>
              <div className="absolute -top-[3px] w-[10px] h-[10px] bg-[#34B36C] rounded-full z-10 left-0" />
              <div className="absolute top-0 w-[1px] h-16 border-l border-dotted border-[#34B36C]/40 left-[4.5px]" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-md"
              >
                <h4 className="text-[26px] font-bold text-black mb-6 leading-[1.2] tracking-tight">
                  <span className="inline-block px-5 py-2 rounded-full bg-black/8 text-[13px] font-extrabold uppercase tracking-widest text-black border border-black/5 mb-4">
                    Early 2026
                  </span><br />
                  <span className="inline-block bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">AI can now do tasks</span> with you as a director.
                </h4>
                <p className="text-black/40 leading-relaxed text-[17px] font-medium">
                  Autonomous agents now execute complex workflows from start to finish.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="max-w-md mt-10 pt-10 relative"
              >
                {/* Connecting dotted line for 2026 second milestone */}
                <div className="absolute top-[-28px] h-[48px] w-[1px] border-l border-dotted border-[#34B36C]/40 left-[4.5px]" />

                <h4 className="text-[26px] font-extrabold text-black mb-4 leading-[1.2] tracking-tight">
                  <span className="inline-block bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Enterprise security</span> for data privacy
                </h4>
                <p className="text-black/40 leading-relaxed text-[17px] font-medium">
                  Private siloed environments where your data remains yours and yours only. Enterprise-grade security at every layer.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyNow = () => {
  const stakes = [
    {
      title: "What Becomes Possible With Your Team",
      badge: "Organisation Potential",
      description: (
        <>
          Real long-term impact isn't actually about speed. Yes things get faster but it's all about <span className="font-bold text-black">what becomes possible with a small team</span>.
          A five-person team can now operate with the throughput of a fifteen-person firm, orchestrating agents to handle volume.
          We show you how to do this with your workflows and optimise it to maximise your needs and make life easier.
        </>
      ),
      imageStyle: "bg-gradient-to-br from-black/5 via-black/10 to-black/5",
      accentColor: "#2DAC65"
    },
    {
      title: (
        <>
          <span className="inline-block bg-gradient-to-br from-[#AE222C] via-[#EB5242] to-[#FE8E76] bg-clip-text text-transparent py-[0.15em] -my-[0.15em] pl-[0.15em] -ml-[0.15em]">Competitors</span>
          {" Pulling Ahead"}
        </>
      ),
      badge: "Industry Shift",
      description: "The firms figuring out how our AI agents fit into their operations today are setting the standard for the industry. Everyone else is hiring help in 2027, trying to catch up with the early moves that are already ahead.",
      imageStyle: "bg-gradient-to-tr from-black/5 via-black/20 to-black/5",
      accentColor: "#67CB53"
    }
  ];

  return (
    <section id="why-now" className="py-48 bg-page-bg relative z-40 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title={<>Why <span className="inline-block font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Now?</span> What's at Stake?</>}
          subtitle="The entire industry is now moving towards the adoption of these systems in early 2026. The AI capabilities are now able to actually increase productivity in the workplace by increasing your work output and saving time on tasks."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {stakes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 flex flex-col shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 group relative"
            >
              <div className="mb-6 flex-none">
                <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-[11px] font-bold uppercase tracking-widest text-black/60 border border-black/5">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-black mb-8 leading-[1.1]">
                {item.title}
              </h3>

              <div className="text-lg md:text-xl text-black/60 leading-relaxed font-medium flex-1">
                {item.description}
              </div>

              {/* signature branding */}
              <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between flex-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span className="text-[12px] font-bold uppercase tracking-widest text-black/40">The Stakes</span>
                </div>
                <div className="text-[12px] font-bold italic font-serif text-black/20">
                  by LeapLayer
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solution = () => (
  <section id="our-three-layer-solution" className="py-48 bg-page-bg relative z-50 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        title={<>Our 3 <span className="inline-block font-serif italic font-bold text-[1.1em] bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Layer</span> Solution</>}
        subtitle="We don't just hand you tools. We audit how your firm actually works, build agents around your specific workflows, and make sure your team knows how to use them."
      />

      <div className="space-y-8 mt-16">
        {[
          {
            num: "01",
            title: "Audit",
            text: (
              <>
                <span className="font-bold text-black">We start by mapping out your workflows and how your business actually operates</span>. We sit with you and your team, walk through daily routines, evaluating where time is being lost, and pinpoint exactly where AI agents will have the most impact. No guesswork. No generic recommendations. A clear picture of your operations and a prioritised plan.
              </>
            )
          },
          {
            num: "02",
            title: "Implement",
            text: (
              <>
                <span className="font-bold text-black">We design custom AI agents built specifically for your workflows</span>, identify the best tools to match your organisation and help deploy them, securely. Every agent is configured to work with your existing systems, handle your formats, speak your organisation's and industry's language, and complete tasks end to end.
              </>
            )
          },
          {
            num: "03",
            title: "Train",
            text: (
              <>
                <span className="font-bold text-black">Your team gets hands-on workshops, clear documentation, and ongoing support</span> so they're confident from day one, not left with a login and a "good luck". We train your people on how to direct agents effectively and understand what's happening under the hood.
              </>
            )
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              y: -10,
              scale: 1.01,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            className="relative p-[8px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-shadow duration-500"
          >
            {/* Default Border Background */}
            <div className="absolute inset-0 bg-page-bg transition-opacity duration-500 group-hover:opacity-0" />

            {/* Animated Gradient Border dropping top-left to bottom-right on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />

            {/* Inner White Card Content */}
            <div className="relative z-10 bg-white rounded-[2rem] h-full p-10 md:p-12 flex flex-col justify-center overflow-hidden pb-16">
              <div className="absolute top-8 right-12 text-8xl font-bold tracking-tighter text-black/[0.03] select-none group-hover:text-black/[0.05] transition-colors duration-500">
                {item.num}
              </div>
              <div className="relative z-10 max-w-3xl pt-2">
                <h3 className="text-3xl md:text-4xl mb-6 font-bold tracking-tight">{item.title}</h3>
                <p className="text-lg md:text-xl text-body leading-relaxed">{item.text}</p>
              </div>

              {/* LeapLayer Watermark */}
              <div className="absolute bottom-8 right-10 text-[13px] font-bold italic font-serif text-black/20 select-none tracking-wide">
                LeapLayer<sup className="text-[9px] ml-[1px]">®</sup>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Discovery = () => {
  const [isBookingVisible, setIsBookingVisible] = useState(false);

  const handleDiscoveryCall = () => {
    setIsBookingVisible(true);
  };

  useEffect(() => {
    const handleTrigger = () => setIsBookingVisible(true);
    window.addEventListener('trigger-booking', handleTrigger);
    return () => window.removeEventListener('trigger-booking', handleTrigger);
  }, []);

  useEffect(() => {
    if (isBookingVisible) {
      // Small delay to ensure the container is fully mounted before script init
      setTimeout(() => {
        // @ts-ignore
        if (window.Cal && window.Cal.ns["discovery-strategy-call"]) {
          // @ts-ignore
          window.Cal.ns["discovery-strategy-call"]("inline", {
            elementOrSelector: "#my-cal-inline-discovery-strategy-call",
            config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
            calLink: "aryan-leap-layer/discovery-strategy-call",
          });
        }
      }, 100);
    }
  }, [isBookingVisible]);

  return (
    <section id="discovery" className="bg-black py-48 overflow-hidden relative z-[60] rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.2)] -mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
              Schedule your <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">leap</span> with a strategy call
            </h2>
            <p className="text-secondary text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
              Book a quick call and get a clear look at how LeapLayer works, what's included, and whether it fits your pace.
            </p>
            <Button
              variant="secondary"
              className="!px-10 !py-4 text-lg border border-white/20 active:scale-95"
              onClick={handleDiscoveryCall}
            >
              {isBookingVisible ? "Booking Open..." : "Book a Call"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[700px] w-full flex items-center justify-center"
          >
            <div className="relative w-full flex items-center justify-center min-h-[600px]">
              <AnimatePresence>
                {!isBookingVisible ? (
                  <motion.div
                    key="mockup"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    className="w-full relative z-10"
                  >
                    {/* Mock Calendar Widget */}
                    <div 
                      className="bg-[#151515] rounded-[2.5rem] p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border-[8px] border-white/5 max-w-md mx-auto relative overflow-hidden group cursor-pointer transition-all duration-500 hover:border-white/10"
                      onClick={handleDiscoveryCall}
                    >
                      <div className="flex justify-between items-center mb-10">
                        <h3 className="text-white text-xl font-medium">April <span className="text-secondary">2026</span></h3>
                        <div className="flex gap-6">
                          <ChevronLeft className="text-secondary w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                          <ChevronRight className="text-secondary w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-y-6 mb-10 text-center">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                          <span key={day} className="text-[10px] font-bold text-secondary tracking-widest">{day}</span>
                        ))}

                        {/* Empty spaces for start of month */}
                        <div className="h-10" />
                        <div className="h-10" />
                        <div className="h-10" />
                        <span className="text-secondary text-sm flex items-center justify-center h-10">1</span>
                        <span className="text-secondary text-sm flex items-center justify-center h-10">2</span>
                        <span className="text-secondary text-sm flex items-center justify-center h-10">3</span>
                        <span className="text-secondary text-sm flex items-center justify-center h-10">4</span>

                        <span className="text-secondary text-sm flex items-center justify-center h-10">5</span>
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          <span className="text-black text-sm font-bold">6</span>
                        </div>
                        {[7, 8, 9, 10].map(d => (
                          <div key={d} className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto hover:bg-white/10 transition-colors">
                            <span className="text-white text-sm">{d}</span>
                          </div>
                        ))}
                        <span className="text-secondary text-sm flex items-center justify-center h-10">11</span>

                        <span className="text-secondary text-sm flex items-center justify-center h-10">12</span>
                        {[13, 14, 15, 16, 17].map(d => (
                          <div key={d} className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto hover:bg-white/10 transition-colors">
                            <span className="text-white text-sm">{d}</span>
                          </div>
                        ))}
                        <span className="text-secondary text-sm flex items-center justify-center h-10">18</span>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-white font-medium">Mon <span className="text-secondary">06</span></span>
                          <div className="bg-black rounded-lg p-1 flex gap-1">
                            <span className="text-[10px] px-2 py-1 text-secondary">12h</span>
                            <span className="text-[10px] px-2 py-1 bg-white/10 text-white rounded-md">24h</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            className="py-4 border border-white/10 rounded-xl text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all active:scale-95"
                            onClick={(e) => { e.stopPropagation(); handleDiscoveryCall(); }}
                          >
                            07:00
                          </button>
                          <button 
                            className="py-4 border border-white/10 rounded-xl text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all active:scale-95 bg-white/5"
                            onClick={(e) => { e.stopPropagation(); handleDiscoveryCall(); }}
                          >
                            09:00
                          </button>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-2 rounded-full font-bold text-sm shadow-xl">
                          Click to Select Time
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="real-booking"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-full absolute inset-0 z-20 h-full"
                  >
                    <div className="bg-[#151515] rounded-[2.5rem] overflow-hidden border-[8px] border-white/10 shadow-2xl relative h-full flex flex-col">
                      {/* Top Bar for Context */}
                      <div className="px-8 py-4 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Strategy Call Booking</span>
                        <div className="w-2 h-2 rounded-full bg-[#2DAC65] animate-pulse" />
                      </div>
                      
                      <div 
                        id="my-cal-inline-discovery-strategy-call" 
                        className="w-full grow overflow-y-auto scroll-smooth custom-scrollbar"
                        style={{ background: 'transparent' }}
                      />
                      
                      <button 
                        onClick={() => setIsBookingVisible(false)}
                        className="absolute top-3 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2DAC65]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#2DAC65]/5 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: 'home' | 'about') => void }) => {
  const handleDiscoveryCall = () => {
    const el = document.getElementById('discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('trigger-booking'));
    }
  };

  return (
    <footer className="bg-dark-bg pt-48 pb-12 border-t border-white/5 relative z-[70] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] -mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-20">
          <div>
            <a href="#" className="text-3xl font-bold tracking-tighter text-white mb-6 block">LeapLayer</a>
            <p className="text-secondary max-w-xs mb-8">
              The implementation layer that leaps your business ahead with custom AI solutions.
            </p>
            <Button
              variant="secondary"
              className="!px-6 !py-2 text-xs"
              onClick={handleDiscoveryCall}
            >
              Book Strategy Call
            </Button>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Solutions</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><a href="#" className="hover:text-white transition-colors">AI Audit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Agents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team Training</a></li>
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

const AboutPage = ({ setView }: { setView: (v: 'home' | 'about') => void }) => {
  const handleDiscoveryCall = () => {
    setView('home');
    setTimeout(() => {
      const el = document.getElementById('discovery');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('trigger-booking'));
      }
    }, 100);
  };

  return (
    <main>
      {/* Section 1: Founder Hero */}
      <section className="bg-black py-48 overflow-hidden relative z-[60] rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.2)] -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
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
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight text-left">
                Meet the <br />
                <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Founder</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-[#9CA3AF] text-lg md:text-xl max-w-lg leading-relaxed">
                  An engineer with a dual background in Mechanical Engineering and Computer Science, built with experience at Jaguar Land Rover. Proactively engaged with JLR's senior AI leadership; including the Chief of Data & AI and Head of AI, on enterprise agentic AI adoption, with a dedicated AI team placement in progress.
                </p>
                <p className="text-[#9CA3AF] text-lg md:text-xl max-w-lg leading-relaxed">
                  Early commercial perspective from internships spanning engineering, software, and venture capital.
                </p>
                <p className="text-[#9CA3AF] text-lg md:text-xl max-w-lg leading-relaxed">
                  Founded LeapLayer after seeing a widening gap: large enterprises are investing heavily in AI, while the businesses that stand to benefit most are being left behind. LeapLayer exists to close that gap.
                </p>
              </div>

              <div className="flex justify-start">
                <Button
                  variant="secondary"
                  className="!px-10 !py-4 text-lg border border-white/20"
                  onClick={handleDiscoveryCall}
                >
                  Book Strategy Call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Strategy Layer CTA (Merged) */}
      <section className="py-48 bg-page-bg relative z-[50] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-heading max-w-5xl mx-auto leading-[1.1]"
          >
            Ready to Build Your <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.1em] -m-[0.1em] text-[1.1em]">AI</span> <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.1em] -m-[0.1em] text-[1.1em]">Layer?</span>
          </motion.h2>
          <p className="text-xl md:text-3xl lg:text-4xl text-heading/50 mt-2 font-bold tracking-tighter leading-[1.1]">
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
    <Integrations />
    <PainPoints />
    <Timeline />
    <WhyNow />
    <Solution />
    <Discovery />
  </main>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'about'>('home');

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
          <Integrations />
          <PainPoints />
          <Timeline />
          <WhyNow />
          <Solution />
          <Discovery />
        </main>
      ) : <AboutPage setView={setView} />}
      <div className={view === 'home' ? "bg-black" : "bg-page-bg"}>
        <Footer setView={setView} />
      </div>
    </div>
  );
}
