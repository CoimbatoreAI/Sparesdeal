import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-48 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center gap-4 mb-12">
                        <ShoppingBag className="w-10 h-10 text-secondary" />
                        <div>
                            <h1 className="text-4xl font-heading font-black">Your <span className="text-secondary">Cart</span></h1>
                            <p className="text-muted-foreground">{totalItems} items in your bag</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card border border-border rounded-3xl"
                                        >
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="font-heading font-bold text-lg mb-1">{item.name}</h3>
                                                <p className="text-secondary font-black text-xl mb-4 sm:mb-0">Rs. {item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center bg-muted rounded-xl p-1 shrink-0">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-3 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border">
                                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">Your cart is empty</h3>
                                        <p className="text-muted-foreground mb-8">Ready to start your industrial collection?</p>
                                        <Link to="/shop">
                                            <Button className="bg-secondary text-secondary-foreground px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
                                                Browse Shop
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-card border border-border p-8 rounded-[2.5rem] sticky top-32">
                                <h3 className="text-2xl font-heading font-black mb-8">Order <span className="text-secondary">Summary</span></h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>Rs. {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Calculated at checkout</span>
                                    </div>
                                    <div className="pt-4 border-t border-border flex justify-between items-end">
                                        <span className="font-bold">Estimated Total</span>
                                        <span className="text-3xl font-heading font-black text-secondary">Rs. {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link to="/checkout">
                                    <Button
                                        disabled={cart.length === 0}
                                        className="w-full h-16 bg-primary text-primary-foreground text-lg font-black uppercase tracking-widest rounded-2xl hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-xl shadow-secondary/10"
                                    >
                                        Checkout <ArrowRight className="ml-2 w-6 h-6" />
                                    </Button>
                                </Link>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-secondary" />
                                        <span>Fast Delivery from Coimbatore</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-secondary" />
                                        <span>Secure Handling & Industrial Packing</span>
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

export default Cart;
