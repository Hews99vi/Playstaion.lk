
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Box, Activity, DollarSign, Package, X, Save, Terminal, ShieldAlert, Layers, Home, ChevronUp, ChevronDown, Eye, EyeOff, Search } from 'lucide-react';
import { Product, Platform, Category, HomePageSection } from '../types';
import SEO from '../components/SEO';
import { sanitizeForDisplay, isCleanInput } from '../services/authService';

interface AdminProps {
  products: Product[];
  onUpdate: (p: Product) => void;
  onAdd: (p: Product) => void;
  onDelete: (id: string) => void;
}

const Admin: React.FC<AdminProps> = ({ products, onUpdate, onAdd, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [showModal, setShowModal] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showHomePageManager, setShowHomePageManager] = useState(false);
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('psl_categories');
    return saved ? JSON.parse(saved) : ['PlayStation', 'Consoles', 'Controllers', 'Laptops'];
  });
  const [newCategory, setNewCategory] = useState('');
  const [homePageSections, setHomePageSections] = useState<HomePageSection[]>(() => {
    const saved = localStorage.getItem('psl_homepage_sections');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'premier-archives',
        title: 'PREMIER ARCHIVES',
        subtitle: 'Inventory',
        accentColor: 'white',
        productIds: products.slice(0, 4).map(p => p.id),
        enabled: true
      },
      {
        id: 'elite-selection',
        title: 'ELITE SELECTION',
        subtitle: 'Featured Collection',
        accentColor: 'red',
        productIds: products.slice(4, 8).map(p => p.id),
        enabled: true
      },
      {
        id: 'fresh-inventory',
        title: 'FRESH INVENTORY',
        subtitle: 'Latest Arrivals',
        accentColor: 'blue',
        productIds: products.slice(8, 12).map(p => p.id),
        enabled: true
      }
    ];
  });
  const [editingSection, setEditingSection] = useState<HomePageSection | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStock, setFilterStock] = useState<string>('All');

  useEffect(() => {
    localStorage.setItem('psl_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('psl_homepage_sections', JSON.stringify(homePageSections));
  }, [homePageSections]);

  const stats = {
    totalValue: products.reduce((acc, p) => acc + p.price, 0),
    lowStock: products.filter(p => p.stockStatus === 'Low Stock').length,
    outOfStock: products.filter(p => p.stockStatus === 'Out of Stock').length,
    totalUnits: products.length
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'All' || p.platform === filterPlatform;
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesStock = filterStock === 'All' || p.stockStatus === filterStock;
    return matchesSearch && matchesPlatform && matchesCategory && matchesStock;
  });

  const handleEdit = (p: Product) => {
    setFormData(p);
    setEditingId(p.id);
    setImageUrls(p.images && p.images.length > 0 ? p.images : [p.image]);
    // Convert specs object to array for editing
    const specsArray = p.specs ? Object.entries(p.specs).map(([key, value]) => ({ key, value: String(value) })) : [{ key: '', value: '' }];
    setSpecs(specsArray.length > 0 ? specsArray : [{ key: '', value: '' }]);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      id: `hw-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      price: 0,
      image: '',
      images: [],
      platform: Platform.PLAYSTATION,
      category: Category.CONSOLES,
      stockStatus: 'In Stock',
      description: '',
      rating: 5,
      specs: {}
    });
    setImageUrls(['']);
    setSpecs([{ key: '', value: '' }]);
    setEditingId(null);
    setShowModal(true);
  };

  const handleSave = () => {
    const validImages = imageUrls.filter(url => url.trim() !== '');
    // Convert specs array to object, filtering out empty entries
    const specsObject: Record<string, string> = {};
    specs.forEach(spec => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObject[sanitizeForDisplay(spec.key.trim())] = sanitizeForDisplay(spec.value.trim());
      }
    });

    // Sanitize all text inputs to prevent XSS
    const sanitizedName = sanitizeForDisplay(formData.name || '');
    const sanitizedDescription = sanitizeForDisplay(formData.description || '');
    
    // Validate inputs for script injection
    if (!isCleanInput(sanitizedName) || !isCleanInput(sanitizedDescription)) {
      alert('Invalid input detected. Please remove any special characters or HTML tags.');
      return;
    }

    // Validate image URLs - only allow https
    const sanitizedImages = validImages.filter(url => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
      } catch {
        return false;
      }
    });

    const productData = {
      ...formData,
      name: sanitizedName,
      description: sanitizedDescription,
      image: sanitizedImages[0] || formData.image || 'https://via.placeholder.com/600',
      images: sanitizedImages,
      rating: formData.rating || 5,
      specs: specsObject
    } as Product;

    if (editingId) {
      onUpdate(productData);
    } else {
      onAdd(productData);
    }
    setShowModal(false);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageField = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpecField = (index: number) => {
    if (specs.length > 1) {
      setSpecs(specs.filter((_, i) => i !== index));
    }
  };

  const updateSpecKey = (index: number, key: string) => {
    const newSpecs = [...specs];
    newSpecs[index].key = key;
    setSpecs(newSpecs);
  };

  const updateSpecValue = (index: number, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index].value = value;
    setSpecs(newSpecs);
  };

  const addCategory = () => {
    const cleanCategory = sanitizeForDisplay(newCategory.trim());
    if (cleanCategory && !categories.includes(cleanCategory) && isCleanInput(cleanCategory)) {
      setCategories([...categories, cleanCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  // Home Page Management Functions
  const openHomePageEditor = () => {
    setShowHomePageManager(true);
  };

  const editSection = (section: HomePageSection) => {
    setEditingSection({ ...section });
    setSelectedProducts([...section.productIds]);
  };

  const saveSection = () => {
    if (!editingSection) return;
    const updated = {
      ...editingSection,
      productIds: selectedProducts
    };
    setHomePageSections(prev =>
      prev.map(s => s.id === updated.id ? updated : s)
    );
    setEditingSection(null);
    setSelectedProducts([]);
  };

  const addNewSection = () => {
    const newSection: HomePageSection = {
      id: `section-${Date.now()}`,
      title: 'NEW SECTION',
      subtitle: 'Custom Collection',
      accentColor: 'white',
      productIds: [],
      enabled: true
    };
    setHomePageSections(prev => [...prev, newSection]);
    editSection(newSection);
  };

  const deleteSection = (id: string) => {
    setHomePageSections(prev => prev.filter(s => s.id !== id));
  };

  const toggleSectionEnabled = (id: string) => {
    setHomePageSections(prev =>
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...homePageSections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setHomePageSections(newSections);
  };

  const moveSectionDown = (index: number) => {
    if (index === homePageSections.length - 1) return;
    const newSections = [...homePageSections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setHomePageSections(newSections);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-24 space-y-24">
      <SEO 
        title="Admin Dashboard - Product Management"
        description="Internal administration dashboard for inventory management."
        noindex={true}
        nofollow={true}
      />
      {/* Terminal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Terminal className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-500 tracking-[0.8em] uppercase">Control Terminal Access v4.2</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">SYSTEM <span className="text-outline">COMMAND.</span></h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={handleAddNew} className="btn-primary px-12 py-5 flex items-center gap-4 shadow-xl">
            INJECT NEW HARDWARE <Plus className="w-5 h-5" />
          </button>
          <button onClick={() => setShowCategoryManager(true)} className="btn-secondary px-12 py-5 flex items-center gap-4">
            MANAGE CATEGORIES <Layers className="w-5 h-5" />
          </button>
          <button onClick={openHomePageEditor} className="btn-secondary px-12 py-5 flex items-center gap-4">
            HOME PAGE CONTROL <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Inventory Liquidity', val: `Rs. ${stats.totalValue.toLocaleString()}`, icon: DollarSign },
          { label: 'Low Frequency Alerts', val: stats.lowStock, icon: ShieldAlert, color: 'text-amber-500' },
          { label: 'Integrity Failures', val: stats.outOfStock, icon: Package, color: 'text-red-500' },
          { label: 'Universal Node Count', val: stats.totalUnits, icon: Box },
        ].map((s, i) => (
          <div key={i} className="glass p-10 border-white/5 bg-black/40 hover:bg-white/[0.03] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
              <Activity className="w-12 h-12" />
            </div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color || 'text-white/10'}`} />
            </div>
            <div className={`text-3xl font-black italic tracking-tighter ${s.color || 'text-white'}`}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-8">
        <div className="glass p-10 border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Search Query</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, platform, category..."
                  className="w-full bg-white/[0.03] border border-white/10 pl-12 pr-6 py-4 text-white text-sm font-bold focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                  aria-label="Search products"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Platform</label>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 text-white text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all appearance-none"
                aria-label="Filter by platform"
              >
                <option value="All" className="bg-black">All Platforms</option>
                {Object.values(Platform).map(p => (
                  <option key={p} value={p} className="bg-black">{p}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 text-white text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all appearance-none"
                aria-label="Filter by category"
              >
                <option value="All" className="bg-black">All Categories</option>
                {Object.values(Category).map(c => (
                  <option key={c} value={c} className="bg-black">{c}</option>
                ))}
                {categories.filter(c => !Object.values(Category).includes(c as any)).map(c => (
                  <option key={c} value={c} className="bg-black">{c}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Stock Status</label>
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 text-white text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all appearance-none"
                aria-label="Filter by stock status"
              >
                <option value="All" className="bg-black">All Status</option>
                <option value="In Stock" className="bg-black">In Stock</option>
                <option value="Low Stock" className="bg-black">Low Stock</option>
                <option value="Out of Stock" className="bg-black">Out of Stock</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
              Showing <span className="text-white">{filteredProducts.length}</span> of <span className="text-white">{products.length}</span> Products
            </p>
            {(searchQuery || filterPlatform !== 'All' || filterCategory !== 'All' || filterStock !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterPlatform('All');
                  setFilterCategory('All');
                  setFilterStock('All');
                }}
                className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-wider transition-colors"
              >
                CLEAR ALL FILTERS
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Archive Table */}
      <div className="glass border-white/5 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5">
              <th className="p-10 text-[10px] font-black uppercase tracking-widest text-white/40">Hardware Identification</th>
              <th className="p-10 text-[10px] font-black uppercase tracking-widest text-white/40">Platform Registry</th>
              <th className="p-10 text-[10px] font-black uppercase tracking-widest text-white/40">Unit Value</th>
              <th className="p-10 text-[10px] font-black uppercase tracking-widest text-white/40">Integrity</th>
              <th className="p-10 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-20 text-center">
                  <Search className="w-12 h-12 text-white/5 mx-auto mb-6" />
                  <h3 className="text-xl font-black italic text-white/20 uppercase tracking-[0.2em]">No Products Found</h3>
                  <p className="text-[10px] font-black text-white/10 uppercase tracking-wider mt-3">Try adjusting your filters</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all group">
                <td className="p-10">
                  <div className="flex items-center gap-6">
                    <img src={p.image} className="w-14 h-14 grayscale group-hover:grayscale-0 transition-all border border-white/10 p-1" alt="" />
                    <div className="space-y-1">
                      <div className="text-base font-bold uppercase tracking-tight group-hover:text-white transition-colors">{p.name}</div>
                      <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em] group-hover:text-white/30 transition-colors">#{p.id.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="p-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{p.platform}</td>
                <td className="p-10 text-xl font-black italic tracking-tighter text-white/80 group-hover:text-white transition-colors">Rs. {p.price.toLocaleString()}</td>
                <td className="p-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${p.stockStatus === 'In Stock' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : p.stockStatus === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${p.stockStatus === 'In Stock' ? 'text-emerald-500' : p.stockStatus === 'Low Stock' ? 'text-amber-500' : 'text-red-500'}`}>
                      {p.stockStatus}
                    </span>
                  </div>
                </td>
                <td className="p-10 text-right">
                  <div className="flex gap-4 justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(p)} 
                      aria-label="Edit product"
                      className="p-3 border border-white/5 hover:border-white/20 hover:text-blue-400 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(p.id)} 
                      aria-label="Delete product"
                      className="p-3 border border-white/5 hover:border-white/20 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 backdrop-blur-3xl bg-black/90 overflow-y-auto">
          <div className="glass w-full max-w-6xl border-white/10 bg-[#050505] animate-in zoom-in-95 duration-500 shadow-3xl my-10">
            <div className="flex items-center justify-between p-12 border-b border-white/10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">HARDWARE FOUNDRY</h3>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">Core Manifest Injector v3.0</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                aria-label="Close modal"
                className="opacity-30 hover:opacity-100 transition-opacity p-4 hover:bg-white/5"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-16 max-h-[65vh] overflow-y-auto">
              {/* Left Column */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Primary Label</label>
                  <input 
                    value={formData.name || ''} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-lg font-bold placeholder:text-white/5"
                    placeholder="HARDWARE IDENTIFIER"
                    aria-label="Product name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Acquisition Value</label>
                    <input 
                      type="number" 
                      value={formData.price || ''} 
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-xl font-black italic"
                      placeholder="0"
                      aria-label="Product price"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Stock Status</label>
                    <select 
                      value={formData.stockStatus || 'In Stock'} 
                      onChange={e => setFormData({...formData, stockStatus: e.target.value as any})}
                      className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all uppercase text-[11px] font-black tracking-widest appearance-none"
                      aria-label="Stock status"
                    >
                      <option value="In Stock" className="bg-black">In Stock</option>
                      <option value="Low Stock" className="bg-black">Low Stock</option>
                      <option value="Out of Stock" className="bg-black">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Platform Node</label>
                  <select 
                    value={formData.platform || Platform.PLAYSTATION} 
                    onChange={e => setFormData({...formData, platform: e.target.value as any})}
                    className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all uppercase text-[11px] font-black tracking-widest appearance-none"
                    aria-label="Product platform"
                  >
                    {Object.values(Platform).map(p => <option key={p} value={p} className="bg-black">{p}</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Category</label>
                  <select 
                    value={formData.category || categories[0]} 
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                    className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all uppercase text-[11px] font-black tracking-widest appearance-none"
                    aria-label="Product category"
                  >
                    {Object.values(Category).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                    {categories.filter(c => !Object.values(Category).includes(c as any)).map(c => (
                      <option key={c} value={c} className="bg-black">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Manifest Data (Description)</label>
                  <textarea 
                    value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full h-40 bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-sm leading-relaxed resize-none"
                    placeholder="Enter technical description..."
                    aria-label="Product description"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Visual Signal URLs</label>
                    <button 
                      onClick={addImageField}
                      type="button"
                      className="text-[9px] font-black text-blue-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> Add Image
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="flex gap-3">
                        <input 
                          value={url} 
                          onChange={e => updateImageUrl(index, e.target.value)}
                          className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all text-xs font-mono"
                          placeholder={`Image URL ${index + 1}`}
                          aria-label={`Product image ${index + 1}`}
                        />
                        {imageUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="p-4 border border-white/10 hover:border-red-500 hover:text-red-500 transition-all"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Technical Specifications</label>
                    <button 
                      onClick={addSpecField}
                      type="button"
                      className="text-[9px] font-black text-blue-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> Add Spec
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex gap-3">
                        <input 
                          value={spec.key} 
                          onChange={e => updateSpecKey(index, e.target.value)}
                          className="w-1/3 bg-white/[0.03] border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all text-xs font-bold"
                          placeholder="Key (e.g., CPU)"
                          aria-label={`Spec key ${index + 1}`}
                        />
                        <input 
                          value={spec.value} 
                          onChange={e => updateSpecValue(index, e.target.value)}
                          className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all text-xs"
                          placeholder="Value (e.g., AMD Zen 2)"
                          aria-label={`Spec value ${index + 1}`}
                        />
                        {specs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpecField(index)}
                            className="p-4 border border-white/10 hover:border-red-500 hover:text-red-500 transition-all"
                            aria-label={`Remove spec ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 border-t border-white/10 flex justify-end gap-10">
              <button onClick={() => setShowModal(false)} className="text-[11px] font-black uppercase tracking-[0.4em] px-10 py-5 hover:text-white text-white/30 transition-colors">Abort Cycle</button>
              <button onClick={handleSave} className="btn-primary px-20 py-6 flex items-center gap-6 text-[11px]">
                {editingId ? 'COMMIT CHANGES' : 'INITIALIZE DEPLOYMENT'} <Save className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 backdrop-blur-3xl bg-black/90">
          <div className="glass w-full max-w-3xl border-white/10 bg-[#050505] animate-in zoom-in-95 duration-500 shadow-3xl">
            <div className="flex items-center justify-between p-12 border-b border-white/10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">CATEGORY CONTROL</h3>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">Taxonomy Management System</p>
              </div>
              <button 
                onClick={() => setShowCategoryManager(false)} 
                aria-label="Close category manager"
                className="opacity-30 hover:opacity-100 transition-opacity p-4 hover:bg-white/5"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-12 space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Add New Category</label>
                <div className="flex gap-4">
                  <input 
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addCategory()}
                    className="flex-1 bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-lg font-bold"
                    placeholder="Enter category name"
                    aria-label="New category name"
                  />
                  <button onClick={addCategory} className="btn-primary px-10 py-5 flex items-center gap-3">
                    <Plus className="w-5 h-5" /> ADD
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Current Categories (Core + Custom)</label>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map(cat => (
                    <div key={cat} className="glass p-6 border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                      <span className="font-bold uppercase tracking-tight">{cat}</span>
                      <button
                        onClick={() => removeCategory(cat)}
                        className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                        aria-label={`Remove ${cat} category`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-12 border-t border-white/10 flex justify-end">
              <button onClick={() => setShowCategoryManager(false)} className="btn-primary px-20 py-6 text-[11px]">
                SAVE & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Home Page Manager Modal */}
      {showHomePageManager && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 backdrop-blur-3xl bg-black/90 overflow-y-auto">
          <div className="glass w-full max-w-7xl border-white/10 bg-[#050505] animate-in zoom-in-95 duration-500 shadow-3xl my-10">
            <div className="flex items-center justify-between p-12 border-b border-white/10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">HOME PAGE CONTROL</h3>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">Product Section Manager v2.0</p>
              </div>
              <button 
                onClick={() => {
                  setShowHomePageManager(false);
                  setEditingSection(null);
                  setSelectedProducts([]);
                }} 
                aria-label="Close home page manager"
                className="opacity-30 hover:opacity-100 transition-opacity p-4 hover:bg-white/5"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-12">
              {!editingSection ? (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <p className="text-white/40 text-sm">Configure which products appear in each section of the home page.</p>
                    <button onClick={addNewSection} className="btn-primary px-10 py-4 flex items-center gap-3 text-[10px]">
                      <Plus className="w-4 h-4" /> ADD SECTION
                    </button>
                  </div>

                  <div className="space-y-4">
                    {homePageSections.map((section, index) => (
                      <div key={section.id} className={`glass p-8 border-white/5 ${!section.enabled ? 'opacity-50' : ''}`}>
                        <div className="flex items-start justify-between gap-8">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 bg-${section.accentColor}-500`}></div>
                              <h4 className="text-2xl font-black italic uppercase tracking-tighter">{section.title}</h4>
                              {!section.enabled && (
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-wider px-3 py-1 border border-white/10">Disabled</span>
                              )}
                            </div>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{section.subtitle}</p>
                            <div className="text-sm text-white/40">
                              Products: <span className="font-bold text-white">{section.productIds.length}</span> selected
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => moveSectionUp(index)}
                              disabled={index === 0}
                              className="p-3 border border-white/10 hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                              aria-label="Move section up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveSectionDown(index)}
                              disabled={index === homePageSections.length - 1}
                              className="p-3 border border-white/10 hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                              aria-label="Move section down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleSectionEnabled(section.id)}
                              className="p-3 border border-white/10 hover:border-white/30 transition-all"
                              aria-label={section.enabled ? "Disable section" : "Enable section"}
                            >
                              {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => editSection(section)}
                              className="p-3 border border-white/10 hover:border-blue-500 hover:text-blue-500 transition-all"
                              aria-label="Edit section"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSection(section.id)}
                              className="p-3 border border-white/10 hover:border-red-500 hover:text-red-500 transition-all"
                              aria-label="Delete section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <button
                    onClick={() => {
                      setEditingSection(null);
                      setSelectedProducts([]);
                    }}
                    className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-wider flex items-center gap-2"
                  >
                    ← BACK TO SECTIONS
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <h4 className="text-xl font-black italic uppercase tracking-tighter border-b border-white/10 pb-4">Section Settings</h4>
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Section Title</label>
                        <input 
                          value={editingSection.title} 
                          onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-lg font-bold uppercase"
                          placeholder="SECTION TITLE"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Section Subtitle</label>
                        <input 
                          value={editingSection.subtitle} 
                          onChange={e => setEditingSection({...editingSection, subtitle: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all text-sm"
                          placeholder="Subtitle text"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Accent Color</label>
                        <select 
                          value={editingSection.accentColor} 
                          onChange={e => setEditingSection({...editingSection, accentColor: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-white transition-all uppercase text-[11px] font-black tracking-widest appearance-none"
                          aria-label="Accent color"
                        >
                          <option value="white" className="bg-black">White</option>
                          <option value="red" className="bg-black">Red</option>
                          <option value="blue" className="bg-black">Blue</option>
                          <option value="green" className="bg-black">Green</option>
                          <option value="yellow" className="bg-black">Yellow</option>
                          <option value="purple" className="bg-black">Purple</option>
                        </select>
                      </div>

                      <div className="glass p-6 border-white/5 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 bg-${editingSection.accentColor}-500`}></div>
                          <span className="text-[10px] font-black text-white/30 uppercase">Preview</span>
                        </div>
                        <h5 className="text-2xl font-black italic uppercase tracking-tighter">{editingSection.title}</h5>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-wider">{editingSection.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h4 className="text-xl font-black italic uppercase tracking-tighter">Select Products</h4>
                        <span className="text-sm text-white/40">
                          <span className="font-bold text-white">{selectedProducts.length}</span> selected
                        </span>
                      </div>

                      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {products.map(product => (
                          <div
                            key={product.id}
                            onClick={() => toggleProductSelection(product.id)}
                            className={`glass p-4 border cursor-pointer transition-all ${
                              selectedProducts.includes(product.id)
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                checked={selectedProducts.includes(product.id)}
                                onChange={() => {}}
                                className="w-5 h-5"
                                aria-label={`Select ${product.name}`}
                              />
                              <img src={product.image} className="w-12 h-12 object-cover border border-white/10" alt="" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold uppercase tracking-tight truncate">{product.name}</div>
                                <div className="text-[9px] font-black text-white/20 uppercase tracking-wider">{product.platform}</div>
                              </div>
                              <div className="text-sm font-black italic">Rs. {product.price.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                    <button
                      onClick={() => {
                        setEditingSection(null);
                        setSelectedProducts([]);
                      }}
                      className="text-[11px] font-black uppercase tracking-[0.4em] px-10 py-5 hover:text-white text-white/30 transition-colors"
                    >
                      Cancel
                    </button>
                    <button onClick={saveSection} className="btn-primary px-20 py-6 flex items-center gap-6 text-[11px]">
                      SAVE SECTION <Save className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!editingSection && (
              <div className="p-12 border-t border-white/10 flex justify-end">
                <button 
                  onClick={() => {
                    setShowHomePageManager(false);
                    setEditingSection(null);
                    setSelectedProducts([]);
                  }} 
                  className="btn-primary px-20 py-6 text-[11px]"
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
