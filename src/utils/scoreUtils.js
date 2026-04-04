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
  const level = getReactionTimeLevel(score);
  
  if (score < 180) {
    return "Phenomenal! You're a reaction time legend! 🏆";
  }
  if (score < 200) {
    return "Incredible reflexes! You're in the elite tier! 🚀";
  }
  if (score < 250) {
    return bestScore && score < bestScore 
      ? "New personal best! You're improving! 🎯" 
      : "Excellent! Can you break into Elite? ⚡";
  }
  if (score < 300) {
    return "Great job! Keep training to reach Advanced! 💪";
  }
  if (score < 350) {
    return "Good work! Push yourself to beat this score! 🔥";
  }
  return "Keep practicing! Every attempt makes you faster! 💡";
};

export const getComparisonMessage = (percentile) => {
  if (percentile >= 95) return `You're faster than ${percentile}% of all users! Outstanding! 🌟`;
  if (percentile >= 80) return `You beat ${percentile}% of users! Impressive! 🎯`;
  if (percentile >= 60) return `Better than ${percentile}% of users! Above average! 📈`;
  if (percentile >= 40) return `You're in the middle ${percentile}% range. Keep improving! 💪`;
  return `You're faster than ${percentile}% of users. There's room to grow! 🚀`;
};

// F1 Reaction Test Utilities
export const getF1ReactionLevel = (score) => {
  if (score < 180) return { name: 'F1 Legend', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score < 220) return { name: 'Pro Driver', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score < 260) return { name: 'Racing Pro', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score < 300) return { name: 'Skilled', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  if (score < 350) return { name: 'Amateur', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Rookie', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getF1Motivation = (score) => {
  if (score < 180) return "You could compete with F1 legends! 🏎️🏆";
  if (score < 220) return "Pro driver reflexes! Race-ready! 🏁";
  if (score < 260) return "Great start! Train to reach Pro level! 🚀";
  if (score < 300) return "Good timing! Keep pushing your limits! ⚡";
  if (score < 350) return "Keep practicing! Speed comes with repetition! 💪";
  return "Every racer starts somewhere! Keep training! 🔥";
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
  if (accuracy >= 95) return "Perfect control! Your impulse inhibition is exceptional! 🎯";
  if (accuracy >= 85) return "Excellent focus! Your cognitive control is impressive! 🧠";
  if (accuracy >= 75) return "Great work! Keep refining your inhibition skills! ⚡";
  if (accuracy >= 65) return "Good effort! Practice makes perfect! 💪";
  if (accuracy >= 50) return "You're learning! Focus on the No-Go signals! 🔍";
  return "Keep trying! This test gets easier with practice! 🚀";
};

// General Share Message Generator
export const generateShareMessage = (testName, score, level) => {
  return `I just scored ${score} on ${testName} at TestHub! 🎯\nRank: ${level}\n\nCan you beat me? Try it now!`;
};

// Get suggested tests based on current test
export const getSuggestedTests = (currentTestId) => {
  const suggestions = {
    'reaction-time': [
      { id: 'f1-reaction', name: 'F1 Lights Reaction', icon: '🏁', path: '/test/f1-reaction' },
      { id: 'go-no-go', name: 'Go/No-Go Test', icon: '🚦', path: '/test/go-no-go' },
      { id: 'vision-test', name: 'Vision Test', icon: '👁️', path: '/test/vision' },
    ],
    'f1-reaction': [
      { id: 'reaction-time', name: 'Reaction Time', icon: '⚡', path: '/test/reaction-time' },
      { id: 'go-no-go', name: 'Go/No-Go Test', icon: '🚦', path: '/test/go-no-go' },
      { id: 'adhd-test', name: 'ADHD Test', icon: '🎯', path: '/test/adhd' },
    ],
    'adhd': [
      { id: 'go-no-go', name: 'Go/No-Go Test', icon: '🚦', path: '/test/go-no-go' },
      { id: 'reaction-time', name: 'Reaction Time', icon: '⚡', path: '/test/reaction-time' },
      { id: 'vision-test', name: 'Vision Test', icon: '👁️', path: '/test/vision' },
    ],
    'vision': [
      { id: 'reaction-time', name: 'Reaction Time', icon: '⚡', path: '/test/reaction-time' },
      { id: 'adhd-test', name: 'ADHD Test', icon: '🎯', path: '/test/adhd' },
      { id: 'f1-reaction', name: 'F1 Reaction', icon: '🏁', path: '/test/f1-reaction' },
    ],
    'go-no-go': [
      { id: 'reaction-time', name: 'Reaction Time', icon: '⚡', path: '/test/reaction-time' },
      { id: 'adhd-test', name: 'ADHD Test', icon: '🎯', path: '/test/adhd' },
      { id: 'f1-reaction', name: 'F1 Reaction', icon: '🏁', path: '/test/f1-reaction' },
    ],
  };

  return suggestions[currentTestId] || suggestions['reaction-time'];
};
