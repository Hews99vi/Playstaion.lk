
import React, { useState, useEffect } from 'react';
import { ArrowRight, Settings, Triangle, Circle, Square, X, Cpu, Activity, Signal, ShieldCheck, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, Category, Platform, HomePageSection } from '../types';
import SEO from '../components/SEO';

interface HomeProps {
  addToCart: (product: Product) => void;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ addToCart, products }) => {
  const [homePageSections, setHomePageSections] = useState<HomePageSection[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('psl_homepage_sections');
    if (saved) {
      setHomePageSections(JSON.parse(saved));
    } else {
      // Default sections if nothing is saved
      setHomePageSections([
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
      ]);
    }
  }, [products]);

  const getProductsForSection = (section: HomePageSection): Product[] => {
    return section.productIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);
  };

  const getAccentColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      white: 'white/20',
      red: 'red-500/40',
      blue: 'blue-500/40',
      green: 'green-500/40',
      yellow: 'yellow-500/40',
      purple: 'purple-500/40'
    };
    return colorMap[color] || 'white/20';
  };

  const getTextAccentColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      white: 'white/30',
      red: 'red-500/50',
      blue: 'blue-500/50',
      green: 'green-500/50',
      yellow: 'yellow-500/50',
      purple: 'purple-500/50'
    };
    return colorMap[color] || 'white/30';
  };
  const categoryTiles = [
    { 
      label: 'PlayStation', 
      sub: 'Primary Ecosystem', 
      icon: Triangle, 
      img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop',
      filter: { type: 'platform', value: Platform.PLAYSTATION }
    },
    { 
      label: 'Consoles', 
      sub: 'Omni Hardware', 
      icon: Circle, 
      img: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=800&auto=format&fit=crop',
      filter: { type: 'category', value: Category.CONSOLES }
    },
    { 
      label: 'Controllers', 
      sub: 'Tactile Interface', 
      icon: Square, 
      img: 'https://images.unsplash.com/photo-1592840331052-16e15c2c6f95?q=80&w=800&auto=format&fit=crop',
      filter: { type: 'category', value: Category.CONTROLLERS }
    },
    { 
      label: 'Laptops', 
      sub: 'High-Fidelity Mobile', 
      icon: X, 
      img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop',
      filter: { type: 'category', value: Category.LAPTOPS }
    },
  ];

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-500';
      case 'Low Stock': return 'bg-amber-500';
      case 'Out of Stock': return 'bg-red-500';
      default: return 'bg-white/30';
    }
  };

  return (
    <div className="relative bg-black overflow-x-hidden">
      <SEO 
        title="Home - Premium PlayStation Hardware & Repair Services"
        description="Sri Lanka's definitive authority for authentic PlayStation consoles, controllers, games, and expert repair services. Premium gaming hardware with professional technical restoration in Colombo."
        keywords="PlayStation Sri Lanka, PS5, gaming consoles, console repair, DualSense, gaming hardware Colombo, authentic PlayStation, PS5 repair Sri Lanka"
        type="website"
      />
      {/* HERO SECTION - Professional Split Screen */}
      <section 
        className="relative h-[78vh] lg:h-auto lg:min-h-[100vh] flex flex-col lg:flex-row overflow-hidden bg-cover bg-no-repeat lg:!bg-none"
        style={{ backgroundImage: "url('/assets/hero-ps5.jpg')", backgroundPosition: '85% 12%' }}
      >
        {/* Mobile-only dark overlay for text readability */}
        <div className="absolute inset-0 z-10 lg:hidden" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.35) 100%)' }}></div>
        
        {/* LEFT SIDE - Bold Typography */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center px-5 sm:px-6 md:px-12 lg:px-16 xl:px-24 pt-16 sm:pt-20 lg:py-16 pb-6 sm:pb-10 lg:pb-16 z-20 bg-transparent lg:bg-black">
          <div className="max-w-xl w-full">
            
            {/* Minimal Tag */}
            <div className="mb-6 sm:mb-8 md:mb-10 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-white/30 uppercase border-l-2 border-white/20 pl-3 sm:pl-4">
                Precision Engineered Gaming
              </span>
            </div>
            
            {/* Main Headline - Two Line Design */}
            <div className="space-y-1 sm:space-y-2 md:space-y-3 mb-8 sm:mb-10 md:mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
              <h1 className="font-black leading-none uppercase text-white tracking-tighter">
                <div className="text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] whitespace-nowrap">
                  MASTER THE
                </div>
                <div className="text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] whitespace-nowrap">
                  EXPERIENCE
                </div>
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-red-500 to-transparent mt-4 sm:mt-6"></div>
            </div>
            
            {/* Description */}
            <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-lg opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              Elevate your gameplay with authentic PlayStation hardware. Professional repairs, genuine parts, expert care for your gaming investment.
            </p>
            
            {/* Button Layout */}
            <div className="flex flex-row sm:flex-row gap-2.5 sm:gap-4 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
              <Link 
                to="/shop" 
                className="group relative overflow-hidden bg-white text-black flex-1 sm:flex-none px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 font-black text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-all duration-500 hover:bg-gray-100 text-center active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  SHOP NOW
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
              </Link>
              <Link 
                to="/repairs" 
                className="group flex-1 sm:flex-none px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 font-black text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] uppercase border border-white/30 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 text-center active:scale-[0.97] backdrop-blur-sm"
              >
                REPAIR
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </Link>
            </div>
            
          </div>
        </div>
        
        {/* RIGHT SIDE - Full Controller Image (desktop only) */}
        <div className="hidden lg:block relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-1/2 lg:h-full z-10">
          <div className="relative w-full h-full">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10"></div>
            
            {/* Controller Image */}
            <img 
              src="/assets/hero-ps5.jpg" 
              alt="DualSense Wireless Controller" 
              className="w-full h-full object-cover object-center brightness-90 contrast-110 saturate-125"
            />
          </div>
        </div>
        
      </section>

      {/* Subsequent sections below the fold */}
      <div className="space-y-14 sm:space-y-24 lg:space-y-32 pb-24 sm:pb-24 lg:pb-32 mt-10 sm:mt-16 lg:mt-24 relative z-10">
        {/* Minimal Category Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-1">
            {categoryTiles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={idx}
                  to="/shop"
                  state={{ filter: item.filter }}
                  className="group relative glass min-h-[180px] sm:min-h-[300px] md:min-h-[320px] overflow-hidden flex flex-col justify-end p-4 sm:p-7 md:p-8 ps-card-hover"
                >
                  <div className="absolute inset-0 z-0">
                    <video 
                      src="/assets/category cardvid.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100 brightness-[0.3] group-hover:brightness-[0.5]"
                    />
                  </div>
                  <div className="absolute top-8 right-8 opacity-[0.02] transition-all z-10">
                    <Icon className="w-16 h-16" />
                  </div>
                  <div className="relative z-20 space-y-0.5 sm:space-y-1">
                    <span className="text-[7px] sm:text-[8px] font-black text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em]">{item.sub}</span>
                    <h3 className="text-xl sm:text-3xl font-black italic uppercase tracking-tighter leading-tight">{item.label}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Minimal Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 lg:mb-16 gap-4 sm:gap-8">
            <div className="space-y-1.5 sm:space-y-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-6 sm:w-10 h-[1px] bg-white/20"></div>
                <span className="text-[8px] sm:text-[9px] font-black text-white/30 tracking-[0.3em] sm:tracking-[0.4em] uppercase">Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">PREMIER <span className="text-outline">ARCHIVES</span></h2>
            </div>
            <Link to="/shop" className="text-[8px] sm:text-[9px] font-black tracking-[0.3em] text-white/30 hover:text-white transition-all uppercase self-start md:self-auto">VIEW ALL →</Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-1">
            {products.slice(0, 4).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col ps-card-hover glass">
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${getStatusBg(product.stockStatus)}`}></div>
                  </div>
                </div>
                <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col space-y-2 sm:space-y-4">
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{product.platform}</span>
                    <h3 className="font-bold text-[11px] sm:text-base leading-tight uppercase tracking-tight line-clamp-2">{product.name}</h3>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="font-black text-sm sm:text-xl tracking-tighter italic">Rs. {product.price.toLocaleString()}</div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                      <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dynamic Product Sections */}
        {homePageSections.filter(section => section.enabled).map((section) => {
          const sectionProducts = getProductsForSection(section);
          if (sectionProducts.length === 0) return null;

          return (
            <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-8">
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-6 sm:w-10 h-[1px] bg-${getAccentColorClass(section.accentColor)}`}></div>
                    <span className={`text-[8px] sm:text-[9px] font-black text-${getTextAccentColorClass(section.accentColor)} tracking-[0.3em] sm:tracking-[0.4em] uppercase`}>
                      {section.subtitle}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                    {section.title.split(' ').map((word, i) => 
                      i === section.title.split(' ').length - 1 ? (
                        <span key={i} className="text-outline">{word}</span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </h2>
                </div>
                <Link to="/shop" className="text-[8px] sm:text-[9px] font-black tracking-[0.3em] text-white/30 hover:text-white transition-all uppercase self-start md:self-auto">
                  VIEW ALL →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-1">
                {sectionProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col ps-card-hover glass">
                    <div className="relative aspect-square overflow-hidden bg-black/40">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${getStatusBg(product.stockStatus)}`}></div>
                      </div>
                    </div>
                    <div className="p-3 sm:p-6 flex-1 flex flex-col space-y-2 sm:space-y-4">
                      <div className="space-y-0.5 sm:space-y-1">
                        <span className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{product.platform}</span>
                        <h3 className="font-bold text-[11px] sm:text-base leading-tight uppercase tracking-tight line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="mt-auto flex items-end justify-between">
                        <div className="font-black text-sm sm:text-xl tracking-tighter italic">Rs. {product.price.toLocaleString()}</div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                          <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Engineering Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="glass p-8 sm:p-12 md:p-24 border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-t-2 border-r-2 border-white/5 transition-all group-hover:w-40 group-hover:h-40 group-hover:border-white/20"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-16 lg:gap-20 relative z-10">
              <div className="lg:w-3/5 space-y-6 sm:space-y-10 text-center lg:text-left">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                    <span className="text-[8px] sm:text-[10px] font-black text-blue-500 tracking-[0.4em] sm:tracking-[0.6em] uppercase">Engineering Grade Restoration</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]">TECHNICAL <br/><span className="text-outline">TRIAGE.</span></h2>
                  <p className="text-white/40 text-sm sm:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">Precision diagnostics and component restoration for all gaming architecture. Our laboratory restores peak performance capability.</p>
                </div>
                <Link to="/repairs" className="inline-block btn-primary px-10 sm:px-16 py-5 sm:py-6 shadow-2xl text-xs sm:text-sm active:scale-[0.97]">
                  INITIATE DIAGNOSTIC
                </Link>
              </div>
              <div className="lg:w-2/5 flex justify-center hidden sm:flex">
                <div className="w-48 h-48 sm:w-64 sm:h-64 border border-white/5 flex items-center justify-center relative rotate-45 group-hover:rotate-0 transition-all duration-1000">
                  <Settings className="w-16 h-16 sm:w-24 sm:h-24 text-white/10 group-hover:text-blue-500/40 transition-colors" />
                  <div className="absolute inset-0 border border-white/5 -m-4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
