import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    ShoppingCart,
    ChevronRight,
    ChevronLeft,
    Minus,
    Plus,
    ShieldCheck,
    Truck,
    Clock,
    RotateCcw,
    Fullscreen,
    CheckCircle2,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_BASE, SERVER_URL } from "@/config";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

// Standard WhatsApp Icon SVG
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03a11.777 11.777 0 001.583 5.918L0 24l6.108-1.602a11.782 11.782 0 005.937 1.604h.005c6.635 0 12.03-5.394 12.033-12.03a11.82 11.82 0 00-3.417-8.455" />
    </svg>
);

const Headphones = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_BASE}/products/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                    const relatedRes = await fetch(`${API_BASE}/products`);
                    const allProducts = await relatedRes.json();
                    const filtered = allProducts
                        .filter((p: any) => p.category?._id === data.category?._id && p._id !== data._id)
                        .slice(0, 4);
                    setRelatedProducts(filtered);
                } else {
                    toast.error("Product not found");
                }
            } catch (error) {
                toast.error("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);

        // Increment view count
        const incrementViews = async () => {
            try {
                await fetch(`${API_BASE}/products/${id}/view`, { method: 'POST' });
            } catch (error) {
                console.error("Failed to increment view count", error);
            }
        };
        incrementViews();
    }, [id]);

    const calculateSavings = (market: number, offer: number) => {
        if (!offer || offer >= market) return 0;
        return Math.round(((market - offer) / market) * 100);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-sm font-bold uppercase tracking-widest animate-pulse">Loading Product...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-sm font-bold uppercase tracking-widest text-destructive">Product not found</div>;

    const images = product.images && product.images.length > 0
        ? product.images.map((img: string) => `${SERVER_URL}${img}`)
        : ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"];

    const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        toast.success(`${product.name} added to cart!`);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-32 md:pt-48 pb-10 md:pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20 items-start">
                        {/* Product Images Area */}
                        <div className="space-y-4 md:space-y-6">
                            <div className="relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-white border border-border group">
                                <motion.div
                                    className="w-full h-full relative cursor-zoom-in"
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => setIsZooming(true)}
                                    onMouseLeave={() => setIsZooming(false)}
                                    onTouchStart={() => setIsZooming(true)}
                                    onTouchEnd={() => setIsZooming(false)}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <motion.img
                                        key={activeImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        src={images[activeImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-contain transition-transform duration-700"
                                        style={isZooming ? {
                                            transform: 'scale(2.5)',
                                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                                        } : {}}
                                    />
                                </motion.div>

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-secondary hover:text-secondary-foreground transition-all md:opacity-0 group-hover:opacity-100 transform md:-translate-x-4 group-hover:translate-x-0"
                                        >
                                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-secondary hover:text-secondary-foreground transition-all md:opacity-0 group-hover:opacity-100 transform md:translate-x-4 group-hover:translate-x-0"
                                        >
                                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => setFullScreenImage(images[activeImageIndex])}
                                    className="absolute bottom-4 right-4 md:bottom-6 md:right-6 p-3 md:p-4 bg-black/80 text-white rounded-full shadow-2xl md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] md:text-sm font-black uppercase tracking-widest backdrop-blur-md"
                                >
                                    <Fullscreen className="w-4 h-4 md:w-5 md:h-5" />
                                    Fullscreen
                                </button>

                                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                                    <span className="bg-secondary text-secondary-foreground text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg">
                                        Industrial Grade
                                    </span>
                                </div>

                                {/* Pagination Dots */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === i ? 'w-8 bg-secondary' : 'w-2 bg-black/20'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-5 gap-4">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === i ? 'border-secondary shadow-lg scale-95' : 'border-border grayscale hover:grayscale-0 hover:border-secondary/50'}`}
                                    >
                                        <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-muted-foreground text-center italic uppercase font-bold tracking-widest">
                                Premium Quality Spares • Authorized Distributor
                            </p>
                        </div>

                        {/* Product Info Section */}
                        <div className="flex flex-col">
                            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold">
                                <Link to="/" className="hover:text-secondary">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link to="/shop" className="hover:text-secondary">Shop</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-foreground line-clamp-1">{product.name}</span>
                            </nav>

                            <h1 className="text-2xl md:text-5xl font-serif font-black mb-2 md:mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                                    ))}
                                    <span className="text-xs font-bold text-secondary ml-1">4.5</span>
                                </div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                    +67 Verified Ratings
                                </span>
                                <div className="flex items-center gap-2 text-green-600">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">In Stock</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-3xl font-heading font-black">
                                        ₹{(product.offerPrice || product.marketPrice).toLocaleString()}
                                    </span>
                                    {product.offerPrice && product.offerPrice < product.marketPrice && (
                                        <>
                                            <span className="text-lg text-muted-foreground line-through decoration-red-500/50">
                                                ₹{product.marketPrice.toLocaleString()}
                                            </span>
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                                                {calculateSavings(product.marketPrice, product.offerPrice)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground italic">Shipping calculated at checkout.</p>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-muted rounded-xl p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Button
                                        onClick={handleAddToCart}
                                        className={`flex-1 h-14 rounded-xl font-heading font-black uppercase tracking-wider transition-all shadow-lg ${addedToCart ? 'bg-green-500 text-white' : 'bg-primary hover:bg-black/90 text-primary-foreground active:scale-95'}`}
                                    >
                                        {addedToCart ? (
                                            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Added to Bag</span>
                                        ) : (
                                            <span className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Add to cart</span>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-14 h-14 rounded-xl group border-border hover:bg-card"
                                        onClick={() => toggleWishlist(product)}
                                    >
                                        <Heart className={`w-6 h-6 transition-colors ${isInWishlist(product._id) ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500 group-hover:text-red-500'}`} />
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleBuyNow}
                                    className="w-full h-14 bg-secondary text-secondary-foreground font-heading font-black uppercase tracking-wider rounded-xl hover:bg-secondary/90 active:scale-[0.98] transition-all shadow-yellow-500/20 shadow-xl"
                                >
                                    Buy it now
                                </Button>
                                <a
                                    href={`https://wa.me/919790457793?text=${encodeURIComponent(`Hi Sparesdeal, I'm interested in the ${product.name} (Price: ₹${(product.offerPrice || product.marketPrice).toLocaleString()}). Please provide more details.\n\nLink: ${window.location.href}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full h-12 bg-[#25D366] text-white flex items-center justify-center gap-2 rounded-xl font-heading font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-[#25D366]/20"
                                >
                                    <WhatsAppIcon /> Order on WhatsApp
                                </a>

                                {/* External Platform Buttons */}
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {product.externalLinks?.amazon && (
                                        <a
                                            href={product.externalLinks.amazon}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-10 px-2 flex items-center justify-center gap-1 bg-[#232f3e] text-white rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-black transition-colors"
                                        >
                                            <ShoppingCart className="w-3 h-3" /> Amazon
                                        </a>
                                    )}
                                    {product.externalLinks?.flipkart && (
                                        <a
                                            href={product.externalLinks.flipkart}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-10 px-2 flex items-center justify-center gap-1 bg-[#2874f0] text-white rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-[#1e5cc2] transition-colors"
                                        >
                                            <ShoppingCart className="w-3 h-3" /> Flipkart
                                        </a>
                                    )}
                                    {product.externalLinks?.indiamart && (
                                        <a
                                            href={product.externalLinks.indiamart}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="h-10 px-2 flex items-center justify-center gap-1 bg-[#600a31] text-white rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-[#4d0827] transition-colors"
                                        >
                                            <ShoppingCart className="w-3 h-3" /> IndiaMart
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="bg-card border border-border rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 mx-auto rounded-lg bg-green-100 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-green-600" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Verified Business</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 mx-auto rounded-lg bg-blue-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Guaranteed Quality</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 mx-auto rounded-lg bg-orange-100 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Quick Fulfillment</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 mx-auto rounded-lg bg-purple-100 flex items-center justify-center">
                                        <Truck className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Secure Dispatch</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl font-serif font-black mb-6 border-b border-border pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Product Description
                                </h2>
                                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
                                    {product.description?.split('\n').map((paragraph: string, i: number) => (
                                        <p key={i}>{paragraph}</p>
                                    )) || (
                                            <p>Industrial-grade component designed for durability and high performance across various manufacturing and mechanical applications.</p>
                                        )}
                                </div>
                            </section>

                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-serif font-black mb-6 border-b border-border pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Technical Specifications
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
                                        {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                                            <div key={key} className="flex bg-card p-4 gap-4 hover:bg-muted/50 transition-colors">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground w-1/3 shrink-0">{key}</span>
                                                <span className="text-sm font-medium">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section>
                                <h2 className="text-2xl font-serif font-black mb-6 border-b border-border pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Shipping & Logistics
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>Our commitment to excellence extends to our delivery process. We ensure that every component is securely packaged to prevent damage during transit.</p>
                                    <p>We work with trusted logistics partners to provide nationwide coverage. Bulk orders may qualify for specialized freight handling.</p>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-muted p-8 rounded-[2rem] border border-border">
                                <h3 className="text-xl font-serif font-black mb-4">Core Strengths</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: ShieldCheck, title: "Quality Control", desc: "Rigorous testing protocols" },
                                        { icon: Headphones, title: "Expert Support", desc: "Technical guidance on call" },
                                        { icon: RotateCcw, title: "Standardized", desc: "ISO compliant components" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                                <item.icon className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Curated Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-serif font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Curated For Your <span className="text-secondary">Requirements</span>
                                </h2>
                                <div className="h-1.5 w-24 bg-secondary mx-auto mb-4" />
                                <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Discover more specialized components</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                {relatedProducts.map((p) => (
                                    <Link
                                        key={p._id}
                                        to={`/product/${p._id}`}
                                        className="group bg-white rounded-xl md:rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="aspect-square overflow-hidden bg-slate-50 p-2 md:p-4">
                                            <img
                                                src={`${SERVER_URL}${p.images[0]}`}
                                                alt={p.name}
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-3 md:p-6">
                                            <h4 className="font-bold text-xs md:text-sm line-clamp-1 group-hover:text-secondary transition-colors uppercase tracking-tight mb-2">
                                                {p.name}
                                            </h4>
                                            <p className="font-black text-sm md:text-lg">₹{(p.offerPrice || p.marketPrice).toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Fullscreen Modal with Navigation */}
            <AnimatePresence>
                {fullScreenImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setFullScreenImage(null)}
                    >
                        <button className="absolute top-8 right-8 text-white p-4 hover:bg-white/10 rounded-full transition-colors z-10">
                            <Plus className="w-8 h-8 rotate-45" />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 p-4 text-white hover:text-secondary transition-colors bg-white/5 rounded-full backdrop-blur-md"
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 p-4 text-white hover:text-secondary transition-colors bg-white/5 rounded-full backdrop-blur-md"
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </>
                            )}
                            <img
                                src={images[activeImageIndex]}
                                alt="Full screen preview"
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Newsletter />
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default ProductDetail;
