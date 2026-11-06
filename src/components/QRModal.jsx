import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { getMemberUrl } from '../config';
import { generateQRCodeDataUrl, downloadQRCodePNG } from '../utils/qr';

export default function QRModal({ member, isOpen, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [downloadingPNG, setDownloadingPNG] = useState(false);

  const profileUrl = member ? getMemberUrl(member.slug) : '';

  useEffect(() => {
    if (!isOpen || !member) return;
    let isMounted = true;
    generateQRCodeDataUrl(profileUrl, 800).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [isOpen, member, profileUrl]);

  if (!isOpen || !member) return null;

  const handleDownloadPNG = async () => {
    try {
      setDownloadingPNG(true);
      const filename = `${member.slug}_${member.fullName.replace(/\s+/g, '_')}_QR.png`;
      await downloadQRCodePNG(profileUrl, filename, 1000);
    } finally {
      setDownloadingPNG(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      {/* Modal Box */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 sm:p-7 border border-amber-200 shadow-2xl text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Member Header */}
        <div className="mb-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest text-amber-900 bg-amber-100 border border-amber-300 uppercase mb-1.5">
            {member.committee || 'IEEE CS SLTC'}
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            {member.fullName}
          </h3>
          <p className="text-xs text-amber-600 font-bold">
            {member.designation}
          </p>
        </div>

        {/* High-res Scannable QR Frame */}
        <div className="p-4 bg-white rounded-2xl shadow-lg ring-1 ring-amber-200 mb-5 inline-block">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`${member.fullName} QR`}
              className="w-52 h-52 object-contain"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
              <span className="text-xs text-slate-400 font-mono">Generating QR...</span>
            </div>
          )}
        </div>

        {/* Action Button: Download PNG */}
        <div className="pt-1">
          <button
            onClick={handleDownloadPNG}
            disabled={downloadingPNG}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-md shadow-amber-400/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
