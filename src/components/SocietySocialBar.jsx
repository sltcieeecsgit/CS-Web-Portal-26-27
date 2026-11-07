import React from 'react';
import { societySocialLinks } from '../config';

export default function SocietySocialBar({ className = '', iconSize = 'w-11 h-11 sm:w-12 sm:h-12' }) {
  return (
    <div className={`flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 ${className}`}>
      {societySocialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target={item.name === 'Email' ? undefined : '_blank'}
          rel={item.name === 'Email' ? undefined : 'noopener noreferrer'}
          title={item.title}
          aria-label={item.name}
          className={`${iconSize} rounded-2xl bg-white ${item.hoverBg} border border-amber-200/90 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center p-2.5 transition-all duration-200`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </a>
      ))}
    </div>
  );
}

