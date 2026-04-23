import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReactionTimePage from './pages/ReactionTimePage';
import GoNoGoPage from './pages/GoNoGoPage';
import F1ReactionPage from './pages/F1ReactionPage';
import AdhdTestPage from './pages/AdhdTestPage';
import VisionTestPage from './pages/VisionTestPage';
import GamingTestPage from './pages/GamingTestPage';
import SportTestPage from './pages/SportTestPage';
import BlogPage from './pages/BlogPage';
import HearingTestPage from './pages/HearingTestPage';
import ColorBlindTestPage from './pages/ColorBlindTestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/reaction-time-crucial" element={<BlogPage />} />
      <Route path="/test/reaction-time" element={<ReactionTimePage />} />
      <Route path="/test/go-no-go" element={<GoNoGoPage />} />
      <Route path="/test/f1-reaction" element={<F1ReactionPage />} />
      <Route path="/test/adhd" element={<AdhdTestPage />} />
      <Route path="/test/vision" element={<VisionTestPage />} />
      <Route path="/gaming-test" element={<GamingTestPage />} />
      <Route path="/sport-test" element={<SportTestPage />} />
      <Route path="/test/hearing" element={<HearingTestPage />} />
      <Route path="/test/color-blind" element={<ColorBlindTestPage />} />
    </Routes>
  );
}

export default App;
