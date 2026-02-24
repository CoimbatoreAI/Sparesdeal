import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Cpu, Settings, CircleDot, Box, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { API_BASE } from "@/config";

const iconMap: { [key: string]: any } = {
    "Coolant Pump": Droplets,
    "Electrical": Zap,
    "Pipeline": Settings,
    "O Rings": CircleDot,
    "Wire Ropes": Box,
    "default": ShieldCheck
};

const OurDealingProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE}/products`);
                const data = await response.json();
                setProducts(data.slice(0, 6));
            } catch (error) {
                toast.error("Failed to fetch dealing products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getIcon = (name: string) => {
        for (const key in iconMap) {
            if (name.toLowerCase().includes(key.toLowerCase())) return iconMap[key];
        }
        return iconMap.default;
    };

    if (loading) return null;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tighter italic"
                    >
                        Our <span className="text-secondary">Dealing Products</span>
                    </motion.h2>
                    <div className="h-1.5 w-24 bg-secondary mx-auto mb-6" />
                    <p className="text-muted-foreground text-lg uppercase tracking-widest text-xs font-bold leading-relaxed">
                        High-quality industrial essentials and precision components for manufacturing excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => {
                        const Icon = getIcon(product.name);
                        return (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="group block p-8 rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm hover:border-secondary/30 hover:bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5 h-full"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-500">
                                            <Icon className="w-8 h-8 text-secondary group-hover:text-secondary-foreground transition-colors duration-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-secondary transition-colors uppercase tracking-tight italic">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                                {product.description || "Premium industrial component engineered for high-performance and reliability in demanding environments."}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurDealingProducts;
