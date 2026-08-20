import React, { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogAvgReactionTimePage = lazy(() => import('./pages/BlogAvgReactionTimePage'));
const ReactionTimePage = lazy(() => import('./pages/ReactionTimePage'));
const GoNoGoPage = lazy(() => import('./pages/GoNoGoPage'));
const StartLightsPage = lazy(() => import('./pages/StartLightsPage'));
const AdhdTestPage = lazy(() => import('./pages/AdhdTestPage'));
const VisionTestPage = lazy(() => import('./pages/VisionTestPage'));
const GamingTestPage = lazy(() => import('./pages/GamingTestPage'));
const SportTestPage = lazy(() => import('./pages/SportTestPage'));
const HearingTestPage = lazy(() => import('./pages/HearingTestPage'));
const ColorBlindTestPage = lazy(() => import('./pages/ColorBlindTestPage'));
const WorkingMemoryPage = lazy(() => import('./pages/WorkingMemoryPage'));
const AnticipationPage = lazy(() => import('./pages/AnticipationPage'));
const AuditoryReactionPage = lazy(() => import('./pages/AuditoryReactionPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
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
  { path: '/blog', element: page(BlogIndexPage) },
  { path: '/blog/reaction-time-crucial', element: page(BlogPage) },
  { path: '/blog/average-reaction-time-by-age', element: page(BlogAvgReactionTimePage) },
  { path: '/test/reaction-time', element: page(ReactionTimePage) },
  { path: '/test/go-no-go', element: page(GoNoGoPage) },
  { path: '/test/f1-reaction', element: page(StartLightsPage) },
  { path: '/test/adhd', element: page(AdhdTestPage) },
  { path: '/test/vision', element: page(VisionTestPage) },
  { path: '/gaming-test', element: page(GamingTestPage) },
  { path: '/sport-test', element: page(SportTestPage) },
  { path: '/test/hearing', element: page(HearingTestPage) },
  { path: '/test/color-blind', element: page(ColorBlindTestPage) },
  { path: '/test/memory', element: page(WorkingMemoryPage) },
  { path: '/test/anticipation', element: page(AnticipationPage) },
  { path: '/test/auditory-reaction', element: page(AuditoryReactionPage) },
  { path: '/privacy', element: page(PrivacyPage) },
  { path: '/terms', element: page(TermsPage) },
  { path: '/about', element: page(AboutPage) },
  { path: '/contact', element: page(ContactPage) },
  { path: '*', element: page(NotFoundPage) },
];
