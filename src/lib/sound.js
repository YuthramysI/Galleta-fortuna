let audioCtx;

// Campanilla sintetizada con Web Audio API: no requiere ningún archivo de audio.
export function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx || new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    const tones = [
      { freq: 880, gain: 0.16 },
      { freq: 1318.51, gain: 0.09 },
    ];
    tones.forEach(({ freq, gain }) => {
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(gain, now + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      osc.connect(env).connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.7);
    });
  } catch {
    // Web Audio no disponible; se ignora en silencio.
  }
}
