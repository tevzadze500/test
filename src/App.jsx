import React, { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ReactionTimePage = lazy(() => import('./pages/ReactionTimePage'));
const GoNoGoPage = lazy(() => import('./pages/GoNoGoPage'));
const F1ReactionPage = lazy(() => import('./pages/F1ReactionPage'));
const AdhdTestPage = lazy(() => import('./pages/AdhdTestPage'));
const VisionTestPage = lazy(() => import('./pages/VisionTestPage'));
const GamingTestPage = lazy(() => import('./pages/GamingTestPage'));
const SportTestPage = lazy(() => import('./pages/SportTestPage'));
const HearingTestPage = lazy(() => import('./pages/HearingTestPage'));
const ColorBlindTestPage = lazy(() => import('./pages/ColorBlindTestPage'));
const WorkingMemoryPage = lazy(() => import('./pages/WorkingMemoryPage'));
const AnticipationPage = lazy(() => import('./pages/AnticipationPage'));
const AuditoryReactionPage = lazy(() => import('./pages/AuditoryReactionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-dark-700 border-t-green-500 animate-spin" />
      <p className="text-dark-400 text-sm">Loading…</p>
    </div>
  </div>
);

const page = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const routes = [
  { path: '/', element: page(HomePage) },
  { path: '/blog/reaction-time-crucial', element: page(BlogPage) },
  { path: '/test/reaction-time', element: page(ReactionTimePage) },
  { path: '/test/go-no-go', element: page(GoNoGoPage) },
  { path: '/test/f1-reaction', element: page(F1ReactionPage) },
  { path: '/test/adhd', element: page(AdhdTestPage) },
  { path: '/test/vision', element: page(VisionTestPage) },
  { path: '/gaming-test', element: page(GamingTestPage) },
  { path: '/sport-test', element: page(SportTestPage) },
  { path: '/test/hearing', element: page(HearingTestPage) },
  { path: '/test/color-blind', element: page(ColorBlindTestPage) },
  { path: '/test/memory', element: page(WorkingMemoryPage) },
  { path: '/test/anticipation', element: page(AnticipationPage) },
  { path: '/test/auditory-reaction', element: page(AuditoryReactionPage) },
  { path: '*', element: page(NotFoundPage) },
];
