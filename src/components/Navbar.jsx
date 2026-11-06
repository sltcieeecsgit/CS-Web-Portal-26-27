import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X, Award, Users } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-amber-200/70 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="p-1 rounded-xl bg-white border border-amber-200/80 shadow-sm">
              <img
                src="/img/logo.png"
                alt="IEEE Computer Society"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>                
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isHomePage ? (
              <>
                <a
                  href="#excom"
                  className="text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Executive Committee
                </a>
                <a
                  href="#subcom"
                  className="text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  Sub Committee
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200 transition-all hover:text-amber-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Society Directory
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button - ONLY on HomePage */}
          <div className="flex md:hidden items-center gap-2">
            {!isHomePage ? (
              /* On Profile pages: ONLY show Back to Directory arrow, NO dropdown menu */
              <Link
                to="/"
                className="p-2 rounded-xl bg-amber-50 text-slate-800 border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors"
                title="Back to Directory"
                aria-label="Back to Society Directory"
              >
                <ArrowLeft className="w-5 h-5 text-amber-700" />
              </Link>
            ) : (
              /* On Home page: Hamburger Menu Toggle */
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-amber-200 text-slate-700 hover:text-slate-950 shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown - ONLY on Home page, 100% solid white, covers half the page */}
        {isHomePage && mobileMenuOpen && (
          <>
            {/* Backdrop to dismiss when clicking outside */}
            <div
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-[2px] z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Solid pure white card dropdown anchored to the right */}
            <div className="absolute top-full right-4 mt-2 w-1/2 min-w-[210px] max-w-[280px] bg-white border-2 border-amber-300 shadow-[0_12px_40px_rgba(0,0,0,0.2)] rounded-2xl p-2.5 z-50 md:hidden space-y-1.5">
              <a
                href="#excom"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-800 bg-amber-50/80 hover:bg-amber-100 active:bg-amber-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">Executive Committee</span>
                </div>
                <span className="text-[11px] font-mono text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                  8
                </span>
              </a>

              <a
                href="#subcom"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-800 bg-yellow-50/80 hover:bg-yellow-100 active:bg-yellow-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">Sub Committee</span>
                </div>
                <span className="text-[11px] font-mono text-yellow-900 bg-yellow-200 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                  7
                </span>
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
