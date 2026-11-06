import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  QrCode,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Award,
  Users
} from 'lucide-react';
import membersData from '../data/members.json';
import { getMemberUrl, teamConfig } from '../config';
import MemberAvatar from '../components/MemberAvatar';
import ContactButtons from '../components/ContactButtons';
import { generateQRCodeDataUrl, downloadQRCodePNG } from '../utils/qr';
import { isValidValue } from '../utils/format';

export default function MemberProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [downloadingPNG, setDownloadingPNG] = useState(false);

  // Find the active member supporting slug, id, or legacy member-XX format
  const currentIndex = membersData.findIndex(
    (m) =>
      m.slug === slug ||
      m.id === slug ||
      `member-${m.id}` === slug ||
      `member-${m.memberNumber}` === slug
  );

  const member = currentIndex !== -1 ? membersData[currentIndex] : null;

  // Previous & Next member navigation
  const prevMember = currentIndex > 0 ? membersData[currentIndex - 1] : membersData[membersData.length - 1];
  const nextMember = currentIndex < membersData.length - 1 ? membersData[currentIndex + 1] : membersData[0];

  const profileUrl = member ? getMemberUrl(member.slug) : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!member) return;
    let isMounted = true;
    generateQRCodeDataUrl(profileUrl, 800).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [member, profileUrl]);

  if (!member) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-4 shadow-sm">
          <QrCode className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Member Profile Not Found</h2>
        <p className="text-sm text-slate-600 max-w-md mb-6">
          The requested profile <code className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">/members/{slug}</code> does not exist in our directory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 transition-all shadow-md shadow-amber-400/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Society Directory</span>
        </Link>
      </div>
    );
  }

  const isExcom = member.committeeType === 'excom';

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
    <div className="min-h-screen py-6 sm:py-12 relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-white to-yellow-50/50">
      {/* Ambient background glow */}
      <div className="ambient-glow w-96 h-96 bg-yellow-300/40 top-10 left-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-amber-200 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Society Directory</span>
          </Link>

          {/* Quick Member Prev / Next navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(`/members/${prevMember.slug}`)}
              className="p-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-600 hover:text-slate-900 border border-amber-200 transition-colors shadow-sm"
              title={`Previous: ${prevMember.fullName}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-600 px-2">
              {currentIndex + 1} / {membersData.length}
            </span>
            <button
              onClick={() => navigate(`/members/${nextMember.slug}`)}
              className="p-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-600 hover:text-slate-900 border border-amber-200 transition-colors shadow-sm"
              title={`Next: ${nextMember.fullName}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Digital Profile Card */}
        <div className="rounded-3xl bg-white/95 p-6 sm:p-8 border border-amber-200 shadow-2xl relative overflow-hidden">
          {/* Top Bar: Society Logo & Committee Tag */}
          <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-lg bg-white border border-amber-200 shadow-sm">
                <img
                  src="/img/logo.png"
                  alt="IEEE Computer Society"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className={`text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded-md ${
                isExcom
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
              }`}>
                {member.committee}
              </span>
            </div>
          </div>

          {/* Profile Header: Photograph & Identity */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-5">
              <MemberAvatar
                member={member}
                size="xxl"
                className="ring-4 ring-amber-400/80 shadow-2xl"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1.5">
              {member.fullName}
            </h1>

            <p className="text-base sm:text-lg font-extrabold text-amber-600 mb-2">
              {member.designation}
            </p>
          </div>

          {/* Official Member QR Code - Displayed by Default */}
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-yellow-50/50 border border-amber-200 text-center shadow-sm">
            <div className="inline-block p-3 bg-white rounded-2xl shadow-md ring-2 ring-amber-300/60 mb-3.5">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`${member.fullName} QR`}
                  className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                />
              ) : (
                <div className="w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center bg-slate-100 rounded-xl">
                  <span className="text-xs text-slate-500">Generating QR...</span>
                </div>
              )}
            </div>

            <p className="text-xs font-bold text-slate-700 mb-3.5">
              Scan or download to share this profile
            </p>

            <div className="flex items-center justify-center">
              <button
                onClick={handleDownloadPNG}
                disabled={downloadingPNG}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-md shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code (PNG)</span>
              </button>
            </div>
          </div>

          {/* Functional Contact Buttons & Social Links */}
          <div className="pt-2">
            <ContactButtons member={member} profileUrl={profileUrl} />
          </div>

          {/* Card Footer */}
          <div className="mt-8 pt-4 border-t border-amber-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Chapter Profile
            </span>
            <span className="font-mono text-slate-500 font-semibold">ID: {member.id}</span>
          </div>
        </div>

        {/* Bottom Quick Return */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-600 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse all IEEE Computer Society member profiles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
