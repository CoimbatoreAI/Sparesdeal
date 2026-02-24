import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, LogOut, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { API_BASE, SERVER_URL } from "@/config";

const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get("tab") || "profile";
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE}/payments/user-orders?email=${user?.email}`);
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        window.scrollTo(0, 0);
    }, [isAuthenticated, user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="pt-48 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 border-2 border-slate-900 shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-secondary flex items-center justify-center text-secondary-foreground text-4xl font-black italic shadow-xl">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter mb-2">
                                    Hello, <span className="text-secondary">{user.name}</span>
                                </h1>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Customer Profile ID: {user.id.slice(-8)}</p>
                            </div>
                            <Button variant="outline" onClick={logout} className="rounded-xl border-2 border-slate-900 font-bold uppercase tracking-widest text-[10px] h-12 px-8 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95">
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                            </Button>
                        </motion.div>

                        <Tabs defaultValue={defaultTab} className="space-y-8">
                            <TabsList className="bg-white p-2 border-2 border-slate-900 rounded-2xl h-auto flex flex-wrap gap-2 shadow-lg">
                                <TabsTrigger value="profile" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px] rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                                    <User className="mr-2 h-4 w-4" /> Profile Info
                                </TabsTrigger>
                                <TabsTrigger value="orders" className="flex-1 py-4 font-black uppercase tracking-widest text-[10px] rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                                    <Package className="mr-2 h-4 w-4" /> Order History
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="rounded-[2rem] border-2 border-slate-900 shadow-xl overflow-hidden">
                                        <CardHeader className="bg-slate-900 text-white py-6">
                                            <CardTitle className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-3">
                                                <User className="h-5 w-5 text-secondary" /> Personal Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Full Name</label>
                                                <p className="text-lg font-bold text-slate-900">{user.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Email Address</label>
                                                <p className="text-lg font-bold text-slate-900">{user.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Login Status</label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Active Member</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="rounded-[2rem] border-2 border-slate-900 shadow-xl flex flex-col justify-center items-center p-12 text-center bg-slate-900 text-white group">
                                        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                                            <Package className="h-10 w-10 text-secondary" />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Corporate Support</h3>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">Need prioritized bulk shipping or GST invoices? Our team is live from 9 AM - 7 PM.</p>
                                        <Button className="mt-8 bg-secondary text-secondary-foreground hover:bg-white transition-all rounded-xl h-12 px-10 font-black uppercase tracking-widest text-[10px]">Contact Sales</Button>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="orders" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                        <div className="w-12 h-12 border-4 border-slate-200 border-t-secondary rounded-full animate-spin" />
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Retrieving secure order history...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <Card className="rounded-[2.5rem] border-2 border-slate-900 border-dashed p-20 text-center bg-white shadow-xl">
                                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <Package className="h-12 w-12 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter italic text-slate-900 mb-4">No Inventory History Found</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto mb-8 uppercase text-xs font-bold tracking-widest">You haven't placed any orders with Sparesdeal yet. Start browsing our industrial catalog to stock up.</p>
                                        <Button onClick={() => navigate('/shop')} className="bg-slate-900 text-white hover:bg-secondary hover:text-secondary-foreground transition-all rounded-xl h-14 px-12 font-black uppercase tracking-widest text-xs">Browse Products</Button>
                                    </Card>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <Card key={order._id} className="rounded-[2rem] border-2 border-slate-900 shadow-xl overflow-hidden bg-white hover:border-secondary transition-all group">
                                                <div className="bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                            <Package className="h-6 w-6 text-secondary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Reference</p>
                                                            <p className="text-white font-black italic tracking-tighter">#{order.orderId}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-8">
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ordered On</p>
                                                            <p className="text-white font-bold text-sm">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Valuation</p>
                                                            <p className="text-secondary font-black text-xl italic tracking-tighter">₹{order.totalAmount.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CardContent className="p-0">
                                                    <div className="divide-y divide-slate-100">
                                                        {order.items.map((item: any, idx: number) => (
                                                            <div key={idx} className="p-6 flex items-center justify-between group/item">
                                                                <div className="flex items-center gap-6">
                                                                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 p-2 flex items-center justify-center shrink-0">
                                                                        <img src={`${SERVER_URL}${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80 group-hover/item:opacity-100 transition-opacity" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-heading font-black uppercase text-sm tracking-tight mb-1 group-hover/item:text-secondary transition-colors">{item.name}</h4>
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">Qty: {item.quantity}</span>
                                                                            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-600 italic">Verified Part</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right font-black italic tracking-tighter text-slate-900">
                                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                            <span className="text-xs font-black uppercase tracking-widest text-slate-600">Secure Order Dispatched</span>
                                                        </div>
                                                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border-2 ${order.status === 'delivered' ? 'bg-emerald-500 text-white border-emerald-500' :
                                                            order.status === 'paid' ? 'bg-secondary text-secondary-foreground border-slate-900 shadow-md' :
                                                                'bg-slate-200 text-slate-500 border-transparent'
                                                            }`}>
                                                            {order.status}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
