
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Zap, Shield, Globe, Cpu, ArrowRight, Activity, Share2 } from 'lucide-react';
import { Product } from '../types';
import SEO from '../components/SEO';

interface ProductDetailProps {
  addToCart: (product: Product) => void;
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart, products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = useMemo(() => products.find(p => p.id === id), [id, products]);

  // Get all product images (use images array if available, fallback to single image)
  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.platform === product.platform)
    ).slice(0, 4);
  }, [product, products]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-emerald-500';
      case 'Low Stock': return 'text-amber-500';
      case 'Out of Stock': return 'text-red-500';
      default: return 'text-white/30';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
      case 'Low Stock': return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]';
      case 'Out of Stock': return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      default: return 'bg-white/30';
    }
  };

  if (!product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white/10">Entity De-Synchronized</h2>
        <Link to="/shop" className="btn-primary px-12 py-5">Return to Archives</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(product);
    setTimeout(() => {
      setAdding(false);
      navigate('/cart');
    }, 500);
  };

  const handleBuyNow = () => {
    const whatsappNumber = '94767301586';
    const message = `Hi, I want to order:\n\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}\nPlatform: ${product.platform}\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 md:py-16 lg:py-24 space-y-16 sm:space-y-20 md:space-y-28 lg:space-y-40">
      <SEO 
        title={`${product.name} - ${product.platform} Gaming Hardware`}
        description={`${product.name} available in Sri Lanka. ${product.description} Premium ${product.category.toLowerCase()} with authentic warranty. Price: Rs. ${product.price.toLocaleString()}`}
        keywords={`${product.name}, ${product.platform}, ${product.category}, gaming hardware Sri Lanka, buy ${product.name}`}
        image={product.image}
        type="product"
      />
      <div className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <Link to="/shop" className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 text-[8px] sm:text-[9px] md:text-[10px] font-black text-white/30 hover:text-white transition-all uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em]">
            <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> Exit Hardware Node
          </Link>
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <button aria-label="Share product" className="p-2 sm:p-2.5 md:p-3 border border-white/5 hover:bg-white/5 transition-all">
              <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/40" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-24">
          {/* Hardware Visualizer */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="glass aspect-square p-6 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center relative border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"></div>
              <img 
                src={productImages[selectedImage]} 
                alt={`${product.name} - Image ${selectedImage + 1}`} 
                className="relative z-10 w-full h-full object-contain transition-all duration-700 group-hover:scale-105" 
                key={selectedImage}
              />
              <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-3 sm:left-4 md:left-6 lg:left-8 flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <Activity className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-blue-500 animate-pulse" />
                <span className="text-[6px] sm:text-[7px] md:text-[8px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/30">System Visual Active</span>
              </div>
              {productImages.length > 1 && (
                <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 right-3 sm:right-4 md:right-6 lg:right-8 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 glass border border-white/10">
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white/60">
                    {selectedImage + 1} / {productImages.length}
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass aspect-square border transition-all p-1.5 sm:p-2 md:p-3 lg:p-4 cursor-pointer ${
                    selectedImage === index 
                      ? 'border-blue-500 opacity-100 scale-105' 
                      : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain" alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
              {/* Fill empty slots if less than 4 images */}
              {productImages.length < 4 && Array.from({ length: 4 - productImages.length }).map((_, i) => (
                <div key={`empty-${i}`} className="glass aspect-square border-white/5 opacity-20 p-1.5 sm:p-2 md:p-3 lg:p-4">
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <span className="text-[6px] sm:text-[7px] md:text-[8px] font-black">NO IMAGE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acquisition Data */}
          <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16 animate-in fade-in slide-in-from-right-10 duration-1000">
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                <span className="px-3 sm:px-4 py-1.5 bg-white text-black text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest">{product.platform}</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusBg(product.stockStatus)}`}></div>
                  <span className={`text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] ${getStatusColor(product.stockStatus)}`}>{product.stockStatus}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-none break-words">{product.name}</h1>
              <p className="text-base sm:text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-xl">{product.description}</p>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10 pt-8 sm:pt-10 md:pt-12 border-t border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 sm:gap-4">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em]">Acquisition Rate</span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter">Rs. {product.price.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-5 md:pt-6">
                <button 
                  onClick={handleBuyNow}
                  className="btn-primary py-5 sm:py-6 md:py-7 flex items-center justify-center gap-3 sm:gap-4 transition-all text-sm sm:text-base"
                >
                  BUY NOW <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={handleAddToCart}
                  disabled={adding}
                  className={`btn-secondary py-5 sm:py-6 md:py-7 flex items-center justify-center gap-3 sm:gap-4 transition-all text-sm sm:text-base ${adding ? 'opacity-50' : ''}`}
                >
                  {adding ? 'ADDING...' : 'ADD TO CART'} <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10 pt-10 sm:pt-12 md:pt-16">
              <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] text-white/20 border-b border-white/5 pb-4 sm:pb-5 md:pb-6 flex items-center gap-3 sm:gap-4">
                <Cpu className="w-3 h-3 sm:w-4 sm:h-4" /> Technical Specifications
              </h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="space-y-1.5 sm:space-y-2 group">
                    <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-widest group-hover:text-blue-500 transition-colors">{key}</span>
                    <span className="block text-sm sm:text-base font-bold tracking-tight uppercase group-hover:text-white transition-colors break-words">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-10 sm:pt-12 md:pt-16 border-t border-white/5">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 opacity-40 hover:opacity-100 transition-opacity">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">Official<br/>Registry</span>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 opacity-40 hover:opacity-100 transition-opacity">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">Universal<br/>Deployment</span>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 opacity-40 hover:opacity-100 transition-opacity">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-tight">Performance<br/>Benchmarked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synergetic Archive */}
      {relatedProducts.length > 0 && (
        <section className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Synergetic <span className="text-outline">Gear</span></h2>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Optimized Archive Matches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(related => (
              <Link to={`/product/${related.id}`} key={related.id} className="group glass p-8 border-white/5 ps-card-hover flex flex-col gap-8">
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <img src={related.image} alt={related.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{related.platform}</span>
                    <h3 className="text-lg font-bold tracking-tight uppercase italic leading-none">{related.name}</h3>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="font-black text-xl italic tracking-tighter">Rs. {related.price.toLocaleString()}</div>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
