import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Do you handle bulk or industrial quantity orders?",
        answer: "Yes. We regularly handle bulk and recurring requirements for industrial and commercial customers. Our supply chain is optimized for high-volume demands."
    },
    {
        question: "How can I contact you for bulk orders or enquiries?",
        answer: "You can contact us directly for bulk orders and requirements at +91 97904 57793 or email sparesdeal7@gmail.com. We provide customized quotes for large quantities."
    },
    {
        question: "Do you mainly work with industrial clients?",
        answer: "Yes. Our primary focus is supplying components to industries, manufacturing units, service providers, and workshops that value reliability and consistent quality."
    },
    {
        question: "Can you assist in selecting the right solution for our application?",
        answer: "Yes. We help customers choose suitable components based on their operational and application needs. Our team has deep technical understanding of part specifications."
    },
    {
        question: "Do you supply outside Coimbatore?",
        answer: "Yes. Orders are supplied to various locations including Tamil Nadu, Mumbai, and across India, depending on requirement and logistics feasibility."
    }
];

const FAQItem = ({ faq, isOpen, toggle }: { faq: typeof faqs[0], isOpen: boolean, toggle: () => void }) => {
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={toggle}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <span className={`text-xl font-heading font-medium transition-colors ${isOpen ? 'text-secondary' : 'text-white/90 group-hover:text-secondary'}`}>
                    {faq.question}
                </span>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : 'text-white/40'}`}>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-white/60 text-lg leading-relaxed max-w-3xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Frequently asked questions
                    </h2>
                </motion.div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
