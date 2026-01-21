import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/garden', label: 'Garden' },
    { path: '/plants', label: 'Plants' },
    { path: '/tours', label: 'Tours' },
    { path: '/map', label: 'Explore India' },
    { path: '/chat', label: 'Vana SAGE' },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 bg-white/10  backdrop-blur-xl rounded-full border-2 border-amber-400/40 shadow-lg" style={{ boxShadow: '0 4px 20px rgba(251, 191, 36, 0.1), 0 0 20px rgba(251, 191, 36, 0.08)' }}>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/logo.png" 
              alt="VANA Logo" 
              className="h-16 md:h-20 w-auto transform group-hover:rotate-12 transition-transform duration-300" 
              style={{ filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.4))' }}
            />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent font-['Playfair_Display']" style={{ textShadow: '0 0 12px rgba(251, 191, 36, 0.3)' }}>
              VANA
            </span>
          </Link>

          {/* Right aligned container for nav + mobile button */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 lg:px-6 py-2.5 rounded-full text-base lg:text-lg font-medium transition-all duration-300 ${isActive(link.path) ? 'text-white' : 'text-white/90 hover:text-white'}`}
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`, fontFamily: 'Georgia, serif', textShadow: isActive(link.path) ? '' : '0 1px 3px rgba(0, 0, 0, 0.3)' }}
              >
                {isActive(link.path) ? (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full shadow-lg" style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)' }}></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full blur-sm opacity-30"></span>
                  </>
                ) : (
                  <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 border border-white/20 hover:border-white/30"></span>
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            {/* Google Translate Dropdown */}
            <div id="google_translate_element" className="translate-dropdown"></div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 border-2 border-amber-400/40 transition-all duration-300 hover:border-amber-400/60 hover:shadow-lg"
              style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 border-t-2 border-amber-400/40 bg-slate-900/80 backdrop-blur-xl rounded-b-3xl shadow-lg" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <div className="px-4 pt-3 pb-4 space-y-2">
            {/* Google Translate for Mobile */}
            <div id="google_translate_element_mobile" className="translate-dropdown mb-3"></div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-full font-medium transition-all duration-300 ${isActive(link.path) ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30' : 'text-white/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'}`}
                style={{ fontFamily: 'Georgia, serif', textShadow: isActive(link.path) ? '' : '0 1px 3px rgba(0, 0, 0, 0.3)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </nav>
  );
}
