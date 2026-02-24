import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card rounded-[3rem] p-8 md:p-16 border border-border shadow-2xl shadow-secondary/5"
                    >
                        <div className="text-center mb-16">
                            <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                                <Truck className="w-10 h-10 text-secondary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-heading font-black mb-4">Shipping Policy</h1>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                                Fast, reliable, and secure shipping for all your industrial components.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                                <Clock className="w-6 h-6 text-secondary shrink-0" />
                                <div>
                                    <h3 className="font-heading font-bold mb-2">Prompt Dispatch</h3>
                                    <p className="text-sm text-muted-foreground">We ship orders promptly. Delivery timelines vary based on your location and courier availability.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                                <ShieldCheck className="w-6 h-6 text-secondary shrink-0" />
                                <div>
                                    <h3 className="font-heading font-bold mb-2">Secure Packing</h3>
                                    <p className="text-sm text-muted-foreground">All products are checked and packed securely before dispatch to ensure zero damage during transit.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                                <MapPin className="w-6 h-6 text-secondary shrink-0" />
                                <div>
                                    <h3 className="font-heading font-bold mb-2">Tracking Details</h3>
                                    <p className="text-sm text-muted-foreground">Once your order is shipped, we will provide you with tracking details via email or SMS.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                                <div className="w-6 h-6 text-secondary shrink-0 font-black text-xl leading-none">!</div>
                                <div>
                                    <h3 className="font-heading font-bold mb-2">Third-Party Logistics</h3>
                                    <p className="text-sm text-muted-foreground">Delays caused by logistics partners are beyond our control, but we help coordinate for fast resolution.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-destructive/5 border border-destructive/20 p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">📦</span>
                                <h2 className="text-xl font-heading font-black">Damaged Shipments</h2>
                            </div>
                            <p className="text-foreground/80 leading-relaxed mb-4">
                                If your order arrives damaged, report it within <strong>48 hours</strong> of delivery.
                            </p>
                            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                Please provide photos or video proof of the damage for assisted claims.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShippingPolicy;
