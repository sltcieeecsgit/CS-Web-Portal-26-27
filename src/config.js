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

export const societySocialLinks = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/sltcieeecs?_rdc=1&_rdr#',
    icon: '/img/icons/facebook.svg',
    title: 'Follow IEEE CS SLTC on Facebook',
    hoverBg: 'hover:bg-blue-50/80',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/sltcieeecs/',
    icon: '/img/icons/linkedin.svg',
    title: 'Connect with IEEE CS SLTC on LinkedIn',
    hoverBg: 'hover:bg-sky-50/80',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sltcieeecs',
    icon: '/img/icons/instagram.svg',
    title: 'Follow IEEE CS SLTC on Instagram',
    hoverBg: 'hover:bg-pink-50/80',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/sltcieeecs',
    icon: '/img/icons/github.png',
    title: 'Explore IEEE CS SLTC on GitHub',
    hoverBg: 'hover:bg-slate-100',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@sltcieeecs',
    icon: '/img/icons/medium.png',
    title: 'Read IEEE CS SLTC Articles on Medium',
    hoverBg: 'hover:bg-amber-50/80',
  },
  {
    name: 'Email',
    url: 'mailto:sltcieeecs@gmail.com',
    icon: '/img/icons/gmail.svg',
    title: 'Email IEEE CS SLTC (sltcieeecs@gmail.com)',
    hoverBg: 'hover:bg-amber-50/80',
  },
];
