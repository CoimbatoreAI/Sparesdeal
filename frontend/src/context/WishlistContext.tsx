import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface WishlistContextType {
    wishlist: any[];
    toggleWishlist: (product: any) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<any[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('sparesdeal_wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sparesdeal_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product: any) => {
        const productId = product._id || product.id;
        setWishlist(prev => {
            const index = prev.findIndex(item => (item._id || item.id) === productId);
            if (index !== -1) {
                toast.info(`${product.name} removed from wishlist`);
                return prev.filter(item => (item._id || item.id) !== productId);
            } else {
                toast.success(`${product.name} added to wishlist!`);
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some(item => (item._id || item.id) === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
    return context;
};
