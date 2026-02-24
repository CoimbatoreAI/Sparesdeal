import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircleDot, Wind, Settings, Droplets, Hammer, Box, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { API_BASE } from '@/config';

const iconMap: { [key: string]: any } = {
  "Coolant Pump": Droplets,
  "Electrical": Zap,
  "Pipeline": Wind,
  "O Rings": CircleDot,
  "Wire Ropes": Box,
  "Bearings": Settings,
  "Fasteners": Hammer,
  "default": ShieldCheck
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();
        setCategories(data.slice(0, 8)); // Show up to 8
      } catch (error) {
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getIcon = (name: string) => {
    for (const key in iconMap) {
      if (name.toLowerCase().includes(key.toLowerCase())) return iconMap[key];
    }
    return iconMap.default;
  };

  if (loading) return null;

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-3 uppercase tracking-tighter italic">
            Shop by <span className="text-secondary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">
            Explore our comprehensive inventory of high-quality industrial spare parts.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 text-center">
          {categories.map((cat, i) => {
            const Icon = getIcon(cat.name);
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/shop?category=${cat._id}`}
                  className="group block relative bg-card rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-500">
                    <Icon className="w-8 h-8 text-secondary group-hover:text-secondary-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-secondary transition-colors uppercase tracking-tight italic">{cat.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Browse Items</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
