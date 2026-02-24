import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Download, FileText } from "lucide-react";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { API_BASE, SERVER_URL } from "@/config";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package as PackageIcon, Settings, LogOut as LogOutIcon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Online Shopping", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const subCategories = [
  { name: "Coolant Pump", href: "/shop?category=coolant-pump" },
  { name: "Electrical Panel", href: "/shop?category=electrical" },
  { name: "Industrial Fittings", href: "/shop?category=pipeline" },
  { name: "O Rings", href: "/shop?category=o-rings" },
  { name: "Steel Wire Ropes", href: "/shop?category=wire-ropes" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [catalogueForm, setCatalogueForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: ""
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isScrolled = scrolled || !isHome;

  const [categories, setCategories] = useState<any[]>([]);
  const [latestCatalogue, setLatestCatalogue] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchData = async () => {
      try {
        const [catRes, catalogRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/catalogues`)
        ]);
        const catData = await catRes.json();
        const catalogData = await catalogRes.json();

        setCategories(catData);
        if (catalogData && catalogData.length > 0) {
          setLatestCatalogue(catalogData[0]); // assuming latest is first
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/shop?q=${encodeURIComponent(headerSearch.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleCatalogueRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!latestCatalogue) return;

    setIsDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/catalogues/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...catalogueForm,
          catalogueTitle: latestCatalogue.title
        })
      });

      if (res.ok) {
        toast.success("Details sent. Your download will start now.");
        // Trigger download
        const link = document.createElement('a');
        link.href = `${SERVER_URL}${latestCatalogue.fileUrl}`;
        link.setAttribute('download', `${latestCatalogue.title}.pdf`);
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setModalOpen(false);
        setCatalogueForm({ name: "", email: "", phone: "", companyName: "", companyAddress: "" });
      } else {
        toast.error("Failed to send request. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const CatalogueModal = ({ trigger }: { trigger: React.ReactNode }) => (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase mb-4">
            Download <span className="text-secondary">Catalogue</span>
          </DialogTitle>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
            Please provide your business details to access our full technical inventory and pricing guide.
          </p>
        </DialogHeader>
        <form onSubmit={handleCatalogueRequest} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</Label>
              <Input required value={catalogueForm.name} onChange={e => setCatalogueForm({ ...catalogueForm, name: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone No</Label>
              <Input required type="tel" value={catalogueForm.phone} onChange={e => setCatalogueForm({ ...catalogueForm, phone: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Business Email</Label>
            <Input required type="email" value={catalogueForm.email} onChange={e => setCatalogueForm({ ...catalogueForm, email: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</Label>
            <Input required value={catalogueForm.companyName} onChange={e => setCatalogueForm({ ...catalogueForm, companyName: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Office Address</Label>
            <Input required value={catalogueForm.companyAddress} onChange={e => setCatalogueForm({ ...catalogueForm, companyAddress: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
          </div>
          <Button disabled={isDownloading} className="w-full h-14 bg-slate-900 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            {isDownloading ? "Processing..." : "Get Digital Catalogue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}>
        {/* Top Bar - Smoothly slides up and fades */}
        <div className={`bg-secondary text-secondary-foreground text-[10px] hidden md:block transition-all duration-500 overflow-hidden ${scrolled ? "h-0 opacity-0" : "h-9 opacity-100"}`}>
          <div className="container mx-auto flex justify-between items-center h-full px-4 font-bold tracking-widest">
            <span className="flex items-center gap-4 uppercase">
              <span>📞 +91 97904 57793</span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span className="flex items-center gap-1 normal-case italic">✉ sparesdeal7@gmail.com</span>
            </span>
            <div className="flex items-center gap-6">
              <span className="uppercase">Fast Delivery for Industrial Units | Bulk Pricing Available</span>
              {latestCatalogue && (
                <CatalogueModal trigger={
                  <button className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full hover:bg-black/20 hover:scale-105 transition-all uppercase text-[9px] cursor-pointer">
                    <Download className="w-3 h-3 animate-pulse" /> Download Catalogue
                  </button>
                } />
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        {/* Main Header */}
        <header className={`transition-all duration-500 border-b ${isScrolled ? "bg-black/95 backdrop-blur-md border-white/10 py-1 shadow-2xl" : "bg-transparent border-transparent py-4 text-white"}`}>
          <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <img
                src="/fevi.PNG"
                alt="Sparesdeal Logo"
                className={`transition-all duration-700 ${isScrolled ? "h-6 md:h-10" : "h-8 md:h-12"} group-hover:scale-105`}
              />
              <span
                className={`font-serif font-bold tracking-tight transition-all duration-500 ${isScrolled ? "text-lg md:text-2xl text-white" : "text-xl md:text-3xl text-white"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sparesdeal
              </span>
            </Link>

            {/* Search - Desktop only */}
            <div className="flex-1 max-w-xl hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Search by part name, category, or brand..."
                  className="w-full bg-muted/10 backdrop-blur-md border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-secondary transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
              {/* Hide wishlist and login button labels on mobile */}
              {/* Hide wishlist and login button labels on mobile */}
              <Link to="/shop" className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs md:text-sm font-bold hover:bg-secondary/90 transition-all active:scale-95 shadow-lg">
                      <User className="w-4 h-4" />
                      <span className="hidden lg:inline">{user?.name || 'Account'}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white rounded-xl border-2 border-slate-900 shadow-2xl p-2">
                    <DropdownMenuLabel className="font-heading font-black uppercase text-[10px] tracking-widest text-slate-400 px-2 py-3">Account Manager</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <User className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-sm">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=orders')} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <PackageIcon className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-sm">Order History</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 transition-colors">
                      <LogOutIcon className="w-4 h-4" />
                      <span className="font-bold text-sm">Logout Session</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs md:text-sm font-bold hover:bg-secondary/90 transition-all active:scale-95 shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Login</span>
                </button>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className={`hidden md:block border-t transition-all duration-500 ${isScrolled ? "border-white/5 bg-black/20" : "border-white/10 bg-transparent"}`}>
            <div className="container mx-auto px-4">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.name} className="relative group">
                    {link.name === "Categories" ? (
                      <div>
                        <button
                          onMouseEnter={() => setDropdownOpen(true)}
                          className="flex items-center gap-1 px-4 py-2.5 text-sm font-black text-white hover:text-secondary transition-colors uppercase tracking-widest"
                        >
                          {link.name} <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              onMouseLeave={() => setDropdownOpen(false)}
                              className="absolute left-0 top-full w-64 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-b-xl overflow-hidden z-50"
                            >
                              <div className="py-2">
                                <Link
                                  to="/categories"
                                  onClick={() => setDropdownOpen(false)}
                                  className="block px-6 py-3 text-xs font-bold text-secondary hover:bg-white/5 transition-all uppercase tracking-widest border-b border-white/5"
                                >
                                  All Categories
                                </Link>
                                {categories.map((cat) => (
                                  <Link
                                    key={cat._id}
                                    to={`/shop?category=${cat._id}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className="block px-6 py-3 text-xs font-bold text-white/70 hover:text-secondary hover:bg-white/5 transition-all uppercase tracking-widest"
                                  >
                                    {cat.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={link.href} className="flex items-center gap-1 px-4 py-2.5 text-sm font-black text-white hover:text-secondary transition-colors uppercase tracking-widest">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              {latestCatalogue && (
                <div className="ml-auto">
                  <CatalogueModal trigger={
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 hover:shadow-secondary/30 transition-all shadow-lg shadow-secondary/20 group">
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> Digital Catalogue
                    </button>
                  } />
                </div>
              )}
            </div>
          </nav>

          <AnimatePresence>
            {searchOpen && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
                <form onSubmit={handleSearch} className="p-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      placeholder="Search parts catalog..."
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {
          mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-40 bg-card md:hidden"
            >
              <div className="pt-24 px-6 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} onClick={() => setMobileOpen(false)} className="block py-4 text-2xl font-heading font-black text-foreground border-b border-border hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                ))}
                {latestCatalogue && (
                  <CatalogueModal trigger={
                    <button className="w-full py-6 text-xl font-black text-secondary border-b border-border flex items-center justify-between group uppercase italic tracking-tighter text-left">
                      Catalogue
                      <span className="p-3 bg-secondary/10 rounded-2xl group-active:scale-95 transition-transform">
                        <Download className="w-6 h-6" />
                      </span>
                    </button>
                  } />
                )}
                <div className="pt-8 flex gap-3">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => { navigate('/profile'); setMobileOpen(false); }}
                        className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="flex-1 py-4 rounded-xl bg-red-500 text-white font-bold text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Login</button>
                      <button onClick={() => { navigate('/register'); setMobileOpen(false); }} className="flex-1 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-sm">Register</button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

export default Header;
