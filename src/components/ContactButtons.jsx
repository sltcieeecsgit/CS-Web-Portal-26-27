import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { isValidValue, formatSocialUrl } from '../utils/format';

export default function ContactButtons({ member, profileUrl }) {
  const [copied, setCopied] = useState(false);

  const hasWhatsapp = isValidValue(member.whatsapp);
  const hasEmail = isValidValue(member.email);
  const hasLinkedin = isValidValue(member.linkedin);
  const hasInstagram = isValidValue(member.instagram);
  const hasFacebook = isValidValue(member.facebook);

  // Handle Share Profile
  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.fullName} - ${member.organization || 'IEEE Computer Society SLTC'}`,
          text: `Connect with ${member.fullName} (${member.designation}) from ${member.organization || 'IEEE Computer Society SLTC'}.`,
          url: profileUrl,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share error, fallback to clipboard', err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const hasAnyLink = hasWhatsapp || hasEmail || hasLinkedin || hasInstagram || hasFacebook;

  return (
    <div className="w-full space-y-5">
      {/* Real Logos Icon Row - Using user-provided official SVGs */}
      {hasAnyLink && (
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 py-2">
          {/* WhatsApp Real Logo */}
          {hasWhatsapp && (
            <a
              href={formatSocialUrl('whatsapp', member.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-emerald-50/60 border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200"
            >
              <img src="/img/icons/whatsapp.svg" alt="WhatsApp" className="w-full h-full object-contain" />
            </a>
          )}

          {/* Gmail / Email Real Logo */}
          {hasEmail && (
            <a
              href={`mailto:${member.email}`}
              title={`Send Email to ${member.email}`}
              aria-label="Email"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-amber-50/60 border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200"
            >
              <img src="/img/icons/gmail.svg" alt="Gmail" className="w-full h-full object-contain" />
            </a>
          )}

          {/* LinkedIn Real Logo */}
          {hasLinkedin && (
            <a
              href={formatSocialUrl('linkedin', member.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect on LinkedIn"
              aria-label="LinkedIn"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-sky-50/60 border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200"
            >
              <img src="/img/icons/linkedin.svg" alt="LinkedIn" className="w-full h-full object-contain" />
            </a>
          )}

          {/* Instagram Real Logo */}
          {hasInstagram && (
            <a
              href={formatSocialUrl('instagram', member.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              aria-label="Instagram"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-pink-50/60 border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200"
            >
              <img src="/img/icons/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
            </a>
          )}

          {/* Facebook Real Logo */}
          {hasFacebook && (
            <a
              href={formatSocialUrl('facebook', member.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              title="Find on Facebook"
              aria-label="Facebook"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-blue-50/60 border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200"
            >
              <img src="/img/icons/facebook.svg" alt="Facebook" className="w-full h-full object-contain" />
            </a>
          )}
        </div>
      )}

      {/* Share Profile Action Button */}
      <button
        onClick={handleShareProfile}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700">Profile Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>Share Profile</span>
          </>
        )}
      </button>
    </div>
  );
}
