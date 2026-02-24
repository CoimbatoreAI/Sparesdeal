import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

import { API_BASE, SERVER_URL } from '@/config';

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const marketPrice = product.marketPrice || 0;
  const offerPrice = product.offerPrice || marketPrice;
  const discount = marketPrice > offerPrice ? Math.round(((marketPrice - offerPrice) / marketPrice) * 100) : 0;

  const images = product.images && product.images.length > 0
    ? product.images.map((img: string) => `${SERVER_URL}${img}`)
    : ["https://images.unsplash.com/photo-1530124560677-bdaea02c9a9d?auto=format&fit=crop&q=80&w=400"];

  const currentImage = (isHovered && images.length > 1) ? images[1] : images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="group bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
    >
      {/* Image area */}
      <Link to={`/product/${product._id}`} className="block relative aspect-square bg-muted overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700"
        />
        {offerPrice < marketPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
            Sale
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center hover:bg-card transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-secondary text-secondary" : "text-foreground"}`} />
        </button>
        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-[5]">
          <div className="flex items-center gap-2 px-4 py-2 bg-card text-foreground rounded-lg font-medium text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">
            <Eye className="w-4 h-4" /> View Details
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.category?.name || "Industrial"}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2 line-clamp-2 leading-snug hover:text-secondary transition-colors font-serif uppercase tracking-tight italic">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(48)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-heading font-bold text-foreground">₹{offerPrice.toLocaleString()}</span>
            {offerPrice < marketPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">₹{marketPrice.toLocaleString()}</span>
            )}
            {discount > 0 && <span className="text-xs text-red-500 font-semibold ml-1">-{discount}%</span>}
          </div>
          <button
            onClick={() => {
              addToCart(product, 1);
              toast.success(`${product.name} added to cart`);
            }}
            className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 hover:scale-110 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        // Take featured products or first 8
        const featured = data.filter((p: any) => p.isFeatured).slice(0, 8);
        setProducts(featured.length > 0 ? featured : data.slice(0, 8));
      } catch (error) {
        toast.error("Failed to fetch featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Featured <span className="text-secondary">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            High-performance industrial components and equipment trusted by manufacturing units and engineers across India
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="inline-block px-10 py-4 bg-secondary text-secondary-foreground font-heading font-black uppercase tracking-widest rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-95">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
