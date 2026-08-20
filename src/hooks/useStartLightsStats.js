import { useState, useEffect } from 'react';

/**
 * Personal-best tracking for the Start Lights reaction test, persisted to
 * localStorage under `f1ReactionStats`.
 *
 * The test is playable both on the homepage and on /test/f1-reaction; both use
 * this hook so a visitor's best time follows them between the two instead of
 * two copies of the logic drifting apart.
 */

const STORAGE_KEY = 'f1ReactionStats';

const EMPTY_STATS = {
  best: null,
  average: null,
  latest: null,
  attempts: 0,
  falseStarts: 0,
  allScores: [],
};

export default function useStartLightsStats() {
  const [stats, setStats] = useState(EMPTY_STATS);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stats:', e);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (stats.attempts > 0 || stats.falseStarts > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = ({ falseStart, reactionTime }) => {
    setStats((prevStats) => {
      if (falseStart) {
        return {
          ...prevStats,
          falseStarts: prevStats.falseStarts + 1,
        };
      }

      const newScores = [...prevStats.allScores, reactionTime];
      const newBest = prevStats.best ? Math.min(prevStats.best, reactionTime) : reactionTime;
      const newAverage = Math.round(
        newScores.reduce((sum, score) => sum + score, 0) / newScores.length
      );

      return {
        best: newBest,
        average: newAverage,
        latest: reactionTime,
        attempts: prevStats.attempts + 1,
        falseStarts: prevStats.falseStarts,
        allScores: newScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your stats?')) {
      setStats(EMPTY_STATS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { stats, handleResult, handleReset };
}
