import React from 'react';
import type { CardItem } from '../types/game';

export interface LogoRendererProps {
  className?: string;
  size?: number;
}

// DevFest 2026 Signature GDG Brackets Mark for Card Backs
export const GdgMark: React.FC<{ className?: string; size?: number }> = ({ className, size = 64 }) => (
  <svg
    viewBox="0 0 120 70"
    width={size}
    height={(size * 70) / 120}
    className={className}
    aria-label="GDG brackets"
  >
    <g stroke="#15171e" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round">
      <rect x="6" y="20" width="44" height="18" rx="9" fill="#EA4335" transform="rotate(-35 28 29)" />
      <rect x="6" y="32" width="44" height="18" rx="9" fill="#4285F4" transform="rotate(35 28 41)" />
      <rect x="70" y="20" width="44" height="18" rx="9" fill="#34A853" transform="rotate(35 92 29)" />
      <rect x="70" y="32" width="44" height="18" rx="9" fill="#FBBC04" transform="rotate(-35 92 41)" />
    </g>
  </svg>
);

// 1. Google 'G'
export const GoogleGLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

// 2. Gemini Sparkle
export const GeminiLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 2C24 14.15 14.15 24 2 24C14.15 24 24 33.85 24 46C24 33.85 33.85 24 46 24C33.85 24 24 14.15 24 2Z"
      fill="#4285F4"
    />
    <circle cx="24" cy="24" r="5" fill="#FFFFFF" />
  </svg>
);

// 3. Android
export const AndroidLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="14" y1="12" x2="9" y2="4" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
    <line x1="34" y1="12" x2="39" y2="4" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 30C8 21.16 15.16 14 24 14C32.84 14 40 21.16 40 30H8Z" fill="#3DDC84" />
    <circle cx="17.5" cy="22.5" r="2.5" fill="#FFFFFF" />
    <circle cx="30.5" cy="22.5" r="2.5" fill="#FFFFFF" />
    <rect x="8" y="32" width="32" height="4" rx="2" fill="#3DDC84" />
  </svg>
);

// 4. Chrome
export const ChromeLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#FFFFFF" />
    <path d="M24 24L5.2 13.2C8.8 7 15.8 2.6 24 2.6C32.2 2.6 39.5 7.1 43.1 13.9L24 24Z" fill="#EA4335" />
    <path d="M24 24L43.1 13.9C45.2 17.6 46 21.9 45.4 26.2C44.4 33.7 39.5 39.9 32.7 42.8L24 24Z" fill="#34A853" />
    <path d="M24 24L32.7 42.8C27 45.3 20.3 45.1 14.8 42C9.2 38.8 5.2 33.5 3.8 27.2L24 24Z" fill="#FBBC05" />
    <circle cx="24" cy="24" r="10.5" fill="#FFFFFF" />
    <circle cx="24" cy="24" r="8" fill="#4285F4" />
  </svg>
);

// 5. Firebase
export const FirebaseLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.2 36.5L20.8 12.8C21.4 11.7 23 11.7 23.5 12.8L27.6 20.5L8.2 36.5Z" fill="#FFA000" />
    <path d="M8.2 36.5L14.5 5.8C14.7 4.6 16.3 4.3 17 5.3L27.6 20.5L8.2 36.5Z" fill="#FF8F00" opacity="0.85" />
    <path d="M39.8 36.5L34.1 25.7L27.6 20.5L34.9 6.8C35.5 5.7 37.1 5.8 37.5 7L42.5 33.4C42.8 35.1 41.5 36.5 39.8 36.5Z" fill="#F57C00" />
    <path d="M8.2 36.5L23.4 45.3C24.3 45.8 25.4 45.8 26.3 45.3L40 36.5L27.6 20.5L8.2 36.5Z" fill="#FFCA28" />
  </svg>
);

// 6. Flutter
export const FlutterLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M28.8 4L8 24.8L14.4 31.2L38.4 7.2L28.8 4Z" fill="#42A5F5" />
    <path d="M24 35.2L17.6 28.8L30.4 16L36.8 22.4L24 35.2Z" fill="#01579B" />
    <path d="M30.4 41.6L17.6 28.8L24 22.4L43.2 41.6H30.4Z" fill="#29B6F6" />
    <path d="M24 22.4L20 26.4L25.6 32L30.4 28.8L24 22.4Z" fill="#0288D1" />
  </svg>
);

// 7. Google Cloud
export const GoogleCloudLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25.7 10C29.8 10 33.3 12.4 35 15.8C34.4 16.3 33.8 17 33.3 17.7C32 15.4 29.1 13.8 25.7 13.8C21.7 13.8 18.2 16.1 16.6 19.5L13.5 17.4C15.8 12.9 20.4 10 25.7 10Z" fill="#4285F4" />
    <path d="M35 15.8C38.9 16.8 41.8 20.4 41.8 24.6C41.8 29.4 38 33.2 33.2 33.2H32V29.4H33.2C35.9 29.4 38 27.3 38 24.6C38 22.3 36.4 20.3 34.2 19.8L35 15.8Z" fill="#EA4335" />
    <path d="M12 33.2H32V29.4H12C9.8 29.4 8 27.6 8 25.4C8 23.3 9.7 21.6 11.8 21.4L12.5 25.2L16.4 23.2L16.6 19.5C15.2 19.5 13.6 20 12.4 20.9L10 17.8C10.7 17.3 11.3 17 12 17C12 17 12 33.2 12 33.2Z" fill="#FBBC05" />
    <path d="M12 25.4C12 27.6 13.8 29.4 16 29.4H24V33.2H16C11.6 33.2 8 29.6 8 25.4C8 21.6 10.7 18.4 14.4 17.8L15.2 21.5C13.4 22 12 23.5 12 25.4Z" fill="#34A853" />
  </svg>
);

// 8. Google Maps
export const GoogleMapsLogo: React.FC<LogoRendererProps> = ({ className, size = 56 }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 4C15.2 4 8 11.2 8 20C8 28.5 19.8 40.8 22.8 43.8C23.5 44.5 24.5 44.5 25.2 43.8C28.2 40.8 40 28.5 40 20C40 11.2 32.8 4 24 4Z" fill="#34A853" />
    <path d="M24 4C32.8 4 40 11.2 40 20C40 26.2 34.6 34.2 28.8 40.2L24 20L19.2 8.5C20.7 5.6 22.3 4 24 4Z" fill="#EA4335" />
    <path d="M19.2 8.5L24 20L11.5 29.2C9.3 25.6 8 22.5 8 20C8 14.8 11.8 10.4 16.8 8.8L19.2 8.5Z" fill="#FBBC05" />
    <path d="M24 20L28.8 40.2C27.2 41.8 25.6 43.1 24.8 43.8C24.3 44.2 23.7 44.2 23.2 43.8C21.8 42.4 17.5 38 13.8 32.5L24 20Z" fill="#4285F4" />
    <circle cx="24" cy="18" r="6" fill="#FFFFFF" />
  </svg>
);

// 9. Globe
export const GlobeLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <circle cx="24" cy="24" r="20" fill="#34A853" stroke="#15171e" strokeWidth="2.5" />
    <ellipse cx="24" cy="24" rx="9" ry="20" stroke="#15171e" strokeWidth="2.5" />
    <path d="M5 24h38M8 14h32M8 34h32" stroke="#15171e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 10. Asterisk
export const AsteriskLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <path d="M24 6v36" stroke="#EA4335" strokeWidth="5" strokeLinecap="round" />
    <path d="M8 15l32 18" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" />
    <path d="M8 33l32-18" stroke="#FBBC04" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// 11. Code Brackets
export const BracesLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <path d="M18 10h-4a4 4 0 0 0-4 4v7l-4 3 4 3v7a4 4 0 0 0 4 4h4" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round" />
    <path d="M30 10h4a4 4 0 0 1 4 4v7l4 3-4 3v7a4 4 0 0 1-4 4h-4" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 12. Terminal
export const TerminalLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <rect x="6" y="10" width="36" height="28" rx="5" fill="#15171e" stroke="#15171e" strokeWidth="2.5" />
    <path d="M14 20l6 4-6 4" stroke="#34A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 28h9" stroke="#34A853" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 13. Rocket
export const RocketLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <path d="M24 4c8 6 10 18 6 30H18C14 22 16 10 24 4z" fill="#FFFFFF" stroke="#15171e" strokeWidth="2.5" />
    <circle cx="24" cy="18" r="4" fill="#4285F4" />
    <path d="M18 26l-6 8 6 2zM30 26l6 8-6 2z" fill="#EA4335" stroke="#15171e" strokeWidth="2" />
    <path d="M20 34l4 9 4-9z" fill="#FBBC04" />
  </svg>
);

// 14. Bulb
export const BulbLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <path d="M24 6a14 14 0 0 0-8 25v6h16v-6A14 14 0 0 0 24 6z" fill="#FBBC04" stroke="#15171e" strokeWidth="2.5" />
    <path d="M18 41h12M20 45h8" stroke="#15171e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 15. Bug
export const BugLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <ellipse cx="24" cy="27" rx="11" ry="14" fill="#EA4335" stroke="#15171e" strokeWidth="2.5" />
    <path d="M24 13v28" stroke="#15171e" strokeWidth="2" />
    <circle cx="24" cy="12" r="5" fill="#15171e" />
    <path d="M13 22H5M13 32H5M35 22h8M35 32h8" stroke="#15171e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 16. Wifi
export const WifiLogo: React.FC<LogoRendererProps> = ({ size = 56 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
    <path d="M8 18a28 28 0 0 1 32 0" stroke="#4285F4" strokeWidth="4" strokeLinecap="round" />
    <path d="M14 25a18 18 0 0 1 20 0" stroke="#EA4335" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 32a8 8 0 0 1 8 0" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="39" r="3" fill="#34A853" />
  </svg>
);

// All 16 Canonical DevFest & Google Developer Ecosystem Card Items
export const ALL_CARD_ITEMS: CardItem[] = [
  {
    id: 'google-g',
    pairId: 'google-g',
    name: 'Google G',
    category: 'Google Ecosystem',
    color: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.6)',
  },
  {
    id: 'gemini',
    pairId: 'gemini',
    name: 'Gemini',
    category: 'AI & Machine Learning',
    color: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.6)',
  },
  {
    id: 'android',
    pairId: 'android',
    name: 'Android',
    category: 'Mobile OS',
    color: '#3DDC84',
    glowColor: 'rgba(61, 220, 132, 0.6)',
  },
  {
    id: 'chrome',
    pairId: 'chrome',
    name: 'Chrome',
    category: 'Web Platform',
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.6)',
  },
  {
    id: 'firebase',
    pairId: 'firebase',
    name: 'Firebase',
    category: 'App Backend',
    color: '#FFA000',
    glowColor: 'rgba(255, 160, 0, 0.6)',
  },
  {
    id: 'flutter',
    pairId: 'flutter',
    name: 'Flutter',
    category: 'Multiplatform UI',
    color: '#02569B',
    glowColor: 'rgba(2, 86, 155, 0.6)',
  },
  {
    id: 'google-cloud',
    pairId: 'google-cloud',
    name: 'Google Cloud',
    category: 'Cloud Infrastructure',
    color: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.6)',
  },
  {
    id: 'google-maps',
    pairId: 'google-maps',
    name: 'Google Maps',
    category: 'Geospatial & Location',
    color: '#34A853',
    glowColor: 'rgba(52, 168, 83, 0.6)',
  },
  {
    id: 'globe',
    pairId: 'globe',
    name: 'Global Web',
    category: 'Community & Networks',
    color: '#34A853',
    glowColor: 'rgba(52, 168, 83, 0.6)',
  },
  {
    id: 'asterisk',
    pairId: 'asterisk',
    name: 'Compute',
    category: 'Algorithms & Math',
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.6)',
  },
  {
    id: 'braces',
    pairId: 'braces',
    name: 'Code Brackets',
    category: 'Developer Syntax',
    color: '#FBBC04',
    glowColor: 'rgba(251, 188, 4, 0.6)',
  },
  {
    id: 'terminal',
    pairId: 'terminal',
    name: 'Terminal',
    category: 'DevTools & CLI',
    color: '#34A853',
    glowColor: 'rgba(52, 168, 83, 0.6)',
  },
  {
    id: 'rocket',
    pairId: 'rocket',
    name: 'Deploy',
    category: 'Production Release',
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.6)',
  },
  {
    id: 'bulb',
    pairId: 'bulb',
    name: 'Innovation',
    category: 'Ideas & Prototypes',
    color: '#FBBC04',
    glowColor: 'rgba(251, 188, 4, 0.6)',
  },
  {
    id: 'bug',
    pairId: 'bug',
    name: 'Debugger',
    category: 'Testing & QA',
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.6)',
  },
  {
    id: 'wifi',
    pairId: 'wifi',
    name: 'IoT & Network',
    category: 'Connected Hardware',
    color: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.6)',
  },
];

export const DEFAULT_CARD_ITEMS: CardItem[] = ALL_CARD_ITEMS.slice(0, 8);

// Helper to render the appropriate logo component based on card pairId
export const renderCardLogo = (card: CardItem, size = 56) => {
  switch (card.pairId) {
    case 'google-g':
      return <GoogleGLogo size={size} />;
    case 'gemini':
      return <GeminiLogo size={size} />;
    case 'android':
      return <AndroidLogo size={size} />;
    case 'chrome':
      return <ChromeLogo size={size} />;
    case 'firebase':
      return <FirebaseLogo size={size} />;
    case 'flutter':
      return <FlutterLogo size={size} />;
    case 'google-cloud':
      return <GoogleCloudLogo size={size} />;
    case 'google-maps':
      return <GoogleMapsLogo size={size} />;
    case 'globe':
      return <GlobeLogo size={size} />;
    case 'asterisk':
      return <AsteriskLogo size={size} />;
    case 'braces':
      return <BracesLogo size={size} />;
    case 'terminal':
      return <TerminalLogo size={size} />;
    case 'rocket':
      return <RocketLogo size={size} />;
    case 'bulb':
      return <BulbLogo size={size} />;
    case 'bug':
      return <BugLogo size={size} />;
    case 'wifi':
      return <WifiLogo size={size} />;
    default:
      return <GdgMark size={size} />;
  }
};
