import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfoPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-3xl p-10 md:p-16 border border-border text-center shadow-xl"
                    >
                        <h1 className="text-3xl md:text-5xl font-heading font-black mb-8">Contact Information</h1>

                        <div className="space-y-10 text-left">
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Phone Numbers</p>
                                    <p className="text-xl font-heading font-black">+91 7200317756</p>
                                    <p className="text-xl font-heading font-black text-secondary">+91 97904 57793</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Email Address</p>
                                    <p className="text-xl font-heading font-black">sparesdeal7@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Physical Address</p>
                                    <p className="text-lg font-medium leading-relaxed">
                                        No.9/848-3, Kovai Gardens, Pachapalayam,<br />
                                        Siruvani Main Road, Coimbatore – 641010,<br />
                                        Tamil Nadu, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-border">
                            <p className="text-muted-foreground text-sm">
                                Feel free to reach out for bulk orders, quotations, or technical assistance.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactInfoPage;
