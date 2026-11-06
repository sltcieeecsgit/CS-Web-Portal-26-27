import React from 'react';
import { teamConfig } from '../config';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-amber-200/80 bg-gradient-to-t from-amber-100/50 via-white/80 to-transparent py-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Info: Centered */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
              IEEE Computer <span className="text-amber-600">Society</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg font-medium mx-auto">
            Official Digital Profile Directory For Executive Committee and Sub Committee Members.
          </p>
        </div>

        {/* Bottom Copyright: Centered */}
        <div className="mt-6 pt-6 border-t border-amber-200/60 flex items-center justify-center text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {teamConfig.fullName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
