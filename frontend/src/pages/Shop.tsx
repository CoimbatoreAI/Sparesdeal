import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Newsletter from "@/components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Filter, ChevronDown, LayoutGrid, List, X, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import { API_BASE, SERVER_URL } from '@/config';

const ProductCard = ({ product, view }: { product: any, view: 'grid' | 'list' }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    const images = product.images && product.images.length > 0
        ? product.images.map((img: string) => `${SERVER_URL}${img}`)
        : ["https://images.unsplash.com/photo-1530124560677-bdaea02c9a9d?auto=format&fit=crop&q=80&w=400"];

    const currentImage = (isHovered && images.length > 1) ? images[1] : images[0];

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onClick={() => navigate(`/product/${product._id}`)}
            className={`group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 cursor-pointer ${view === 'list' ? 'flex flex-col md:flex-row gap-6 p-4 items-center' : ''
                }`}
        >
            <div className={`${view === 'list' ? 'w-full md:w-64 shrink-0' : 'block'}`}>
                <div className={`relative aspect-square overflow-hidden bg-muted rounded-xl`}>
                    <img
                        src={currentImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                    {product.offerPrice && product.offerPrice < product.marketPrice && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white uppercase tracking-wider z-10">
                            Sale
                        </span>
                    )}
                </div>
            </div>
            <div className={`flex flex-col flex-1 ${view === 'list' ? 'py-2 px-2' : 'p-5'}`}>
                <div>
                    <h3 className={`font-heading font-bold leading-tight text-foreground mb-3 group-hover:text-secondary transition-colors ${view === 'list' ? 'text-xl md:text-2xl' : 'text-sm line-clamp-2 h-10'
                        }`}>
                        {product.name}
                    </h3>
                </div>
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">(48)</span>
                </div>

                {view === 'list' && (
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 max-w-xl">
                        {product.description || "High-performance industrial component engineered for reliability and long-term durability."}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <span className={`font-heading font-black text-foreground ${view === 'list' ? 'text-xl md:text-2xl' : 'text-base md:text-xl'}`}>
                                ₹{(product.offerPrice || product.marketPrice).toLocaleString()}
                            </span>
                            {product.offerPrice && product.offerPrice < product.marketPrice && (
                                <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                                    ₹{product.marketPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                    {product.stock <= 0 ? (
                        <span className="text-[10px] md:text-xs font-bold text-destructive uppercase">Sold Out</span>
                    ) : (
                        <Button
                            onClick={handleAdd}
                            size={view === 'list' ? 'default' : 'icon'}
                            className={`rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-90 transition-all shadow-sm ${view === 'list' ? 'px-6 md:px-8 h-10 md:h-12 font-bold uppercase tracking-widest text-[10px] md:text-xs' : 'w-8 h-8 md:w-10 md:h-10'
                                }`}
                        >
                            {view === 'list' ? 'Add to Bag' : <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const categoryQuery = searchParams.get("category") || "";

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState(query);
    const [availability, setAvailability] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(25000);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch(`${API_BASE}/products`),
                    fetch(`${API_BASE}/categories`)
                ]);
                const prodData = await prodRes.json();
                const catData = await catRes.json();
                setProducts(prodData);
                setCategories(catData);
            } catch (error) {
                toast.error("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    // Sync searchTerm with URL query when query changes externally
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    // Update URL when searchTerm changes
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        const params: any = {};
        if (value) params.q = value;
        if (categoryQuery) params.category = categoryQuery;
        setSearchParams(params);
    };

    const handleCategoryChange = (catId: string) => {
        const params: any = {};
        if (searchTerm) params.q = searchTerm;
        if (catId && catId !== categoryQuery) params.category = catId;
        setSearchParams(params);
        setIsFilterOpen(false);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !categoryQuery || product.category?._id === categoryQuery;
            const matchesAvailability = availability.length === 0 ||
                (availability.includes("in-stock") && product.stock > 0) ||
                (availability.includes("out-of-stock") && product.stock <= 0);
            const matchesPrice = (product.offerPrice || product.marketPrice) <= maxPrice;

            return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
        });
    }, [products, searchTerm, categoryQuery, availability, maxPrice]);

    const toggleAvailability = (value: string) => {
        setAvailability(prev =>
            prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
        );
    };

    const activeCategoryName = categories.find(c => c._id === categoryQuery)?.name || 'All';

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-32 md:pt-48 pb-10 md:pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        {/* Sidebar Filters */}
                        <aside className={`lg:w-64 space-y-8 lg:block ${isFilterOpen ? 'fixed inset-0 z-50 bg-background p-6 overflow-y-auto' : 'hidden'}`}>
                            <div className="flex items-center justify-between lg:hidden mb-6">
                                <h2 className="text-xl font-black uppercase tracking-tighter italic">Filters</h2>
                                <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className="w-full bg-muted border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/50 pr-10"
                                    />
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>

                                {/* Categories Filter */}
                                <div className="border-b border-border pb-6">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleCategoryChange("")}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!categoryQuery ? 'bg-secondary text-secondary-foreground font-bold' : 'hover:bg-muted'}`}
                                        >
                                            All Categories
                                        </button>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => handleCategoryChange(cat._id)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${categoryQuery === cat._id ? 'bg-secondary text-secondary-foreground font-bold' : 'hover:bg-muted'}`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability Filter */}
                                <div className="border-b border-border pb-6">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Availability</h3>
                                    <div className="space-y-3">
                                        {[
                                            { id: "in-stock", label: "In Stock" },
                                            { id: "out-of-stock", label: "Out of Stock" }
                                        ].map((item) => (
                                            <label key={item.id} className="flex items-center gap-3 group cursor-pointer">
                                                <div
                                                    onClick={() => toggleAvailability(item.id)}
                                                    className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${availability.includes(item.id) ? 'bg-secondary border-secondary text-white' : 'border-border group-hover:border-secondary'}`}
                                                >
                                                    {availability.includes(item.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                </div>
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="border-b border-border pb-6">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Price Range</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="25000"
                                            step="100"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                                        />
                                        <div className="flex items-center justify-between text-sm font-bold">
                                            <span>Rs. 0</span>
                                            <span className="text-secondary bg-secondary/10 px-2 py-1 rounded">Rs. {maxPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full lg:hidden"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-12">
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-heading font-black mb-1 md:mb-2 uppercase tracking-tighter italic">
                                        Shop <span className="text-secondary">{activeCategoryName}</span>
                                    </h1>
                                    <p className="text-xs md:text-base text-muted-foreground">{filteredProducts.length} Items found in collections</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsFilterOpen(true)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-bold"
                                    >
                                        <Filter className="w-4 h-4" /> Filter
                                    </button>
                                    <div className="flex bg-muted rounded-xl p-1">
                                        <button
                                            onClick={() => setView('grid')}
                                            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-secondary' : 'text-muted-foreground'}`}
                                        >
                                            <LayoutGrid className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setView('list')}
                                            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-white shadow-sm text-secondary' : 'text-muted-foreground'}`}
                                        >
                                            <List className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <Button variant="outline" className="border-border rounded-xl hidden sm:flex">
                                        Sort <ChevronDown className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>

                            {/* Grid/List */}
                            {filteredProducts.length > 0 ? (
                                <div className={view === 'grid'
                                    ? "grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                                    : "flex flex-col gap-4 md:gap-6"
                                }>
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} view={view} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border">
                                    <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">No items found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                                    <Button
                                        onClick={() => { setSearchTerm(""); setAvailability([]); setMaxPrice(25000); handleCategoryChange(""); }}
                                        className="mt-6 bg-secondary text-secondary-foreground"
                                    >
                                        Reset All Filters
                                    </Button>
                                </div>
                            )}

                            {filteredProducts.length > 0 && (
                                <div className="mt-20 text-center">
                                    <Button className="px-10 h-14 bg-secondary text-secondary-foreground font-heading font-black uppercase tracking-widest rounded-2xl hover:bg-secondary/90 shadow-lg active:scale-95 transition-all">
                                        Load More Items
                                    </Button>
                                </div>
                            )}
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

export default Shop;
