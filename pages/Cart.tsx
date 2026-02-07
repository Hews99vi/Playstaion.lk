
import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Wallet, MessageSquare, Camera, Copy, CheckCircle2, Check } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity, clearCart }) => {
  const [proofOrderId, setProofOrderId] = useState('');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const businessWhatsApp = "94767301586";

  const copyToClipboard = () => {
    if (activeOrderId) {
      navigator.clipboard.writeText(activeOrderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateOrderManifest = () => {
    const newId = `PSL-${Math.floor(Math.random() * 900000) + 100000}`;
    setActiveOrderId(newId);
    setProofOrderId(newId); // Pre-fill the proof field for the user

    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity})`).join('%0A');
    
    // Structured message with clear prompts for image upload and prominent Order ID
    const message = `*ACQUISITION PROTOCOL INITIATED*%0A%0A*ORDER REFERENCE ID:* ${newId}%0A%0A---%0A*HARDWARE MANIFEST:*%0A${itemsList}%0A%0A*TOTAL ACQUISITION VALUE:* Rs. ${total.toLocaleString()}%0A%0A---%0A*PAYMENT PROTOCOL:*%0AI am ready to finalize this acquisition. I will now *UPLOAD MY BANK TRANSFER PROOF IMAGE* below this message for validation.%0A%0APlease acknowledge receipt and confirm shipment schedule for Order: *${newId}*`;
    
    window.open(`https://wa.me/${businessWhatsApp}?text=${message}`, '_blank');
  };

  const sendPaymentProof = () => {
    if (!proofOrderId.trim()) return;
    const message = `*PAYMENT PROOF SUBMISSION*%0A%0AOrder ID: *${proofOrderId.trim()}*%0A%0A---%0AI am attaching my bank transfer receipt below for technical verification. Please process my acquisition manifest.`;
    window.open(`https://wa.me/${businessWhatsApp}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-32 lg:py-40 pb-28 lg:pb-40 text-center space-y-6 sm:space-y-10">
        <SEO 
          title="Shopping Cart - Your Gaming Hardware Selection"
          description="Review your selected PlayStation hardware and accessories before checkout. Secure ordering with multiple payment options in Sri Lanka."
          noindex={true}
        />
        <div className="w-20 h-20 sm:w-24 sm:h-24 border border-white/10 mx-auto flex items-center justify-center opacity-20">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">Inventory Empty</h1>
          <p className="text-white/30 text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">No hardware selected for acquisition.</p>
        </div>
        <Link to="/shop" className="btn-primary inline-block px-10 sm:px-16 py-4 sm:py-6 text-xs">
          Return to Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-12 md:py-16 lg:py-24 pb-28 lg:pb-24 flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-20">
      <SEO 
        title="Shopping Cart - Review Your Order"
        description="Review your gaming hardware selection and proceed to checkout. Secure payment options and fast delivery across Sri Lanka."
        noindex={true}
      />
      <div className="flex-1 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 min-w-0">
        <div className="flex flex-row items-end justify-between border-b border-white/5 pb-4 sm:pb-6 md:pb-8">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter">Aquisition <span className="opacity-20">Manifest</span></h1>
          <button onClick={clearCart} className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.25em] sm:tracking-[0.3em] active:text-red-400">Clear All</button>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="glass p-3 sm:p-4 md:p-6 lg:p-8 flex flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 ps-card-hover group border-white/5">
              <div className="w-16 h-16 sm:w-20 md:w-24 lg:w-32 sm:h-20 md:h-24 lg:h-32 overflow-hidden bg-white/5 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="flex-1 space-y-0.5 sm:space-y-1.5 md:space-y-2 min-w-0">
                <span className="text-[6px] sm:text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-widest">{item.platform}</span>
                <h3 className="text-[11px] sm:text-base md:text-lg font-bold tracking-tight uppercase italic break-words line-clamp-1 sm:line-clamp-2">{item.name}</h3>
                <p className="text-sm sm:text-xl md:text-2xl font-black italic tracking-tighter">Rs. {item.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
                <div className="flex items-center gap-1 sm:gap-3 md:gap-4 glass border-white/10 p-1 sm:p-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white/10 transition-colors active:bg-white/20" aria-label="Decrease quantity"><Minus className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" /></button>
                  <span className="font-black text-[10px] sm:text-xs w-4 sm:w-5 md:w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white/10 transition-colors active:bg-white/20" aria-label="Increase quantity"><Plus className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="opacity-20 hover:opacity-100 text-red-500 transition-all p-2 sm:p-4 active:opacity-100" aria-label="Remove item">
                  <Trash2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Confirmation Section */}
        <div className={`glass p-4 sm:p-10 lg:p-12 border-t-2 space-y-4 sm:space-y-8 lg:space-y-10 transition-all duration-1000 ${
          activeOrderId 
            ? 'border-t-white bg-white/[0.04] shadow-[0_0_50px_rgba(255,255,255,0.05)]' 
            : 'border-t-white/10 border-white/5'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <Camera className={`w-6 h-6 sm:w-10 sm:h-10 shrink-0 ${activeOrderId ? 'text-white' : 'text-white/20'}`} />
              <div>
                <h2 className="text-base sm:text-2xl font-black italic uppercase tracking-tighter">Confirm Payment Protocol</h2>
                <p className="text-[9px] sm:text-[10px] font-bold text-white/30 tracking-[0.3em] sm:tracking-[0.4em] uppercase">
                  {activeOrderId ? 'Awaiting Manual Validation' : 'Manual validation of bank transfers'}
                </p>
              </div>
            </div>
            {activeOrderId && (
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-black text-[8px] sm:text-[9px] font-black uppercase tracking-widest animate-pulse self-start sm:self-auto">
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Step 02: Verification
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">Reference Order ID</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={proofOrderId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProofOrderId(e.target.value)}
                  placeholder="E.G. PSL-123456"
                  className={`w-full bg-white/[0.02] border px-4 sm:px-6 py-3 sm:py-4 rounded-none text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10 font-mono tracking-widest text-sm ${
                    activeOrderId ? 'border-white animate-in fade-in' : 'border-white/10'
                  }`}
                />
                {activeOrderId && (
                   <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[7px] sm:text-[8px] font-black text-white/40 uppercase tracking-widest bg-black px-2 py-1 border border-white/10">
                      <Check className="w-2 h-2" /> Linked
                   </div>
                )}
              </div>
            </div>
            <div className="flex items-end">
              <button 
                onClick={sendPaymentProof}
                disabled={!proofOrderId.trim()}
                className={`w-full py-3 sm:py-4 text-[9px] sm:text-[10px] flex items-center justify-center gap-3 sm:gap-4 transition-all duration-500 ${
                  activeOrderId ? 'btn-primary border-white' : 'btn-secondary disabled:opacity-20'
                }`}
              >
                SUBMIT PROOF VIA WHATSAPP <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          <p className="text-[8px] sm:text-[9px] text-white/20 font-bold uppercase tracking-widest leading-relaxed border-l-2 border-white/5 pl-4 sm:pl-6">
            Ensure you have performed the transfer to Commercial Bank Acc: 1234567890 (PlayStation.lk PVT LTD). Once complete, input the Order ID and attach your bank slip image in the resulting WhatsApp chat.
          </p>
        </div>
      </div>

      <aside className="w-full lg:w-96 space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10">
        {/* Prominent Active Order Display */}
        {activeOrderId && (
          <div className="glass p-4 sm:p-5 md:p-6 lg:p-8 border-white border-b-4 space-y-3 sm:space-y-4 md:space-y-6 animate-in slide-in-from-right-10 duration-700 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase text-white/40 tracking-[0.25em] sm:tracking-[0.3em]">Manifest Reference</span>
              <button 
                onClick={copyToClipboard}
                className="p-1.5 sm:p-2 hover:bg-white/10 transition-colors rounded-none"
                title="Copy ID"
                aria-label="Copy order ID"
              >
                {copied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-500" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/40" />}
              </button>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter text-white font-mono uppercase break-all">
              {activeOrderId}
            </div>
            <div className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-tight">
              Aquisition protocol initialized. Please finalize payment verification below.
            </div>
          </div>
        )}

        <div className="glass p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 border-white/10 space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 lg:sticky lg:top-40">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-white/30 border-b border-white/5 pb-2.5 sm:pb-3 md:pb-4">Aquisition Summary</h4>
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <div className="flex justify-between text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/40">
                <span>Items Count</span>
                <span>{cart.reduce((acc, i) => acc + i.quantity, 0)} Units</span>
              </div>
              <div className="flex justify-between text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/40">
                <span>Shipping</span>
                <span className="text-right break-words">Calculated at Checkout</span>
              </div>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 md:pt-6 border-t border-white/5 space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex justify-between items-end gap-2">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase text-white/20 tracking-widest">Grand Total</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter">Rs. {total.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={generateOrderManifest}
              className={`w-full py-5 sm:py-6 md:py-8 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 group transition-all duration-500 text-[9px] sm:text-[10px] md:text-xs ${
                activeOrderId ? 'btn-secondary text-white/40' : 'btn-primary'
              }`}
            >
              {activeOrderId ? 'RE-INITIALIZE ORDER' : 'INITIALIZE ORDER'} 
              <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-3 transition-transform ${activeOrderId ? 'opacity-20' : ''}`} />
            </button>
            
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 bg-white/[0.03] border border-white/5">
              <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/40 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-[6.5px] sm:text-[7px] md:text-[8px] text-white/30 font-black uppercase tracking-widest leading-relaxed">
                  Direct bank transfer required. Initializing will generate your unique Manifest ID for manual validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
