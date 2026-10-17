import React, { useState } from 'react';
import { GdgMark, DEFAULT_CARD_ITEMS, renderCardLogo } from '../constants/logos';
import type { CardState, Difficulty, CardItem } from '../types/game';
import { Card } from './Card';
import { TrophyIcon, KeyboardIcon, TargetIcon, FlameIcon } from '../constants/icons';
import { soundFX } from '../utils/audio';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty, modeDuration?: number) => void;
  bestScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  bestScore,
}) => {
  const [selectedDiff, setSelectedDiff] = useState<Difficulty>('easy');

  // Interactive Live Practice Card on the Start Screen
  const [practiceCard, setPracticeCard] = useState<CardState>({
    id: 'practice-card',
    pairId: 'gemini',
    name: 'Gemini',
    category: 'Interactive Preview',
    color: '#4285F4',
    glowColor: 'rgba(66, 133, 244, 0.4)',
    isFlipped: false,
    isMatched: false,
  });

  const handlePracticeFlip = () => {
    soundFX.playFlip();
    setPracticeCard((prev) => ({
      ...prev,
      isFlipped: !prev.isFlipped,
    }));
  };

  return (
    <div className="start-screen-container" data-ui="start-screen">
      {/* DevFest 2026 Branding Title */}
      <div className="hero-header-section">
        <h1 className="hero-branding-title">
          <span className="brace-yellow">{"{"}</span>
          DevFest
          <span className="brace-orange">{"}"}</span>
          <span className="hero-branding-sub">Memory Match</span>
        </h1>
      </div>

      {/* Main DevFest 2026 Neo-brutalist Panel */}
      <section className="panel start-hero-panel">
        <div className="panel-gdg-mark">
          <GdgMark size={110} />
        </div>

        <h2 className="round-badge-title">Round 1</h2>

        <p className="hero-subtitle">
          Flip two cards. Match developer ecosystem pairs before the clock runs out. +100 per pair.
        </p>

        {/* Real-time Best Score Badge */}
        {bestScore > 0 && (
          <div className="best-score-badge">
            <TrophyIcon size={18} color="#FBBC04" />
            <span className="best-label">High Score:</span>
            <span className="best-val">{bestScore} pts</span>
          </div>
        )}

        {/* Difficulty Choice Cards (Easy 4x4 / Hard 8x4) */}
        <div className="difficulty-grid" role="group" aria-label="Select Difficulty">
          <button
            type="button"
            className={`choice choice-easy ${selectedDiff === 'easy' ? 'choice-selected' : ''}`}
            onClick={() => setSelectedDiff('easy')}
          >
            <span className="choice-title">Easy</span>
            <span className="choice-sub">16 cards · 60s · 4×4</span>
          </button>

          <button
            type="button"
            className={`choice choice-hard ${selectedDiff === 'hard' ? 'choice-selected' : ''}`}
            onClick={() => setSelectedDiff('hard')}
          >
            <span className="choice-title">Hard</span>
            <span className="choice-sub">32 cards · 90s · 8×4</span>
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="hero-cta-group">
          <button
            className="pill-btn pill-primary start-game-btn"
            onClick={() => onStartGame(selectedDiff)}
            autoFocus
            aria-label={`Start ${selectedDiff === 'easy' ? 'Easy' : 'Hard'} Game`}
          >
            <span className="btn-content">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
              <span>PLAY {selectedDiff.toUpperCase()} MODE</span>
            </span>
          </button>
        </div>
      </section>

      {/* Interactive Practice & Controls Showcase */}
      <section className="interactive-showcase-panel">
        <div className="practice-card-box">
          <div className="practice-card-wrapper" onClick={handlePracticeFlip}>
            <Card card={practiceCard} onClick={handlePracticeFlip} disabled={false} />
          </div>
          <div className="practice-card-caption">
            <span className="caption-action">Click to test 3D flip</span>
            <span className="caption-status">
              {practiceCard.isFlipped ? 'Logo Revealed!' : 'GDG Brackets Mark'}
            </span>
          </div>
        </div>

        <div className="controls-guide-box">
          <div className="guide-row">
            <KeyboardIcon size={20} color="#4285F4" />
            <div>
              <strong>Keyboard Controls</strong>
              <p>Navigate with Arrow Keys. Press Spacebar or Enter to flip cards.</p>
            </div>
          </div>
          <div className="guide-row">
            <FlameIcon size={20} color="#FBBC04" />
            <div>
              <strong>Combo Streaks</strong>
              <p>Consecutive matches award multiplier streak bonuses up to 250 pts.</p>
            </div>
          </div>
          <div className="guide-row">
            <TargetIcon size={20} color="#34A853" />
            <div>
              <strong>Tactile Sound & Feel</strong>
              <p>Instant audio synthesis, smooth flips, and confetti celebration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Logos Preview Reel */}
      <section className="ecosystem-preview-section">
        <h3 className="ecosystem-heading">Technologies in Play</h3>
        <div className="logos-ticker">
          {DEFAULT_CARD_ITEMS.map((item: CardItem) => (
            <div key={item.id} className="ticker-item" title={item.name}>
              <div className="ticker-logo-icon">
                {renderCardLogo(item, 28)}
              </div>
              <span className="ticker-name">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & Independent Label */}
      <footer className="start-footer-disclaimer">
        <p>
          DevFest Memory Match is an independent community project created for Google DevFest participants. Not an official Google product.
        </p>
      </footer>
    </div>
  );
};
