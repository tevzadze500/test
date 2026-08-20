import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { infoPageSchema, breadcrumbSchema } from '../utils/structuredData';
import { BookOpen, CalendarDays, ArrowRight } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';

/**
 * Blog index. Articles are still individual page components; register each
 * new one here and in src/App.jsx so both the index and the sitemap stay in
 * step with reality.
 */
const posts = [
  {
    title: 'Why Reaction Time Matters in Sport, Driving & Daily Life',
    path: '/blog/reaction-time-crucial',
    datePublished: '2026-05-01',
    excerpt:
      'Milliseconds decide more than games: how reaction time shapes sports performance, driving safety and long-term brain health — and the proven ways to sharpen yours.',
    readingTime: '5 min read',
  },
];

const BlogIndexPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title="Reaction Time Blog & Guides | ReactionTestPro"
        description="Guides on reaction time, reflexes and cognitive performance — what the research says, what a good score looks like, and how to improve your times."
        canonical="/blog"
        jsonLd={[
          infoPageSchema({
            name: 'Blog',
            description:
              'Guides on reaction time, reflexes and cognitive performance from ReactionTestPro.',
            path: '/blog',
            type: 'CollectionPage',
          }),
          breadcrumbSchema('Blog', '/blog'),
        ]}
      />

      <MobileTopBar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
          <Breadcrumb name="Blog" className="mb-6" />

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 shrink-0">
              <BookOpen size={24} className="text-white" strokeWidth={2.2} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Blog &amp; Guides
            </h1>
          </div>
          <p className="text-lg text-dark-300 leading-relaxed mb-10 max-w-2xl">
            Research-backed guides on reaction time, reflexes and cognitive performance —
            written to answer the questions our tests raise.
          </p>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.path}
                to={post.path}
                className="group block bg-dark-900/50 border border-dark-800 hover:border-green-500/50 rounded-2xl p-6 sm:p-8 transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-dark-400 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} aria-hidden="true" />
                    <time dateTime={post.datePublished}>{post.datePublished}</time>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-dark-300 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300">
                  Read the guide
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
};

export default BlogIndexPage;
