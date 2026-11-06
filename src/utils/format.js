/**
 * Helper utilities for formatting and validation
 */

/**
 * Checks if a value is provided and not a placeholder like "blank", "none", or empty.
 */
export function isValidValue(val) {
  if (val === null || val === undefined) return false;
  const str = String(val).trim();
  if (str === '') return false;
  const lower = str.toLowerCase();
  return lower !== 'blank' && lower !== 'none' && lower !== '#' && lower !== 'null' && lower !== 'undefined';
}

/**
 * Sanitizes phone numbers for tel: and WhatsApp links (removes spaces, dashes, parentheses).
 */
export function cleanPhone(val) {
  if (!isValidValue(val)) return '';
  return String(val).replace(/[^\d+]/g, '');
}

/**
 * Generates display initials from a full name (e.g., "Member 01" -> "M1", "Jane Doe" -> "JD").
 */
export function getInitials(name) {
  if (!name) return 'TM';
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  // If e.g. "Member 01", return "M01" or "M1"
  if (/^\d+$/.test(parts[1])) {
    return `${parts[0][0]}${parts[1]}`.toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Formats a social handle or URL to ensure full external URL
 */
export function formatSocialUrl(platform, value) {
  if (!isValidValue(value)) return null;
  const clean = String(value).trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (clean.startsWith('www.')) {
    return `https://${clean}`;
  }
  
  // Format based on platform
  const handle = clean.replace(/^@/, '');
  switch (platform.toLowerCase()) {
    case 'instagram':
      return handle.includes('instagram.com') ? `https://${handle}` : `https://instagram.com/${handle}`;
    case 'linkedin':
      return handle.includes('linkedin.com') ? `https://${handle}` : `https://linkedin.com/in/${handle}`;
    case 'facebook':
      return handle.includes('facebook.com') ? `https://${handle}` : `https://facebook.com/${handle}`;
    case 'tiktok':
      return handle.includes('tiktok.com') ? `https://${handle}` : `https://tiktok.com/@${handle}`;
    case 'github':
      return handle.includes('github.com') ? `https://${handle}` : `https://github.com/${handle}`;
    case 'whatsapp': {
      let num = cleanPhone(handle);
      if (num.startsWith('+')) num = num.substring(1);
      if (num.startsWith('0') && num.length === 10) {
        num = '94' + num.substring(1);
      }
      return `https://wa.me/${num}`;
    }
    case 'portfolio':
      return `https://${clean}`;
    default:
      return `https://${clean}`;
  }
}

