/**
 * Utility functions for score interpretation, percentile calculation,
 * and badge/level system across all tests
 */

// Reaction Time Test Utilities
export const getReactionTimePercentile = (score) => {
  // Based on typical human reaction time distribution
  if (score < 180) return 99;
  if (score < 200) return 95;
  if (score < 220) return 90;
  if (score < 240) return 82;
  if (score < 260) return 70;
  if (score < 280) return 58;
  if (score < 300) return 45;
  if (score < 320) return 35;
  if (score < 350) return 25;
  if (score < 400) return 15;
  return 8;
};

export const getReactionTimeLevel = (score) => {
  if (score < 180) return { name: 'Legend', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score < 200) return { name: 'Elite', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score < 250) return { name: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score < 300) return { name: 'Intermediate', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  if (score < 350) return { name: 'Average', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Beginner', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getReactionTimeMotivation = (score, bestScore) => {
  if (score < 180) {
    return "Phenomenal reflexes — you're a reaction time legend.";
  }
  if (score < 200) {
    return "Incredible reflexes — you're in the elite tier.";
  }
  if (score < 250) {
    return bestScore && score < bestScore
      ? "New personal best — you're improving fast."
      : "Excellent. Can you break into Elite?";
  }
  if (score < 300) {
    return "Great job. Keep training to reach Advanced.";
  }
  if (score < 350) {
    return "Good work. Push yourself to beat this score.";
  }
  return "Keep practicing — every attempt makes you faster.";
};

export const getComparisonMessage = (percentile) => {
  if (percentile >= 95) return `You're faster than ${percentile}% of all users. Outstanding.`;
  if (percentile >= 80) return `You beat ${percentile}% of users. Impressive.`;
  if (percentile >= 60) return `Better than ${percentile}% of users. Above average.`;
  if (percentile >= 40) return `You're in the middle ${percentile}% range. Keep improving.`;
  return `You're faster than ${percentile}% of users. Room to grow.`;
};

// F1 Reaction Test Utilities
// Tiers are deliberately generous and share-oriented: the goal is for players to
// finish the run feeling fast and want to post their result.
export const getF1ReactionLevel = (score) => {
  if (score < 230) return { name: 'Hamilton Tier', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score <= 280) return { name: 'Future F1 Pro', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score <= 350) return { name: 'Pro Kart Racer', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score <= 450) return { name: 'Solid Driver', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  return { name: 'Safety Car', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getF1Motivation = (score) => {
  if (score < 230) return "Unreal! You've got the launch reflexes of a seven-time world champion. Straight-up F1 material.";
  if (score <= 280) return "Elite reflexes. You're faster than 90% of drivers — Formula 1 is calling.";
  if (score <= 350) return "Seriously sharp reaction time! A little more practice and you're running with the big leagues.";
  if (score <= 450) return "Solid! Your tyres were just a little cold — go again and warm those reflexes up.";
  return "Oops, you stalled on the grid! Hit Start and take your revenge.";
};

// Grid rivals. Ahead of the player, ordered fastest first; behind, ordered
// closest first. Their times are simulated around the player's own run.
const F1_GRID_AHEAD = ['Max Verstappen', 'Lewis Hamilton', 'Lando Norris'];
const F1_GRID_BEHIND = ['George Russell', 'Charles Leclerc', 'Carlos Sainz'];

/**
 * Builds a 7-row race grid where the player is ALWAYS 4th (dead centre):
 * three drivers ahead (each strictly faster) and three behind (each strictly
 * slower). Every rival time is derived from the player's own score, so the grid
 * always feels like a close fight no matter how fast or slow the run was.
 */
export const getDynamicF1Leaderboard = (score) => {
  const safeScore = Math.max(1, Math.round(score || 0));
  const gap = Math.max(12, Math.round(safeScore * 0.05));

  // Three drivers ahead — strictly decreasing times.
  // n = 1 is the closest rival, so it takes the last name in the list.
  const ahead = [];
  let prev = safeScore;
  for (let n = 1; n <= 3; n += 1) {
    const time = Math.max(1, Math.min(prev - 1, safeScore - gap * n));
    ahead.push({ name: F1_GRID_AHEAD[F1_GRID_AHEAD.length - n], time, isPlayer: false });
    prev = time;
  }
  ahead.reverse(); // fastest at the top of the grid

  // Three drivers behind — strictly increasing times
  const behind = [];
  for (let n = 1; n <= 3; n += 1) {
    behind.push({
      name: F1_GRID_BEHIND[n - 1],
      time: safeScore + gap * n,
      isPlayer: false,
    });
  }

  return [...ahead, { name: 'You', time: safeScore, isPlayer: true }, ...behind];
};

// Go/No-Go Test Utilities
export const getGoNoGoLevel = (accuracy) => {
  if (accuracy >= 95) return { name: 'Master', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (accuracy >= 85) return { name: 'Expert', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (accuracy >= 75) return { name: 'Skilled', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (accuracy >= 65) return { name: 'Competent', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  if (accuracy >= 50) return { name: 'Learner', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Novice', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getGoNoGoMotivation = (accuracy) => {
  if (accuracy >= 95) return "Perfect control. Your impulse inhibition is exceptional.";
  if (accuracy >= 85) return "Excellent focus. Your cognitive control is impressive.";
  if (accuracy >= 75) return "Great work. Keep refining your inhibition skills.";
  if (accuracy >= 65) return "Good effort. Practice makes perfect.";
  if (accuracy >= 50) return "You're learning. Focus on the No-Go signals.";
  return "Keep trying. This test gets easier with practice.";
};

// Hearing Frequency Test Utilities
export const getHearingLevel = (score) => {
  if (score >= 90) return { name: 'Superhuman', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score >= 75) return { name: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score >= 60) return { name: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score >= 45) return { name: 'Average', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  if (score >= 30) return { name: 'Below Average', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Limited', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getHearingPercentile = (highestFreq) => {
  if (highestFreq >= 20000) return 99;
  if (highestFreq >= 18000) return 95;
  if (highestFreq >= 17000) return 90;
  if (highestFreq >= 16000) return 82;
  if (highestFreq >= 14000) return 70;
  if (highestFreq >= 12000) return 55;
  if (highestFreq >= 10000) return 40;
  if (highestFreq >= 8000) return 28;
  if (highestFreq >= 4000) return 15;
  return 5;
};

export const getHearingMotivation = (score, highestFreq) => {
  if (score >= 90) return "Incredible hearing — you can detect almost every frequency.";
  if (score >= 75) return "Excellent hearing range. Your ears are in great shape.";
  if (score >= 60) return "Good hearing. You cover a wide range of frequencies.";
  if (score >= 45) return "Decent hearing. Most everyday sounds are within your range.";
  if (score >= 30) return "Your hearing covers essential frequencies. Consider a professional checkup.";
  return "Limited range detected. A professional hearing test is recommended.";
};

// Color Blindness Test Utilities
export const getColorBlindLevel = (score) => {
  if (score >= 90) return { name: 'Normal Vision', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score >= 75) return { name: 'Mostly Normal', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score >= 60) return { name: 'Mild Deficiency', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  if (score >= 40) return { name: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Significant', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getColorBlindPercentile = (score) => {
  if (score >= 95) return 92;
  if (score >= 90) return 85;
  if (score >= 75) return 70;
  if (score >= 60) return 50;
  if (score >= 40) return 30;
  return 10;
};

export const getColorBlindMotivation = (score) => {
  if (score >= 90) return "Excellent color vision. You can distinguish colors very well.";
  if (score >= 75) return "Good color vision with minor variations. Mostly normal.";
  if (score >= 60) return "Some difficulty with certain colors. Consider a professional test.";
  if (score >= 40) return "Moderate color vision differences detected. Consult an eye specialist.";
  return "Significant color vision differences. Please see an eye care professional.";
};

// General Share Message Generator
export const generateShareMessage = (testName, score, level) => {
  return `I just scored ${score} on ${testName} at TestHub.\nRank: ${level}\n\nCan you beat me? Try it now!`;
};

// Get suggested tests based on current test.
// `iconId` matches keys in src/components/icons/TestIcon.jsx for proper Lucide rendering.
export const getSuggestedTests = (currentTestId) => {
  const suggestions = {
    'reaction-time': [
      { id: 'f1-reaction', name: 'F1 Lights Reaction', iconId: 'f1-reaction', path: '/test/f1-reaction' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'vision-test', name: 'Vision Test', iconId: 'vision-test', path: '/test/vision' },
    ],
    'f1-reaction': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
    ],
    'adhd': [
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'vision-test', name: 'Vision Test', iconId: 'vision-test', path: '/test/vision' },
    ],
    'vision': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
      { id: 'f1-reaction', name: 'F1 Reaction', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'go-no-go': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
      { id: 'f1-reaction', name: 'F1 Reaction', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'hearing': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'vision-test', name: 'Vision Test', iconId: 'vision-test', path: '/test/vision' },
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
    ],
  };

  return suggestions[currentTestId] || suggestions['reaction-time'];
};
