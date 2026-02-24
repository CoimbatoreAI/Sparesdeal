import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Truck, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { toast } from "sonner";

import { API_BASE } from "@/config";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("message", formData.message);
        selectedFiles.forEach(file => {
            data.append("attachments", file);
        });

        try {
            const res = await fetch(`${API_BASE}/enquiries`, {
                method: "POST",
                body: data
            });

            if (res.ok) {
                toast.success("Enquiry sent successfully! Our team will reach out soon.");
                setFormData({ name: "", email: "", phone: "", message: "" });
                setSelectedFiles([]);
            } else {
                toast.error("Failed to send enquiry. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-48 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-black mb-6"
                        >
                            Contact <span className="text-secondary">Us</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg leading-relaxed"
                        >
                            We’re here to support your industrial requirements, bulk orders, and general enquiries.
                            Reach out to us through the details below, and our team will respond promptly.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-8 rounded-3xl bg-card border border-border flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-1">Phone</h3>
                                    <p className="text-secondary font-bold text-xl mb-2">+91 97904 57793</p>
                                    <p className="text-sm text-muted-foreground">Call for bulk orders, quotations, or technical assistance.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-3xl bg-card border border-border flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-1">Email</h3>
                                    <p className="text-foreground font-medium text-lg mb-1">sparesdeal7@gmail.com</p>
                                    <p className="text-sm text-muted-foreground">Expect a response within 24 business hours.</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-3xl bg-card border border-border flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-1">Visit Our Shop</h3>
                                    <p className="text-foreground leading-relaxed">
                                        No.9/848-3, Kovai Gardens, Pachapalayam,<br />
                                        Siruvani Main Road, Coimbatore – 641010,<br />
                                        Tamil Nadu, India
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-8 rounded-3xl bg-card border border-border flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-1">Operating Hours</h3>
                                    <p className="text-foreground font-medium">Monday – Saturday</p>
                                    <p className="text-secondary font-bold text-lg">9:00 AM to 7:00 PM</p>
                                    <p className="text-sm text-muted-foreground mt-1">Sunday: Closed</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 md:p-12 rounded-[2.5rem] bg-background border border-border shadow-2xl shadow-secondary/5 h-full"
                            >
                                <h2 className="text-3xl font-heading font-black mb-4">Send Us a <span className="text-secondary">Message</span></h2>
                                <p className="text-muted-foreground mb-8">
                                    If you have a requirement, need product details, or want to discuss bulk pricing, send us a message through the form below.
                                </p>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                                        <Input
                                            placeholder="Enter your name"
                                            className="bg-muted/30 border-border h-12"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email*</label>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="bg-muted/30 border-border h-12"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                                        <Input
                                            placeholder="Enter your phone number"
                                            className="bg-muted/30 border-border h-12"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Comment</label>
                                        <Textarea
                                            placeholder="How can we help you?"
                                            className="bg-muted/30 border-border min-h-[150px]"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* File Upload Section */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Sample Photos & Videos (Optional)</label>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-muted/20 hover:bg-muted/40 transition-all">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <div className="flex gap-2 mb-2">
                                                            <div className="p-2 bg-secondary/10 rounded-lg"><Truck className="w-5 h-5 text-secondary" /></div>
                                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 font-bold text-xs flex items-center">PDF</div>
                                                        </div>
                                                        <p className="mb-1 text-sm text-foreground">
                                                            <span className="font-black">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">Photos or Videos (MAX. 50MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept="image/*,video/*,application/pdf"
                                                    />
                                                </label>
                                            </div>

                                            {selectedFiles.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedFiles.map((file, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg text-xs font-bold border border-border">
                                                            <span className="truncate max-w-[150px]">{file.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                                                                className="text-destructive hover:scale-110 transition-transform"
                                                            >
                                                                <Send className="w-3 h-3 rotate-45" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 pt-4">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-14 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground text-lg font-bold rounded-xl transition-all duration-300 shadow-xl shadow-primary/10"
                                        >
                                            {loading ? "Sending..." : (
                                                <span className="flex items-center gap-2">
                                                    Send Enquiry <Send className="ml-2 w-5 h-5" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>

                    {/* Why Contact Us */}
                    <div className="max-w-6xl mx-auto mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-heading font-black mb-4">Our <span className="text-secondary">Location</span></h2>
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-900 shadow-2xl h-[400px] relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.471692881!2d76.8927!3d10.9918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2ad13364f77270!2sSiruvani%20Main%20Rd%2C%20Pachapalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Why Contact Us */}
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-heading font-black mb-4">Why Reach Out?</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Truck, title: "Bulk & Repeat Supply", desc: "Dedicated support for high-volume requirements." },
                                { icon: ShieldCheck, title: "Quick Response", desc: "Fast turnaround for all industrial enquiries." },
                                { icon: Users, title: "Expert Guidance", desc: "Technical help in choosing the right components." },
                                { icon: "🛠️", title: "After-Sales Support", desc: "Reliable coordination for post-purchase needs.", isEmoji: true },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-2xl bg-card border border-border text-center hover:border-secondary/50 transition-colors"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-2xl">
                                        {typeof item.icon === 'string' ? item.icon : <item.icon className="w-7 h-7 text-secondary" />}
                                    </div>
                                    <h4 className="font-heading font-bold mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Newsletter />
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Contact;
