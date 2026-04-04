import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReactionTimePage from './pages/ReactionTimePage';
import GoNoGoPage from './pages/GoNoGoPage';
import F1ReactionPage from './pages/F1ReactionPage';
import AdhdTestPage from './pages/AdhdTestPage';
import VisionTestPage from './pages/VisionTestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test/reaction-time" element={<ReactionTimePage />} />
      <Route path="/test/go-no-go" element={<GoNoGoPage />} />
      <Route path="/test/f1-reaction" element={<F1ReactionPage />} />
      <Route path="/test/adhd" element={<AdhdTestPage />} />
      <Route path="/test/vision" element={<VisionTestPage />} />
    </Routes>
  );
}

export default App;
