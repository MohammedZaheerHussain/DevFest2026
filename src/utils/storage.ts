// Safe localStorage helpers with error resilience

const BEST_SCORE_KEY = 'devfest_memory_match_best_score_r1';
const SPONSOR_CONFIG_KEY = 'devfest_memory_match_sponsor_config';

export const getStoredBestScore = (): number => {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch (err) {
    console.warn('localStorage read error for bestScore:', err);
    return 0;
  }
};

export const setStoredBestScore = (score: number): boolean => {
  try {
    const current = getStoredBestScore();
    if (score > current) {
      localStorage.setItem(BEST_SCORE_KEY, score.toString());
      return true; // New record
    }
    return false;
  } catch (err) {
    console.warn('localStorage write error for bestScore:', err);
    return false;
  }
};

export const getStoredSponsorConfig = () => {
  try {
    const raw = localStorage.getItem(SPONSOR_CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('localStorage read error for sponsor config:', err);
    return null;
  }
};

export const setStoredSponsorConfig = (config: unknown) => {
  try {
    if (config) {
      localStorage.setItem(SPONSOR_CONFIG_KEY, JSON.stringify(config));
    } else {
      localStorage.removeItem(SPONSOR_CONFIG_KEY);
    }
  } catch (err) {
    console.warn('localStorage write error for sponsor config:', err);
  }
};
