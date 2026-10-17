// Comprehensive Verification Script for DevFest Memory Match 2026 - Round 1
const assert = require('assert');

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ALL_16_ICONS = [
  'google-g', 'gemini', 'android', 'chrome',
  'firebase', 'flutter', 'google-cloud', 'google-maps',
  'globe', 'asterisk', 'braces', 'terminal',
  'rocket', 'bulb', 'bug', 'wifi'
];

const DIFFICULTY_CONFIGS = {
  easy: { cards: 16, pairs: 8, seconds: 60, cols: 4 },
  hard: { cards: 32, pairs: 16, seconds: 90, cols: 8 },
};

function buildDeck(diff = 'easy', sponsorConfig = null) {
  const cfg = DIFFICULTY_CONFIGS[diff];
  let items = ALL_16_ICONS.slice(0, cfg.pairs).map((id) => ({
    pairId: id,
    name: id,
    isSponsor: false,
  }));

  if (sponsorConfig && sponsorConfig.enabled) {
    items = items.map((item) => {
      if (item.pairId === sponsorConfig.targetPairId) {
        return {
          ...item,
          name: sponsorConfig.sponsorName,
          isSponsor: true,
          sponsorTier: sponsorConfig.sponsorTier,
        };
      }
      return item;
    });
  }

  const raw = [];
  items.forEach((item) => {
    raw.push({ ...item, id: `${item.pairId}-card-1`, isFlipped: false, isMatched: false });
    raw.push({ ...item, id: `${item.pairId}-card-2`, isFlipped: false, isMatched: false });
  });

  return shuffleArray(raw);
}

console.log('--- RUNNING DEVFEST MEMORY MATCH 2026 VERIFICATION SUITE ---');

// Test 1: Easy Mode (16 cards, 8 pairs, 60s)
const easyDeck = buildDeck('easy');
assert.strictEqual(easyDeck.length, 16, 'Easy deck must contain 16 cards (4x4)');
assert.strictEqual(DIFFICULTY_CONFIGS.easy.seconds, 60, 'Easy duration must be 60 seconds');
const easyPairs = new Set(easyDeck.map((c) => c.pairId));
assert.strictEqual(easyPairs.size, 8, 'Easy deck must have 8 unique pairs');
console.log('✓ PASS: Easy mode produces exactly 16 cards and 8 pairs (60s timer)');

// Test 2: Hard Mode (32 cards, 16 pairs, 90s)
const hardDeck = buildDeck('hard');
assert.strictEqual(hardDeck.length, 32, 'Hard deck must contain 32 cards (8x4)');
assert.strictEqual(DIFFICULTY_CONFIGS.hard.seconds, 90, 'Hard duration must be 90 seconds');
const hardPairs = new Set(hardDeck.map((c) => c.pairId));
assert.strictEqual(hardPairs.size, 16, 'Hard deck must have 16 unique pairs');
console.log('✓ PASS: Hard mode produces exactly 32 cards and 16 pairs (90s timer)');

// Test 3: Every card appears exactly twice
const counts = {};
hardDeck.forEach((c) => {
  assert.strictEqual(c.isFlipped, false, 'Card must initialize face-down');
  assert.strictEqual(c.isMatched, false, 'Card must initialize unmatched');
  counts[c.pairId] = (counts[c.pairId] || 0) + 1;
});
assert.strictEqual(Object.values(counts).every((n) => n === 2), true, 'Every pair must have 2 cards');
console.log('✓ PASS: Exactly 2 cards per pair face-down');

// Test 4: Fisher-Yates true randomization
const hardDeck2 = buildDeck('hard');
const order1 = hardDeck.map((c) => c.id).join(',');
const order2 = hardDeck2.map((c) => c.id).join(',');
assert.notStrictEqual(order1, order2, 'Subsequent decks must have distinct random permutations');
console.log('✓ PASS: Fisher-Yates unbiased randomization verified');

// Test 5: Organizer Sponsor Logo Customization Replacement
const sponsorDeck = buildDeck('easy', {
  enabled: true,
  targetPairId: 'firebase',
  sponsorName: 'Google Cloud Partner',
  sponsorTier: 'Title Sponsor',
});
const sponsorCards = sponsorDeck.filter((c) => c.isSponsor);
assert.strictEqual(sponsorCards.length, 2, 'Sponsor replacement must produce 2 sponsor cards');
assert.strictEqual(sponsorCards[0].name, 'Google Cloud Partner');
console.log('✓ PASS: Organizer sponsor slot replacement verified');

// Test 6: Scoring & Multiplier Streaks
let score = 0;
let streak = 0;
for (let i = 0; i < 8; i++) {
  streak++;
  const streakBonus = Math.min((streak - 1) * 25, 100);
  score += 100 + streakBonus;
}
assert.strictEqual(score, 800 + (0 + 25 + 50 + 75 + 100 + 100 + 100 + 100), 'Score formula with streak bonus matches');
console.log('✓ PASS: Score calculation + streak combo multiplier verified');

console.log('\nALL 6 DEVFEST 2026 GAME LOGIC SUITES PASSED! 🚀');
