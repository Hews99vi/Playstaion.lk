
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Gamepad2, Shield, LogOut, X } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  cartCount: number;
  user: UserType | null;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, user, logout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop', { state: { searchQuery: searchQuery.trim() } });
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => setShowMobileMenu(false);

  const navLinks = [
    { label: 'STORE', path: '/shop' },
    { label: 'REPAIR', path: '/repairs' },
    { label: 'MANIFESTO', path: '/about' },
    { label: 'CONNECT', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/[0.03] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-4 sm:py-5 md:py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <Gamepad2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </div>
          <span className="text-sm sm:text-base md:text-xl font-black tracking-tighter uppercase leading-none">
            PLAYSTATION.LK
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-12 text-[9px] font-black tracking-[0.3em] uppercase text-white/30">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              to={link.path} 
              className={`hover:text-white transition-all duration-500 relative ${isActive(link.path) ? 'text-white' : ''}`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white"></span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search" 
            className="text-white/30 hover:text-white transition-all duration-500 hidden md:block p-1"
          >
            <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <Link to="/cart" className="relative text-white/30 hover:text-white transition-all duration-500 p-1">
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[7px] sm:text-[8px] min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 px-0.5 sm:px-1 flex items-center justify-center font-black">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link to="/admin" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border border-white/10 flex items-center justify-center hover:border-white transition-all duration-500 text-white/30 hover:text-white">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </Link>
              <button onClick={logout} aria-label="Logout" className="text-white/30 hover:text-white transition-all duration-500 p-1">
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="hidden sm:flex w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border border-white/10 items-center justify-center hover:border-white transition-all duration-500 text-white/30 hover:text-white">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </Link>
          )}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu" 
            className="lg:hidden text-white/30 hover:text-white p-1.5 sm:p-2 -mr-1 sm:-mr-2"
          >
            {showMobileMenu ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 sm:py-8 space-y-5 sm:space-y-6 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-1.5 sm:space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase transition-all border-l-2 ${
                    isActive(link.path) 
                      ? 'bg-white text-black border-white' 
                      : 'text-white/40 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-5 sm:pt-6 border-t border-white/10 space-y-2 sm:space-y-3">
              <button 
                onClick={() => {
                  setShowSearch(true);
                  closeMobileMenu();
                }}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent text-left flex items-center gap-2 sm:gap-3"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> SEARCH
              </button>
              {user ? (
                <>
                  <Link 
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent text-left flex items-center gap-2 sm:gap-3"
                  >
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> ADMIN PANEL
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent text-left flex items-center gap-2 sm:gap-3"
                  >
                    <LogOut className="w-4 h-4" /> LOGOUT
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login"
                  onClick={closeMobileMenu}
                  className="w-full px-5 py-3 text-xs font-black tracking-[0.3em] uppercase text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent text-left flex items-center gap-3"
                >
                  <User className="w-4 h-4" /> LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 sm:p-8 animate-in slide-in-from-top duration-300 z-50">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS..."
                className="flex-1 bg-transparent text-lg sm:text-2xl font-bold uppercase tracking-tight text-white placeholder:text-white/20 focus:outline-none min-w-0"
                autoFocus
                aria-label="Search products"
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="text-white/40 hover:text-white transition-colors shrink-0"
                aria-label="Close search"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-3 sm:mt-4">Press Enter to Search</p>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

