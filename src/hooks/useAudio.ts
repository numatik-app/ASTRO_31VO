import { useRef, useCallback, useEffect } from "react";

let audioCtx: AudioContext | null = null;
const getAudioCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

// Pop sound for button clicks
export const playPopSound = () => {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
};

export const useAudio = () => {
  const bgMusicRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode; gain: GainNode; lfo: OscillatorNode } | null>(null);

  const playLaser = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
  }, []);

  const playExplosion = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {}
  }, []);

  const playCorrect = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  }, []);

  const startBgMusic = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (bgMusicRef.current) return;
      const gain = ctx.createGain();
      gain.gain.value = 0.06;
      gain.connect(ctx.destination);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      filter.Q.value = 1;
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 65.41;
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.value = 98;
      const osc3 = ctx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.value = 329.63;
      const shimmerGain = ctx.createGain();
      shimmerGain.gain.value = 0.15;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 8;
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      osc3.connect(shimmerGain);
      shimmerGain.connect(gain);
      osc1.start();
      osc2.start();
      osc3.start();
      lfo.start();
      bgMusicRef.current = { osc1, osc2, osc3, gain, lfo };
    } catch {}
  }, []);

  const stopBgMusic = useCallback(() => {
    if (bgMusicRef.current) {
      try {
        bgMusicRef.current.osc1.stop();
        bgMusicRef.current.osc2.stop();
        bgMusicRef.current.osc3.stop();
        bgMusicRef.current.lfo.stop();
        bgMusicRef.current.gain.disconnect();
      } catch {}
      bgMusicRef.current = null;
    }
  }, []);

  return { playLaser, playExplosion, playCorrect, startBgMusic, stopBgMusic };
};

// Global background music using dreams.mp3
let globalAudio: HTMLAudioElement | null = null;

export const startGlobalAmbient = () => {
  if (globalAudio) return;
  try {
    globalAudio = new Audio("/audio/dreams.mp3");
    globalAudio.loop = true;
    globalAudio.volume = 0.3;
    globalAudio.play().catch(() => {});
  } catch {}
};

export const stopGlobalAmbient = () => {
  if (globalAudio) {
    globalAudio.pause();
    globalAudio = null;
  }
};
