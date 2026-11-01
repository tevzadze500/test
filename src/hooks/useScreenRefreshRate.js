import { useState, useEffect } from 'react';

/**
 * Measures the client display refresh rate (Hz) and frame interval (ms)
 * via requestAnimationFrame timestamps.
 * Safe for SSG / SSR (returns null on server).
 */
export default function useScreenRefreshRate() {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.requestAnimationFrame) return;

    let frameCount = 0;
    const targetFrames = 35;
    const timestamps = [];
    let rafId = null;

    const measure = (now) => {
      timestamps.push(now);
      frameCount++;

      if (frameCount < targetFrames) {
        rafId = requestAnimationFrame(measure);
      } else {
        // Calculate frame deltas
        const deltas = [];
        for (let i = 1; i < timestamps.length; i++) {
          const d = timestamps[i] - timestamps[i - 1];
          if (d > 0 && d < 100) deltas.push(d);
        }

        if (deltas.length >= 10) {
          // Sort to find median delta to avoid outlier spikes
          deltas.sort((a, b) => a - b);
          const medianDelta = deltas[Math.floor(deltas.length / 2)];
          const rawFps = 1000 / medianDelta;

          // Snap to standard monitor refresh rates
          let hz = 60;
          if (rawFps >= 300) hz = 360;
          else if (rawFps >= 210) hz = 240;
          else if (rawFps >= 155) hz = 165;
          else if (rawFps >= 135) hz = 144;
          else if (rawFps >= 105) hz = 120;
          else if (rawFps >= 82) hz = 90;
          else if (rawFps >= 70) hz = 75;
          else hz = 60;

          const frameMs = +(1000 / hz).toFixed(1);
          setRate({
            hz,
            frameMs,
            label: `${hz} Hz (~${frameMs} ms/frame)`,
          });
        }
      }
    };

    rafId = requestAnimationFrame(measure);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return rate;
}
