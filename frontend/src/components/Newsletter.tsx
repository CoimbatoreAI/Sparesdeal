import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Newsletter = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <Mail className="w-12 h-12 mx-auto mb-6 text-black" />
        <h2 className="text-3xl md:text-5xl font-serif font-black text-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Get Exclusive Deals & Updates
        </h2>
        <p className="text-black/80 mb-10 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Subscribe for special offers, new arrivals, and industrial maintenance tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-xl bg-white border-2 border-black/10 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
          />
          <button className="px-8 py-4 bg-black text-white font-heading font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Newsletter;
