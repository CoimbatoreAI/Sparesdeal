import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import { Truck, Send, Building2, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { API_BASE, SERVER_URL } from "@/config";
import aboutImg from "@/assets/hs (2).png";

const About = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await fetch(`${API_BASE}/products`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setRelatedProducts(data.sort(() => 0.5 - Math.random()).slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching related products", error);
            }
        };
        fetchRelated();
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/enquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                toast.error("Failed to send message.");
            }
        } catch (error) {
            toast.error("An error occurred.");
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
                    <div className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tighter">
                            About <span className="text-secondary italic">Us</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium uppercase tracking-widest bg-secondary/10 inline-block px-6 py-2 rounded-full mb-8">
                            Coolant Pump - SparesDeal
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h2 className="text-3xl font-heading font-black leading-tight">
                                    Trusted Industrial Supply <br />
                                    Partner in <span className="text-secondary">Coimbatore</span>
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We are an industrial supply business based in Coimbatore, providing essential components to manufacturing units, workshops, and service teams. Our focus is simple: deliver reliable products, maintain consistent availability, and support customers who depend on dependable industrial materials.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Located in one of Tamil Nadu’s strongest industrial zones, we understand the practical needs of daily operations. Whether it’s a single requirement or bulk purchase, our goal is to provide quality, clarity, and timely assistance.
                                </p>
                            </div>
                            <div className="flex gap-8 border-t border-border pt-8">
                                <div className="space-y-1">
                                    <p className="text-4xl font-black text-secondary tracking-tighter">15+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Years Experience</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-4xl font-black text-secondary tracking-tighter">500+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Units</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-4xl font-black text-secondary tracking-tighter">2k+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Parts Catalog</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-secondary/20 rounded-[3rem] blur-2xl group-hover:bg-secondary/30 transition-colors" />
                            <div className="relative rounded-[3rem] overflow-hidden border-2 border-border bg-white shadow-2xl">
                                <img
                                    src={aboutImg}
                                    alt="Industrial Operations"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                                    <p className="text-sm font-bold uppercase tracking-widest mb-1 italic">Our Commitment</p>
                                    <p className="text-xs opacity-70">Supporting the heart of Coimbatore's manufacturing excellence since our inception.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Values Section */}
                    <div className="bg-muted/30 rounded-[4rem] p-12 md:p-24 mb-32 border border-border">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter">Our Beliefs</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We believe in straightforward service, long-term relationships, and supplying components that meet real operational demands. With a commitment to reliability and direct communication, we continue to support customers who value trusted industrial solutions.
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="p-8 bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                                        <Building2 className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h4 className="font-bold mb-2">Construction & Machinery</h4>
                                    <p className="text-xs text-muted-foreground">Supplying premium steel wire ropes in Pachapalayam, Coimbatore for heavy-duty industrial usage.</p>
                                </div>
                                <div className="p-8 bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                                        <Truck className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-bold mb-2">Automotive & Hydraulics</h4>
                                    <p className="text-xs text-muted-foreground">High-quality O rings, oil seals, and silicone gasket rubber for pressure systems across Tamil Nadu.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Form Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto mb-32 items-start">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-heading font-black mb-6">Get in <span className="text-secondary italic">Touch</span></h2>
                                <p className="text-muted-foreground mb-8 text-lg">Have a specific industrial requirement or need a bulk quotation? Our experts are ready to assist you.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Location</p>
                                        <p className="font-bold text-sm">Pachapalayam, Coimbatore, TN</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Contact</p>
                                        <p className="font-bold text-sm">+91 97904 57793</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Email</p>
                                        <p className="font-bold text-sm text-secondary">sparesdeal7@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-card border-2 border-border p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-secondary/5"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                                    <Input
                                        placeholder="Your full name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-14 bg-muted/20 border-border rounded-2xl focus-visible:ring-secondary/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email*</label>
                                    <Input
                                        type="email"
                                        placeholder="company@email.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="h-14 bg-muted/20 border-border rounded-2xl focus-visible:ring-secondary/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone</label>
                                    <Input
                                        placeholder="+91-0000000000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-14 bg-muted/20 border-border rounded-2xl focus-visible:ring-secondary/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Comment</label>
                                    <Textarea
                                        placeholder="Describe your requirement..."
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="bg-muted/20 border-border rounded-2xl focus-visible:ring-secondary/20 resize-none p-4"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-16 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Submit Inquiry"} <Send className="ml-2 w-5 h-5" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-32 border-t border-border pt-20">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                                <div>
                                    <h2 className="text-4xl font-heading font-black mb-2 uppercase italic tracking-tighter">Related <span className="text-secondary">Products</span></h2>
                                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Industrial Grade Essentials</p>
                                </div>
                                <Link to="/shop">
                                    <Button variant="outline" className="rounded-xl border-border hover:bg-secondary hover:text-white transition-all uppercase text-[10px] font-black tracking-widest h-12 px-6">
                                        View All Shop
                                    </Button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((p) => (
                                    <Link
                                        key={p._id}
                                        to={`/product/${p._id}`}
                                        className="group bg-card border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500"
                                    >
                                        <div className="aspect-square relative p-6 bg-white overflow-hidden">
                                            <img
                                                src={`${SERVER_URL}${p.images?.[0] || "/placeholder.jpg"}`}
                                                alt={p.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                                            />
                                            {p.offerPrice < p.marketPrice && (
                                                <div className="absolute top-4 right-4 bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                                    Offer
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h4 className="font-bold text-xs md:text-sm line-clamp-1 mb-2 group-hover:text-secondary transition-colors uppercase tracking-tight">
                                                {p.name}
                                            </h4>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-black text-lg">₹{(p.offerPrice || p.marketPrice).toLocaleString()}</span>
                                                {p.offerPrice < p.marketPrice && (
                                                    <span className="text-[10px] text-muted-foreground line-through opacity-50">₹{p.marketPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Newsletter />
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default About;
