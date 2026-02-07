// App startup audio logo
export class UrbioAudioLogo {
  context: AudioContext | null = null;
  isPlaying = false;

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Initialize audio context (user gesture required in modern browsers)
    if (!this.context) {
      try {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('AudioContext not supported');
        this.isPlaying = false;
        return;
      }
    }

    try {
      // Pad swell (foundation)
      this.playPadSwell();

      // Delay arpeggio to layer over pad
      setTimeout(() => this.playArpeggio(), 80);

      // Reset flag after duration
      setTimeout(() => {
        this.isPlaying = false;
      }, 1300);
    } catch (e) {
      console.warn('Audio playback blocked – requires user interaction first', e);
      this.isPlaying = false;
    }
  }

  private playPadSwell() {
    if (!this.context) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    // Warm pad sound
    osc.type = 'sine';
    osc.frequency.value = 261.63; // C4

    // Filter for warmth
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // Envelope: quick attack, medium release
    gain.gain.setValueAtTime(0, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.context.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 1.0);

    // Chain nodes
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 1.0);
  }

  private playArpeggio() {
    if (!this.context) return;

    const notes = [392, 440, 523.25]; // G4, A4, C5

    notes.forEach((freq, i) => {
      const osc = this.context!.createOscillator();
      const gain = this.context!.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      // Percussive envelope
      gain.gain.setValueAtTime(0, this.context!.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, this.context!.currentTime + 0.01);
      gain.gain.linearRampToValueAtTime(0, this.context!.currentTime + 0.15 + i * 0.12);

      osc.connect(gain);
      gain.connect(this.context!.destination);

      osc.start(this.context!.currentTime + i * 0.12);
      osc.stop(this.context!.currentTime + 0.3 + i * 0.12);
    });

    // Subtle reverb tail
    setTimeout(() => this.playReverbTail(), 300);
  }

  private playReverbTail() {
    if (!this.context) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.value = 329.63; // E4

    gain.gain.setValueAtTime(0.15, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.3);
  }
}

// Login success audio logo (simpler, shorter)
export class LoginSuccessAudio {
  context: AudioContext | null = null;
  isPlaying = false;

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (!this.context) {
      try {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('AudioContext not supported');
        this.isPlaying = false;
        return;
      }
    }

    try {
      // Two ascending tones for success
      this.playSuccessChime();

      setTimeout(() => {
        this.isPlaying = false;
      }, 600);
    } catch (e) {
      console.warn('Audio playback failed', e);
      this.isPlaying = false;
    }
  }

  private playSuccessChime() {
    if (!this.context) return;

    // First tone (C5)
    const osc1 = this.context.createOscillator();
    const gain1 = this.context.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 523.25; // C5

    gain1.gain.setValueAtTime(0, this.context.currentTime);
    gain1.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.02);
    gain1.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.25);

    osc1.connect(gain1);
    gain1.connect(this.context.destination);

    osc1.start();
    osc1.stop(this.context.currentTime + 0.25);

    // Second tone (G5) - higher, delayed
    setTimeout(() => {
      if (!this.context) return;

      const osc2 = this.context.createOscillator();
      const gain2 = this.context.createGain();

      osc2.type = 'sine';
      osc2.frequency.value = 783.99; // G5

      gain2.gain.setValueAtTime(0, this.context.currentTime);
      gain2.gain.linearRampToValueAtTime(0.35, this.context.currentTime + 0.02);
      gain2.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.3);

      osc2.connect(gain2);
      gain2.connect(this.context.destination);

      osc2.start();
      osc2.stop(this.context.currentTime + 0.3);
    }, 100);
  }
}

// Global instance for app startup
let urbioLogoInstance: UrbioAudioLogo | null = null;

export const getUrbioAudioLogo = () => {
  if (!urbioLogoInstance) {
    urbioLogoInstance = new UrbioAudioLogo();
  }
  return urbioLogoInstance;
};

// Global instance for login success
let loginAudioInstance: LoginSuccessAudio | null = null;

export const getLoginSuccessAudio = () => {
  if (!loginAudioInstance) {
    loginAudioInstance = new LoginSuccessAudio();
  }
  return loginAudioInstance;
};
