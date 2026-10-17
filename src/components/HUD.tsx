import React from 'react';
import type { Difficulty } from '../types/game';
import { FlameIcon } from '../constants/icons';

interface HUDProps {
  difficulty: Difficulty;
  score: number;
  timeRemaining: number;
  isUntimed?: boolean;
  pairsFound: number;
  totalPairs: number;
  bestScore: number;
  streak: number;
  accuracy: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onHome: () => void;
  onOpenSponsors: () => void;
  moves: number;
}

export const HUD: React.FC<HUDProps> = ({
  difficulty,
  score,
  timeRemaining,
  isUntimed = false,
  pairsFound,
  totalPairs,
  bestScore: _bestScore,
  streak,
  accuracy: _accuracy,
  isMuted,
  onToggleMute,
  onRestart,
  onHome,
  onOpenSponsors,
  moves: _moves,
}) => {
  const isUrgent = !isUntimed && timeRemaining <= 10 && timeRemaining > 0;
  const progressPercent = (pairsFound / Math.max(totalPairs, 1)) * 100;

  return (
    <header className="hud-container" data-ui="hud">
      {/* Top Branding & Main Controls */}
      <div className="hud-header-row">
        <h1 className="hud-branding-title" onClick={onHome} role="button" tabIndex={0} title="Return to Start">
          <span className="brace-yellow">{"{"}</span>
          DevFest
          <span className="brace-orange">{"}"}</span>
          <span className="hud-branding-sub">Round 1</span>
        </h1>

        <div className="hud-actions-group">
          {streak > 1 && (
            <div className="streak-indicator-chip" title={`${streak} consecutive matches!`}>
              <FlameIcon size={16} color="#FBBC04" />
              <span>x{streak}</span>
            </div>
          )}

          <button
            className="pill-btn hud-action-btn sponsor-btn"
            onClick={onOpenSponsors}
            title="Organizer Sponsor Settings"
            aria-label="Organizer Sponsor Settings"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="btn-label-desktop">Sponsors</span>
          </button>

          <button
            className={`pill-btn hud-action-btn ${isMuted ? 'muted' : ''}`}
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M15.54 8.46C16.48 9.4 17 10.66 17 12C17 13.34 16.48 14.6 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button
            className="pill-btn hud-action-btn"
            onClick={onRestart}
            title="Restart Game"
            aria-label="Restart Game"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path
                d="M21.5 2V8H15.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 6.75 6.75 2.5 12 2.5C16.35 2.5 20.03 5.43 21.2 9.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2.5 22V16H8.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.5 12C21.5 17.25 17.25 21.5 12 21.5C7.65 21.5 3.97 18.57 2.8 14.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="btn-label-desktop">Restart</span>
          </button>

          <button
            className="pill-btn hud-action-btn"
            onClick={onHome}
            title="Return to Start"
            aria-label="Return to Start"
          >
            <span className="btn-label-desktop">Home</span>
            <svg className="btn-label-mobile" viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path
                d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Pill Stats Bar (DevFest 2026 signature layout) */}
      <div className="hud-stats-bar">
        <div className="stat">
          <span className="stat-label">Mode</span>
          <span className="stat-value">{difficulty === 'hard' ? 'Hard' : 'Easy'}</span>
        </div>

        <div className="stat">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>

        <div className="stat">
          <span className="stat-label">Pairs</span>
          <span className="stat-value">{pairsFound}/{totalPairs}</span>
        </div>

        <div className={`stat ${isUrgent ? 'stat-warn' : ''}`}>
          <span className="stat-label">Time</span>
          <span className="stat-value">{isUntimed ? '∞' : `${timeRemaining}s`}</span>
        </div>
      </div>

      {/* Full-width DevFest Progress Bar */}
      <div className="progress-bar-container" role="progressbar" aria-valuenow={pairsFound} aria-valuemin={0} aria-valuemax={totalPairs}>
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </header>
  );
};
