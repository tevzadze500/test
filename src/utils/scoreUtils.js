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

// The percentile is an estimate against a typical adult reaction-time
// distribution, not a measurement against this site's visitors — we do not
// collect or store anyone's scores on a server, so no such population exists.
export const getComparisonMessage = (percentile) => {
  if (percentile >= 95) return `That is around the ${percentile}th percentile of typical adult reaction times. Outstanding.`;
  if (percentile >= 80) return `That is around the ${percentile}th percentile of typical adult reaction times. Impressive.`;
  if (percentile >= 60) return `That is around the ${percentile}th percentile of typical adult reaction times — above average.`;
  if (percentile >= 40) return `That sits mid-range against typical adult reaction times. Keep improving.`;
  return `That sits below the typical adult range. Room to grow.`;
};

// Start Lights Reaction Test Utilities
// Tier names describe the performance, not a person. Naming real drivers here
// appropriated their name and likeness and implied times we cannot substantiate.
export const getStartLightsLevel = (score) => {
  if (score < 230) return { name: 'Lightning Launch', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score <= 280) return { name: 'Race Ready', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score <= 350) return { name: 'Quick Off the Line', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score <= 450) return { name: 'Steady Starter', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  return { name: 'Slow Getaway', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getStartLightsMotivation = (score) => {
  if (score < 230) return "Outstanding launch. That is quicker off the lights than almost anyone manages.";
  if (score <= 280) return "Elite reflexes — a genuinely sharp getaway.";
  if (score <= 350) return "Seriously quick. A little more practice and you'll be in the top tier.";
  if (score <= 450) return "Solid start. Go again — reaction times improve once you're warmed up.";
  return "Slow off the line this time. Hit Start and take your revenge.";
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

// Auditory Reaction Test Utilities (Sound travels into auditory cortex in ~8-10ms vs ~20-40ms for retina)
export const getAuditoryReactionLevel = (ms) => {
  if (ms < 160) return { name: 'Sonic Reflexes', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (ms < 190) return { name: 'Elite Hearing', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (ms < 230) return { name: 'Fast Responder', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (ms < 280) return { name: 'Average Hearing', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Room to Improve', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getAuditoryReactionPercentile = (ms) => {
  if (ms < 150) return 99;
  if (ms < 170) return 95;
  if (ms < 190) return 88;
  if (ms < 210) return 75;
  if (ms < 240) return 60;
  if (ms < 280) return 42;
  if (ms < 320) return 25;
  return 10;
};

export const getAuditoryReactionMotivation = (ms) => {
  if (ms < 160) return "Lightning-fast auditory processing. Sound signals are reaching your motor cortex instantaneously.";
  if (ms < 190) return "Superb acoustic reflexes. That beats the typical sound reaction benchmark.";
  if (ms < 230) return "Solid auditory reaction speed. Faster than standard visual response times.";
  if (ms < 280) return "Average hearing response speed. Try with headphones in a quiet room.";
  return "Take a breath, ensure your audio volume is comfortable, and try again.";
};

// Anticipation Timing Test Utilities
export const getAnticipationLevel = (score) => {
  if (score >= 90) return { name: 'Precise Master', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (score >= 80) return { name: 'Sharp Timing', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (score >= 65) return { name: 'Good Rhythm', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (score >= 50) return { name: 'Steady', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Needs Practice', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getAnticipationPercentile = (score) => {
  if (score >= 95) return 98;
  if (score >= 90) return 92;
  if (score >= 80) return 80;
  if (score >= 65) return 60;
  if (score >= 50) return 40;
  return 15;
};

export const getAnticipationMotivation = (score, avgError) => {
  if (score >= 90) return "Flawless temporal estimation. Your internal clock predicts motion almost perfectly.";
  if (score >= 80) return "Great anticipation timing. You track occluded velocity with high accuracy.";
  if (score >= 65) return "Good timing accuracy. You stay within a tight millisecond window.";
  return "Coincidence timing takes practice. Track the marker speed before it disappears.";
};

// Working Memory Span Test Utilities
export const getMemoryLevel = (span) => {
  if (span >= 9) return { name: 'Genius Tier', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
  if (span >= 7) return { name: 'Exceptional', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  if (span >= 5) return { name: 'Solid Memory', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
  if (span >= 4) return { name: 'Average Span', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { name: 'Practicing', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export const getMemoryPercentile = (span) => {
  if (span >= 10) return 99;
  if (span >= 9) return 95;
  if (span >= 8) return 90;
  if (span >= 7) return 75;
  if (span >= 6) return 60;
  if (span >= 5) return 45;
  if (span >= 4) return 30;
  return 10;
};

export const getMemoryMotivation = (span) => {
  if (span >= 9) return "Outstanding working memory capacity! You hold sequences beyond the classic 7 ± 2 limit.";
  if (span >= 7) return "Excellent short-term memory span — squarely in the upper tier of cognitive capacity.";
  if (span >= 5) return "Good working memory. Typical adults hold between 5 and 7 items.";
  return "Chunking and focused attention will quickly improve your sequence span.";
};

// General Share Message Generator with Challenge URL
export const generateShareMessage = (testName, score, level, path = '') => {
  const cleanScore = typeof score === 'number' ? score : parseInt(score, 10);
  const challengeParam = !isNaN(cleanScore) ? `?beat=${cleanScore}` : '';
  const url = path ? `https://reactiontestpro.com${path}${challengeParam}` : 'https://reactiontestpro.com/';
  return `I just scored ${score} on ${testName} at ReactionTestPro!\nRank: ${level}\n\nCan you beat my score? Try it here: ${url}`;
};

// Get suggested tests based on current test.
// `iconId` matches keys in src/components/icons/TestIcon.jsx for proper Lucide rendering.
export const getSuggestedTests = (currentTestId) => {
  const suggestions = {
    'reaction-time': [
      { id: 'f1-reaction', name: 'Start Lights Reaction', iconId: 'f1-reaction', path: '/test/f1-reaction' },
      { id: 'auditory-reaction', name: 'Auditory Reaction', iconId: 'auditory-reaction', path: '/test/auditory-reaction' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
    ],
    'f1-reaction': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'auditory-reaction', name: 'Auditory Reaction', iconId: 'auditory-reaction', path: '/test/auditory-reaction' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
    ],
    'auditory-reaction': [
      { id: 'reaction-time', name: 'Visual Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'hearing-test', name: 'Hearing Frequency Test', iconId: 'hearing-test', path: '/test/hearing' },
      { id: 'f1-reaction', name: 'Start Lights Reaction', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'anticipation': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'f1-reaction', name: 'Start Lights', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'memory': [
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
    ],
    'adhd': [
      { id: 'go-no-go', name: 'Go/No-Go Test', iconId: 'go-no-go', path: '/test/go-no-go' },
      { id: 'memory-test', name: 'Memory Test', iconId: 'memory-test', path: '/test/memory' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
    ],
    'vision': [
      { id: 'color-blind-test', name: 'Color Blind Test', iconId: 'color-blind-test', path: '/test/color-blind' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'f1-reaction', name: 'Start Lights', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'color-blind': [
      { id: 'vision-test', name: 'Vision Test', iconId: 'vision-test', path: '/test/vision' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'hearing-test', name: 'Hearing Test', iconId: 'hearing-test', path: '/test/hearing' },
    ],
    'go-no-go': [
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'adhd-test', name: 'ADHD Test', iconId: 'adhd-test', path: '/test/adhd' },
      { id: 'f1-reaction', name: 'Start Lights', iconId: 'f1-reaction', path: '/test/f1-reaction' },
    ],
    'hearing': [
      { id: 'auditory-reaction', name: 'Auditory Reaction', iconId: 'auditory-reaction', path: '/test/auditory-reaction' },
      { id: 'reaction-time', name: 'Reaction Time', iconId: 'reaction-time', path: '/test/reaction-time' },
      { id: 'vision-test', name: 'Vision Test', iconId: 'vision-test', path: '/test/vision' },
    ],
  };

  return suggestions[currentTestId] || suggestions['reaction-time'];
};
