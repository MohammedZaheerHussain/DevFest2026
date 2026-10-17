import React, { useState } from 'react';
import type { CardState } from '../types/game';
import { renderCardLogo, GdgMark } from '../constants/logos';

interface CardProps {
  card: CardState;
  onClick: (card: CardState, event: React.MouseEvent<HTMLDivElement>) => void;
  disabled: boolean;
  isFocused?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled, isFocused }) => {
  const isFaceUp = card.isFlipped || card.isMatched;
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isFaceUp) return;
    onClick(card, e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && !isFaceUp) {
        onClick(card, e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    }
  };

  // 3D dynamic tilt tracking mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFaceUp || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      data-ui="card"
      className={`memory-card-container card3d ${isFaceUp ? 'flipped is-up' : ''} ${
        card.isMatched ? 'matched is-matched' : ''
      } ${card.isShaking ? 'shake' : ''} ${disabled ? 'locked' : ''} ${
        isFocused ? 'keyboard-focused' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={isFaceUp || disabled ? -1 : 0}
      aria-label={
        isFaceUp
          ? `${card.name}, ${card.isMatched ? 'matched' : 'flipped'}`
          : 'DevFest Memory Card'
      }
      aria-disabled={isFaceUp || disabled}
      data-card-id={card.id}
      style={{
        transform:
          !isFaceUp && (tilt.x !== 0 || tilt.y !== 0)
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
            : undefined,
      }}
    >
      <div className="card-flipper card-inner">
        {/* CARD BACK (Displayed when Face Down) */}
        <div className="card-side card-face card-back card-back-design">
          <div className="card-back-pattern">
            <div className="card-back-badge">
              <GdgMark size={56} className="gdg-card-back-mark" />
            </div>
            <div className="card-back-label">DEVFEST</div>
          </div>
        </div>

        {/* CARD FRONT (Displayed when Face Up - Logo revealed) */}
        <div
          className="card-side card-face card-front card-front-design"
          style={
            {
              '--card-accent-color': card.color,
              '--card-glow-color': card.glowColor,
            } as React.CSSProperties
          }
        >
          {/* Sponsor Tag if applicable */}
          {card.isSponsor && (
            <span className="sponsor-pill-tag">
              {card.sponsorTier || 'SPONSOR'}
            </span>
          )}

          {/* Logo Graphic */}
          <div className="card-logo-wrapper">
            {renderCardLogo(card, 52)}
          </div>

          {/* Label */}
          <div className="card-info">
            <span className="card-title">{card.name}</span>
            <span className="card-category">{card.category}</span>
          </div>

          {/* Matched checkmark indicator */}
          {card.isMatched && (
            <div className="card-matched-badge" title="Matched!">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
