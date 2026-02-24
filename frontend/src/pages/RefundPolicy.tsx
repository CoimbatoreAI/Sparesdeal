import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck, AlertTriangle, FileCheck, Phone, Mail, Clock } from "lucide-react";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] text-foreground">
            <Header />
            <main className="pt-48 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-12 md:p-16 rounded-[4rem] border border-border shadow-2xl shadow-black/5"
                    >
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter">
                                Refund and <span className="text-secondary italic">Cancellation</span>
                            </h1>
                            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs">
                                Coolant Pump - SparesDeal
                            </p>
                        </div>

                        <div className="space-y-20">
                            {/* Refunds Section */}
                            <section className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                        <RotateCcw className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter m-0">Refunds</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            Refunds are issued only for defective or damaged items verified by our team. Approval requires proof of damage (photo/video) and return of the unused product in original condition.
                                        </p>
                                    </div>
                                    <div className="bg-muted/30 p-8 rounded-3xl border border-border">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Verification Steps</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm font-bold">
                                                <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] text-secondary">1</span>
                                                </div>
                                                Capture Photo/Video Evidence
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold">
                                                <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] text-secondary">2</span>
                                                </div>
                                                Contact Support Immediately
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold opacity-50">
                                                <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] text-secondary">3</span>
                                                </div>
                                                Team Verification & Approval
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Cancellations Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter m-0">Cancellations</h2>
                                </div>
                                <div className="p-8 bg-black text-white rounded-[2.5rem] shadow-xl">
                                    <p className="text-lg font-medium leading-relaxed opacity-90">
                                        Orders can be cancelled only before they are packed or dispatched. Once shipped, cancellation is not possible.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-secondary font-black uppercase text-[10px] tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Final Step Policy
                                    </div>
                                </div>
                            </section>

                            {/* Non-Refundable Scenarios */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter m-0">Non-Refundable Situations</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        "Customer damage or improper handling",
                                        "Change of mind after delivery",
                                        "Products used or installed",
                                        "Unauthorized returns"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-4 p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                                            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                            <p className="text-sm font-bold">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Contact Box */}
                            <section className="pt-10 border-t border-border mt-20">
                                <div className="bg-muted p-10 rounded-[3rem] text-center space-y-6">
                                    <h3 className="text-2xl font-black m-0 uppercase italic tracking-tighter">Need Support?</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto">For refund or cancellation support, contact our Coimbatore hub team directly via phone or email.</p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-8 pt-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <Phone className="w-5 h-5 text-secondary" />
                                            <span className="font-bold">+91 97904 57793</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3">
                                            <Mail className="w-5 h-5 text-secondary" />
                                            <span className="font-bold">sparesdeal7@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
