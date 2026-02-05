
import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle, Bot, AlertTriangle, Loader2, User, Mail, Phone, ShieldAlert, XCircle, Monitor, Gamepad2, Laptop as LaptopIcon, Send, MessageCircle, MapPin, Package } from 'lucide-react';
import { Platform } from '../types';
import { diagnoseRepair } from '../services/geminiService';
import SEO from '../components/SEO';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const RepairBooking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState<string>(Platform.PLAYSTATION);
  const [issue, setIssue] = useState('');
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [diagnosing, setDiagnosing] = useState(false);

  // Step 3 Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logistics, setLogistics] = useState<'drop-off' | 'courier'>('drop-off');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDiagnose = async () => {
    if (!issue.trim() || diagnosing) return;
    setDiagnosing(true);
    try {
      const result = await diagnoseRepair(issue, device);
      setDiagnosis(result || "No diagnosis available.");
    } catch (error) {
      setDiagnosis("CRITICAL SYSTEM ERROR: UNABLE TO ACCESS NEURAL CORE.");
    } finally {
      setDiagnosing(false);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+94|0)?7\d{8}$/;

    if (!name.trim()) newErrors.name = "IDENTITY DATA REQUIRED";
    if (!email.trim()) {
      newErrors.email = "COMMUNICATION PROTOCOL MISSING";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "INVALID PROTOCOL FORMAT";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "CONTACT FREQUENCY REQUIRED";
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = "INVALID FREQUENCY FORMAT (+94 / 07XXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Prepare WhatsApp message
    const whatsappNumber = '94767301586'; // Owner's WhatsApp number
    const message = `🔧 NEW REPAIR BOOKING\n\n` +
      `📱 Device: ${device}\n` +
      `⚠️ Issue: ${issue}\n\n` +
      `👤 Customer: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📞 Phone: ${phone}\n` +
      `🚚 Logistics: ${logistics === 'drop-off' ? 'Laboratory Drop-off' : 'Secure Courier'}\n\n` +
      `${diagnosis ? `🤖 AI Diagnosis: ${diagnosis}\n\n` : ''}` +
      `Booking ID: #PS-${Math.floor(Math.random() * 90000) + 10000}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setSubmitting(false);
    setSubmitted(true);
  };

  const repairCategories = [
    { id: Platform.PLAYSTATION, label: 'PlayStation', sub: 'Consoles & VR', icon: Gamepad2 },
    { id: Platform.LAPTOP, label: 'Laptop', sub: 'High Fidelity Systems', icon: LaptopIcon },
    { id: 'Other', label: 'Other Devices', sub: 'Consoles & Accessories', icon: Wrench },
  ];

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-10 py-32 text-center space-y-12 animate-in fade-in zoom-in-95">
        <div className="w-32 h-32 border-4 border-green-500 mx-auto flex items-center justify-center animate-pulse">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">BOOKING CONFIRMED!</h1>
          <p className="text-white/40 text-lg uppercase tracking-widest">Booking ID: #PS-{Math.floor(Math.random() * 90000) + 10000}</p>
        </div>
        <div className="glass p-10 border-white/5 space-y-6 text-left max-w-xl mx-auto">
          <div className="flex items-center gap-4 text-green-500">
            <MessageCircle className="w-6 h-6" />
            <h3 className="font-black uppercase tracking-tight text-lg">WhatsApp Notification Sent</h3>
          </div>
          <p className="text-white/60 leading-relaxed">
            Your repair booking has been sent directly to our technical team via WhatsApp. 
            You'll receive a confirmation call within 2-4 hours to schedule your repair.
          </p>
          <div className="pt-4 border-t border-white/10 space-y-3 text-sm text-white/40">
            <p className="flex items-center gap-3"><Clock className="w-4 h-4" /> Response time: 2-4 hours</p>
            <p className="flex items-center gap-3"><Phone className="w-4 h-4" /> We'll call: {phone}</p>
            <p className="flex items-center gap-3"><Mail className="w-4 h-4" /> Email updates: {email}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.location.href = '/'} className="btn-primary px-16 py-6">Return Home</button>
          <button onClick={() => window.location.reload()} className="btn-secondary px-16 py-6">Book Another Repair</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-10 py-24">
      <SEO 
        title="Console Repair Services - Expert PlayStation Repairs in Sri Lanka"
        description="Professional PlayStation console repair services. Expert diagnostics, genuine parts, technical restoration for PS4, PS5, and gaming hardware. Fast turnaround and warranty coverage."
        keywords="PS5 repair Sri Lanka, PlayStation repair, console repair Colombo, gaming hardware repair, DualSense controller repair, expert technician"
      />
      {/* Hero Section */}
      <div className="space-y-8 mb-20 text-center md:text-left">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <Wrench className="w-6 h-6 text-blue-500" />
          <span className="text-[11px] font-black text-blue-500/70 tracking-[0.6em] uppercase">Professional Repair Service</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.95]">
          BOOK YOUR <br/>
          <span className="text-blue-500">REPAIR</span> NOW
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Expert diagnosis and repair for PlayStation consoles, gaming laptops, and all gaming hardware. 
          Fast, reliable, and professional service with instant booking confirmation.
        </p>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
          <div className="glass p-6 border-white/5 space-y-2">
            <Clock className="w-8 h-8 text-blue-500 mx-auto md:mx-0" />
            <h3 className="font-black text-sm uppercase tracking-tight">Quick Response</h3>
            <p className="text-xs text-white/40">Get callback within 2-4 hours</p>
          </div>
          <div className="glass p-6 border-white/5 space-y-2">
            <Wrench className="w-8 h-8 text-blue-500 mx-auto md:mx-0" />
            <h3 className="font-black text-sm uppercase tracking-tight">Expert Technicians</h3>
            <p className="text-xs text-white/40">Certified repair specialists</p>
          </div>
          <div className="glass p-6 border-white/5 space-y-2">
            <CheckCircle className="w-8 h-8 text-blue-500 mx-auto md:mx-0" />
            <h3 className="font-black text-sm uppercase tracking-tight">Quality Guarantee</h3>
            <p className="text-xs text-white/40">90-day repair warranty</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-none overflow-hidden border-white/5 shadow-2xl">
        {/* Progress Bar with Step Labels */}
        <div className="bg-white/5 px-12 py-6">
          <div className="flex justify-between items-center mb-4">
            {[
              { num: 1, label: 'Select Device' },
              { num: 2, label: 'Describe Issue' },
              { num: 3, label: 'Your Details' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black transition-all ${
                  step >= s.num ? 'border-blue-500 bg-blue-500 text-black' : 'border-white/20 text-white/30'
                }`}>
                  {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider hidden md:block ${
                  step >= s.num ? 'text-white' : 'text-white/30'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex h-1 bg-white/5">
            <div 
              className="h-full bg-blue-500 transition-all duration-700" 
              style={{ width: `${(step / 3) * 100}%` }}
              role="progressbar"
              aria-label={`Step ${step} of 3`}
              aria-valuenow={Number(step)}
              aria-valuemin={1}
              aria-valuemax={3}
            ></div>
          </div>
        </div>

        <div className="p-12 md:p-20">
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="space-y-8">
                <div className="text-center md:text-left space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">What needs to be repaired?</h3>
                  <p className="text-white/40 text-sm">Select the type of device you want to get repaired</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {repairCategories.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = device === cat.id;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setDevice(cat.id)}
                        className={`p-10 rounded-none flex flex-col items-center gap-6 transition-all border ps-card-hover text-center relative overflow-hidden group ${isSelected ? 'bg-blue-500 text-black border-blue-500 scale-105' : 'glass border-white/10 hover:border-white/30'}`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 animate-in fade-in zoom-in">
                            <CheckCircle className="w-6 h-6 text-black" strokeWidth={3} />
                          </div>
                        )}
                        <Icon className={`w-16 h-16 transition-all ${isSelected ? 'text-black' : 'text-white/20 group-hover:text-white/40'}`} strokeWidth={1.5} />
                        <div className="space-y-2">
                          <span className={`block text-lg font-black uppercase tracking-tight ${isSelected ? 'text-black' : 'text-white'}`}>{cat.label}</span>
                          <span className={`block text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-black/60' : 'text-white/30'}`}>{cat.sub}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end pt-8 border-t border-white/10">
                <button 
                  onClick={() => setStep(2)}
                  className="btn-primary px-20 py-6 text-sm flex items-center gap-3"
                >
                  Continue <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">What's the problem?</h3>
                    <p className="text-white/40 text-sm">Describe the issue you're experiencing with your {device}</p>
                  </div>
                  <div className="px-4 py-2 glass border border-blue-500/30 text-xs font-bold uppercase text-blue-500 w-fit">
                    {device}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-wide text-white/60">Issue Description</label>
                  <textarea 
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder={`Example: \"My PS5 won't turn on\" or \"Controller buttons not responding\" or \"Laptop screen flickering\"...`}
                    className="w-full h-48 bg-white/[0.03] border border-white/10 rounded-none p-8 text-white focus:outline-none focus:border-blue-500 placeholder:text-white/20 text-base leading-relaxed resize-none transition-all"
                  ></textarea>
                  <p className="text-xs text-white/30">Be as detailed as possible. This helps us prepare for your repair.</p>
                </div>
                
                <div className="glass border border-dashed border-blue-500/20 p-8 space-y-6">
                   <div className="flex items-start gap-6">
                      <div className="w-16 h-16 border-2 border-blue-500 flex items-center justify-center shrink-0">
                        <Bot className={`w-8 h-8 transition-colors duration-500 ${diagnosing ? 'text-blue-500 animate-pulse' : 'text-blue-500/50'}`} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className="font-black text-lg uppercase tracking-tight">AI-Powered Instant Diagnosis</h4>
                        <p className="text-sm text-white/50 leading-relaxed">Get an instant preliminary diagnosis powered by AI. This helps you understand the potential issue and estimated repair time.</p>
                        <button 
                          onClick={handleDiagnose}
                          disabled={diagnosing || !issue.trim()}
                          className={`btn-primary px-10 py-4 text-xs flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
                         >
                           {diagnosing ? (
                             <>
                               <Loader2 className="w-4 h-4 animate-spin" />
                               ANALYZING...
                             </>
                           ) : (
                             <>
                               <Bot className="w-4 h-4" />
                               GET AI DIAGNOSIS
                             </>
                           )}
                         </button>
                      </div>
                   </div>
                </div>

                {diagnosis && (
                  <div className="p-8 bg-blue-500/10 border-2 border-blue-500 rounded-none animate-in zoom-in-95 space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                      <span className="text-sm font-black uppercase tracking-wide text-blue-500">AI Diagnosis Complete</span>
                    </div>
                    <p className="text-base text-white leading-relaxed pl-9">{diagnosis}</p>
                    <p className="text-xs text-white/40 pl-9 pt-2 border-t border-white/10 mt-4">*This is a preliminary diagnosis. Our technicians will perform a detailed inspection.</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <button onClick={() => setStep(1)} className="text-sm font-bold text-white/40 hover:text-white tracking-wide uppercase flex items-center gap-2">
                  ← Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!issue.trim()}
                  className="btn-primary px-20 py-6 text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  Continue <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8">
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Your Contact Details</h3>
                  <p className="text-white/40 text-sm">We'll use these details to contact you about your repair</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-sm font-bold uppercase tracking-wide text-white/60 flex items-center gap-2">
                       <User className="w-4 h-4" /> Full Name *
                     </label>
                     <input 
                       value={name}
                       onChange={(e) => { setName(e.target.value); if(errors.name) setErrors({...errors, name: undefined}); }}
                       className={`w-full bg-white/[0.03] border px-6 py-5 text-base focus:outline-none rounded-none transition-all duration-300 ${errors.name ? 'border-red-500 bg-red-500/10 shake' : 'border-white/10 focus:border-blue-500'}`} 
                       placeholder="Enter your full name" 
                     />
                     {errors.name && (
                       <p className="text-xs text-red-400 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                         <XCircle className="w-4 h-4" /> {errors.name}
                       </p>
                     )}
                   </div>

                   <div className="space-y-3">
                     <label className="text-sm font-bold uppercase tracking-wide text-white/60 flex items-center gap-2">
                       <Phone className="w-4 h-4" /> Phone Number *
                     </label>
                     <input 
                       value={phone}
                       onChange={(e) => { setPhone(e.target.value); if(errors.phone) setErrors({...errors, phone: undefined}); }}
                       className={`w-full bg-white/[0.03] border px-6 py-5 text-base focus:outline-none rounded-none transition-all duration-300 ${errors.phone ? 'border-red-500 bg-red-500/10 shake' : 'border-white/10 focus:border-blue-500'}`} 
                       placeholder="+94 77 123 4567" 
                     />
                     {errors.phone && (
                       <p className="text-xs text-red-400 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                         <XCircle className="w-4 h-4" /> {errors.phone}
                       </p>
                     )}
                   </div>

                   <div className="space-y-3 md:col-span-2">
                     <label className="text-sm font-bold uppercase tracking-wide text-white/60 flex items-center gap-2">
                       <Mail className="w-4 h-4" /> Email Address *
                     </label>
                     <input 
                       value={email}
                       onChange={(e) => { setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined}); }}
                       className={`w-full bg-white/[0.03] border px-6 py-5 text-base focus:outline-none rounded-none transition-all duration-300 ${errors.email ? 'border-red-500 bg-red-500/10 shake' : 'border-white/10 focus:border-blue-500'}`} 
                       placeholder="your.email@example.com" 
                     />
                     {errors.email && (
                       <p className="text-xs text-red-400 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                         <XCircle className="w-4 h-4" /> {errors.email}
                       </p>
                     )}
                   </div>

                   <div className="space-y-4 md:col-span-2">
                     <label className="text-sm font-bold uppercase tracking-wide text-white/60">How will you send your device?</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <button 
                          onClick={() => setLogistics('drop-off')}
                          className={`flex items-start gap-6 p-8 border text-left transition-all group ${logistics === 'drop-off' ? 'border-blue-500 bg-blue-500/10 scale-105' : 'border-white/10 hover:border-white/30 bg-white/[0.02]'}`}
                        >
                          <MapPin className={`w-8 h-8 shrink-0 ${logistics === 'drop-off' ? 'text-blue-500' : 'text-white/30 group-hover:text-white/50'}`} />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-black uppercase tracking-tight">Drop-Off</h4>
                              {logistics === 'drop-off' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed">Bring your device to our repair center</p>
                          </div>
                        </button>
                        <button 
                          onClick={() => setLogistics('courier')}
                          className={`flex items-start gap-6 p-8 border text-left transition-all group ${logistics === 'courier' ? 'border-blue-500 bg-blue-500/10 scale-105' : 'border-white/10 hover:border-white/30 bg-white/[0.02]'}`}
                        >
                          <Package className={`w-8 h-8 shrink-0 ${logistics === 'courier' ? 'text-blue-500' : 'text-white/30 group-hover:text-white/50'}`} />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-black uppercase tracking-tight">Courier Pickup</h4>
                              {logistics === 'courier' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed">We'll arrange pickup from your location</p>
                          </div>
                        </button>
                     </div>
                   </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-4 p-6 border-2 border-red-500 bg-red-500/10 text-red-400 animate-in slide-in-from-top-4">
                  <ShieldAlert className="w-6 h-6 shrink-0" />
                  <p className="text-sm font-bold">Please fix the errors above before submitting</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <button onClick={() => setStep(2)} className="text-sm font-bold text-white/40 hover:text-white tracking-wide uppercase flex items-center gap-2">
                  ← Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary px-20 py-7 text-base flex items-center gap-4 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      BOOK REPAIR
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairBooking;
