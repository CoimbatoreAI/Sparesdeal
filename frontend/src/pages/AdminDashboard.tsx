import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Trash2, Edit, LayoutDashboard, Package, ListTree, LogOut, Upload, X, Menu, BookOpen, MessageSquare, ExternalLink, Mail, Phone, Plus, Minus, Star, Settings } from 'lucide-react';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";

import { API_BASE, SERVER_URL } from '@/config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const [token, setToken] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [catalogues, setCatalogues] = useState<any[]>([]);
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [newSubCategory, setNewSubCategory] = useState({ name: '', category: '', description: '' });
    const [newProduct, setNewProduct] = useState({
        name: '', description: '', marketPrice: '', offerPrice: '', category: '', subCategory: '', stock: '1',
        amazonLink: '', flipkartLink: '', indiamartLink: '', isFeatured: false
    });
    const [specifications, setSpecifications] = useState<{ key: string, value: string }[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newCatalogue, setNewCatalogue] = useState({ title: '', description: '', category: '' });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedCatalogueFile, setSelectedCatalogueFile] = useState<File | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (!storedToken) {
            navigate('/admin/login');
        } else {
            setToken(storedToken);
            fetchData(storedToken);
        }
    }, [navigate]);

    const fetchData = async (overrideToken?: string) => {
        const authToken = overrideToken || token;
        if (!authToken) return;

        try {
            const headers = { 'Authorization': `Bearer ${authToken}` };
            const [catRes, subRes, prodRes, catalogRes, enquiryRes] = await Promise.all([
                fetch(`${API_BASE}/categories`, { headers }),
                fetch(`${API_BASE}/subcategories`, { headers }),
                fetch(`${API_BASE}/products`, { headers }),
                fetch(`${API_BASE}/catalogues`, { headers }),
                fetch(`${API_BASE}/enquiries`, { headers })
            ]);
            setCategories(await catRes.json());
            setSubCategories(await subRes.json());
            setProducts(await prodRes.json());
            setCatalogues(await catalogRes.json());
            setEnquiries(await enquiryRes.json());
        } catch (error) {
            toast.error('Failed to fetch data');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    // Category CRUD
    const handleCreateCategory = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCategory)
            });
            if (res.ok) {
                toast.success('Category created');
                setNewCategory({ name: '', description: '' });
                fetchData();
            }
        } catch (error) {
            toast.error('Error creating category');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE}/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Category deleted');
                fetchData();
            }
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    // SubCategory CRUD
    const handleCreateSubCategory = async () => {
        if (!newSubCategory.name || !newSubCategory.category) {
            toast.error('Please fill in both Category and Name');
            return;
        }

        const names = newSubCategory.name.split(',').map(n => n.trim()).filter(n => n !== '');

        try {
            setLoading(true);
            const internalPromises = names.map(name =>
                fetch(`${API_BASE}/subcategories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ ...newSubCategory, name })
                })
            );

            const results = await Promise.all(internalPromises);
            const allOk = results.every(res => res.ok);

            if (allOk) {
                toast.success(`Successfully created ${names.length} subcategory(s)`);
                setNewSubCategory(prev => ({ ...prev, name: '', description: '' }));
                fetchData();
            } else {
                toast.error('Some subcategories failed to create');
            }
        } catch (error) {
            toast.error('Error creating subcategories');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSubCategory = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE}/subcategories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Subcategory deleted');
                fetchData();
            }
        } catch (error) {
            toast.error('Error deleting subcategory');
        }
    };

    // Product CRUD
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleCreateProduct = async () => {
        setLoading(true);
        const formData = new FormData();

        // Base fields
        Object.entries(newProduct).forEach(([key, value]) => {
            if (value !== "" || key === 'stock' || key === 'isFeatured') {
                formData.append(key, value.toString());
            }
        });

        // Specifications conversion to object for backend Map
        const specsObj: { [key: string]: string } = {};
        specifications.forEach(s => {
            if (s.key && s.value) specsObj[s.key] = s.value;
        });
        formData.append('specifications', JSON.stringify(specsObj));

        selectedFiles.forEach(file => formData.append('images', file));

        try {
            const res = await fetch(`${API_BASE}/products`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                toast.success('Product created');
                setNewProduct({
                    name: '', description: '', marketPrice: '', offerPrice: '', category: '', subCategory: '', stock: '1',
                    amazonLink: '', flipkartLink: '', indiamartLink: '', isFeatured: false
                });
                setSpecifications([]);
                setSelectedFiles([]);
                fetchData();
            }
        } catch (error) {
            toast.error('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;
        setLoading(true);

        const formData = new FormData();
        const updateData = { ...editingProduct };

        Object.entries(updateData).forEach(([key, value]) => {
            if (key !== 'images' && key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'externalLinks' && key !== 'specifications') {
                if (value !== null && value !== undefined) {
                    // Safety for when category/subcategory objects might be present
                    if (typeof value === 'object' && (value as any)._id) {
                        formData.append(key, (value as any)._id);
                    } else {
                        formData.append(key, value.toString());
                    }
                }
            }
        });

        const specsObj: { [key: string]: string } = {};
        specifications.forEach(s => {
            if (s.key && s.value) specsObj[s.key] = s.value;
        });
        formData.append('specifications', JSON.stringify(specsObj));

        selectedFiles.forEach(file => formData.append('images', file));

        try {
            const res = await fetch(`${API_BASE}/products/${editingProduct._id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                toast.success('Product updated successfully');
                setIsEditModalOpen(false);
                setEditingProduct(null);
                setSpecifications([]);
                setSelectedFiles([]);
                fetchData();
            }
        } catch (error) {
            toast.error('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Product deleted');
                fetchData();
            }
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    // Catalogue Handling
    const handleCreateCatalogue = async () => {
        if (!selectedCatalogueFile) {
            toast.error("Please select a catalogue file");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("title", newCatalogue.title);
        formData.append("description", newCatalogue.description);
        if (newCatalogue.category && newCatalogue.category.trim() !== "") {
            formData.append("category", newCatalogue.category);
        }
        formData.append("file", selectedCatalogueFile);

        try {
            const res = await fetch(`${API_BASE}/catalogues`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                toast.success("Catalogue uploaded!");
                setNewCatalogue({ title: "", description: "", category: "" });
                setSelectedCatalogueFile(null);
                fetchData();
            }
        } catch (error) {
            toast.error("Error uploading catalogue");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCatalogue = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`${API_BASE}/catalogues/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            toast.success("Catalogue deleted");
            fetchData();
        } catch (error) {
            toast.error("Error deleting catalogue");
        }
    };

    const handleDeleteEnquiry = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        // Enquiry deletion route might need to be added, but for now just mock or assume it exists
        toast.info("Enquiry deletion not implemented yet in backend");
    };

    const sidebarContent = (
        <>
            <div className="p-6 flex flex-col items-center sm:items-start text-center sm:text-left border-b border-slate-800/50">
                <h1 className="text-2xl font-black text-white italic tracking-tighter">
                    Sparesdeal
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Management Portal</span>
                </h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Main Controls</div>
                <Button
                    onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <LayoutDashboard className={`mr-3 h-5 w-5 transition-transform duration-300 ${activeTab === 'products' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold tracking-tight">Dashboard Overview</span>
                </Button>
                <Button
                    onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'products' ? 'bg-slate-800/50 text-slate-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <Package className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-bold tracking-tight">Manage Inventory</span>
                </Button>
                <Button
                    onClick={() => { setActiveTab('categories'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'categories' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <ListTree className={`mr-3 h-5 w-5 transition-transform duration-300 ${activeTab === 'categories' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold tracking-tight">All Categories</span>
                </Button>
                <Button
                    onClick={() => { setActiveTab('subcategories'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'subcategories' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <PlusCircle className={`mr-3 h-5 w-5 transition-transform duration-300 ${activeTab === 'subcategories' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold tracking-tight">Subcategories</span>
                </Button>

                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-8 mb-4 px-2">Communications</div>
                <Button
                    onClick={() => { setActiveTab('enquiries'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'enquiries' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <MessageSquare className={`mr-3 h-5 w-5 transition-transform duration-300 ${activeTab === 'enquiries' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold tracking-tight">Enquiries</span>
                    {enquiries.length > 0 && <span className="ml-auto bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">{enquiries.length}</span>}
                </Button>
                <Button
                    onClick={() => { setActiveTab('catalogues'); setMobileMenuOpen(false); }}
                    variant="ghost"
                    className={`w-full justify-start transition-all duration-300 group ${activeTab === 'catalogues' ? 'bg-blue-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <BookOpen className={`mr-3 h-5 w-5 transition-transform duration-300 ${activeTab === 'catalogues' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold tracking-tight">Catalogues</span>
                </Button>
            </nav>
            <div className="p-4 border-t border-slate-800">
                <Button onClick={handleLogout} variant="destructive" className="w-full shadow-lg h-12 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] transition-transform active:scale-95">
                    <LogOut className="mr-2 h-4 w-4" /> Secure Logout
                </Button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 bg-slate-900 text-white flex-col h-screen sticky top-0 shadow-2xl z-20 overflow-hidden">
                {sidebarContent}
            </div>

            {/* Mobile Nav Bar */}
            <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-xl border-b border-slate-800">
                <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">
                    Sparesdeal
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white hover:bg-slate-800"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-72 h-full bg-slate-900 flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-4 right-4">
                                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-slate-800">
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            {sidebarContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <header className="hidden md:flex bg-white/80 backdrop-blur-xl border-b px-10 py-6 justify-between items-center sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic flex items-center gap-3">
                            {activeTab === 'products' ? (
                                <><Package className="h-6 w-6 text-blue-600" /> Inventory Control</>
                            ) : activeTab === 'categories' ? (
                                <><ListTree className="h-6 w-6 text-blue-600" /> Structure & Categories</>
                            ) : activeTab === 'subcategories' ? (
                                <><PlusCircle className="h-6 w-6 text-blue-600" /> Nested Subcategories</>
                            ) : activeTab === 'enquiries' ? (
                                <><MessageSquare className="h-6 w-6 text-blue-600" /> Customer Enquiries</>
                            ) : (
                                <><BookOpen className="h-6 w-6 text-blue-600" /> Digital Catalogues</>
                            )}
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Enterprise Asset Management</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-black text-slate-800 uppercase tracking-tight">System Admin</span>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase animate-pulse">● System Online</span>
                        </div>
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20 shadow-inner ring-4 ring-blue-50 transition-transform hover:scale-110 cursor-pointer">
                            A
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        {/* TabsList is hidden as sidebar now controls navigation */}

                        <TabsContent value="products">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Products Management</CardTitle>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-blue-600 hover:bg-blue-700 h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                                                <PlusCircle className="mr-2 h-4 w-4" /> Add New Asset
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl p-0 overflow-hidden border-2 border-slate-900 rounded-[2rem] shadow-2xl">
                                            <div className="bg-slate-900 p-8 text-white">
                                                <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase mb-2">Initialize New Product</DialogTitle>
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global Inventory Management System v2.0</p>
                                            </div>
                                            <Tabs defaultValue="basic" className="w-full">
                                                <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-white p-0 h-auto">
                                                    <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">1. Basic Info</TabsTrigger>
                                                    <TabsTrigger value="pricing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">2. Pricing & Market</TabsTrigger>
                                                    <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">3. Technical Specs</TabsTrigger>
                                                    <TabsTrigger value="media" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">4. Visual Assets</TabsTrigger>
                                                </TabsList>

                                                <div className="p-8 max-h-[60vh] overflow-y-auto">
                                                    <TabsContent value="basic" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Formal Product Designation</Label>
                                                            <Input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="h-14 rounded-xl border-2 border-slate-100 focus:border-blue-600 transition-all font-bold text-lg" placeholder="e.g. Industrial Grade Piston Pump X-900" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Classification</Label>
                                                                <Select onValueChange={v => setNewProduct({ ...newProduct, category: v })}>
                                                                    <SelectTrigger className="h-14 rounded-xl border-2 border-slate-100 font-bold"><SelectValue placeholder="Select Category" /></SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories.map(c => <SelectItem key={c._id} value={c._id} className="font-bold">{c.name}</SelectItem>)}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Functional Sub-Class</Label>
                                                                <Select onValueChange={v => setNewProduct({ ...newProduct, subCategory: v })}>
                                                                    <SelectTrigger className="h-14 rounded-xl border-2 border-slate-100 font-bold"><SelectValue placeholder="Select Subcategory" /></SelectTrigger>
                                                                    <SelectContent>
                                                                        {subCategories.filter(s => s.category?._id === newProduct.category || s.category === newProduct.category).map(s => (
                                                                            <SelectItem key={s._id} value={s._id} className="font-bold">{s.name}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Documentation / Description</Label>
                                                            <Textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="min-h-[120px] rounded-xl border-2 border-slate-100 focus:border-blue-600 transition-all font-medium leading-relaxed" placeholder="Detailed engineering parameters and application scope..." />
                                                        </div>
                                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-black uppercase text-[10px] tracking-widest italic">Promotional Spotlight</p>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Feature this asset on the primary showcase?</p>
                                                                </div>
                                                            </div>
                                                            <Switch
                                                                checked={newProduct.isFeatured}
                                                                onCheckedChange={(checked) => setNewProduct(prev => ({ ...prev, isFeatured: checked }))}
                                                            />
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="pricing" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                                        <div className="grid grid-cols-3 gap-8">
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Market Value (MSRP)</Label>
                                                                <div className="relative">
                                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                                                                    <Input type="number" value={newProduct.marketPrice} onChange={e => setNewProduct({ ...newProduct, marketPrice: e.target.value })} className="h-14 pl-8 rounded-xl border-2 border-slate-100 font-black text-xl" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-blue-600">Exclusive Sparesdeal Quote</Label>
                                                                <div className="relative">
                                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-blue-600">₹</span>
                                                                    <Input type="number" value={newProduct.offerPrice} onChange={e => setNewProduct({ ...newProduct, offerPrice: e.target.value })} className="h-14 pl-8 rounded-xl border-2 border-blue-600/30 bg-blue-50/30 font-black text-xl text-blue-700" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Inventory</Label>
                                                                <div className="relative">
                                                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                                    <Input type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="h-14 pl-12 rounded-xl border-2 border-slate-100 font-black text-xl" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-900 border-b pb-2">Global Marketplace Distribution</h4>
                                                            <div className="space-y-4">
                                                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                                                    <span className="text-[10px] font-black uppercase text-slate-400">Amazon.in</span>
                                                                    <Input placeholder="Direct Logistics Link..." value={newProduct.amazonLink} onChange={e => setNewProduct({ ...newProduct, amazonLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                                </div>
                                                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                                                    <span className="text-[10px] font-black uppercase text-slate-400">Flipkart</span>
                                                                    <Input placeholder="Marketplace URL..." value={newProduct.flipkartLink} onChange={e => setNewProduct({ ...newProduct, flipkartLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                                </div>
                                                                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                                                    <span className="text-[10px] font-black uppercase text-slate-400">IndiaMart</span>
                                                                    <Input placeholder="B2B Procurement Link..." value={newProduct.indiamartLink} onChange={e => setNewProduct({ ...newProduct, indiamartLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="specs" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                                        <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                                    <Settings className="w-4 h-4 text-slate-600" />
                                                                </div>
                                                                <p className="text-[10px] font-black uppercase tracking-widest">Engineering Matrix</p>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSpecifications([...specifications, { key: '', value: '' }])}
                                                                className="rounded-lg border-2 border-slate-900 font-black uppercase tracking-widest text-[8px] h-8"
                                                            >
                                                                <Plus className="mr-1 h-3 w-3" /> Add Parameter
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-3">
                                                            {specifications.length === 0 && (
                                                                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
                                                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No technical parameters defined yet</p>
                                                                </div>
                                                            )}
                                                            {specifications.map((spec, index) => (
                                                                <div key={index} className="flex gap-3 group animate-in zoom-in-95 duration-200">
                                                                    <Input
                                                                        placeholder="Parameter (e.g. Voltage)"
                                                                        value={spec.key}
                                                                        onChange={e => {
                                                                            const newSpecs = [...specifications];
                                                                            newSpecs[index].key = e.target.value;
                                                                            setSpecifications(newSpecs);
                                                                        }}
                                                                        className="h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest placeholder:italic"
                                                                    />
                                                                    <Input
                                                                        placeholder="Value (e.g. 240V)"
                                                                        value={spec.value}
                                                                        onChange={e => {
                                                                            const newSpecs = [...specifications];
                                                                            newSpecs[index].value = e.target.value;
                                                                            setSpecifications(newSpecs);
                                                                        }}
                                                                        className="h-12 rounded-xl font-black italic text-xs"
                                                                    />
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => setSpecifications(specifications.filter((_, i) => i !== index))}
                                                                        className="h-12 w-12 rounded-xl hover:bg-red-50 hover:text-red-500 text-slate-300 transition-colors"
                                                                    >
                                                                        <Minus className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="media" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                                        <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-12 text-center hover:border-blue-500/30 hover:bg-blue-50/30 transition-all cursor-pointer group" onClick={() => document.getElementById('file-upload-main')?.click()}>
                                                            <input
                                                                type="file"
                                                                multiple
                                                                className="hidden"
                                                                id="file-upload-main"
                                                                onChange={handleFileChange}
                                                            />
                                                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                                                <Upload className="h-10 w-10 text-blue-600" />
                                                            </div>
                                                            <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2">Ingest Product Imagery</h4>
                                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Click to browse secure storage or drag assets here</p>
                                                            <p className="mt-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Max 5 high-resolution blueprints/photos sanctioned</p>
                                                        </div>

                                                        {selectedFiles.length > 0 && (
                                                            <div className="grid grid-cols-4 gap-4 mt-6">
                                                                {selectedFiles.map((f, i) => (
                                                                    <div key={i} className="relative aspect-square bg-white rounded-2xl border-2 border-slate-100 p-2 overflow-hidden group shadow-sm">
                                                                        <div className="h-full w-full bg-slate-50 flex items-center justify-center text-[10px] font-black uppercase p-2 text-center text-slate-400 break-all leading-tight">
                                                                            {f.name}
                                                                        </div>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i));
                                                                            }}
                                                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                                                                        >
                                                                            <X className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </TabsContent>
                                                </div>

                                                <div className="p-8 border-t bg-slate-50 flex justify-end gap-4">
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" className="rounded-xl px-10 h-14 font-black uppercase tracking-widest text-[10px]">Cancel Transaction</Button>
                                                    </DialogTrigger>
                                                    <Button onClick={handleCreateProduct} className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl h-14 px-12 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all disabled:opacity-50" disabled={loading}>
                                                        {loading ? 'Encrypting Data...' : 'Finalize & Deploy Asset'}
                                                    </Button>
                                                </div>
                                            </Tabs>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Edit Dialog - Hidden by default, controlled by state */}
                                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                        <DialogContent className="max-w-4xl p-0 overflow-hidden border-2 border-slate-900 rounded-[2rem] shadow-2xl">
                                            <div className="bg-blue-600 p-8 text-white">
                                                <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase mb-2">Modify Deployment: {editingProduct?.name}</DialogTitle>
                                                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest italic">Inventory Ref ID: {editingProduct?._id || 'N/A'}</p>
                                            </div>
                                            <Tabs defaultValue="basic" className="w-full text-slate-900">
                                                <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-white p-0 h-auto">
                                                    <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">1. Update Core</TabsTrigger>
                                                    <TabsTrigger value="pricing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">2. Market Pricing</TabsTrigger>
                                                    <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">3. Parameters</TabsTrigger>
                                                    <TabsTrigger value="media" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/50 py-4 px-8 font-black uppercase text-[10px] tracking-widest">4. Asset Expansion</TabsTrigger>
                                                </TabsList>

                                                <div className="p-8 max-h-[60vh] overflow-y-auto">
                                                    <TabsContent value="basic" className="mt-0 space-y-6">
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Formal Designation</Label>
                                                            <Input value={editingProduct?.name || ''} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="h-14 rounded-xl border-2 border-slate-100 focus:border-blue-600 font-bold text-lg" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classification</Label>
                                                                <Select value={editingProduct?.category?._id || editingProduct?.category || ''} onValueChange={v => setEditingProduct({ ...editingProduct, category: v })}>
                                                                    <SelectTrigger className="h-14 rounded-xl border-2 border-slate-100 font-bold"><SelectValue placeholder="Select Category" /></SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories.map(c => <SelectItem key={c._id} value={c._id} className="font-bold">{c.name}</SelectItem>)}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Functional Sub-Class</Label>
                                                                <Select value={editingProduct?.subCategory?._id || editingProduct?.subCategory || ''} onValueChange={v => setEditingProduct({ ...editingProduct, subCategory: v })}>
                                                                    <SelectTrigger className="h-14 rounded-xl border-2 border-slate-100 font-bold"><SelectValue placeholder="Select Subcategory" /></SelectTrigger>
                                                                    <SelectContent>
                                                                        {subCategories.filter(s => s.category?._id === (editingProduct?.category?._id || editingProduct?.category) || s.category === (editingProduct?.category?._id || editingProduct?.category)).map(s => (
                                                                            <SelectItem key={s._id} value={s._id} className="font-bold">{s.name}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Description</Label>
                                                            <Textarea value={editingProduct?.description || ''} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="min-h-[120px] rounded-xl border-2 border-slate-100 focus:border-blue-600 font-medium leading-relaxed" />
                                                        </div>
                                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-black uppercase text-[10px] tracking-widest italic text-slate-900">Promotional Spotlight</p>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active showcase status?</p>
                                                                </div>
                                                            </div>
                                                            <Switch
                                                                checked={editingProduct?.isFeatured || false}
                                                                onCheckedChange={(checked) => setEditingProduct(prev => ({ ...prev, isFeatured: checked }))}
                                                            />
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="pricing" className="mt-0 space-y-8">
                                                        <div className="grid grid-cols-3 gap-8">
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Market Value (MSRP)</Label>
                                                                <div className="relative text-slate-900">
                                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                                                                    <Input type="number" value={editingProduct?.marketPrice || ''} onChange={e => setEditingProduct({ ...editingProduct, marketPrice: e.target.value })} className="h-14 pl-8 rounded-xl border-2 border-slate-100 font-black text-xl" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-blue-600">Sparesdeal Quote</Label>
                                                                <div className="relative text-slate-900">
                                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-blue-600">₹</span>
                                                                    <Input type="number" value={editingProduct?.offerPrice || ''} onChange={e => setEditingProduct({ ...editingProduct, offerPrice: e.target.value })} className="h-14 pl-8 rounded-xl border-2 border-blue-600/30 bg-blue-50/30 font-black text-xl text-blue-700" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</Label>
                                                                <div className="relative text-slate-900">
                                                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                                    <Input type="number" value={editingProduct?.stock || ''} onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value })} className="h-14 pl-12 rounded-xl border-2 border-slate-100 font-black text-xl" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6 text-slate-900">
                                                            <h4 className="font-black uppercase tracking-widest text-[10px] border-b pb-2">Global Marketplace URLs</h4>
                                                            <div className="space-y-4">
                                                                <Input placeholder="Amazon.in" value={editingProduct?.amazonLink || ''} onChange={e => setEditingProduct({ ...editingProduct, amazonLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                                <Input placeholder="Flipkart" value={editingProduct?.flipkartLink || ''} onChange={e => setEditingProduct({ ...editingProduct, flipkartLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                                <Input placeholder="IndiaMart" value={editingProduct?.indiamartLink || ''} onChange={e => setEditingProduct({ ...editingProduct, indiamartLink: e.target.value })} className="h-12 rounded-xl border-slate-100 font-bold italic" />
                                                            </div>
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="specs" className="mt-0 space-y-6">
                                                        <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-900">
                                                            <p className="text-[10px] font-black uppercase tracking-widest">Parameter Modification</p>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSpecifications([...specifications, { key: '', value: '' }])}
                                                                className="rounded-lg border-2 border-slate-900 font-black uppercase tracking-widest text-[8px] h-8"
                                                            >
                                                                <Plus className="mr-1 h-3 w-3" /> Insert New
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-3 text-slate-900">
                                                            {specifications.map((spec, index) => (
                                                                <div key={index} className="flex gap-3">
                                                                    <Input placeholder="Key" value={spec.key} onChange={e => {
                                                                        const newSpecs = [...specifications];
                                                                        newSpecs[index].key = e.target.value;
                                                                        setSpecifications(newSpecs);
                                                                    }} className="h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest" />
                                                                    <Input placeholder="Value" value={spec.value} onChange={e => {
                                                                        const newSpecs = [...specifications];
                                                                        newSpecs[index].value = e.target.value;
                                                                        setSpecifications(newSpecs);
                                                                    }} className="h-12 rounded-xl font-black italic text-xs" />
                                                                    <Button variant="ghost" size="icon" onClick={() => setSpecifications(specifications.filter((_, i) => i !== index))} className="h-12 w-12 rounded-xl hover:bg-red-50 hover:text-red-500 text-slate-300">
                                                                        <Minus className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </TabsContent>

                                                    <TabsContent value="media" className="mt-0 space-y-6 text-slate-900">
                                                        <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Existing Media Inventory</h4>
                                                            <div className="flex flex-wrap gap-4">
                                                                {editingProduct?.images?.map((img: string, i: number) => (
                                                                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                                        <img src={`${SERVER_URL}${img}`} className="w-full h-full object-cover" alt="" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Note: Uploading new assets below will replace the current visual cache during this update session.</p>
                                                        </div>
                                                        <div className="border-4 border-dashed border-slate-100 rounded-2xl p-8 text-center" onClick={() => document.getElementById('file-upload-edit')?.click()}>
                                                            <input type="file" multiple className="hidden" id="file-upload-edit" onChange={handleFileChange} />
                                                            <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                                            <p className="text-[10px] font-black uppercase tracking-widest">Append New Media</p>
                                                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">{selectedFiles.length} new files ready</p>
                                                        </div>
                                                    </TabsContent>
                                                </div>

                                                <div className="p-8 border-t bg-slate-50 flex justify-end gap-4">
                                                    <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="rounded-xl px-10 h-14 font-black uppercase tracking-widest text-[10px]">Abandon Changes</Button>
                                                    <Button onClick={handleUpdateProduct} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 px-12 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all disabled:opacity-50" disabled={loading}>
                                                        {loading ? 'Committing Changes...' : 'Authorize Cloud Sync'}
                                                    </Button>
                                                </div>
                                            </Tabs>
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/50">
                                            <TableRow className="border-b border-slate-100 hover:bg-transparent">
                                                <TableHead className="w-[100px] font-black uppercase text-[10px] tracking-widest text-slate-400 pl-8 h-16">Visual</TableHead>
                                                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Identity & SKU</TableHead>
                                                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Classification</TableHead>
                                                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Financials</TableHead>
                                                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Analytics</TableHead>
                                                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-slate-400 pr-8">Operations</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((p) => (
                                                <TableRow key={p._id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors h-24">
                                                    <TableCell className="pl-8">
                                                        <div className="relative">
                                                            <img src={`${SERVER_URL}${p.images[0]}`} alt={p.name} className="h-16 w-16 object-cover rounded-2xl shadow-sm border-2 border-white group-hover:scale-110 transition-transform ring-1 ring-slate-100" />
                                                            {p.isFeatured && (
                                                                <div className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-lg p-1 shadow-lg ring-2 ring-white">
                                                                    <Star className="w-3 h-3 fill-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-slate-800 uppercase tracking-tighter italic text-sm group-hover:text-blue-600 transition-colors uppercase">{p.name}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5">ID: {p._id.slice(-8).toUpperCase()}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-blue-50 text-blue-600 w-fit uppercase tracking-widest border border-blue-100">{p.category?.name || 'Primary'}</span>
                                                            {p.subCategory && <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-emerald-50 text-emerald-600 w-fit uppercase tracking-widest border border-emerald-100 italic">{p.subCategory?.name}</span>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-black text-slate-900 italic tracking-tighter">₹{p.offerPrice ? p.offerPrice.toLocaleString() : p.marketPrice.toLocaleString()}</span>
                                                            {p.offerPrice && <span className="text-[10px] text-slate-300 line-through font-bold tracking-tighter italic">₹{p.marketPrice.toLocaleString()}</span>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 group/stat">
                                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover/stat:bg-blue-600 transition-colors">
                                                                <Package className="w-4 h-4 text-slate-400 group-hover/stat:text-white transition-colors" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black text-slate-800 tracking-tighter">{p.viewCount || 0}</span>
                                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Views</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right pr-8">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setEditingProduct({
                                                                        ...p,
                                                                        category: p.category?._id || p.category,
                                                                        subCategory: p.subCategory?._id || p.subCategory,
                                                                        amazonLink: p.externalLinks?.amazon || '',
                                                                        flipkartLink: p.externalLinks?.flipkart || '',
                                                                        indiamartLink: p.externalLinks?.indiamart || ''
                                                                    });
                                                                    // Convert map to array for frontend
                                                                    const specsMap = p.specifications || {};
                                                                    setSpecifications(Object.entries(specsMap).map(([key, value]) => ({ key, value: String(value) })));
                                                                    setIsEditModalOpen(true);
                                                                }}
                                                                className="h-10 w-10 rounded-xl border-2 border-slate-900 p-0 hover:bg-slate-900 hover:text-white transition-all shadow-md active:scale-95"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeleteProduct(p._id)}
                                                                className="h-10 w-10 rounded-xl border-2 border-red-200 p-0 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md active:scale-95"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Similar sections for Categories and Subcategories */}
                        <TabsContent value="categories">
                            <div className="grid grid-cols-3 gap-6">
                                <Card className="col-span-1">
                                    <CardHeader><CardTitle>Add Category</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Name</Label>
                                            <Input value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
                                        </div>
                                        <Button onClick={handleCreateCategory} className="w-full">Create Category</Button>
                                    </CardContent>
                                </Card>
                                <Card className="col-span-2">
                                    <CardHeader><CardTitle>All Categories</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {categories.map(c => (
                                                    <TableRow key={c._id}>
                                                        <TableCell className="font-medium">{c.name}</TableCell>
                                                        <TableCell className="text-slate-500 truncate max-w-xs">{c.description}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteCategory(c._id)}><Trash2 className="h-4 w-4" /></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="subcategories">
                            <div className="grid grid-cols-3 gap-6">
                                <Card className="col-span-1">
                                    <CardHeader><CardTitle>Add Subcategory</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Parent Category</Label>
                                            <Select
                                                value={newSubCategory.category}
                                                onValueChange={v => setNewSubCategory({ ...newSubCategory, category: v })}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Subcategory Name(s)</Label>
                                            <Input
                                                placeholder="e.g. Bearings, Gears, Belts"
                                                value={newSubCategory.name}
                                                onChange={e => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
                                            />
                                            <p className="text-[10px] text-slate-400 italic">Separate multiple names with commas to add them all at once</p>
                                        </div>
                                        <Button onClick={handleCreateSubCategory} className="w-full">Create Subcategory</Button>
                                    </CardContent>
                                </Card>
                                <Card className="col-span-2">
                                    <CardHeader><CardTitle>All Subcategories</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {subCategories.map(s => (
                                                    <TableRow key={s._id}>
                                                        <TableCell className="font-medium">{s.name}</TableCell>
                                                        <TableCell>{s.category?.name}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteSubCategory(s._id)}><Trash2 className="h-4 w-4" /></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="catalogues">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Digital Catalogues</CardTitle>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                <Upload className="mr-2 h-4 w-4" /> Upload Catalogue
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader><DialogTitle>Upload New Catalogue</DialogTitle></DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Catalogue Title</Label>
                                                    <Input value={newCatalogue.title} onChange={e => setNewCatalogue({ ...newCatalogue, title: e.target.value })} placeholder="e.g. Bearings Technical Guide 2024" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Main Category</Label>
                                                    <Select onValueChange={v => setNewCatalogue({ ...newCatalogue, category: v })}>
                                                        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                                        <SelectContent>
                                                            {categories.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Catalogue File (PDF/Image)</Label>
                                                    <Input type="file" onChange={(e) => e.target.files && setSelectedCatalogueFile(e.target.files[0])} />
                                                </div>
                                                <Button onClick={handleCreateCatalogue} className="w-full bg-blue-600" disabled={loading}>
                                                    {loading ? 'Uploading...' : 'Upload Now'}
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Date Added</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {catalogues.map((c) => (
                                                <TableRow key={c._id}>
                                                    <TableCell className="font-bold underline decoration-blue-500/30">
                                                        <a href={`${SERVER_URL}${c.fileUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                                                            {c.title} <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>{c.category?.name || 'Uncategorized'}</TableCell>
                                                    <TableCell className="text-slate-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteCatalogue(c._id)}><Trash2 className="h-4 w-4" /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="enquiries">
                            <Card>
                                <CardHeader><CardTitle>Customer Inquiries ({enquiries.length})</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {enquiries.map((e) => (
                                            <div key={e._id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-black text-slate-800 uppercase tracking-tighter italic text-xl">{e.name}</h3>
                                                        <div className="flex gap-4 mt-1 text-xs font-bold text-slate-500">
                                                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</span>
                                                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {e.phone || 'No phone'}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-400 uppercase tracking-widest">
                                                        {new Date(e.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 bg-white p-4 rounded-xl border border-slate-100 text-sm leading-relaxed mb-4 italic">
                                                    "{e.message}"
                                                </p>
                                                {e.attachments?.length > 0 && (
                                                    <div className="flex flex-wrap gap-3">
                                                        {e.attachments.map((file: string, idx: number) => (
                                                            <a
                                                                key={idx}
                                                                href={`${SERVER_URL}${file}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
                                                            >
                                                                <Upload className="w-3 h-3 rotate-180" /> Attachment {idx + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {enquiries.length === 0 && (
                                            <div className="text-center py-20 text-slate-400">
                                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                                <p className="font-bold uppercase tracking-widest text-xs italic">No enquiries yet</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
