import React from 'react';
import type { GameScoreSummary } from '../types/game';
import { TrophyIcon, ClockIcon, StarIcon, FlameIcon } from '../constants/icons';

interface GameOverModalProps {
  summary: GameScoreSummary;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  summary,
  onPlayAgain,
  onHome,
}) => {
  const isVictory = summary.reason === 'victory';

  // Calculate arcade rating based on performance
  const getRating = () => {
    if (!isVictory) {
      return {
        badge: 'TIME EXPIRED',
        starCount: 1,
        desc: 'Review the tech matrix and challenge the clock once more.',
        color: '#EA4335',
      };
    }
    if (summary.timeRemaining >= 25 && summary.moves <= 24) {
      return {
        badge: 'DEVFEST GRANDMASTER',
        starCount: 5,
        desc: 'Blazing speed and photographic memory. Ready for the leaderboard finals!',
        color: '#FBBC04',
      };
    }
    if (summary.timeRemaining >= 15) {
      return {
        badge: 'PRINCIPAL ARCHITECT',
        starCount: 4,
        desc: 'Superb knowledge of the Google developer ecosystem.',
        color: '#4285F4',
      };
    }
    return {
      badge: 'TECH SPECIALIST',
      starCount: 3,
      desc: 'Great job matching all 8 pairs before the siren!',
      color: '#34A853',
    };
  };

  const rating = getRating();

  return (
    <div
      className="game-over-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-ui="modal"
    >
      <div className={`game-over-card ${isVictory ? 'victory-theme' : 'timeout-theme'}`}>
        {/* Status Header */}
        <div className="modal-header">
          <div className="modal-status-icon">
            {isVictory ? (
              <TrophyIcon size={52} color={rating.color} />
            ) : (
              <ClockIcon size={52} color="#EA4335" />
            )}
          </div>

          <div
            className="modal-badge-tag"
            style={{ borderColor: rating.color, color: rating.color }}
          >
            {rating.badge}
          </div>

          <h2 id="modal-title" className="modal-title">
            {isVictory ? 'ROUND 1 COMPLETED' : "TIME EXPIRED"}
          </h2>

          <div className="modal-stars-row" aria-label={`${rating.starCount} stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                size={22}
                color={i < rating.starCount ? '#FBBC04' : '#3C4043'}
                filled={i < rating.starCount}
              />
            ))}
          </div>

          <p className="modal-tagline">{rating.desc}</p>
        </div>

        {/* New Record Banner if applicable */}
        {summary.newHighScore && (
          <div className="new-record-banner">
            <FlameIcon size={16} color="#FBBC04" />
            <span>NEW DEVFEST HIGH SCORE RECORD</span>
            <FlameIcon size={16} color="#FBBC04" />
          </div>
        )}

        {/* Score and Stats Grid */}
        <div className="modal-stats-grid">
          <div className="modal-stat-card highlight-card">
            <span className="stat-sub">FINAL SCORE</span>
            <span className="stat-big score-color">{summary.score}</span>
            <span className="stat-note">pts earned</span>
          </div>

          <div className="modal-stat-card">
            <span className="stat-sub">PAIRS FOUND</span>
            <span className="stat-big">
              {summary.pairsFound} <span className="stat-denom">/ {summary.totalPairs}</span>
            </span>
            <span className="stat-note">{Math.round((summary.pairsFound / summary.totalPairs) * 100)}% complete</span>
          </div>

          <div className="modal-stat-card">
            <span className="stat-sub">TIME REMAINING</span>
            <span className="stat-big timer-color">{summary.timeRemaining}s</span>
            <span className="stat-note">{60 - summary.timeRemaining}s taken</span>
          </div>

          <div className="modal-stat-card">
            <span className="stat-sub">ALL-TIME BEST</span>
            <span className="stat-big record-color">{summary.bestScore}</span>
            <span className="stat-note">{summary.moves} total flips</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="modal-actions">
          <button
            className="modal-btn play-again-btn"
            onClick={onPlayAgain}
            autoFocus
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M21.5 2V8H15.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 6.75 6.75 2.5 12 2.5C16.35 2.5 20.03 5.43 21.2 9.4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2.5 22V16H8.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.5 12C21.5 17.25 17.25 21.5 12 21.5C7.65 21.5 3.97 18.57 2.8 14.6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span>PLAY AGAIN</span>
          </button>

          <button className="modal-btn home-return-btn" onClick={onHome}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
