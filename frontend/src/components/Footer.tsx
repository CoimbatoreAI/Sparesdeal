import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-black text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* About */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/fevi.PNG" alt="Sparesdeal Logo" className="h-10 md:h-12 w-auto" />
              <span
                className="font-serif font-bold text-2xl md:text-3xl text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sparesdeal
              </span>
            </Link>
          </div>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
            India's trusted supplier of high-tensile stainless steel wire ropes, industrial O rings, and essential spares. Built in Coimbatore for engineering excellence.
          </p>
          <div className="flex gap-6 mt-4">
            {[
              {
                name: "Facebook",
                href: "https://www.facebook.com/Sparesdeal7",
                viewBox: "0 0 24 24",
                svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              },
              {
                name: "Instagram",
                href: "https://www.instagram.com/gowthampandiyaraj/",
                viewBox: "0 0 24 24",
                svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              },
              {
                name: "YouTube",
                href: "https://www.youtube.com/@Sparesdeal",
                viewBox: "0 0 24 24",
                svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              },
              {
                name: "X",
                href: "https://x.com/sparesdeal",
                viewBox: "0 0 24 24",
                svg: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.291 19.486h2.039L6.486 3.24H4.298l13.312 17.399z" />
              },
              {
                name: "Threads",
                href: "https://www.threads.net/@gowthampandiyaraj",
                viewBox: "0 0 192 192",
                svg: <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
              },
            ].map(({ svg, href, name, viewBox }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary hover:scale-110 transition-all duration-300" aria-label={name}>
                <svg viewBox={viewBox} className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  {svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links sections */}
        <div>
          <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Information</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link to="/shop" className="hover:text-secondary transition-colors">Online Shopping</Link></li>
            <li><Link to="/categories" className="hover:text-secondary transition-colors">Categories</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            <li><Link to="/refund-policy" className="hover:text-secondary transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Policies</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:text-secondary transition-colors">Refund Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-secondary transition-colors">Shipping Policy</Link></li>
            <li><Link to="/contact-info" className="hover:text-secondary transition-colors">Contact Information</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6 text-sm uppercase tracking-widest text-secondary">Contact</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0" />
              <span>No.9/848-3, Kovai Gardens, Pachapalayam, Coimbatore – 641010, Tamil Nadu, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <span>+91 97904 57793</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <span>sparesdeal7@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-white/5">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/30">
        <span>© {new Date().getFullYear()} sparesdeal. All rights reserved.</span>
        <div className="flex gap-8">
          <Link to="/privacy-policy" className="hover:text-secondary transition-colors tracking-widest">PRIVACY POLICY</Link>
          <Link to="/terms-of-service" className="hover:text-secondary transition-colors tracking-widest">TERMS AND POLICIES</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
