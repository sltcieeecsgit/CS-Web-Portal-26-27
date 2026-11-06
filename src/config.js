/**
 * Application & Society Configuration
 */

export const DEFAULT_PRODUCTION_URL = 'https://cs-team-profiles.vercel.app';

export function getBaseUrl() {
  if (import.meta.env.VITE_SITE_URL && import.meta.env.VITE_SITE_URL.trim() !== '') {
    return import.meta.env.VITE_SITE_URL.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.startsWith('192.168.')) {
      return window.location.origin;
    }
  }

  return DEFAULT_PRODUCTION_URL;
}

export function getMemberUrl(slug) {
  const base = getBaseUrl();
  return `${base}/members/${slug}`;
}

export const teamConfig = {
  name: "IEEE Computer Society",
  shortName: "IEEE CS",
  chapter: "Student Branch Chapter of SLTC",
  fullName: "IEEE Computer Society Student Branch Chapter of SLTC",
  description: "Official digital profiles and contact directory of the Executive Committee and Sub Committee members.",
  totalMembers: 15,
  logo: "/img/logo.png",
  organization: "IEEE Student Branch SLTC",
};
