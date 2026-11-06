# CS Team — Digital Profile & QR Code Website

A modern, responsive, high-performance static website for a 15-member team. Every member has their own dedicated digital profile page and a permanent, high-resolution QR code.

Built with **React.js + Vite**, **Tailwind CSS**, **Lucide Icons**, and client-side QR/vCard generators.

---

## 🚀 Features

1. **Main Team Page (`/`)**:
   - Organization branding & 15-member counter.
   - Responsive team directory grid with photograph/avatar, full name, designation, department, and bio.
   - Quick **View Profile** and **Download QR** buttons on every card.
   - Real-time search and department filtering.

2. **Dedicated Member QR Codes Section (`#qrcodes`)**:
   - Clean, scannable gallery of all 15 member QR codes.
   - Download individual QR codes as high-res **PNG** or vector **SVG**.
   - Printable sheet layout (`Print` button) styled for event badges, stickers, and brochures.
   - **Download All QR Codes (ZIP)**: Packages all 15 high-res QR codes into a single `.zip` file with one click.

3. **Individual Member Profile Pages (`/members/:slug`)**:
   - Public URLs: `/members/member-01` through `/members/member-15`.
   - **Mobile-first digital card design** optimized for visitors scanning QR codes from their smartphones.
   - Interactive **"Show QR Code"** drawer for on-the-spot mobile-to-mobile scanning.
   - Previous / Next member fast navigation.

4. **Functional Contact & Action Buttons**:
   - **Save Contact to Phone**: Generates and downloads a `.vcf` (vCard 3.0) file compatible with iOS (Apple Contacts) and Android (Google Contacts).
   - **Call Now**: One-tap phone dialer link (`tel:`).
   - **Send Email**: Opens default mail application (`mailto:`).
   - **WhatsApp**: Opens WhatsApp chat direct link.
   - **Share Profile**: Native mobile Web Share API with clipboard copy fallback.
   - **Social Links**: LinkedIn, GitHub, Instagram, Facebook, TikTok, and Personal Portfolio. Only active links are displayed.

5. **Safe Placeholder Handling ("blank")**:
   - As requested, all logos, photographs, and contact/social links currently use `"blank"`.
   - Elegant, gradient-accented initials avatars and badges are displayed automatically so no broken images or invalid links appear.
   - Whenever you provide your real data, simply edit `src/data/members.json`.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS (dark mode minimalism, glassmorphism, responsive grid)
- **Icons**: Lucide React + custom SVG brand icons
- **QR Code Generation**: `qrcode` npm package (High Error Correction 'H', PNG, SVG)
- **Archive Generation**: `jszip` (Bulk QR ZIP packaging)
- **SPA Routing**: React Router v6
- **Hosting / SPA Rewrites**: `vercel.json` (Vercel) & `_redirects` / `netlify.toml` (Netlify)

---

## 📂 Project Structure

```text
├── public/
│   └── _redirects             # Netlify SPA rewrite rule
├── src/
│   ├── components/
│   │   ├── ContactButtons.jsx # Functional buttons (Call, Email, WhatsApp, vCard, Socials)
│   │   ├── Footer.jsx         # Site footer
│   │   ├── MemberAvatar.jsx   # Photo handler with stylish initials fallback
│   │   ├── MemberCard.jsx     # Member card for team directory
│   │   ├── Navbar.jsx         # Glassmorphic top navigation with ZIP download
│   │   ├── QRCodeCard.jsx     # Card for the Member QR Codes section
│   │   ├── QRModal.jsx        # Full-screen QR preview & export modal
│   │   └── SocialIcons.jsx    # SVG icons for LinkedIn, Instagram, TikTok, etc.
│   ├── data/
│   │   └── members.json       # All 15 member profiles stored in a single file
│   ├── pages/
│   │   ├── HomePage.jsx       # Main team homepage & QR gallery
│   │   ├── MemberProfilePage.jsx # Dedicated mobile-first member profile
│   │   └── NotFoundPage.jsx   # 404 handler
│   ├── utils/
│   │   ├── format.js          # String sanitizer, phone cleaner, URL helpers
│   │   ├── qr.js              # PNG, SVG, printable sheet, and ZIP generators
│   │   └── vcard.js           # iOS & Android compliant vCard 3.0 generator
│   ├── config.js              # Production base URL & team configuration
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── netlify.toml
├── vercel.json
├── package.json
└── vite.config.js
```

---

## ✏️ How to Update Member Information

All member information is centralized in a single file:
👉 **`src/data/members.json`**

Each member entry uses this structure:

```json
{
  "id": "1",
  "slug": "member-01",
  "fullName": "Jane Doe",
  "designation": "Team Lead & Project Director",
  "department": "Executive Committee",
  "organization": "CS Team",
  "profileImage": "https://example.com/photos/jane.jpg",
  "bio": "Experienced software architect and project director leading technical innovation.",
  "phone": "+1234567890",
  "email": "jane.doe@example.com",
  "whatsapp": "+1234567890",
  "instagram": "janedoe",
  "linkedin": "https://linkedin.com/in/janedoe",
  "facebook": "blank",
  "tiktok": "blank",
  "github": "janedoe",
  "portfolio": "https://janedoe.dev"
}
```

> **Tip**: Any field set to `"blank"`, `""`, or omitted will automatically be hidden from the public profile.

---

## 🌐 Configuring the Production QR Base URL

QR codes must point to your real live domain rather than `localhost`.

### Option 1: Using `.env` (Recommended)
Copy `.env.example` to `.env` and set your domain:
```bash
VITE_SITE_URL=https://your-domain.com
```

### Option 2: Editing `src/config.js`
In `src/config.js`, change `DEFAULT_PRODUCTION_URL`:
```javascript
export const DEFAULT_PRODUCTION_URL = 'https://your-domain.com';
```

When deployed to production (Vercel, Netlify, custom domain), the system also automatically detects `window.location.origin` if not on localhost.

---

## 💻 Development & Build Commands

### Start Local Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
The production bundle will be generated in `dist/`.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub or GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Environment Variables:
   - Key: `VITE_SITE_URL`
   - Value: `https://your-vercel-domain.vercel.app`
5. Click **Deploy**. The included `vercel.json` ensures all `/members/:slug` SPA routes resolve seamlessly.

### Deploying to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `public/_redirects` and `netlify.toml` automatically route all SPA traffic to `/index.html`.

