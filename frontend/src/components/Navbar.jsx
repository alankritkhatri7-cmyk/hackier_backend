import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-12 items-center h-20">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <img src="/Hackier.png" alt="Hackier" className="h-10 w-auto" />
            <span className="font-extrabold text-2xl tracking-tight text-white">Hackier</span>
          </Link>
          <div className="hidden sm:flex sm:space-x-8 justify-center">
            <Link to="/" className="text-white hover:text-slate-200 inline-flex items-center px-1 pt-1 text-base font-medium transition-all">
              Home
            </Link>
            <Link to="/store" className="text-white hover:text-slate-200 inline-flex items-center px-1 pt-1 text-base font-medium transition-all">
              App Store
            </Link>
            <Link to="/builders" className="text-white hover:text-slate-200 inline-flex items-center px-1 pt-1 text-base font-medium transition-all">
              For Builders
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center gap-3">
            {user ? (
              <>
                {user.subscription_status !== 'active' && (
                  <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-bold rounded-[12px] text-slate-900 bg-white hover:bg-slate-200 active:scale-95 transition-all">
                    <CreditCard className="w-4 h-4" />
                    Subscribe
                  </Link>
                )}
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-700 bg-slate-800 text-sm font-semibold rounded-[12px] text-white hover:bg-slate-700 active:scale-95 transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-white hover:text-slate-200 text-base font-medium transition-all px-1">
                  Sign In
                </Link>
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-2.5 border border-transparent text-base font-bold rounded-[12px] shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.05)] text-slate-900 bg-white hover:bg-slate-200 active:scale-95 transition-all">
                  <CreditCard className="w-4 h-4" />
                  Subscribe
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center sm:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-slate-800">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-slate-800 border-slate-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </Link>
            <Link to="/store" className="border-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Store
            </Link>
            <Link to="/builders" className="border-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              For Builders
            </Link>
            <Link to="/dashboard" className="border-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              {user ? 'Dashboard' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
