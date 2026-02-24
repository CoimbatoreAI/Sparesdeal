import { motion } from "framer-motion";
import { Truck, CreditCard, ShieldCheck, Package, FileText, HelpCircle } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "SAME DAY SHIPPING",
    desc: "Fast And Convenient Door To Door Delivery"
  },
  {
    icon: CreditCard,
    title: "PAYMENT SECURITY",
    desc: "Backed By Razorpay",
    extraIcon: ShieldCheck
  },
  {
    icon: Package,
    title: "10000+ SKU",
    desc: "Products Available In Stock"
  },
  {
    icon: FileText,
    title: "GST INVOICE",
    desc: "GST Compliant Invoice"
  },
  {
    icon: HelpCircle,
    title: "HAVE QUESTIONS?",
    desc: "We're Here And Happy To Help!"
  },
];

const WhyChooseUs = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tighter text-black"
        >
          Why Choose Sparesdeal?
        </motion.h2>
        <div className="h-1.5 w-24 bg-secondary mx-auto mb-6" />
      </div>
      <div className="flex flex-wrap justify-center items-stretch divide-x-0 lg:divide-x divide-gray-200">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex-1 min-w-[200px] px-6 py-8 text-center flex flex-col items-center group"
          >
            <div className="w-16 h-16 mb-6 rounded-full bg-secondary flex items-center justify-center relative shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform duration-300">
              <f.icon className="w-8 h-8 text-secondary-foreground" />
              {f.extraIcon && (
                <f.extraIcon className="w-4 h-4 text-secondary-foreground absolute top-2 right-2" />
              )}
            </div>
            <h3 className="font-heading font-black text-sm mb-2 text-black leading-tight uppercase tracking-wide">
              {f.title}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium max-w-[150px]">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
