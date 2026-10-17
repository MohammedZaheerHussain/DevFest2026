import type { CardItem, CardState, Difficulty, SponsorCustomization } from '../types/game';
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
 * Prepare and shuffle the cards for DevFest Memory Match (Easy: 16 cards / 8 pairs, Hard: 32 cards / 16 pairs)
 */
export function generateDeck(
  difficulty: Difficulty = 'easy',
  sponsorConfig?: SponsorCustomization | null
): CardState[] {
  let activeItems: CardItem[] = [...ALL_CARD_ITEMS];

  // If sponsor customization is enabled, replace the target card
  if (sponsorConfig && sponsorConfig.enabled) {
    activeItems = activeItems.map((item) => {
      if (item.pairId === sponsorConfig.targetPairId) {
        return {
          ...item,
          name: sponsorConfig.sponsorName || 'DevFest Sponsor',
          category: 'Event Partner',
          color: sponsorConfig.sponsorColor || '#1A73E8',
          glowColor: sponsorConfig.sponsorColor || 'rgba(26, 115, 232, 0.6)',
          isSponsor: true,
          sponsorTier: sponsorConfig.sponsorTier || 'Official Sponsor',
          customLogoSvg: sponsorConfig.svgMarkup,
        };
      }
      return item;
    });
  }

  const { pairs } = DIFFICULTY_CONFIGS[difficulty];
  const selectedPairs = activeItems.slice(0, pairs);

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
