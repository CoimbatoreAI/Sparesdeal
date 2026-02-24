import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { API_BASE } from "@/config";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token, data.user);
                toast.success("Registration successful!");
                navigate("/");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center py-20 px-4 pt-48">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg"
                >
                    <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-black mb-2 uppercase italic tracking-tighter">
                                Join Sparesdeal
                            </h1>
                            <p className="text-muted-foreground text-sm">Create an account to track orders and get exclusive industrial offers</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <Input
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                                <div className="relative">
                                    <Input
                                        name="phone"
                                        placeholder="+91 ...."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                                <div className="relative">
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="md:col-span-2 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-secondary/20"
                            >
                                {loading ? "Creating Account..." : (
                                    <span className="flex items-center gap-2">
                                        Register Now <UserPlus className="w-5 h-5" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link to="/login" className="text-secondary font-black hover:underline inline-flex items-center gap-1 uppercase tracking-tight">
                                    Log in here <ArrowRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
