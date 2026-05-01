import React from 'react';
import {
  Zap,
  Eye,
  Headphones,
  Palette,
  Brain,
  Focus,
  Activity,
  Target,
  Volume2,
} from 'lucide-react';
import F1LightsIcon from './F1LightsIcon';

/**
 * Renders the proper icon for a given test id.
 * Centralized mapping — single source of truth, no emojis.
 */
const ICON_MAP = {
  'reaction-time': Zap,
  'f1-reaction': F1LightsIcon,
  'go-no-go': Activity,
  'adhd-test': Focus,
  'vision-test': Eye,
  'color-blind-test': Palette,
  'hearing-test': Headphones,
  'memory-test': Brain,
  'anticipation-test': Target,
  'auditory-reaction': Volume2,
};

const TestIcon = ({ testId, size = 18, className = '', strokeWidth = 2.2 }) => {
  const Icon = ICON_MAP[testId] || Zap;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
};

export default TestIcon;
