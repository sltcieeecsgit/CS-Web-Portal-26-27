import React, { useState } from 'react';
import { isValidValue, getInitials } from '../utils/format';

// Eagerly import all local images so Vite can bundle and hash them reliably
const localImages = import.meta.glob('../img/**/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

function resolveImageSrc(path) {
  if (!isValidValue(path)) return null;
  const clean = path.replace(/^\/+/, '');
  for (const [key, assetUrl] of Object.entries(localImages)) {
    if (key.endsWith(clean) || key.includes(clean)) {
      return assetUrl;
    }
  }
  return path;
}

const GRADIENT_PALETTES = [
  'from-amber-400 to-yellow-500',
  'from-yellow-400 to-amber-600',
  'from-amber-500 to-orange-500',
  'from-yellow-500 to-amber-500',
  'from-amber-400 to-orange-400',
  'from-yellow-400 to-amber-500',
  'from-amber-500 to-yellow-600',
  'from-orange-400 to-amber-500',
];

export default function MemberAvatar({ member, size = 'md', className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    card: 'w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-sm sm:text-xl',
    lg: 'w-24 h-24 text-xl',
    xl: 'w-32 h-32 text-2xl',
    xxl: 'w-44 h-44 sm:w-48 sm:h-48 text-4xl',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const resolvedSrc = resolveImageSrc(member?.profileImage);
  const hasValidImage = Boolean(resolvedSrc) && !imageFailed;

  const idNum = parseInt(member?.id, 10) || 0;
  const palette = GRADIENT_PALETTES[Math.abs(idNum) % GRADIENT_PALETTES.length];
  const initials = getInitials(member?.fullName);

  if (hasValidImage) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-amber-50 ring-2 ring-amber-300/70 shadow-md ${currentSize} ${className}`}>
        <img
          src={resolvedSrc}
          alt={member?.fullName || 'Member Photograph'}
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br ${palette} text-slate-950 font-black ring-2 ring-amber-300/80 shadow-md select-none ${currentSize} ${className}`}
      title={member?.fullName}
    >
      <span className="relative z-10 tracking-wider font-black">
        {initials}
      </span>
      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Member" />
    </div>
  );
}
