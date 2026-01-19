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
    { path: '/my', label: 'My Garden' },
    { path: '/chat', label: 'Chat' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-blue-500/20 shadow-lg shadow-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }}>🌿</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-['Cinzel']">
              Virtual Herbal Garden
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
              >
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-sm opacity-70"></span>
                )}
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"></span>
                )}
                {!isActive(link.path) && (
                  <span className="absolute inset-0 bg-slate-800/50 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-slate-800/50 border border-blue-500/30 transition-all duration-300"
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
        <div className="md:hidden border-t border-blue-500/20 bg-slate-950/95 backdrop-blur-2xl" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <div className="px-2 pt-2 pb-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-blue-200 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
