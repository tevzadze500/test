import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const ReactionTimePage = lazy(() => import('./pages/ReactionTimePage'));
const GoNoGoPage = lazy(() => import('./pages/GoNoGoPage'));
const F1ReactionPage = lazy(() => import('./pages/F1ReactionPage'));
const AdhdTestPage = lazy(() => import('./pages/AdhdTestPage'));
const VisionTestPage = lazy(() => import('./pages/VisionTestPage'));
const GamingTestPage = lazy(() => import('./pages/GamingTestPage'));
const SportTestPage = lazy(() => import('./pages/SportTestPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const HearingTestPage = lazy(() => import('./pages/HearingTestPage'));
const ColorBlindTestPage = lazy(() => import('./pages/ColorBlindTestPage'));

const PageLoader = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-dark-700 border-t-green-500 animate-spin" />
      <p className="text-dark-400 text-sm">Loading…</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default App;
