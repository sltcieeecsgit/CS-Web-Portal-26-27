import QRCode from 'qrcode';
import JSZip from 'jszip';

/**
 * Generate a PNG Data URL for a given text
 */
export async function generateQRCodeDataUrl(text, size = 600) {
  try {
    return await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0f172a', // Deep slate for crisp scanning
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Failed to generate QR code data URL', err);
    throw err;
  }
}

/**
 * Generate an SVG string for a given text
 */
export async function generateQRCodeSVG(text, size = 600) {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Failed to generate QR code SVG', err);
    throw err;
  }
}

/**
 * Download QR Code as PNG
 */
export async function downloadQRCodePNG(text, filename = 'qr-code.png', size = 1000) {
  const dataUrl = await generateQRCodeDataUrl(text, size);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download QR Code as SVG
 */
export async function downloadQRCodeSVG(text, filename = 'qr-code.svg', size = 1000) {
  const svgString = await generateQRCodeSVG(text, size);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Print individual QR code with an elegant printable layout
 */
export async function printQRCode(member, profileUrl) {
  const qrDataUrl = await generateQRCodeDataUrl(profileUrl, 800);
  
  const printWindow = window.open('', '_blank', 'width=700,height=800');
  if (!printWindow) {
    alert('Please allow popups to print the QR code.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print QR - ${member.fullName}</title>
        <style>
          @page {
            size: auto;
            margin: 20mm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #ffffff;
            color: #0f172a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 90vh;
            margin: 0;
            padding: 20px;
          }
          .card {
            border: 2px solid #e2e8f0;
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            max-width: 420px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          }
          .badge {
            display: inline-block;
            background: #f1f5f9;
            color: #0284c7;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 9999px;
            margin-bottom: 20px;
          }
          .qr-img {
            width: 280px;
            height: 280px;
            display: block;
            margin: 0 auto 24px;
            border-radius: 12px;
          }
          h1 {
            font-size: 24px;
            margin: 0 0 8px;
            font-weight: 700;
          }
          p.designation {
            font-size: 15px;
            color: #64748b;
            margin: 0 0 16px;
          }
          .url-box {
            background: #f8fafc;
            border: 1px dashed #cbd5e1;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 11px;
            color: #475569;
            word-break: break-all;
          }
          .footer-note {
            margin-top: 16px;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">${member.organization || 'CS Team'}</div>
          <img class="qr-img" src="${qrDataUrl}" alt="${member.fullName} QR Code" />
          <h1>${member.fullName}</h1>
          <p class="designation">${member.designation || 'Team Member'}</p>
          <div class="url-box">${profileUrl}</div>
          <div class="footer-note">Scan this QR code with any smartphone camera to view profile and save contact.</div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Generate a ZIP file containing all 15 member QR codes
 */
export async function downloadAllQRsZip(members, getUrlCallback, onProgress) {
  const zip = new JSZip();
  const folder = zip.folder('CS_Team_Member_QR_Codes');

  const total = members.length;
  for (let i = 0; i < total; i++) {
    const member = members[i];
    const url = getUrlCallback(member.slug);
    
    // Generate QR Data URL
    const dataUrl = await generateQRCodeDataUrl(url, 1000);
    // Strip data:image/png;base64, header to get pure base64
    const base64Data = dataUrl.split(',')[1];
    
    // Clean, readable filename: e.g. "01_Member_01.png"
    const paddedIndex = String(i + 1).padStart(2, '0');
    const safeName = (member.fullName || member.slug).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${paddedIndex}_${safeName}_QR.png`;
    
    folder.file(filename, base64Data, { base64: true });

    if (onProgress) {
      onProgress(i + 1, total);
    }
  }

  // Also include a README.txt inside the ZIP
  const readmeContent = `CS Team - Member QR Codes Directory
Total Members: ${total}
Generated at: ${new Date().toLocaleString()}

Each QR code in this archive directly links to the permanent digital profile of the corresponding team member.
Scan using any mobile device camera or QR scanner app to view the profile and download the member's vCard contact directly.
`;
  folder.file('README.txt', readmeContent);

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `CS_Team_All_15_Member_QRs.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

