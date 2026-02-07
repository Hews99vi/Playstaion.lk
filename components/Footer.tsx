
import React from 'react';
import { Gamepad2, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-10 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-20 sm:pb-12 md:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-24">
        <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 border border-white flex items-center justify-center shrink-0">
              <Gamepad2 className="text-white w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
            </div>
            <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-black tracking-tighter uppercase italic leading-none">
              PlayStation<span className="opacity-40">.lk</span>
            </span>
          </div>
          <p className="text-white/30 text-[10px] sm:text-xs font-light tracking-widest uppercase leading-loose">
            Sri Lanka's Definitive Authority for premium hardware and technical restoration.
          </p>
          <div className="flex gap-5 sm:gap-6 md:gap-7 lg:gap-8">
            <a href="#" aria-label="Facebook" className="opacity-20 hover:opacity-100 transition-opacity">
              <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="opacity-20 hover:opacity-100 transition-opacity">
              <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="opacity-20 hover:opacity-100 transition-opacity">
              <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="opacity-20 hover:opacity-100 transition-opacity">
              <Youtube className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-black mb-5 sm:mb-6 md:mb-7 lg:mb-8 text-white uppercase tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] text-[9px] sm:text-[10px]">Operations</h4>
          <ul className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-white/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
            <li><a href="#" className="hover:text-white transition-colors">Hardware Inventory</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tactile Interfaces</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Triage Division</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trade Manifest</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-5 sm:mb-6 md:mb-7 lg:mb-8 text-white uppercase tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] text-[9px] sm:text-[10px]">Support Protocol</h4>
          <ul className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-white/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
            <li><a href="#" className="hover:text-white transition-colors">Operation Tracking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Protocol</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Service Terms</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Link Channel</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-5 sm:mb-6 md:mb-7 lg:mb-8 text-white uppercase tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] text-[9px] sm:text-[10px]">Registry</h4>
          <address className="not-italic text-white/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-loose space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <p>Colombo, Rajagiriya<br />Sri Lanka</p>
            <p className="break-words">Communications: +94 76 730 1586</p>
            <p className="break-all">Archive: support@playstation.lk</p>
          </address>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 pt-6 sm:pt-8 md:pt-10 lg:pt-12 border-t border-white/5 flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4 text-white/20 text-[7px] sm:text-[8px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] text-center">
        <p className="px-4">&copy; {new Date().getFullYear()} PlayStation.lk. Strictly independent from Sony Interactive Entertainment.</p>
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 px-4 flex-wrap justify-center">
          <div className="h-[1px] w-5 sm:w-6 md:w-8 bg-white/5"></div>
          <span className="text-white/40 tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] lg:tracking-[0.8em] break-words">Engineered by <span className="text-white hover:text-blue-500 transition-colors cursor-crosshair">hewscode</span></span>
          <div className="h-[1px] w-5 sm:w-6 md:w-8 bg-white/5"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
