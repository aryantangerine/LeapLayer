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
  ChevronLeft, ChevronRight, Building2, ShieldCheck, Users,
  Linkedin, MessageSquareText, Smartphone,
  ChevronDown, Star, Check,
  CalendarX, Bot, ArrowUpRight
} from 'lucide-react';

import outlook_icon from './assets/outlook.png';
import teams_icon from './assets/teams.png';
import excel_icon from './assets/excel.png';
import powerpoint_icon from './assets/powerpoint.png';
import word_icon from './assets/word.png';
import salesforce_icon from './assets/salesforce.png';
import jira_icon from './assets/jira.png';
import googledrive_icon from './assets/googledrive.png';
import aryan_avatar from './assets/aryan_picture.jpg';
import { products, productPath, getProduct, pricingPlans, type Product } from './products';
import { getPageMeta, absolute, type PageMeta } from './seo';
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

const circleArrowClass = "group inline-flex items-center justify-between gap-4 md:gap-6 pl-7 md:pl-9 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] active:scale-[0.98]";

const CircleArrowButton = ({
  children,
  onClick,
  href,
  icon: Icon = ArrowRight,
  className = '',
}: { children: React.ReactNode, onClick?: () => void, href?: string, icon?: React.ElementType, className?: string }) => {
  const inner = (
    <>
      <span className="text-base md:text-[1.2rem] font-semibold">{children}</span>
      <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
        <Icon size={20} />
      </span>
    </>
  );
  const style = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${circleArrowClass} ${className}`} style={style}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} className={`${circleArrowClass} ${className}`} style={style}>{inner}</button>
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


// --- Navigation ---

// In-app navigation: SiteLink and navigateTo dispatch this; App listens, updates the URL and renders the page.
const NAVIGATE_EVENT = 'leaplayer:navigate';
const navigateTo = (to: string) => window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: to }));
const goToBooking = () => navigateTo('/book');

// A real <a href> so crawlers can follow it, with an instant in-app navigation on a plain left click.
const SiteLink = ({
  to,
  onNavigate,
  children,
  ...rest
}: { to: string, onNavigate?: () => void } & Omit<React.ComponentPropsWithRef<'a'>, 'href'>) => (
  <a
    href={to}
    {...rest}
    onClick={(e) => {
      rest.onClick?.(e);
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      onNavigate?.();
      navigateTo(to);
    }}
  >
    {children}
  </a>
);

// --- Sections ---

const navLinks = [
  { label: 'Pricing', to: '/pricing' },
  { label: 'About Us', to: '/about' },
  { label: 'Why Now', to: '/#why-now' },
  { label: 'For Business Leaders', to: '/#for-business-leaders' },
];

const Navbar = ({ currentPath }: { currentPath: string }) => {
  // Starts false on the server and the first client render; the scroll effect sets the real value.
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [productsMenuPos, setProductsMenuPos] = useState({ left: 0, top: 0 });
  const productsBtnRef = useRef<HTMLAnchorElement>(null);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Every page except the home hero sits on a plain background, so the nav needs its solid frosted look there.
  const solidNav = currentPath !== '/';

  const openProductsMenu = () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    const rect = productsBtnRef.current?.getBoundingClientRect();
    if (rect) {
      setProductsMenuPos({ left: rect.left + rect.width / 2, top: rect.bottom + 28 });
    }
    setIsProductsOpen(true);
  };

  const closeProductsMenu = () => {
    productsCloseTimer.current = setTimeout(() => setIsProductsOpen(false), 120);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none" aria-label="Main">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl md:max-w-[73.6rem] px-6 py-3 md:py-4 rounded-2xl md:rounded-full overflow-hidden transition-[box-shadow] duration-500"
        style={{
          background: solidNav ? 'rgba(255,255,255,0.85)' : (isScrolled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: solidNav
            ? 'inset 0 1.5px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.2), inset 1px 0 0 rgba(255,255,255,0.2), inset -1px 0 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)'
            : isScrolled
            ? 'inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(255,255,255,0.12), inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'
            : 'inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.07)',
        }}
      >
        {/* Liquid glass surface sheen */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.06) 100%)', borderRadius: 'inherit' }} />
        {/* Logo (Left) */}
        <div className="flex-1 flex justify-start">
          <SiteLink to="/" aria-label="LeapLayer home" className="flex items-center ml-2 md:ml-4 -translate-y-0.5">
            <img src={logo_black} alt="LeapLayer" className="h-7 md:h-9 w-auto" />
          </SiteLink>
        </div>

        {/* Nav Links (Center) */}
        <div className="hidden md:flex items-center justify-center gap-6 flex-none whitespace-nowrap">
          <SiteLink
            to="/#built-for-you"
            ref={productsBtnRef}
            onMouseEnter={openProductsMenu}
            onMouseLeave={closeProductsMenu}
            className="flex items-center gap-1 text-[15px] font-semibold text-heading/70 hover:text-heading transition-all duration-300 hover:scale-105"
          >
            Products
            <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
          </SiteLink>
          {navLinks.map((item) => (
            <SiteLink
              key={item.label}
              to={item.to}
              className="text-[15px] font-semibold text-heading/70 hover:text-heading transition-all duration-300 hover:scale-105"
            >
              {item.label}
            </SiteLink>
          ))}
        </div>

        {/* CTA Button & Mobile Toggle (Right) */}
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:block">
            <Button
              onClick={goToBooking}
              className="!py-3.5 !px-8 text-base !text-white shadow-lg"
            >
              Free AI Audit
            </Button>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-heading"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Products mega menu — rendered as a sibling of the (overflow-hidden) pill so it isn't clipped */}
      <AnimatePresence>
        {isProductsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={openProductsMenu}
            onMouseLeave={closeProductsMenu}
            className="fixed z-[110] w-[760px] max-w-[calc(100vw-3rem)] -translate-x-1/2 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] border border-white/50 p-7 pointer-events-auto"
            style={{
              left: productsMenuPos.left,
              top: productsMenuPos.top,
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-heading/40 mb-5 px-2">Systems &amp; Features</div>
            <div className="grid grid-cols-2 gap-2">
              {products.map((p) => (
                <SiteLink
                  key={p.slug}
                  to={productPath(p.slug)}
                  onNavigate={() => setIsProductsOpen(false)}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-transparent hover:bg-[#111111] transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/60 border border-white/60 group-hover:bg-white/10 group-hover:border-white/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <p.icon size={20} className="text-heading group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-heading group-hover:text-white leading-snug transition-colors duration-300">{p.name}</div>
                    <div className="text-sm text-heading/50 group-hover:text-white/60 leading-snug mt-0.5 transition-colors duration-300">{p.short}</div>
                  </div>
                </SiteLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-20 left-6 right-6 md:hidden bg-white/80 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[calc(100dvh-7rem)] overflow-y-auto"
          >
            <div className="p-8 flex flex-col gap-6">
              <div>
                <p className="text-xl font-bold text-heading tracking-tight">Products</p>
                <ul className="mt-3 grid gap-1">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <SiteLink
                        to={productPath(p.slug)}
                        onNavigate={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-1.5 text-[16px] font-medium text-heading/75"
                      >
                        <p.icon size={18} className="text-brand flex-shrink-0" />
                        {p.name}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
              {navLinks.map((item) => (
                <SiteLink
                  key={item.label}
                  to={item.to}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-heading tracking-tight text-left"
                >
                  {item.label}
                </SiteLink>
              ))}
              <Button className="w-full py-4 text-lg rounded-2xl" onClick={() => { setIsMobileMenuOpen(false); goToBooking(); }}>Free AI Audit</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const Hero = () => {
  const lines = ["More Reviews.", "Better Visibility.", "More Customers."];

  // The shader library accumulates an ever-growing time uniform with no wraparound. Left running
  // for a long session, float32 precision breaks down and the animation drifts toward black. A
  // periodic full remount (fresh key) resets that internal accumulator before it degrades, without
  // altering how the animation or colors look at any given moment.
  const [shaderCycle, setShaderCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShaderCycle((c) => c + 1), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const handleSeeHow = () => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white flex items-center pt-40 pb-32 md:pt-48 md:pb-40 overflow-hidden relative">
      {/* WebGL shader background (mobile: static, unchanged) */}
      <Shader key={`mobile-${shaderCycle}`} className="absolute inset-0 z-0 pointer-events-none md:hidden">
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
      <Shader key={`desktop-${shaderCycle}`} className="absolute inset-0 z-0 pointer-events-none hidden md:block">
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
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.65) 62%, transparent 100%)',
        }}
      />

      {/* Desktop: dense/white behind the left-aligned text, fading out to the right to let the animation read stronger there */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 28% 50%, rgba(255,255,255,0.97) 35%, rgba(255,255,255,0.7) 60%, transparent 100%)',
        }}
      />

      <div className="max-w-[85rem] mx-auto px-6 text-left relative z-10 w-full min-w-0">
        <div className="z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-start mb-5 md:mb-6"
          >
            <span
              className="inline-flex items-center px-5 py-2.5 rounded-full backdrop-blur-md text-[#0D6B45] text-sm font-bold uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(45,172,101,0.25)]"
              style={{ background: 'rgba(255,255,255,0.7)' }}
            >
              Your AI Business Growth Engine
            </span>
          </motion.div>
          <h1 className="text-heading text-[2.75rem] sm:text-6xl md:text-7xl leading-[1.05] font-bold tracking-tighter mb-6 md:mb-7">
            {lines.map((line, i) => {
              const isHighlighted = line === "More Customers.";
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="block"
                >
                  {isHighlighted ? (
                    <motion.span
                      className="inline-block bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(105deg, #2DAC65 0%, #34B36C 30%, #67CB53 50%, #34B36C 70%, #2DAC65 100%)',
                        backgroundSize: '250% 100%',
                        backgroundPosition: '100% center',
                      }}
                      animate={{ backgroundPosition: ['100% center', '0% center'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                    >
                      {line}
                    </motion.span>
                  ) : (
                    line
                  )}
                  {/* Keeps the lines as separate words in the page text that search engines read */}
                  {' '}
                </motion.span>
              );
            })}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#1a1a1a] text-base md:text-xl max-w-2xl mb-7 md:mb-9 leading-[1.55] font-semibold"
          >
            Done-for-you systems that get you more Google reviews, a smart website with lead capture and automations that attract and convert viewers into customers. Designed for your business to grow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4"
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
                <span className="text-base md:text-[1.2rem] font-semibold">Free 15-Min AI Audit</span>
                {/* Same hover DNA as the product cards: a fill grows from the centre and the arrow turns to point right */}
                <span className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex-shrink-0 overflow-hidden">
                  <span className="absolute inset-0 rounded-full bg-[#2DAC65] scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" aria-hidden="true" />
                  <ArrowUpRight size={20} className="relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white group-hover:rotate-45" />
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

const HomeFounderIntro = () => (
  <section className="pt-16 pb-24 md:pt-28 md:pb-36 bg-white relative z-[8] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20 overflow-hidden">
    <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left: eyebrow, heading, name + LinkedIn, bio, buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow">About LeapLayer</p>
          <h2 className="h-calm text-heading text-[34px] lg:text-[48px] mt-3">Meet the founder.</h2>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-heading">Aryan</span>
            <a
              href="https://www.linkedin.com/in/aryan-parekh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aryan's LinkedIn profile"
              className="grid place-items-center w-9 h-9 rounded-[12px] bg-tint text-brand flex-shrink-0 transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              <Linkedin size={17} />
            </a>
          </div>

          <p className="text-muted text-[17px] lg:text-[19px] leading-relaxed mt-4">
            Aryan has a background at <span className="text-heading font-medium underline decoration-brand decoration-2 underline-offset-4">Jaguar Land Rover</span> as an <span className="text-heading font-medium">Engineer</span>, working across <span className="text-heading font-medium">AI teams</span>, <span className="text-heading font-medium">Investment teams</span>, and <span className="text-heading font-medium">Marketing teams</span>. Graduated from a top Russell Group university in Mechanical Engineering with Computer Science, and regularly works with entrepreneurs and businesses on their technology adoption.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
            <CircleArrowButton onClick={goToBooking}>Let's Talk</CircleArrowButton>
            <CircleArrowButton href="https://www.linkedin.com/in/aryan-parekh/">See LinkedIn Profile</CircleArrowButton>
          </div>
        </motion.div>

        {/* Right: photo with a floating glass fact card — swap for a video embed once one is sent */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-[32px] bg-[#EDEDE8]">
            <img
              src={aryan_avatar}
              alt="Aryan Parekh, founder of LeapLayer"
              className="w-full h-full object-cover"
            />
            {/* Editorial caption: soft bottom fade with the name set directly on the photo */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-white text-[19px] md:text-[21px] font-semibold tracking-[-0.02em] leading-tight">Aryan Parekh</p>
              <p className="text-white/75 text-[14px] md:text-[15px] mt-1">Founder of LeapLayer, engineer at Jaguar Land Rover</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const GoogleWord = () => (
  <span className="whitespace-nowrap">
    <span style={{ color: '#4285F4' }}>G</span>
    <span style={{ color: '#EA4335' }}>o</span>
    <span style={{ color: '#FBBC05' }}>o</span>
    <span style={{ color: '#4285F4' }}>g</span>
    <span style={{ color: '#34A853' }}>l</span>
    <span style={{ color: '#EA4335' }}>e</span>
  </span>
);

type ProductCardProps = {
  to: string,
  title: React.ReactNode,
  description: string,
  bullets: string[],
  cta: string,
};

const ProductCard = ({ to, title, description, bullets, cta }: ProductCardProps) => (
  <SiteLink
    to={to}
    className="group relative flex flex-col h-full w-full text-left bg-[#F3F4F6] rounded-[32px] p-7 md:p-10 ring-1 ring-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-white hover:ring-black/[0.06] hover:shadow-[0_2px_4px_rgba(0,0,0,0.03),0_12px_28px_-8px_rgba(0,0,0,0.10),0_32px_64px_-24px_rgba(0,0,0,0.14)]"
  >
    {/* Arrow circle: a dark fill grows from the centre on hover */}
    <span
      className="absolute top-7 right-7 md:top-10 md:right-10 grid place-items-center w-10 h-10 rounded-full bg-white overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-[#111111] scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
      <ArrowUpRight size={18} className="relative text-heading transition-all duration-500 group-hover:text-white group-hover:rotate-45" />
    </span>
    <span className="self-start rounded-full bg-tint px-3.5 py-1.5 text-[13.5px] font-semibold text-[#0D6B45] mr-14">{cta}</span>
    <h3 className="h-calm text-heading text-[30px] md:text-[38px] mt-4 pr-14">{title}</h3>
    <p className="text-muted text-[16px] md:text-[17px] leading-relaxed mt-4 max-w-[34rem]">{description}</p>
    <span className="flex flex-wrap gap-2 mt-auto pt-8">
      {bullets.map((bullet) => (
        <span key={bullet} className="rounded-full bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-heading/75 transition-colors duration-500 group-hover:bg-[#F3F4F6]">
          {bullet}
        </span>
      ))}
    </span>
  </SiteLink>
);

const painPointCards: ProductCardProps[] = [
  {
    to: productPath("google-review-automation"),
    cta: "Attract New Customers",
    title: <>Get More <GoogleWord /> Reviews with Our AI System</>,
    description: "Great customers forget to review. We give you a system that makes sure it never happens again, protecting your brand.",
    bullets: ["Automated Review Requests", "Follow-Up Reminders", "Auto-Posted To Social", "NFC Tap-To-Review Card"],
  },
  {
    to: productPath("smart-website"),
    cta: "Convert More Leads",
    title: "A Smart Website With Lead Capture",
    description: "A website that uses AI to turn every qualified lead instantly into a text conversation DIRECTLY to your phone.",
    bullets: ["Automated Website Replies", "Built To Rank", "Capture Every Enquiry", "Mobile Optimized"],
  },
  {
    to: productPath("ai-receptionist"),
    cta: "Never Miss A Call",
    title: "AI Receptionist",
    description: "A 24/7 AI-powered receptionist that answers every call and books the appointment for you.",
    bullets: ["24/7 Availability", "Instant Call Answering", "Appointment Booking", "Lead Capture"],
  },
  {
    to: productPath("lead-tracking-dashboard"),
    cta: "See Your Results",
    title: "Track Everything",
    description: "See every opportunity, appointment and the revenue these systems generate, all in one dashboard.",
    bullets: ["Live Opportunity Tracking", "Appointment Tracking", "Revenue Reporting", "One Dashboard"],
  },
];

const whyNowPoints: { icon: React.ElementType, title: string, text: string }[] = [
  { icon: MousePointer2, title: "It's clicks, not history.", text: "It's not history that ranks you now, it's clicks. On your website. On your profile." },
  { icon: Star, title: 'Fresh reviews win.', text: "Old reviews don't count like they used to. New ones do, and how fast you get them." },
  { icon: CalendarX, title: '30 days of silence costs you.', text: "Miss 30 days of activity on your profile? Google's already moved you down." },
  { icon: Bot, title: 'AI answers for you now.', text: "Google's AI now answers customers straight from your profile, get it wrong, and you get skipped entirely." },
];

const WhyNow = () => (
  <section id="why-now" className="bg-[#F6F7F9] relative z-[9] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.12)] -mt-20 overflow-hidden pt-16 pb-28 md:pt-24 md:pb-40">
    <div className="relative max-w-[85rem] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-[640px]">
          <p className="eyebrow">Why now</p>
          <h2 className="h-calm two-tone text-heading text-[34px] lg:text-[48px] mt-3">
            Google changed the rules <br className="hidden sm:block" /><span className="tone">in mid 2026.</span>
          </h2>
        </div>
        <CircleArrowButton
          icon={ArrowDown}
          onClick={() => document.getElementById('built-for-you')?.scrollIntoView({ behavior: 'smooth' })}
          className="self-start lg:self-auto"
        >
          See How We Help
        </CircleArrowButton>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-10 lg:mt-14">
        {whyNowPoints.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
            className="bg-white border border-line rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="grid place-items-center w-11 h-11 rounded-[14px] bg-tint text-brand">
              <Icon size={22} />
            </span>
            <h3 className="h-calm text-heading text-[20px] mt-5">{title}</h3>
            <p className="text-muted text-[15.5px] leading-relaxed mt-2">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PainPoints = () => (
  <section id="built-for-you" className="pb-24 md:pb-36 bg-white relative z-10 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-25px_60px_-10px_rgba(0,0,0,0.35)] -mt-20 overflow-hidden">
    {/* Dark intro panel — its bottom edge runs from both screen edges down to a lightly rounded centre point */}
    <div className="relative bg-[#141414] pt-10 pb-[134px] md:pt-20 md:pb-[197px] 2xl:pb-[152px] overflow-hidden">
      {/* Subtle off-centre glow — soft brightness low in the panel, echoing the reference screenshot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 900px 550px at 58% 66%, rgba(255,255,255,0.05), transparent 70%)' }}
        aria-hidden="true"
      />
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-[90px] md:h-[150px] 2xl:h-[270px]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L600,218 Q720,262 840,218 L1440,0 L1440,240 L0,240 Z"
          fill="#FFFFFF"
        />
      </svg>
      <div className="relative">
        <div className="max-w-[85rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="eyebrow !text-[#67CB53]">Local Business Package</p>
            <h2 className="h-calm text-white text-[34px] md:text-[44px] lg:text-[56px] mt-3 mb-4 md:mb-6 max-w-4xl mx-auto">
              Built for You, <span className="text-white/50">Affordable, No Effort.</span>
            </h2>
          </motion.div>
          <p className="text-[0.95rem] md:text-[1.3rem] font-semibold text-[#9CA3AF] text-center max-w-4xl mx-auto leading-[1.55] px-1">
            Everything below exists for one core outcome, bringing you more business and not being hidden on Google.
          </p>
        </div>
      </div>
    </div>

    <div className="relative z-10 max-w-[75rem] mx-auto px-5 lg:px-8 pt-14 md:pt-20">
      {/* Four products, two by two */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {painPointCards.map((card, i) => (
          <motion.div
            key={card.cta}
            className="h-full"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
          >
            <ProductCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



// Green gradient call-to-action panel, shared by the home page and the product pages.
const CtaPanel = ({
  eyebrow,
  heading,
  text,
  button,
}: { eyebrow: string, heading: React.ReactNode, text: string, button: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="relative overflow-hidden rounded-[32px] px-6 py-12 sm:px-10 lg:px-16 lg:py-16 shadow-[0_30px_60px_-20px_rgba(11,90,52,0.45)]"
    style={{ background: 'linear-gradient(120deg, #053B26 0%, #0A6339 38%, #1A8F4F 72%, #2DAC65 100%)' }}
  >
    {/* Faint line texture carried over from the previous banner */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1500 460" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path d="M-50,380 C250,280 450,480 750,360 C1050,240 1250,420 1550,300" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />
      <path d="M-50,320 C250,220 450,420 750,300 C1050,180 1250,360 1550,240" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M-50,60 C250,140 450,-20 750,60 C1050,140 1250,-20 1550,60" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
    </svg>
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#67CB53]/25 blur-3xl" aria-hidden="true" />
    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-[640px]">
        <p className="eyebrow !text-[#A7F3C4]">{eyebrow}</p>
        <h2 className="h-calm text-white text-[34px] lg:text-[48px] mt-3">{heading}</h2>
        <p className="text-white/80 text-[17px] lg:text-[19px] leading-relaxed mt-4">{text}</p>
      </div>
      <CircleArrowButton onClick={goToBooking} className="self-start lg:self-auto flex-shrink-0">
        {button}
      </CircleArrowButton>
    </div>
  </motion.div>
);

const WantToLearn = () => (
  <section className="pt-14 pb-20 md:pt-20 md:pb-28 bg-white relative z-[35] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.1)] -mt-20">
    <div className="max-w-[75rem] mx-auto px-5 lg:px-8">
      <CtaPanel
        eyebrow="Free guidance"
        heading={<>Want to learn <span className="text-white/55">it yourself?</span></>}
        text="Google recently reweighted its local business search algorithm, just a couple of months ago. We're showing businesses, completely free, how they can use AI to fix what's hiding them from Google, no agency required."
        button="Book A Free Call To Learn"
      />
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
          style={{ width: '100%', border: 'none', overflow: 'auto', minHeight: '800px' }}
          scrolling="yes"
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
    <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-page-bg relative min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="inline-flex items-center px-5 py-2.5 mb-6 rounded-full bg-[#2DAC65]/10 border border-[#2DAC65]/30 text-[#0D6B45] text-sm font-bold uppercase tracking-wider">
          Fully Booked
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-heading tracking-tight leading-[1.05] mb-6">
          Bookings for this month are full.
        </h1>
        <p className="text-body text-lg md:text-xl leading-relaxed">
          We're at capacity for new strategy calls right now. Check back soon, or reach out and we'll let you know the moment a slot opens up.
        </p>
      </div>
    </section>
  </main>
);

const PricingPage = () => (
  <main>
    <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-white relative min-h-screen">
      <div className="max-w-[75rem] mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="eyebrow">Pricing</p>
          <h1 className="h-calm text-heading text-[38px] md:text-[56px] lg:text-[64px] mt-3">
            <span className="block">No Setup Fees </span>
            <span className="block">No Contracts </span>
            <span className="block text-[#B5B5B5]">Cancel Anytime</span>
          </h1>
          <p className="text-muted text-[17px] lg:text-[19px] mt-5">30 day money back guarantee</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mt-12 md:mt-16">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
              className="h-full"
            >
              <div className="group relative flex flex-col h-full bg-[#F3F4F6] rounded-[32px] p-7 md:p-9 ring-1 ring-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-white hover:ring-black/[0.06] hover:shadow-[0_2px_4px_rgba(0,0,0,0.03),0_12px_28px_-8px_rgba(0,0,0,0.10),0_32px_64px_-24px_rgba(0,0,0,0.14)]">
                {plan.mostPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tint px-3.5 py-1.5 text-[13.5px] font-semibold text-[#0D6B45] ring-4 ring-white">Most Popular</span>
                )}
                <h3 className="h-calm text-heading text-[26px] md:text-[28px]">{plan.name}</h3>

                {plan.wasPrice ? (
                  <div className="flex items-baseline gap-3 mt-5">
                    <span className="text-2xl font-semibold text-[#B5B5B5] line-through">£{plan.wasPrice.toLocaleString()}</span>
                    <span className="h-calm text-[52px] text-heading">£0</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2 mt-5">
                    <span className="h-calm text-[52px] text-heading">£{plan.price}</span>
                    <span className="text-muted text-base font-medium">per month</span>
                  </div>
                )}

                <div className="flex-1 mt-6 pt-6 border-t border-black/[0.07]">
                  {plan.intro && <p className="text-muted text-[15px] leading-relaxed mb-5">{plan.intro}</p>}
                  <ul className="space-y-3">
                    {plan.inheritsLabel && (
                      <li className="flex items-start gap-3">
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-white flex-shrink-0 mt-0.5 transition-colors duration-500 group-hover:bg-[#F3F4F6]">
                          <Check size={12} strokeWidth={3} className="text-brand" />
                        </span>
                        <span className="text-[15px] font-semibold text-heading">Everything in {plan.inheritsLabel}</span>
                      </li>
                    )}
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-white flex-shrink-0 mt-0.5 transition-colors duration-500 group-hover:bg-[#F3F4F6]">
                          <Check size={12} strokeWidth={3} className="text-brand" />
                        </span>
                        <span className="text-[15px] text-heading/80 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Long pill with the product-card arrow: the circle fills black from the centre on hover */}
                <button
                  type="button"
                  onClick={() => plan.checkoutUrl ? window.location.assign(plan.checkoutUrl) : goToBooking()}
                  className="mt-8 w-full flex items-center justify-between gap-4 pl-6 pr-1.5 py-1.5 rounded-full bg-white ring-1 ring-black/[0.06] text-heading transition-shadow duration-500 group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] active:scale-[0.99]"
                >
                  <span className="text-base font-semibold">{plan.ctaLabel ?? `£${plan.price} per month`}</span>
                  <span className="relative grid place-items-center w-11 h-11 rounded-full bg-[#F3F4F6] overflow-hidden flex-shrink-0" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-[#111111] scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
                    <ArrowUpRight size={18} className="relative text-heading transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white group-hover:rotate-45" />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const;

const GreenTick = ({ onWhite = false }: { onWhite?: boolean }) => (
  <span className={`grid place-items-center w-6 h-6 rounded-full flex-shrink-0 ${onWhite ? 'bg-tint' : 'bg-white'}`}>
    <Check size={13} strokeWidth={3} className="text-brand" />
  </span>
);

const ProductPage = ({ product }: { product: Product }) => {
  const Icon = product.icon;
  const related = product.related.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <main>
      {/* Hero */}
      <section className="bg-white pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-muted">
                <li><SiteLink to="/" className="hover:text-heading transition-colors">Home</SiteLink></li>
                <li aria-hidden="true">/</li>
                <li><SiteLink to="/#built-for-you" className="hover:text-heading transition-colors">Products</SiteLink></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-heading font-medium">{product.name}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-6">{product.eyebrow}</p>
            <h1 className="h-calm text-heading text-[38px] md:text-[52px] lg:text-[58px] mt-3">{product.h1}</h1>
            <p className="text-muted text-[17px] lg:text-[19px] leading-relaxed mt-5 max-w-[56ch]">{product.lead}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-8">
              <CircleArrowButton onClick={goToBooking} className="self-start">Free 15-Min AI Audit</CircleArrowButton>
              <SiteLink to="/pricing" className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-heading hover:text-brand transition-colors">
                See pricing <ArrowRight size={16} />
              </SiteLink>
            </div>
          </motion.div>

          {/* Summary panel in the product card style */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="rounded-[32px] bg-[#F3F4F6] p-7 md:p-9"
          >
            <span className="grid place-items-center w-12 h-12 rounded-[14px] bg-white text-brand">
              <Icon size={24} />
            </span>
            <p className="h-calm text-heading text-[24px] mt-5">{product.name}</p>
            <p className="text-muted text-[15px] leading-relaxed mt-2">{product.short}</p>
            <ul className="mt-6 grid gap-3">
              {product.included.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-heading/80">
                  <GreenTick />
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-black/[0.07]">
              {product.pricing ? (
                <div className="flex items-end justify-between gap-4">
                  <span className="text-muted text-[14px] leading-snug">Included in the<br />{product.pricing.tier}</span>
                  <span className="whitespace-nowrap">
                    <span className="h-calm text-heading text-[36px]">£{product.pricing.price}</span>
                    <span className="text-muted text-[14px] ml-1">per month</span>
                  </span>
                </div>
              ) : (
                <p className="text-muted text-[14px] leading-relaxed">Pricing depends on your area and goals. We'll go through it in your free 15-minute AI audit.</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-20">
          <motion.div {...reveal}>
            <p className="eyebrow">Introduction</p>
            <h2 className="h-calm text-heading text-[34px] lg:text-[44px] mt-3">How {product.name} works for you.</h2>
          </motion.div>
          <motion.div {...reveal} className="grid gap-5 text-muted text-[17px] lg:text-[18px] leading-relaxed">
            {product.intro.map((p) => <p key={p}>{p}</p>)}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F6F7F9] py-16 md:py-24">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8">
          <motion.div {...reveal} className="max-w-[640px]">
            <p className="eyebrow">How it works</p>
            <h2 className="h-calm two-tone text-heading text-[34px] lg:text-[44px] mt-3">Four steps. <span className="tone">Done for you.</span></h2>
          </motion.div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-10 lg:mt-14">
            {product.steps.map((step, i) => (
              <motion.li key={step.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="bg-white rounded-[24px] p-6 lg:p-7">
                <span className="h-calm text-brand text-[34px]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h-calm text-heading text-[20px] mt-4">{step.title}</h3>
                <p className="text-muted text-[15.5px] leading-relaxed mt-2">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included + who it's for */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...reveal}>
            <p className="eyebrow">What's included</p>
            <h2 className="h-calm text-heading text-[34px] lg:text-[44px] mt-3">Everything set up for you.</h2>
            <ul className="grid gap-3 mt-8">
              {product.included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[18px] bg-[#F3F4F6] p-4 text-[16px] font-medium text-heading">
                  <GreenTick />
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...reveal}>
            <p className="eyebrow">Who it's for</p>
            <h2 className="h-calm text-heading text-[34px] lg:text-[44px] mt-3">Built for businesses like yours.</h2>
            <ul className="mt-8 border-y border-black/[0.08] divide-y divide-black/[0.08]">
              {product.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3 py-4 text-[16px] text-heading/85">
                  <ArrowRight size={18} className="mt-0.5 text-brand flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQs: every answer is in the page HTML, so search engines and AI tools can read them */}
      <section className="bg-[#F6F7F9] py-16 md:py-24">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16">
          <motion.div {...reveal}>
            <p className="eyebrow">FAQs</p>
            <h2 className="h-calm text-heading text-[34px] lg:text-[44px] mt-3">{product.name} questions.</h2>
          </motion.div>
          <motion.div {...reveal} className="grid gap-3">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-[20px] bg-white px-6 open:pb-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold text-heading [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown size={18} className="flex-shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-muted text-[16px] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-[75rem] mx-auto px-5 lg:px-8">
            <motion.div {...reveal} className="max-w-[640px]">
              <p className="eyebrow">Related products</p>
              <h2 className="h-calm text-heading text-[34px] lg:text-[44px] mt-3">Works well alongside.</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 lg:mt-14">
              {related.map((r) => (
                <motion.div key={r.slug} {...reveal} className="h-full">
                  <ProductCard
                    to={productPath(r.slug)}
                    cta={r.benefit}
                    title={r.name}
                    description={r.short}
                    bullets={r.included.slice(0, 3)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="bg-white pb-28 md:pb-36">
        <div className="max-w-[75rem] mx-auto px-5 lg:px-8">
          <CtaPanel
            eyebrow="Free 15-minute AI audit"
            heading={<>Ready to get started? <span className="text-white/55">Book your free audit.</span></>}
            text={`In 15 minutes we'll look at how your business shows up on Google today and where ${product.name} could bring in more customers. No obligation.`}
            button="Free 15-Min AI Audit"
          />
        </div>
      </section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark-bg pt-20 pb-10 md:pt-48 md:pb-12 border-t border-white/5 relative z-[70] rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] -mt-20">
      <div className="max-w-[85rem] mx-auto px-6">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <SiteLink to="/" className="text-3xl font-bold tracking-tighter text-white mb-6 block">LeapLayer</SiteLink>
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
              {products.map((p) => (
                <li key={p.slug}><SiteLink to={productPath(p.slug)} className="hover:text-white transition-colors">{p.name}</SiteLink></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><SiteLink to="/about" className="hover:text-white transition-colors">About Us</SiteLink></li>
              <li><SiteLink to="/pricing" className="hover:text-white transition-colors">Pricing</SiteLink></li>
              <li><SiteLink to="/book" className="hover:text-white transition-colors">Book a Free AI Audit</SiteLink></li>
              <li><a href="https://www.linkedin.com/in/aryan-parekh/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
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
    <div className="max-w-[85rem] mx-auto px-6 md:px-[108px] lg:px-[140px]">
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
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#1E1E1E] mb-8 border border-white/5 flex items-center justify-center group">
              <motion.img
                src={aryan_avatar}
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
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-5 md:mb-8 leading-[1.05] tracking-tight text-left">
            Meet the <br />
            <span className="inline-block font-serif italic font-normal bg-gradient-to-br from-[#2DAC65] via-[#34B36C] to-[#67CB53] bg-clip-text text-transparent p-[0.15em] -m-[0.15em]">Founder</span>
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl md:text-2xl font-bold text-white">Aryan</span>
            <a
              href="https://www.linkedin.com/in/aryan-parekh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aryan's LinkedIn profile"
              className="w-9 h-9 rounded-full bg-white/10 text-white/60 flex items-center justify-center flex-shrink-0 transition-colors duration-300 hover:bg-white/20 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <p className="text-[#9CA3AF] text-base md:text-xl font-medium max-w-xl leading-relaxed mb-8 md:mb-10">
            Aryan has a background at <span className="relative inline-block text-white whitespace-nowrap">
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
            </span> as an <span className="text-white">Engineer</span>, working across <span className="text-white">AI teams</span>, <span className="text-white">Investment teams</span>, and <span className="text-white">Marketing teams</span>. Graduated from a top Russell Group university in Mechanical Engineering with Computer Science, and regularly works with entrepreneurs and businesses on their technology adoption.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
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
              onClick={onBookCall}
              className="group inline-flex items-center gap-4 md:gap-6 pl-7 md:pl-9 pr-1.5 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[0.98]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-base md:text-[1.2rem] font-semibold">Let's Talk</span>
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

const AboutPage = () => {
  return (
    <main>
      {/* Section 1: Founder Hero */}
      <FounderSection onBookCall={goToBooking} />
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

const normalisePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

// Keeps the head tags in step with the page during in-app navigation. The prerendered HTML already
// has the right tags for the first page load; this covers clicking between pages afterwards.
const applyPageMeta = (meta: PageMeta) => {
  document.title = meta.title;
  const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.content = value;
  };
  setMeta('name', 'description', meta.description);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', absolute(meta.path));
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = absolute(meta.path);
};

export default function App({ initialPath }: { initialPath?: string }) {
  const [path, setPath] = useState(() => normalisePath(initialPath ?? window.location.pathname));

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const url = new URL((e as CustomEvent<string>).detail, window.location.origin);
      if (url.pathname + url.hash !== window.location.pathname + window.location.hash) {
        window.history.pushState({}, '', url.pathname + url.hash);
      }
      setPath(normalisePath(url.pathname));
      if (url.hash) {
        setTimeout(() => document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        window.scrollTo(0, 0);
      }
    };
    const handlePopState = () => setPath(normalisePath(window.location.pathname));
    window.addEventListener(NAVIGATE_EVENT, handleNavigate);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener(NAVIGATE_EVENT, handleNavigate);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    applyPageMeta(getPageMeta(path));
  }, [path]);

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

  const product = path.startsWith('/products/') ? getProduct(path.slice('/products/'.length)) : undefined;

  let page: React.ReactNode;
  if (path === '/about') page = <AboutPage />;
  else if (path === '/pricing') page = <PricingPage />;
  else if (path === '/book') page = <BookingPage />;
  else if (product) page = <ProductPage product={product} />;
  else {
    page = (
      <main>
        <Hero />
        <HomeFounderIntro />
        <WhyNow />
        <PainPoints />
        <WantToLearn />
      </main>
    );
  }

  const isHome = !product && !['/about', '/pricing', '/book'].includes(path);
  const footerBackdrop = isHome ? 'bg-black' : (path === '/pricing' || product) ? 'bg-white' : 'bg-page-bg';

  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar currentPath={isHome ? '/' : path} />
      {page}
      <div className={footerBackdrop}>
        <Footer />
      </div>
    </div>
  );
}
