import React from 'react';

/**
 * F1 starting lights gantry icon — 5 dots with a top bar.
 * Iconic Formula 1 starting procedure visual.
 */
const F1LightsIcon = ({ size = 24, className = '', strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* Top mounting bar */}
    <rect x="2" y="5" width="20" height="2.5" rx="1.25" fill="currentColor" opacity="0.85" />
    {/* Hanging lines */}
    <line x1="6" y1="7.5" x2="6" y2="10.5" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.6" strokeLinecap="round" />
    <line x1="12" y1="7.5" x2="12" y2="10.5" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.6" strokeLinecap="round" />
    <line x1="18" y1="7.5" x2="18" y2="10.5" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.6" strokeLinecap="round" />
    {/* 5 starting lights */}
    <circle cx="3.5" cy="15.5" r="2.4" fill="currentColor" />
    <circle cx="8" cy="15.5" r="2.4" fill="currentColor" />
    <circle cx="12.5" cy="15.5" r="2.4" fill="currentColor" />
    <circle cx="17" cy="15.5" r="2.4" fill="currentColor" opacity="0.85" />
    <circle cx="21.5" cy="15.5" r="2.4" fill="currentColor" opacity="0.85" />
  </svg>
);

export default F1LightsIcon;
