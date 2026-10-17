import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  filled?: boolean;
}

export const TrophyIcon: React.FC<IconProps> = ({ size = 20, className, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8 21H16M12 17V21M6 4H18V8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8V4ZM6 6H3C2.44772 6 2 6.44772 2 7V8C2 9.65685 3.34315 11 5 11H6M18 6H21C21.5523 6 22 6.44772 22 7V8C22 9.65685 20.6569 11 19 11H18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FlameIcon: React.FC<IconProps> = ({ size = 20, className, color = '#FBBC04' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8.5 14.5C8.5 16.433 10.067 18 12 18C13.933 18 15.5 16.433 15.5 14.5C15.5 12.5 13.5 10.5 13.5 8C11 9.5 8.5 12 8.5 14.5Z"
      fill={color}
    />
    <path
      d="M12 3C8 7 5 11 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 9 14.5 5.5 12 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 20, className, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path d="M12 7V12L15 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 18, className, color = '#FBBC04', filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} className={className}>
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 18, className, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const KeyboardIcon: React.FC<IconProps> = ({ size = 20, className, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="3" stroke={color} strokeWidth="2" />
    <path d="M6 9H6.01M10 9H10.01M14 9H14.01M18 9H18.01M6 12H6.01M10 12H10.01M14 12H14.01M18 12H18.01M8 15H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ size = 18, className, color = '#FBBC04' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
      fill={color}
    />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 20, className, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);
