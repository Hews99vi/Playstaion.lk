
import React from 'react';
import { Mail, Phone, MapPin, Globe, Signal, Terminal, Activity, X, Square } from 'lucide-react';
import SEO from '../components/SEO';

const Connect: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden py-40">
      <SEO 
        title="Contact Us - Get in Touch with PlayStation Experts"
        description="Contact Sri Lanka's premier PlayStation hardware and repair service. Reach us via WhatsApp, phone, email, or visit our Colombo location. Expert support for all your gaming needs."
        keywords="contact PlayStation Sri Lanka, gaming support Colombo, WhatsApp order, business hours, get in touch"
      />
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Square className="absolute top-[15%] right-[10%] w-48 h-48 text-white/5 floating-symbol" style={{ animationDelay: '2s' }} />
        <X className="absolute bottom-[20%] left-[5%] w-32 h-32 text-white/5 floating-symbol" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          
          {/* Header & Status */}
          <div className="space-y-16">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="flex items-center gap-4">
                <Signal className="w-4 h-4 text-blue-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.8em] text-blue-500 uppercase">Communications Protocol</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                ESTABLISH <span className="text-white/20">LINK.</span>
              </h1>
            </div>

            <div className="glass p-10 border-white/5 space-y-8 animate-in fade-in slide-in-from-left-16 duration-1000 delay-200">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Terminal className="w-5 h-5 text-white/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">Terminal Active</span>
              </div>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Our support agents are monitoring the secure channels. For technical triage or inventory inquiries, utilize the contact nodes below.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Storefront: Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Lab: Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Registry Grid */}
          <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-right-10 duration-1000 delay-400">
            {[
              { icon: Phone, label: 'Frequency', value: '+94 76 730 1586', sub: 'Voice & WhatsApp' },
              { icon: Mail, label: 'Archive', value: 'support@playstation.lk', sub: 'Technical Tickets' },
              { icon: MapPin, label: 'Grid Location', value: 'Colombo, Rajagiriya', sub: 'Laboratory 10:00 - 18:00' },
              { icon: Globe, label: 'Network', value: '@playstation.lk', sub: 'Social Manifests' },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="group glass p-8 rounded-none border-white/5 hover:bg-white/[0.03] hover:border-white/20 transition-all flex items-center gap-8">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">{node.label}</span>
                    <h3 className="text-xl font-black italic tracking-tight">{node.value}</h3>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">{node.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Connect;
