
import React from 'react';
import { Shield, Target, Cpu, Triangle, Circle, Square, X } from 'lucide-react';
import SEO from '../components/SEO';

const Manifesto: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden py-16 sm:py-24 lg:py-40 pb-28 lg:pb-40">
      <SEO 
        title="About Us - Sri Lanka's Premier Gaming Hardware Authority"
        description="Learn about our mission to deliver authentic PlayStation hardware and expert repair services. Sri Lanka's trusted gaming partner with proven expertise and commitment to quality."
        keywords="gaming company Sri Lanka, PlayStation experts, authentic hardware, gaming repair services, about us"
      />
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Triangle className="absolute top-[20%] left-[10%] w-64 h-64 text-white/5 floating-symbol" style={{ animationDelay: '1s' }} />
        <Circle className="absolute bottom-[10%] right-[15%] w-96 h-96 text-white/5 floating-symbol" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/5 rounded-full blur-[200px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10 space-y-16 sm:space-y-24 lg:space-y-32">
        <div className="space-y-5 sm:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-[1px] bg-blue-500"></div>
            <span className="text-[8px] sm:text-[10px] font-black tracking-[0.5em] sm:tracking-[1em] text-blue-500 uppercase">Core Directive</span>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85]">
            HARDWARE <br/>
            <span className="text-white/20">PURITY.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-300">
          <p className="text-lg sm:text-2xl text-white/40 font-light leading-relaxed uppercase tracking-tight italic">
            PlayStation.lk is more than an inventory. It is a commitment to the technical excellence of the gaming ecosystem in Sri Lanka. 
          </p>
          <div className="space-y-8 sm:space-y-12">
            <div className="flex gap-5 sm:gap-8 group">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div>
                <h3 className="font-black text-xs uppercase tracking-widest mb-2">Authenticity Shield</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest leading-loose">Strict adherence to hardware authenticity. Every unit in our vault undergoes a 42-point integrity check before deployment.</p>
              </div>
            </div>
            <div className="flex gap-5 sm:gap-8 group">
              <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div>
                <h3 className="font-black text-xs uppercase tracking-widest mb-2">Technical Superiority</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest leading-loose">Our engineering division provides component-level restoration, ensuring the longevity of your hardware infrastructure.</p>
              </div>
            </div>
            <div className="flex gap-5 sm:gap-8 group">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div>
                <h3 className="font-black text-xs uppercase tracking-widest mb-2">The Mission</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest leading-loose">To remain the definitive authority for premium PlayStation equipment and expert triage in the South Asian region.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 sm:pt-24 lg:pt-32 border-t border-white/5 text-center space-y-8 sm:space-y-12">
          <div className="flex justify-center gap-10 sm:gap-20 opacity-10">
            <Triangle className="w-8 h-8 sm:w-12 sm:h-12" />
            <Circle className="w-8 h-8 sm:w-12 sm:h-12" />
            <Square className="w-8 h-8 sm:w-12 sm:h-12" />
            <X className="w-8 h-8 sm:w-12 sm:h-12" />
          </div>
          <p className="text-[8px] font-black tracking-[1em] text-white/20 uppercase">PlayStation.lk / Established 2020</p>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;
