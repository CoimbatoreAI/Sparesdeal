import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Vikram Shah", location: "Coimbatore", rating: 5, text: "Running a textile manufacturing unit, we often need specialized bearings on short notice. Sparesdeal has been our go-to partner for consistent quality and timely delivery.", avatar: "VS" },
  { name: "Ananya Iyer", location: "Pune", rating: 5, text: "As a machinery dealer, finding reliable spare parts for installation is crucial. Their technical support team is incredibly knowledgeable and always assists with the right selection.", avatar: "AI" },
  { name: "Rahul Deshmukh", location: "Nagpur", rating: 4, text: "We operate a large-scale fabrication shop and order bulk electrical controls. The GST-compliant billing and corporate pricing are exactly what our business needs.", avatar: "RD" },
  { name: "Suresh Menon", location: "Chennai", rating: 5, text: "Excellent inventory of pneumatic and hydraulic parts. The bulk shipping options helped us save significantly on our last maintenance cycle.", avatar: "SM" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            What Our <span className="text-secondary">Customers</span> Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-card rounded-2xl p-8 md:p-10 card-shadow text-center relative"
            >
              <Quote className="w-10 h-10 text-secondary/20 mx-auto mb-4" />
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 italic">
                "{reviews[current].text}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < reviews[current].rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-heading font-bold mb-2">
                {reviews[current].avatar}
              </div>
              <p className="font-heading font-semibold text-foreground">{reviews[current].name}</p>
              <p className="text-xs text-muted-foreground">{reviews[current].location}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrent((c) => (c + 1) % reviews.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
