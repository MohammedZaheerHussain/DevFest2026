import React, { useState, useEffect, useRef, useCallback } from 'react';
import type {
  CardState,
  GamePhase,
  GameScoreSummary,
  GameOverReason,
  SponsorCustomization,
  Difficulty,
} from './types/game';
import { DIFFICULTY_CONFIGS } from './types/game';
import { generateDeck } from './utils/shuffle';
import {
  getStoredBestScore,
  setStoredBestScore,
  getStoredSponsorConfig,
  setStoredSponsorConfig,
} from './utils/storage';
import { soundFX } from './utils/audio';
import { fireMatchConfetti, fireVictoryCelebration } from './utils/confetti';

import { StartScreen } from './components/StartScreen';
import { HUD } from './components/HUD';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/GameOverModal';
import { SponsorModal } from './components/SponsorModal';
import { FloatingPoints, type FloatingPointItem } from './components/FloatingPoints';
import { Doodles } from './components/Doodles';

const BASE_POINTS_PER_MATCH = 100;
const MISMATCH_DELAY_MS = 800; // Specified ~800ms display before flip back

export const App: React.FC = () => {
  // Game Phase State
  const [phase, setPhase] = useState<GamePhase>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<CardState[]>([]);
  const [firstCard, setFirstCard] = useState<CardState | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(-1);

  // Score & Gameplay Metrics
  const [score, setScore] = useState<number>(0);
  const [pairsFound, setPairsFound] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [gameDuration, setGameDuration] = useState<number>(60);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getMuted());

  // Modals & Popups
  const [showSponsorModal, setShowSponsorModal] = useState<boolean>(false);
  const [sponsorConfig, setSponsorConfig] = useState<SponsorCustomization | null>(null);
  const [gameSummary, setGameSummary] = useState<GameScoreSummary | null>(null);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPointItem[]>([]);

  // Timer Ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointsCounterRef = useRef<number>(0);

  const totalPairs = DIFFICULTY_CONFIGS[difficulty].pairs;

  // Load initial localStorage state safely
  useEffect(() => {
    setBestScore(getStoredBestScore());
    const storedSponsor = getStoredSponsorConfig();
    if (storedSponsor) {
      setSponsorConfig(storedSponsor);
    }
  }, []);

  // Clear timer helper
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Finish Round Handler (Victory or Timeout)
  const finishRound = useCallback(
    (reason: GameOverReason, finalScore: number, finalPairs: number, finalRemaining: number, finalMoves: number) => {
      stopTimer();
      setPhase('ended');

      const isNewBest = setStoredBestScore(finalScore);
      const currentRecord = Math.max(finalScore, getStoredBestScore());
      setBestScore(currentRecord);

      const calculatedAccuracy = Math.round((finalPairs * 2 / Math.max(finalMoves * 2, 1)) * 100);

      setGameSummary({
        score: finalScore,
        pairsFound: finalPairs,
        totalPairs,
        timeRemaining: finalRemaining,
        moves: finalMoves,
        difficulty,
        bestScore: currentRecord,
        reason,
        newHighScore: isNewBest,
        accuracy: calculatedAccuracy,
        maxStreak,
      });

      if (reason === 'victory') {
        soundFX.playVictory();
        fireVictoryCelebration();
      } else {
        soundFX.playTimeout();
      }
    },
    [stopTimer, totalPairs, difficulty, maxStreak]
  );

  // Countdown Effect
  useEffect(() => {
    if (phase !== 'playing' || gameDuration === 0) {
      stopTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          stopTimer();
          soundFX.playTimeUpBuzzer();
          finishRound('timeout', score, pairsFound, 0, moves);
          return 0;
        }

        const nextTime = prev - 1;
        // Escalating urgent audio warning so user knows time is ending (10s down to 1s)
        if (nextTime <= 10) {
          soundFX.playCountdownWarning(nextTime);
        } else if (nextTime % 5 === 0) {
          soundFX.playTick(false);
        }
        return nextTime;
      });
    }, 1000);

    return () => stopTimer();
  }, [phase, gameDuration, score, pairsFound, moves, stopTimer, finishRound]);

  // Start / Restart Game
  const startNewGame = useCallback((diff: Difficulty = 'easy', customSeconds?: number) => {
    stopTimer();
    const cfg = DIFFICULTY_CONFIGS[diff];
    const duration = customSeconds ?? cfg.seconds;

    setDifficulty(diff);
    const newDeck = generateDeck(diff, sponsorConfig);
    setCards(newDeck);
    setFirstCard(null);
    setIsLocked(false);
    setFocusedCardIndex(0);
    setScore(0);
    setPairsFound(0);
    setMoves(0);
    setStreak(0);
    setMaxStreak(0);
    setGameDuration(duration);
    setTimeRemaining(duration);
    setGameSummary(null);
    setFloatingPoints([]);
    setPhase('playing');
  }, [sponsorConfig, stopTimer]);

  // Return to Home Screen
  const handleHome = useCallback(() => {
    stopTimer();
    setPhase('home');
    setGameSummary(null);
    setFirstCard(null);
    setIsLocked(false);
    setFocusedCardIndex(-1);
    setStreak(0);
  }, [stopTimer]);

  // Spawn a floating score indicator
  const triggerFloatingScore = (x: number, y: number, text = '+100') => {
    const id = ++pointsCounterRef.current;
    setFloatingPoints((prev) => [...prev, { id, text, x, y }]);
    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  // Card Selection Logic
  const handleCardClick = useCallback((card: CardState, event?: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked || phase !== 'playing') return;
    if (card.isMatched || card.isFlipped) return;
    if (firstCard && firstCard.id === card.id) return;

    soundFX.playFlip();

    // First card selected
    if (!firstCard) {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
      );
      setFirstCard({ ...card, isFlipped: true });
      return;
    }

    // Second card selected
    setMoves((m) => m + 1);

    // Flip the second card immediately
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    // If their logos match, keep both cards face up and award points
    if (firstCard.pairId === card.pairId) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setMaxStreak((prev) => Math.max(prev, nextStreak));
      soundFX.playMatch(nextStreak);

      const streakBonus = Math.min((nextStreak - 1) * 25, 100);
      const pointsAwarded = BASE_POINTS_PER_MATCH + streakBonus;

      const clientX = event?.clientX || window.innerWidth / 2;
      const clientY = event?.clientY || window.innerHeight / 2;
      fireMatchConfetti(clientX / window.innerWidth, clientY / window.innerHeight);

      const scorePopupText = nextStreak > 1 ? `+${pointsAwarded} (x${nextStreak}!)` : `+${pointsAwarded}`;
      triggerFloatingScore(clientX, clientY, scorePopupText);

      const updatedScore = score + pointsAwarded;
      const updatedPairs = pairsFound + 1;

      setScore(updatedScore);
      setPairsFound(updatedPairs);

      setCards((prev) =>
        prev.map((c) =>
          c.id === firstCard.id || c.id === card.id
            ? { ...c, isFlipped: true, isMatched: true }
            : c
        )
      );

      setFirstCard(null);

      // End round when all pairs are matched
      if (updatedPairs === totalPairs) {
        finishRound('victory', updatedScore, updatedPairs, timeRemaining, moves + 1);
      }
    } else {
      // Mismatch
      setIsLocked(true);
      setStreak(0);
      soundFX.playMismatch();

      setCards((prev) =>
        prev.map((c) =>
          c.id === firstCard.id || c.id === card.id
            ? { ...c, isFlipped: true, isShaking: true }
            : c
        )
      );

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === card.id
              ? { ...c, isFlipped: false, isShaking: false }
              : c
          )
        );
        setFirstCard(null);
        setIsLocked(false);
      }, MISMATCH_DELAY_MS);
    }
  }, [isLocked, phase, firstCard, streak, score, pairsFound, timeRemaining, moves, totalPairs, finishRound]);

  // Keyboard navigation across the grid
  useEffect(() => {
    if (phase !== 'playing') return;

    const totalCards = cards.length;
    const isHardDesktop = difficulty === 'hard' && window.innerWidth >= 768;
    const cols = isHardDesktop ? 8 : 4;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      setFocusedCardIndex((current) => {
        let next = current === -1 ? 0 : current;

        if (e.key === 'ArrowRight') {
          next = (next + 1) % totalCards;
        } else if (e.key === 'ArrowLeft') {
          next = (next - 1 + totalCards) % totalCards;
        } else if (e.key === 'ArrowDown') {
          next = (next + cols) % totalCards;
        } else if (e.key === 'ArrowUp') {
          next = (next - cols + totalCards) % totalCards;
        } else if (e.key === ' ' || e.key === 'Enter') {
          if (cards[next]) {
            handleCardClick(cards[next]);
          }
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, cards, difficulty, handleCardClick]);

  // Audio Toggle
  const handleToggleMute = () => {
    const nextState = soundFX.toggleMute();
    setIsMuted(nextState);
  };

  // Sponsor Customization Save
  const handleSaveSponsor = (config: SponsorCustomization | null) => {
    setSponsorConfig(config);
    setStoredSponsorConfig(config);
    if (phase === 'playing') {
      setCards(generateDeck(difficulty, config));
    }
  };

  const accuracy = Math.round((pairsFound * 2 / Math.max(moves * 2, 1)) * 100);

  return (
    <div className="app-wrapper" data-ui="app">
      {/* Decorative DevFest 2026 Background Doodles */}
      <Doodles />

      {/* Floating Score Indicators */}
      <FloatingPoints items={floatingPoints} />

      {/* VIEW: Start Screen */}
      {phase === 'home' && (
        <StartScreen
          onStartGame={startNewGame}
          bestScore={bestScore}
          onOpenSponsors={() => setShowSponsorModal(true)}
          sponsorConfig={sponsorConfig}
        />
      )}

      {/* VIEW: Active Game */}
      {(phase === 'playing' || phase === 'ended') && (
        <>
          <HUD
            difficulty={difficulty}
            score={score}
            timeRemaining={timeRemaining}
            isUntimed={gameDuration === 0}
            pairsFound={pairsFound}
            totalPairs={totalPairs}
            bestScore={bestScore}
            streak={streak}
            accuracy={accuracy}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onRestart={() => startNewGame(difficulty, gameDuration)}
            onHome={handleHome}
            onOpenSponsors={() => setShowSponsorModal(true)}
            moves={moves}
          />

          <main className="game-main-area">
            <GameBoard
              cards={cards}
              onCardClick={handleCardClick}
              isLocked={isLocked}
              focusedIndex={focusedCardIndex}
            />
          </main>

          <footer className="game-footer-bar">
            <span>DevFest Memory Match: Round 1</span>
            <span className="footer-dot">•</span>
            <span>Independent Community Project</span>
          </footer>
        </>
      )}

      {/* MODAL: Game Over / Victory */}
      {phase === 'ended' && gameSummary && (
        <GameOverModal
          summary={gameSummary}
          onPlayAgain={() => startNewGame(difficulty, gameDuration)}
          onHome={handleHome}
        />
      )}

      {/* MODAL: Organizer Sponsor Settings */}
      {showSponsorModal && (
        <SponsorModal
          currentConfig={sponsorConfig}
          onSave={handleSaveSponsor}
          onClose={() => setShowSponsorModal(false)}
        />
      )}
    </div>
  );
};

export default App;
