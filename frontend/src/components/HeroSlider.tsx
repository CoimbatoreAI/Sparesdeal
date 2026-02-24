import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hs1 from "@/assets/hs.jpeg";
import hs2 from "@/assets/hs (2).png";
import hs3 from "@/assets/hs (3).png";

const slides = [
  {
    image: hs1,
    heading: "INDUSTRIAL ESSENTIALS",
    sub: "Reliable products for your operational needs. High-tensile wire ropes, O-rings, and precision spares.",
    cta1: "Shop Products",
    cta2: "View Catalog",
  },
  {
    image: hs2,
    heading: "Supplying Manufacturing Excellence",
    sub: "Complete range of stainless steel wire ropes for marine, industrial and architectural applications.",
    cta1: "Explore Shop",
    cta2: null,
  },
  {
    image: hs3,
    heading: "Precision Spares for Every Unit",
    sub: "Built for endurance and engineering excellence. Trusted by 2,500+ industrial traders nationwide.",
    cta1: "Order Now",
    cta2: null,
  },
];

import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-start pt-[25vh] md:pt-[30vh]">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase">
                {slides[current].heading}
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-8">
                {slides[current].sub}
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link to="/shop" className="px-10 py-4 border-2 border-white text-white font-heading font-black uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 shadow-2xl">
                  {slides[current].cta1}
                </Link>
                {slides[current].cta2 && (
                  <Link to="/shop" className="px-10 py-4 text-white font-heading font-black uppercase tracking-widest rounded-sm hover:text-secondary transition-all duration-500 flex items-center gap-2 group">
                    {slides[current].cta2} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-primary-foreground hover:bg-secondary/50 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-primary-foreground hover:bg-secondary/50 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
