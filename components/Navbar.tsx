
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Gamepad2, Shield, LogOut, X, Home, Store, Wrench, BookOpen, Phone } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  // Track scroll for mobile compact header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showMobileMenu]);

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
    { label: 'STORE', path: '/shop', icon: Store },
    { label: 'REPAIR', path: '/repairs', icon: Wrench },
    { label: 'MANIFESTO', path: '/about', icon: BookOpen },
    { label: 'CONNECT', path: '/contact', icon: Phone },
  ];

  // Mobile bottom nav items
  const bottomNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Store', path: '/shop', icon: Store },
    { label: 'Repair', path: '/repairs', icon: Wrench },
    { label: 'Cart', path: '/cart', icon: ShoppingCart },
    { label: 'More', path: '#menu', icon: Menu },
  ];

  return (
    <>
      {/* Main top navbar */}
      <nav className={`sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/[0.03] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 transition-all duration-300 ${scrolled ? 'py-2.5 sm:py-3 lg:py-6' : 'py-3.5 sm:py-4 md:py-5 lg:py-6'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0">
            <div className={`border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 ${scrolled ? 'w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'}`}>
              <Gamepad2 className={`${scrolled ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4'}`} />
            </div>
            <span className={`font-black tracking-tighter uppercase leading-none transition-all duration-300 ${scrolled ? 'text-xs sm:text-sm lg:text-xl' : 'text-sm sm:text-base md:text-xl'}`}>
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

          <div className="flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-6">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search" 
              className="text-white/30 hover:text-white transition-all duration-500 hidden md:block p-1"
            >
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            {/* Mobile search button */}
            <button 
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search" 
              className="text-white/30 hover:text-white transition-all duration-500 md:hidden p-1.5 active:bg-white/10 rounded-sm"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link to="/cart" className="relative text-white/30 hover:text-white transition-all duration-500 p-1 hidden lg:flex">
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
              className="lg:hidden text-white/30 hover:text-white p-2 -mr-1 active:bg-white/10 rounded-sm transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full-screen overlay */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black z-[100] flex flex-col" style={{ height: '100dvh' }}>
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 group">
                <div className="w-6 h-6 border border-white flex items-center justify-center">
                  <Gamepad2 className="w-3 h-3" />
                </div>
                <span className="text-sm font-black tracking-tighter uppercase">PLAYSTATION.LK</span>
              </Link>
              <button onClick={closeMobileMenu} className="p-2 text-white/40 hover:text-white active:bg-white/10 rounded-sm" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links - centered with large touch targets */}
            <div className="flex-1 flex flex-col justify-center px-6 -mt-16">
              <div className="space-y-1">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.label}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-5 px-5 py-4.5 text-[11px] font-black tracking-[0.25em] uppercase transition-all rounded-sm ${
                        isActive(link.path) 
                          ? 'bg-white text-black' 
                          : 'text-white/50 hover:text-white active:bg-white/5'
                      }`}
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                      <span>{link.label}</span>
                      {isActive(link.path) && <span className="ml-auto text-[8px] tracking-[0.3em] opacity-60">ACTIVE</span>}
                    </Link>
                  );
                })}
              </div>
              
              {/* Secondary actions */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-1">
                <button 
                  onClick={() => {
                    setShowSearch(true);
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center gap-5 px-5 py-4 text-[11px] font-black tracking-[0.25em] uppercase text-white/40 hover:text-white active:bg-white/5 rounded-sm text-left"
                >
                  <Search className="w-4.5 h-4.5" /> SEARCH
                </button>
                {user ? (
                  <>
                    <Link 
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="w-full flex items-center gap-5 px-5 py-4 text-[11px] font-black tracking-[0.25em] uppercase text-white/40 hover:text-white active:bg-white/5 rounded-sm text-left"
                    >
                      <Shield className="w-4.5 h-4.5" /> ADMIN PANEL
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-5 px-5 py-4 text-[11px] font-black tracking-[0.25em] uppercase text-white/40 hover:text-white active:bg-white/5 rounded-sm text-left"
                    >
                      <LogOut className="w-4.5 h-4.5" /> LOGOUT
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/admin/login"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center gap-5 px-5 py-4 text-[11px] font-black tracking-[0.25em] uppercase text-white/40 hover:text-white active:bg-white/5 rounded-sm text-left"
                  >
                    <User className="w-4.5 h-4.5" /> LOGIN
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
                  className="flex-1 bg-transparent text-base sm:text-2xl font-bold uppercase tracking-tight text-white placeholder:text-white/20 focus:outline-none min-w-0"
                  autoFocus
                  aria-label="Search products"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="text-white/40 hover:text-white transition-colors shrink-0 p-2"
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/[0.08] mobile-safe-bottom">
        <div className="flex items-center justify-around px-1 py-1.5">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isBottomActive = item.path === '#menu' ? showMobileMenu : isActive(item.path);
            const isCart = item.path === '/cart';

            if (item.path === '#menu') {
              return (
                <button
                  key={item.label}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 min-w-[52px] rounded-sm transition-all active:scale-90 ${
                    isBottomActive ? 'text-white' : 'text-white/30'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={isBottomActive ? 2.5 : 1.5} />
                  <span className="text-[8px] font-black tracking-wider uppercase">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 min-w-[52px] rounded-sm transition-all active:scale-90 relative ${
                  isBottomActive ? 'text-white' : 'text-white/30'
                }`}
              >
                <div className="relative">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={isBottomActive ? 2.5 : 1.5} />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-white text-black text-[7px] min-w-[14px] h-3.5 px-0.5 flex items-center justify-center font-black">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[8px] font-black tracking-wider uppercase">{item.label}</span>
                {isBottomActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white rounded-full"></span>}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
