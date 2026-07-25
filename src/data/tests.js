export const testCategories = {
  COGNITIVE: 'Cognitive',
  FOCUS: 'Focus',
  VISION: 'Vision',
  HEARING: 'Hearing',
  PERFORMANCE: 'Performance',
};

export const tests = [
  {
    id: 'reaction-time',
    name: 'Reaction Time Test',
    description: 'Measure your visual reaction speed in milliseconds',
    category: testCategories.PERFORMANCE,
    duration: '2 min',
    difficulty: 'Easy',
    icon: 'Zap',
    color: 'green',
    popular: true,
    featured: true,
    recommendation: 'Perfect for beginners',
    requirements: 'No audio needed',
    badges: ['Most Popular', 'Quick Start'],
  },
  {
    id: 'f1-reaction',
    name: 'Start Lights Reaction Test',
    description: 'React the instant the five red lights go out',
    category: testCategories.PERFORMANCE,
    duration: '1 min',
    difficulty: 'Medium',
    icon: 'StartLights',
    color: 'green',
    popular: true,
    recommendation: 'Fastest test available',
    requirements: 'No audio needed',
    badges: ['Premium', '< 1 min'],
  },
  {
    id: 'adhd-test',
    name: 'ADHD Screening Test',
    description: 'Quick attention and focus assessment',
    category: testCategories.FOCUS,
    duration: '5 min',
    difficulty: 'Medium',
    icon: 'Focus',
    color: 'blue',
    popular: true,
    recommendation: 'Comprehensive assessment',
    requirements: 'Focus required',
    badges: ['Recommended', 'Detailed'],
  },
  {
    id: 'vision-test',
    name: 'Visual Acuity Test',
    description: 'Check your eyesight and visual clarity',
    category: testCategories.VISION,
    duration: '3 min',
    difficulty: 'Easy',
    icon: 'Eye',
    color: 'purple',
    popular: true,
    recommendation: 'Essential health check',
    requirements: 'Good lighting',
    badges: ['Essential', 'Health'],
  },
  {
    id: 'hearing-test',
    name: 'Hearing Frequency Test',
    description: 'Test your auditory range and sensitivity',
    category: testCategories.HEARING,
    duration: '4 min',
    difficulty: 'Easy',
    icon: 'Headphones',
    color: 'blue',
    recommendation: 'Hearing health check',
    requirements: 'Audio required',
    badges: ['Audio Required', 'Health'],
  },
  {
    id: 'color-blind-test',
    name: 'Color Blindness Test',
    description: 'Detect color vision deficiencies',
    category: testCategories.VISION,
    duration: '3 min',
    difficulty: 'Easy',
    icon: 'Palette',
    color: 'purple',
    recommendation: 'Quick screening',
    requirements: 'Color display',
    badges: ['Quick', 'Easy'],
  },
  {
    id: 'memory-test',
    name: 'Working Memory Test',
    description: 'Evaluate your short-term memory capacity',
    category: testCategories.COGNITIVE,
    duration: '6 min',
    difficulty: 'Medium',
    icon: 'Brain',
    color: 'green',
    popular: false,
    recommendation: 'Challenge yourself',
    requirements: 'Focus required',
    badges: ['Challenging', 'Brain'],
  },
  {
    id: 'go-no-go',
    name: 'Go/No-Go Reaction Test',
    description: 'Measure your cognitive inhibition and impulse control',
    category: testCategories.COGNITIVE,
    duration: '2 min',
    difficulty: 'Medium',
    icon: 'Activity',
    color: 'blue',
    popular: false,
    recommendation: 'Test your control',
    requirements: 'Focus required',
    badges: ['Inhibition', 'New'],
  },
  {
    id: 'anticipation-test',
    name: 'Anticipation Test',
    description: 'Test your timing and prediction skills',
    category: testCategories.PERFORMANCE,
    duration: '2 min',
    difficulty: 'Medium',
    icon: 'Target',
    color: 'blue',
    recommendation: 'Advanced timing',
    requirements: 'No audio needed',
    badges: ['New', 'Timing'],
  },
  {
    id: 'auditory-reaction',
    name: 'Auditory Reaction Test',
    description: 'Measure your response to sound stimuli',
    category: testCategories.PERFORMANCE,
    duration: '2 min',
    difficulty: 'Easy',
    icon: 'Volume2',
    color: 'green',
    recommendation: 'Test sound response',
    requirements: 'Audio required',
    badges: ['Audio Required', 'Fast'],
  },
];

export const getTestsByCategory = (category) => {
  return tests.filter(test => test.category === category);
};

export const getPopularTests = () => {
  return tests.filter(test => test.popular);
};

export const getFeaturedTest = () => {
  return tests.find(test => test.featured);
};

export const getQuickTests = () => {
  return tests.filter(test => {
    const minutes = parseInt(test.duration);
    return minutes <= 2;
  }).slice(0, 3);
};

export const getBeginnerTests = () => {
  return tests.filter(test => test.difficulty === 'Easy').slice(0, 3);
};
