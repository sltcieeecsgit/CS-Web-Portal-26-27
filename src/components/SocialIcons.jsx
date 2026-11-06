import React from 'react';

/**
 * Authentic brand SVGs with true official colors
 */

// Official WhatsApp Logo
export function WhatsAppRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.5A7.5 7.5 0 005.5 12c0 1.34.35 2.6.96 3.7L5.5 19.5l3.92-.95A7.47 7.47 0 0012 19.5a7.5 7.5 0 100-15zm3.76 10.37c-.16.45-.93.87-1.28.92-.33.05-.75.07-2.26-.55-1.83-.76-3-2.63-3.09-2.75-.09-.12-.74-.98-.74-1.87 0-.9.47-1.33.63-1.51.16-.18.35-.23.47-.23.12 0 .24 0 .34.01.11.01.26-.04.4.3.15.37.51 1.25.56 1.34.05.09.08.2.01.32-.06.12-.09.2-.18.3-.09.1-.19.24-.27.32-.09.09-.19.19-.08.37.11.18.47.78 1.14 1.37.86.76 1.58 1 1.8 1.11.23.11.36.09.49-.05.12-.14.51-.6.65-.8.14-.21.27-.17.46-.1.18.07 1.15.54 1.35.64.2.1.33.15.38.23.05.08.05.47-.11.92z"
      />
    </svg>
  );
}

// Official Gmail Logo
export function GmailRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path fill="#4285F4" d="M22 6.5V18a2 2 0 01-2 2h-2V9.5L22 6.5z" />
      <path fill="#34A853" d="M2 6.5V18a2 2 0 002 2h2V9.5L2 6.5z" />
      <path fill="#EA4335" d="M18 9.5V4h-2.5L12 7.5 8.5 4H6v5.5L12 10l6-.5z" />
      <path fill="#FBBC05" d="M18 9.5L12 14 6 9.5V4l6 4.5L18 4v5.5z" />
      <path fill="#C5221F" d="M18 4L12 8.5 6 4" />
    </svg>
  );
}

// Official LinkedIn Logo
export function LinkedInRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M7.12 18.25H4.25V9h2.87v9.25zm-1.44-10.5c-.92 0-1.66-.75-1.66-1.66s.74-1.67 1.66-1.67c.92 0 1.66.75 1.66 1.67 0 .91-.74 1.66-1.66 1.66zm14.07 10.5h-2.87v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58h-2.87V9h2.76v1.26h.04c.38-.73 1.33-1.5 2.73-1.5 2.92 0 3.46 1.92 3.46 4.42v5.07h-.03z"
      />
    </svg>
  );
}

// Official Instagram Logo
export function InstagramRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-gradient-real" cx="20%" cy="105%" r="105%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-gradient-real)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

// Official Facebook Logo
export function FacebookRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M14.75 12h-2v7h-3v-7h-1.5V9.5h1.5V7.8c0-2.07 1.23-3.2 3.12-3.2.9 0 1.68.07 1.9.1v2.21h-1.3c-1 0-1.2.48-1.2 1.18V9.5h2.5l-.52 2.5z"
      />
    </svg>
  );
}

// Official GitHub Logo
export function GitHubRealIcon({ className = 'w-7 h-7' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#24292F" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.58 4 12c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0020 12c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

// Fallback monochrome versions for backward compatibility
export function LinkedInIcon({ className = 'w-4 h-4' }) {
  return <LinkedInRealIcon className={className} />;
}

export function InstagramIcon({ className = 'w-4 h-4' }) {
  return <InstagramRealIcon className={className} />;
}

export function FacebookIcon({ className = 'w-4 h-4' }) {
  return <FacebookRealIcon className={className} />;
}

export function GitHubIcon({ className = 'w-4 h-4' }) {
  return <GitHubRealIcon className={className} />;
}
