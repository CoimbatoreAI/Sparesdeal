import { motion } from "framer-motion";
import co1 from "@/assets/co (1).png";
import co2 from "@/assets/co (2).png";
import co3 from "@/assets/co (3).png";
import co4 from "@/assets/co (4).png";
import co5 from "@/assets/co (5).png";
import co6 from "@/assets/co (6).png";
import co7 from "@/assets/co (7).png";
import co8 from "@/assets/co (8).png";
import co9 from "@/assets/co (9).png";
import co10 from "@/assets/co (10).png";

const row1 = [co1, co2, co3, co4, co5];
const row2 = [co6, co7, co8, co9, co10];

const OurCustomers = () => {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tighter"
                    >
                        Our <span className="text-secondary">Customers</span>
                    </motion.h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Trusted by leading industrial giants and manufacturing units across the nation.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Row 1 - Left to Right */}
                <div className="relative flex overflow-x-hidden">
                    <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
                        {[...row1, ...row2].map((img, i) => (
                            <div key={`r1-${i}`} className="mx-8 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-all duration-500 hover:scale-110">
                                <img src={img} alt="Customer" className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                        {[...row1, ...row2].map((img, i) => (
                            <div key={`r1-dup-${i}`} className="mx-8 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-all duration-500 hover:scale-110">
                                <img src={img} alt="Customer" className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="relative flex overflow-x-hidden">
                    <div className="py-4 animate-marquee-reverse whitespace-nowrap flex items-center">
                        {[...row2, ...row1].map((img, i) => (
                            <div key={`r2-${i}`} className="mx-8 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-all duration-500 hover:scale-110">
                                <img src={img} alt="Customer" className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                        {[...row2, ...row1].map((img, i) => (
                            <div key={`r2-dup-${i}`} className="mx-8 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-all duration-500 hover:scale-110">
                                <img src={img} alt="Customer" className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurCustomers;
