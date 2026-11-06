import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  QrCode,
  Check,
  Eye
} from 'lucide-react';
import MemberAvatar from './MemberAvatar';
import { getMemberUrl } from '../config';
import { downloadQRCodePNG } from '../utils/qr';

export default function MemberCard({ member, onOpenQRModal }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const profileUrl = getMemberUrl(member.slug);
  const isExcom = member.committeeType === 'excom';

  const handleDownloadPNG = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setDownloading(true);
      const filename = `${member.slug}_${member.fullName.replace(/\s+/g, '_')}_QR.png`;
      await downloadQRCodePNG(profileUrl, filename, 1000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to download QR code', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`group relative rounded-2xl bg-white/95 border p-3.5 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 w-full ${
      isExcom
        ? 'border-amber-200 hover:border-amber-400 hover:shadow-amber-400/20'
        : 'border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-400/20'
    }`}>
      <div>
        {/* Top Header: Photo & Quick QR Preview */}
        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2.5 sm:mb-4">
          <Link to={`/members/${member.slug}`} className="block relative">
            <MemberAvatar
              member={member}
              size="card"
              className={`ring-2 transition-all shadow-md ${
                isExcom
                  ? 'ring-amber-400/80 group-hover:ring-amber-500'
                  : 'ring-yellow-400/80 group-hover:ring-yellow-500'
              }`}
            />
          </Link>

          {/* Quick QR button */}
          <button
            onClick={() => onOpenQRModal(member)}
            className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-900 border border-amber-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Preview QR Code"
            aria-label="Preview QR code"
          >
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Member Name & Position */}
        <div className="space-y-0.5 sm:space-y-1 mb-2">
          <h3 className="text-xs sm:text-base md:text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
            <Link to={`/members/${member.slug}`}>
              {member.fullName}
            </Link>
          </h3>

          <p className="text-[11px] sm:text-sm font-bold text-amber-600 line-clamp-1">
            {member.designation}
          </p>
        </div>
      </div>

      {/* Action Buttons: View Profile & Download QR */}
      <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-4 border-t border-amber-100 flex items-center gap-1.5 sm:gap-2">
        <Link
          to={`/members/${member.slug}`}
          className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-sm shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate">View Profile</span>
        </Link>

        {/* Download QR button */}
        <button
          onClick={handleDownloadPNG}
          disabled={downloading}
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 hover:border-amber-400 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 shadow-sm shrink-0"
          title="Download Member QR Code (PNG)"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
              <span className="text-emerald-700">Saved</span>
            </>
          ) : (
            <>
              <Download className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${downloading ? 'animate-bounce' : ''}`} />
              <span>QR</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
