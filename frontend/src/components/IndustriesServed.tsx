import { Factory, Wrench, Settings, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
    {
        icon: Factory,
        title: "Manufacturing Units",
        description: "Supplying essential components used in daily production and machinery maintenance.",
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        icon: Wrench,
        title: "Workshops & Fabrication Shops",
        description: "Reliable materials and parts for assembly, repair, and custom fabrication work.",
        color: "bg-orange-500/10 text-orange-500",
    },
    {
        icon: Settings,
        title: "Machinery & Equipment Dealers",
        description: "Consistent supply of industrial essentials needed for machine installation and support.",
        color: "bg-emerald-500/10 text-emerald-500",
    },
    {
        icon: Briefcase,
        title: "Industrial Traders & Retailers",
        description: "Bulk-ready products for reselling and distribution across various industrial segments.",
        color: "bg-purple-500/10 text-purple-500",
    },
];

const IndustriesServed = () => {
    return (
        <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-heading font-black mb-4"
                    >
                        Industries <span className="text-secondary">We Serve</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Partnering with diverse sectors to provide specialized components and unwavering support.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {industries.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl border border-border bg-background hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-secondary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustriesServed;
