import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import { ChevronRight, Cog, Box, CircleDot, Layers, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { API_BASE } from "@/config";

const iconMap: { [key: string]: any } = {
    "Coolant Pump": Cog,
    "Electrical": Zap,
    "Pipeline": Layers,
    "O Rings": CircleDot,
    "Wire Ropes": Box,
    "default": ShieldCheck
};

const Categories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE}/categories`);
                const data = await response.json();
                setCategories(data);
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
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-48 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-black mb-6 uppercase tracking-tighter italic"
                        >
                            Our <span className="text-secondary">Collections</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg leading-relaxed uppercase tracking-widest text-xs font-bold"
                        >
                            Browse through our specialized industrial collections curated for manufacturing excellence.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {categories.map((item, i) => {
                            const Icon = getIcon(item.name);
                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-xl hover:border-secondary hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
                                >
                                    <div className="p-8">
                                        <div className={`w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className={`w-8 h-8 text-secondary`} />
                                        </div>
                                        <h3 className="text-2xl font-heading font-black mb-3 group-hover:text-secondary transition-colors uppercase tracking-tight italic">
                                            {item.name}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-6 text-sm line-clamp-3">
                                            {item.description || "High-quality industrial spares and components sourced from leading manufacturers."}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/70">
                                                Explore Collection
                                            </span>
                                            <Link
                                                to={`/shop?category=${item._id}`}
                                                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Decorative gradient */}
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <Newsletter />
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Categories;
