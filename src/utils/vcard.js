import { isValidValue } from './format';

/**
 * Generates and triggers the download of a .vcf (vCard 3.0) file
 * compatible with iOS, Android, macOS, and Windows.
 */
export function downloadVCard(member, profileUrl) {
  const parts = (member.fullName || 'Member').trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';

  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${member.fullName || 'Team Member'}`,
  ];

  if (isValidValue(member.organization)) {
    vcardLines.push(`ORG:${member.organization}${isValidValue(member.department) ? `;${member.department}` : ''}`);
  }

  if (isValidValue(member.designation)) {
    vcardLines.push(`TITLE:${member.designation}`);
  }

  if (isValidValue(member.phone)) {
    vcardLines.push(`TEL;TYPE=CELL,VOICE:${member.phone}`);
  }

  if (isValidValue(member.whatsapp) && member.whatsapp !== member.phone) {
    vcardLines.push(`TEL;TYPE=WORK,VOICE:${member.whatsapp}`);
  }

  if (isValidValue(member.email)) {
    vcardLines.push(`EMAIL;TYPE=PREF,INTERNET:${member.email}`);
  }

  if (profileUrl) {
    vcardLines.push(`URL:${profileUrl}`);
  } else if (isValidValue(member.portfolio)) {
    vcardLines.push(`URL:${member.portfolio}`);
  }

  if (isValidValue(member.bio)) {
    // Escape newlines for vCard notes
    const sanitizedBio = member.bio.replace(/\n/g, '\\n');
    vcardLines.push(`NOTE:${sanitizedBio}`);
  }

  vcardLines.push('END:VCARD');

  const vcardContent = vcardLines.join('\r\n');
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = (member.fullName || 'contact').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `${safeFilename}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

