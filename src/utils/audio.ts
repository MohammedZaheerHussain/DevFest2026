// Pure Web Audio API Sound Synthesizer for DevFest Memory Match
// Zero external assets, works 100% offline with zero load delay.

class SoundFX {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved audio preference
    try {
      const saved = localStorage.getItem('devfest_audio_muted');
      this.isMuted = saved === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('devfest_audio_muted', muted ? 'true' : 'false');
    } catch {
      // Ignore localStorage restrictions
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Smooth swish for card flip
  public playFlip() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio error fallback
    }
  }

  // Sparkling major chord chime when a pair is matched (C5 - E5 - G5 - C6), modulated by combo streak
  public playMatch(streak: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const baseNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const pitchMultiplier = Math.pow(2, Math.min(streak - 1, 4) * 2 / 12);
      const notes = baseNotes.map((n) => n * pitchMultiplier);
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.055;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.38);
      });
    } catch {
      // Audio fallback
    }
  }


  // Soft low tone for mismatch
  public playMismatch() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.22);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio fallback
    }
  }

  // Countdown tick, extra sharp during last 10 seconds
  public playTick(isUrgent: boolean = false) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isUrgent ? 'square' : 'sine';
      osc.frequency.setValueAtTime(isUrgent ? 880 : 440, now);

      gain.gain.setValueAtTime(isUrgent ? 0.15 : 0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isUrgent ? 0.08 : 0.04));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio fallback
    }
  }

  // Grand victory fanfare
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0.0, dur: 0.18 }, // C
        { freqs: [587.33, 739.99, 880.0], time: 0.2, dur: 0.18 },  // D
        { freqs: [659.25, 830.61, 987.77], time: 0.4, dur: 0.2 },  // E
        { freqs: [783.99, 987.77, 1318.51], time: 0.65, dur: 0.65 }, // G & high C
      ];

      const now = this.ctx.currentTime;

      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = now + chord.time;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + chord.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(start);
          osc.stop(start + chord.dur + 0.05);
        });
      });
    } catch {
      // Audio fallback
    }
  }

  // Game over / timeout sound
  public playTimeout() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [392.0, 349.23, 311.13, 261.63]; // G4, F4, Eb4, C4
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.16;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundFX = new SoundFX();
