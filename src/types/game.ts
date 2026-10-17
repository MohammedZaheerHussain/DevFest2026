export type Difficulty = 'easy' | 'hard';

export interface DifficultyConfig {
  label: string;
  cards: number;
  pairs: number;
  seconds: number;
  cols: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { label: 'Easy (4×4)', cards: 16, pairs: 8, seconds: 60, cols: 4 },
  hard: { label: 'Hard (8×4)', cards: 32, pairs: 16, seconds: 90, cols: 8 },
};

export interface CardItem {
  id: string; // unique card id for key and indexing (e.g. 'gemini-card-1')
  pairId: string; // ID of the pair (e.g. 'gemini')
  name: string; // Display label
  category: string; // Developer ecosystem or sponsor
  color: string; // Brand accent color
  glowColor: string; // Brand accent glow
  customLogoSvg?: string;
  isSponsor?: boolean;
  sponsorTier?: string;
}

export interface CardState extends CardItem {
  isFlipped: boolean;
  isMatched: boolean;
  isShaking?: boolean;
}

export type GamePhase = 'home' | 'playing' | 'ended';

export type GameOverReason = 'victory' | 'timeout';

export interface SponsorCustomization {
  enabled: boolean;
  targetPairId: string; // Which standard icon to replace
  sponsorName: string;
  sponsorTier: string; // e.g. "Title Sponsor", "Platinum Partner"
  sponsorColor: string;
  svgMarkup?: string;
  presetId?: string;
}

export interface GameScoreSummary {
  score: number;
  pairsFound: number;
  totalPairs: number;
  timeRemaining: number;
  moves: number;
  difficulty: Difficulty;
  bestScore: number;
  reason: GameOverReason;
  newHighScore: boolean;
  accuracy: number;
  maxStreak: number;
}
