import { motion } from "framer-motion";

const WhoWeAre = () => {
    return (
        <section className="py-24 bg-secondary overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-serif font-black mb-12 text-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Who We Are
                    </h2>

                    <div className="space-y-8 text-black/90 text-lg md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto">
                        <p>
                            Based in <strong>Coimbatore</strong>, we serve as a premier industrial partner with our office located in the heart of this engineering hub. We proudly deal across <strong>all of India and international markets</strong>, ensuring that quality spares reach every corner where they are needed.
                        </p>

                        <p>
                            To ensure maximum efficiency and fast delivery, <strong>SparesDeal operates a remote godown network using a Dropshipping model</strong>. This allows us to supply <span className="font-black">steel wire ropes, industrial O-rings, and precision pumps</span> directly from specialized units to your facility, reducing lead times and operational costs.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhoWeAre;
