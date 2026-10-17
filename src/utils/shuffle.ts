import type { CardState, Difficulty } from '../types/game';
import { ALL_CARD_ITEMS } from '../constants/logos';
import { DIFFICULTY_CONFIGS } from '../types/game';

/**
 * Fisher-Yates array shuffle for true unbiased randomization
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Prepare and shuffle cards for DevFest Memory Match (Easy: 16 cards / 8 pairs, Hard: 32 cards / 16 pairs)
 */
export function generateDeck(difficulty: Difficulty = 'easy'): CardState[] {
  const { pairs } = DIFFICULTY_CONFIGS[difficulty];
  const selectedPairs = ALL_CARD_ITEMS.slice(0, pairs);

  // Duplicate each pair into two distinct card instances
  const rawCards: CardState[] = [];
  selectedPairs.forEach((item) => {
    rawCards.push({
      ...item,
      id: `${item.pairId}-card-1`,
      isFlipped: false,
      isMatched: false,
    });
    rawCards.push({
      ...item,
      id: `${item.pairId}-card-2`,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleArray(rawCards);
}
