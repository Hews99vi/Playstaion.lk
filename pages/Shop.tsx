
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Platform, Category, Product } from '../types';
import SEO from '../components/SEO';

interface ShopProps {
  addToCart: (product: Product) => void;
  products: Product[];
}

const Shop: React.FC<ShopProps> = ({ addToCart, products }) => {
  const location = useLocation();
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (location.state?.filter) {
      const { type, value } = location.state.filter;
      if (type === 'platform') {
        setActivePlatform(value);
        setActiveCategory('All');
        setSearchQuery('');
      } else if (type === 'category') {
        setActiveCategory(value);
        setActivePlatform('All');
        setSearchQuery('');
      }
    }
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      setActivePlatform('All');
      setActiveCategory('All');
    }
  }, [location.state]);

  const platforms = ['All', ...Object.values(Platform)];
  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = products.filter(p => {
    const matchesPlatform = activePlatform === 'All' || p.platform === activePlatform;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPlatform && matchesCategory && matchesSearch;
  });

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-500';
      case 'Low Stock': return 'bg-amber-500';
      case 'Out of Stock': return 'bg-red-500';
      default: return 'bg-white/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 md:py-16 lg:py-24 flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-20">
      <SEO 
        title="Shop Gaming Hardware - PlayStation Consoles, Controllers & Games"
        description="Browse authentic PlayStation consoles, DualSense controllers, games, and accessories. Premium gaming hardware with verified authenticity and warranty in Sri Lanka."
        keywords="buy PS5 Sri Lanka, PlayStation store, gaming consoles online, DualSense controller, PS5 games Sri Lanka, gaming accessories"
      />
      <aside className="w-full lg:w-72 space-y-8 sm:space-y-10 lg:space-y-16 shrink-0">
        <div className="space-y-6 sm:space-y-7 md:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4 text-white/20">
            <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
            <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em]">Triage Filter</h4>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/20">Search Query</span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setActivePlatform('All');
                  setActiveCategory('All');
                }}
                placeholder="Search products..."
                className="w-full bg-white/[0.03] border border-white/10 px-3 sm:px-4 md:px-5 py-2.5 sm:py-2.5 md:py-3 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-1"
                  aria-label="Clear search"
                >
                  <Search className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/20">System Platform</span>
              <div className="flex flex-col gap-1">
                {platforms.map(p => (
                  <button 
                    key={p} 
                    onClick={() => { setActivePlatform(p); setActiveCategory('All'); }}
                    className={`w-full text-left px-3 sm:px-4 md:px-5 py-2.5 sm:py-2.5 md:py-3 text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all border-l-2 ${
                      activePlatform === p 
                        ? 'bg-white text-black border-white' 
                        : 'hover:bg-white/5 border-transparent text-white/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/20">Hardware Class</span>
              <div className="flex flex-col gap-1">
                {categories.map(c => (
                  <button 
                    key={c}
                    onClick={() => { setActiveCategory(c); setActivePlatform('All'); }}
                    className={`w-full text-left px-3 sm:px-4 md:px-5 py-2.5 sm:py-2.5 md:py-3 text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all border-l-2 ${
                      activeCategory === c 
                        ? 'bg-white text-black border-white' 
                        : 'hover:bg-white/5 border-transparent text-white/40'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 md:gap-8 border-b border-white/5 pb-5 sm:pb-6 md:pb-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter break-words">
              {searchQuery ? 'Search Results' : activePlatform !== 'All' ? activePlatform : activeCategory !== 'All' ? activeCategory : 'Universal'} <span className="text-outline">Archive</span>
            </h1>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              {searchQuery && <span className="text-white/40">Searching for "{searchQuery}" - </span>}
              {filteredProducts.length} Entries Identified
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 glass p-1 self-start sm:self-auto">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 sm:p-2.5 md:p-3 transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              aria-label="Grid view"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 sm:p-2.5 md:p-3 transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              aria-label="List view"
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        <div className={`grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className={`group glass flex ${viewMode === 'list' ? 'flex-col sm:flex-row sm:h-48 md:h-52' : 'flex-col'} ps-card-hover relative overflow-hidden`}>
              <div className={`relative ${viewMode === 'list' ? 'w-full sm:w-48 md:w-52 h-48 sm:h-full' : 'aspect-square'} overflow-hidden bg-black/40 border-r border-white/5 shrink-0`}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-1.5 h-1.5 rounded-full ${getStatusBg(product.stockStatus)}`}></div>
              </div>
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex-1 flex flex-col justify-between min-w-0">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[8px] font-black text-white/30 uppercase tracking-widest">{product.platform}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base md:text-lg leading-tight uppercase tracking-tight group-hover:text-white transition-colors break-words line-clamp-2">{product.name}</h3>
                </div>
                <div className="flex items-end justify-between mt-3 sm:mt-4">
                  <div className="font-black text-lg sm:text-xl md:text-2xl italic tracking-tighter">Rs. {product.price.toLocaleString()}</div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 sm:py-20 md:py-32 lg:py-40 text-center border border-dashed border-white/10 glass">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white/5 mx-auto mb-3 sm:mb-4 md:mb-6" />
              <h3 className="text-base sm:text-lg md:text-xl font-black italic text-white/20 uppercase tracking-[0.2em]">Zero Manifests Found</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
