import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CreditCard, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-black/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                 <span className="font-bold text-black text-xl">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-slate-200 transition-colors">Hackier</span>
          </Link>

          {/* Desktop Links - Pill Style */}
          <div className="hidden md:flex items-center justify-center">
             <div className="flex items-center p-1 rounded-full bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-xl">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'App Store', path: '/store' },
                  { name: 'For Builders', path: '/builders' }
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive(link.path) 
                        ? 'bg-slate-800 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
             </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
               <Link 
                 to="/dashboard" 
                 className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
               >
                 Dashboard <ChevronRight size={14} />
               </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Log in
                </Link>
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {[
                { name: 'Home', path: '/' },
                { name: 'Store', path: '/store' },
                { name: 'Builders', path: '/builders' },
                { name: 'Dashboard', path: '/dashboard' }
            ].map(item => (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
                >
                    {item.name}
                </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
