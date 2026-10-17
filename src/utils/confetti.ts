import confetti from 'canvas-confetti';

// Google signature primary and secondary palette
const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#00BFA5', '#1A73E8'];

/**
 * Small confetti burst on matching a pair
 */
export const fireMatchConfetti = (originX: number = 0.5, originY: number = 0.5) => {
  try {
    confetti({
      particleCount: 38,
      spread: 60,
      startVelocity: 28,
      origin: { x: originX, y: originY },
      colors: GOOGLE_COLORS,
      ticks: 120,
      gravity: 1.1,
      shapes: ['circle', 'square'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Grand celebration upon completing all pairs
 */
export const fireVictoryCelebration = () => {
  try {
    const duration = 2.8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);

      // Left cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: GOOGLE_COLORS,
      });

      // Right cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: GOOGLE_COLORS,
      });
    }, 240);
  } catch {
    // Graceful fallback
  }
};
