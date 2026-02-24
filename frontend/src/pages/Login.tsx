import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { API_BASE } from "@/config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/user-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token, data.user);
                toast.success("Login successful!");
                navigate("/");
            } else {
                toast.error(data.message || "Login failed");
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-black mb-2 uppercase italic tracking-tighter">
                                Welcome <span className="text-secondary">Back</span>
                            </h1>
                            <p className="text-muted-foreground text-sm">Log in to manage your orders and profile</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                                    <Link to="/forgot-password" className="text-[10px] font-bold text-secondary uppercase hover:underline">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 h-12 bg-muted/30 border-border"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-secondary/20"
                            >
                                {loading ? "Authenticating..." : (
                                    <span className="flex items-center gap-2">
                                        Login <LogIn className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-secondary font-black hover:underline inline-flex items-center gap-1 uppercase tracking-tight">
                                    Create one <ArrowRight className="w-3 h-3" />
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

export default Login;
