import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Info, Scale, AlertCircle, Copyright, Mail, Phone } from "lucide-react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] text-foreground">
            <Header />
            <main className="pt-48 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-12 md:p-16 rounded-[4rem] border border-border shadow-2xl shadow-black/5"
                    >
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter">
                                Terms and <span className="text-secondary italic">Conditions</span>
                            </h1>
                            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs">
                                Coolant Pump - SparesDeal
                            </p>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-2xl mx-auto">
                                By accessing or placing an order on this website, you agree to comply with the following terms and conditions.
                                Using this website indicates acceptance of these terms.
                            </p>

                            <div className="space-y-12">
                                <section className="flex gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Info className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-black uppercase tracking-tight m-0">General Usage</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Product images may vary slightly from actual items due to lighting or manufacturing variations. We strive for accuracy but slight discrepancies in visuals are possible.
                                        </p>
                                    </div>
                                </section>

                                <section className="flex gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Scale className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-black uppercase tracking-tight m-0">Pricing & Availability</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Prices, inventory, and offers are subject to change without prior notice. Orders are processed only after confirmation of availability by our local Coimbatore fulfillment team.
                                        </p>
                                    </div>
                                </section>

                                <section className="flex gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <AlertCircle className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-black uppercase tracking-tight m-0">Order Rights</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            We reserve the right to cancel any order due to stock issues, technical errors, or inaccurate information. In such cases, full refunds for prepaid orders will be initiated immediately.
                                        </p>
                                    </div>
                                </section>

                                <section className="flex gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Copyright className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-black uppercase tracking-tight m-0">Content Protection</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Misuse of content, product images, or website materials is prohibited without written permission from SparesDeal. Authorized use is restricted to personal, non-commercial viewing.
                                        </p>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-20 p-10 bg-muted/30 rounded-[3rem] border border-border">
                                <h3 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Direct Support</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Call Us</p>
                                            <p className="font-bold">+91 97904 57793</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Us</p>
                                            <p className="font-bold">sparesdeal7@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                Last Updated: February 2026 • © Sparesdeal
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
