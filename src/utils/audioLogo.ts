import urbioAudio from '@/assets/urbio.wav';

// Login success audio player
export class LoginSuccessAudio {
  isPlaying = false;
  audio: HTMLAudioElement | null = null;

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    try {
      if (!this.audio) {
        this.audio = new Audio(urbioAudio);
      }

      // Reset and play
      this.audio.currentTime = 0;
      await this.audio.play();

      // Reset flag when done
      this.audio.onended = () => {
        this.isPlaying = false;
      };
    } catch (e) {
      console.warn('Audio playback failed', e);
      this.isPlaying = false;
    }
  }
}

// Global instance for login success
let loginAudioInstance: LoginSuccessAudio | null = null;

export const getLoginSuccessAudio = () => {
  if (!loginAudioInstance) {
    loginAudioInstance = new LoginSuccessAudio();
  }
  return loginAudioInstance;
};
