import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(23, 59, 59, 999);

const DealOfTheWeek = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-primary rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                🔥 Deal of the Week
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary-foreground mb-3">
                Coolant Pump for Lathe / CNC
              </h2>
              <p className="text-primary-foreground/60 mb-2">High-efficiency 1 Phase coolant pump for industrial machinery maintenance.</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-heading font-black text-secondary">₹3,200</span>
                <span className="text-lg text-primary-foreground/40 line-through">₹4,500</span>
                <span className="text-sm bg-secondary/20 text-secondary px-2 py-0.5 rounded font-semibold">28% OFF</span>
              </div>
              <button className="px-8 py-3 bg-secondary text-secondary-foreground font-heading font-bold rounded-lg hover:glow-yellow transition-all duration-300 hover:scale-105 animate-pulse-glow">
                Grab This Deal →
              </button>
            </div>

            <div className="flex gap-3">
              {units.map((u) => (
                <div key={u.label} className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center mb-2">
                    <span className="text-2xl md:text-3xl font-heading font-black text-primary-foreground">
                      {String(u.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-primary-foreground/40">{u.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DealOfTheWeek;
