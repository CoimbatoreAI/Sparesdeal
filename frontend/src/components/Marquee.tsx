import { motion } from "framer-motion";

const Marquee = () => {
    const text = "For Bulk Orders: +91 97904 57793 | sparesdeal7@gmail.com";

    return (
        <div className="bg-white py-4 border-y border-black/5 overflow-hidden flex whitespace-nowrap">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
                className="flex gap-12 items-center"
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-black font-heading font-black text-sm tracking-widest flex items-center gap-12">
                        <span className="uppercase">For Bulk Orders: +91 97904 57793 | </span>
                        <span className="normal-case italic">sparesdeal7@gmail.com</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
