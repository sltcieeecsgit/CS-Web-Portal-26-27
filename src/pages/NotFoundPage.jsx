import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-amber-50/60 via-white to-yellow-50/50">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-4 shadow-sm">
        <Users className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-slate-600 max-w-md mb-6 font-medium">
        The page or member profile you requested could not be located.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 transition-all shadow-md shadow-amber-400/25"
      >
        <Home className="w-4 h-4" />
        <span>Return to Society Directory</span>
      </Link>
    </div>
  );
}
