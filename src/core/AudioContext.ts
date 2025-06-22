// Audio Context Wrapper
// Provides a unified interface for Web Audio API operations

export class SAPFAudioContext {
  private context: AudioContext;
  private masterGain: GainNode;

  constructor(context: AudioContext) {
    this.context = context;
    this.masterGain = context.createGain();
    this.masterGain.connect(context.destination);
  }

  createOscillator(frequency: number, type: OscillatorType = 'sine'): OscillatorNode {
    const oscillator = this.context.createOscillator();
    oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
    oscillator.type = type;
    return oscillator;
  }

  createGain(value: number = 1): GainNode {
    const gain = this.context.createGain();
    gain.gain.setValueAtTime(value, this.context.currentTime);
    return gain;
  }

  setMasterVolume(volume: number): void {
    this.masterGain.gain.setValueAtTime(volume, this.context.currentTime);
  }

  getMasterGain(): GainNode {
    return this.masterGain;
  }

  getCurrentTime(): number {
    return this.context.currentTime;
  }

  getContext(): AudioContext {
    return this.context;
  }
} 