import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, CreditCard, ShieldCheck, Truck, User, Mail, Phone, MapPin, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { API_BASE } from "@/config";

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            const names = user.name?.split(' ') || [];
            const firstName = names[0] || "";
            const lastName = names.slice(1).join(' ') || "";

            setFormData(prev => ({
                ...prev,
                emailOrPhone: user.email,
                firstName: firstName,
                lastName: lastName,
                phone: user.phone || ""
            }));
        }
    }, [isAuthenticated, user]);

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        firstName: "",
        lastName: "",
        company: "",
        address: "",
        apartment: "",
        city: "",
        state: "Tamil Nadu",
        pincode: "",
        phone: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.emailOrPhone || !formData.lastName || !formData.address || !formData.city || !formData.pincode || !formData.phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsProcessing(true);

        try {
            // Create order on backend
            const { data } = await axios.post(`${API_BASE}/payments/create-order`, {
                amount: totalPrice,
                customer: {
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.emailOrPhone.includes('@') ? formData.emailOrPhone : 'customer@example.com',
                    phone: formData.phone,
                    address: formData.address + (formData.apartment ? `, ${formData.apartment}` : ''),
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                items: cart.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                }))
            });

            const options = {
                key: data.key_id,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Sparesdeal",
                description: "Purchase of Essential Components",
                image: "/fevi.PNG",
                order_id: data.order.id,
                handler: async (response: any) => {
                    try {
                        const verifyRes = await axios.post(`${API_BASE}/payments/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            toast.success("Payment successful! Order placed.");
                            clearCart();
                            navigate('/');
                        }
                    } catch (err) {
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.emailOrPhone.includes('@') ? formData.emailOrPhone : '',
                    contact: formData.phone
                },
                theme: {
                    color: "#f97316"
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error("Payment Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-48 pb-20 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-secondary" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8">Add some quality components to your cart before checking out.</p>
                    <Link to="/shop">
                        <Button variant="default" className="rounded-2xl px-10 py-6 h-auto font-black uppercase tracking-widest text-sm shadow-xl shadow-secondary/20 hover:scale-105 transition-transform">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Discover Products
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />
            <main className="pt-40 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Summary for mobile - shows at top */}
                        <div className="lg:hidden mb-8">
                            <div className="bg-white border border-border p-6 rounded-3xl shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Order Summary</h3>
                                    <span className="text-xl font-black text-secondary">Rs. {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center gap-4 text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden shrink-0">
                                                    {item.image && <img src={item.image} className="w-full h-full object-cover" alt={item.name} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold line-clamp-1">{item.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <div className="lg:col-span-7 lg:pr-12">
                            <div className="mb-10">
                                <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                    <li className="text-secondary">Cart</li>
                                    <li><ChevronRight className="w-3 h-3" /></li>
                                    <li className="text-foreground">Information</li>
                                    <li><ChevronRight className="w-3 h-3" /></li>
                                    <li>Shipping</li>
                                    <li><ChevronRight className="w-3 h-3" /></li>
                                    <li>Payment</li>
                                </ol>
                                <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                    Sparesdeal <span className="text-secondary italic">Checkout</span>
                                </h1>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-12">
                                {/* Contact Section */}
                                <section>
                                    <div className="flex justify-between items-end mb-4">
                                        <h2 className="text-xl font-bold flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-secondary" /> Contact
                                        </h2>
                                        {!isAuthenticated && <Link to="/login" className="text-xs font-bold text-secondary hover:underline">Log in</Link>}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Input
                                                name="emailOrPhone"
                                                required
                                                value={formData.emailOrPhone}
                                                onChange={handleInputChange}
                                                placeholder="Email or mobile phone number"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm focus-visible:ring-secondary/20"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 px-1">
                                            <input type="checkbox" id="newsletter" className="rounded border-border text-secondary focus:ring-secondary" />
                                            <label htmlFor="newsletter" className="text-xs text-muted-foreground font-medium">Email me with news and offers</label>
                                        </div>
                                    </div>
                                </section>

                                {/* Delivery Section */}
                                <section>
                                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                                        <Truck className="w-5 h-5 text-secondary" /> Delivery
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block ml-1">Country/Region</label>
                                            <div className="h-14 rounded-xl border border-border bg-muted/30 flex items-center px-4 font-bold text-sm">
                                                India
                                            </div>
                                        </div>

                                        <div>
                                            <Input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First name (optional)"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last name"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Input
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Company (optional)"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Input
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Address"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Input
                                                name="apartment"
                                                value={formData.apartment}
                                                onChange={handleInputChange}
                                                placeholder="Apartment, suite, etc. (optional)"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>

                                        <div>
                                            <Input
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={(e: any) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                                                className="w-full h-14 rounded-xl border border-border bg-white shadow-sm px-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                                            >
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                {/* Add more states as needed */}
                                            </select>
                                        </div>

                                        <div>
                                            <Input
                                                name="pincode"
                                                required
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="PIN code"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                name="phone"
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone"
                                                className="h-14 rounded-xl border-border bg-white shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-3 px-1">
                                        <input type="checkbox" id="save-info" className="rounded border-border text-secondary focus:ring-secondary" />
                                        <label htmlFor="save-info" className="text-xs text-muted-foreground font-medium">Save this information for next time</label>
                                    </div>
                                </section>

                                {/* Payment Info */}
                                <section>
                                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                                        <CreditCard className="w-5 h-5 text-secondary" /> Payment
                                    </h2>
                                    <p className="text-xs text-muted-foreground mb-6">All transactions are secure and encrypted. We only accept online payments through Razorpay.</p>

                                    <div className="p-6 rounded-2xl border-2 border-secondary bg-secondary/5 mb-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-bold">Online Payment (Razorpay)</span>
                                            <div className="flex gap-2">
                                                <div className="w-10 h-6 bg-white border border-border rounded flex items-center justify-center text-[8px] font-black">VISA</div>
                                                <div className="w-10 h-6 bg-white border border-border rounded flex items-center justify-center text-[8px] font-black">MC</div>
                                                <div className="w-10 h-6 bg-white border border-border rounded flex items-center justify-center text-[8px] font-black">UPI</div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">After clicking "Pay Now", you will be redirected to Razorpay Secure Checkout to complete your purchase safely.</p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full h-16 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-secondary/20 disabled:opacity-70"
                                    >
                                        {isProcessing ? "Processing..." : "Pay Now & Confirm Order"}
                                    </Button>

                                    <div className="mt-6 flex items-center justify-center gap-6 opacity-40 grayscale">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4" />
                                        <div className="h-4 w-[1px] bg-border" />
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
                                    </div>
                                </section>
                            </form>
                        </div>

                        {/* Order Summary Desktop */}
                        <div className="hidden lg:block lg:col-span-5">
                            <div className="sticky top-40 bg-white border border-border p-10 rounded-[3rem] shadow-2xl shadow-black/5">
                                <h3 className="font-black text-2xl mb-8 tracking-tight">Order <span className="text-secondary italic">Summary</span></h3>

                                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="relative group shrink-0 w-20 h-20 bg-muted rounded-2xl overflow-hidden border border-border">
                                                {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />}
                                                <span className="absolute -top-2 -right-2 bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm ring-2 ring-secondary/20">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm line-clamp-2 leading-tight mb-1">{item.name}</p>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Part ID: {item.id.slice(-8).toUpperCase()}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-black text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                                <p className="text-[10px] text-muted-foreground">Rs. {item.price.toLocaleString()} ea.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-border/50">
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="text-foreground">Rs. {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="text-secondary">FREE SHIPPING</span>
                                    </div>
                                    <div className="pt-6 border-t-2 border-dashed border-border flex justify-between items-end">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Payable</span>
                                            <p className="text-3xl font-black text-foreground tracking-tighter">Rs. {totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-muted-foreground">Including Taxes</p>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-secondary">No COD Available</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-muted/30 rounded-2xl flex gap-4 items-center border border-border/50">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest">Local Pickup (Optional)</p>
                                        <p className="text-[10px] text-muted-foreground">Available at our Coimbatore Hub.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
