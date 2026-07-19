import React from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Zap,
  Brain,
  Eye,
  Focus,
  Headphones,
  Target,
  Flame,
  Trophy,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { tests, testCategories } from '../data/tests';
import F1LightsIcon from './icons/F1LightsIcon';

const CATEGORY_THEMES = {
  ALL: {
    icon: Target,
    label: 'All Tests',
    description: 'Browse everything',
    accent: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    iconColor: 'text-sky-300',
    iconBg: 'bg-sky-500/15 group-hover:bg-sky-500/25',
    selectedBg: 'bg-gradient-to-r from-sky-500/20 to-blue-600/20',
    selectedBorder: 'border-sky-400/40',
    selectedShadow: 'shadow-sky-500/20',
    selectedIconBg: 'bg-sky-500/30',
    countText: 'text-sky-300',
  },
  PERFORMANCE: {
    icon: Zap,
    label: 'Performance',
    description: 'Speed & timing',
    accent: 'green',
    gradient: 'from-green-500 to-emerald-600',
    iconColor: 'text-green-300',
    iconBg: 'bg-green-500/15 group-hover:bg-green-500/25',
    selectedBg: 'bg-gradient-to-r from-green-500/20 to-emerald-600/20',
    selectedBorder: 'border-green-400/40',
    selectedShadow: 'shadow-green-500/20',
    selectedIconBg: 'bg-green-500/30',
    countText: 'text-green-300',
  },
  COGNITIVE: {
    icon: Brain,
    label: 'Cognitive',
    description: 'Memory & logic',
    accent: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    iconColor: 'text-purple-300',
    iconBg: 'bg-purple-500/15 group-hover:bg-purple-500/25',
    selectedBg: 'bg-gradient-to-r from-purple-500/20 to-violet-600/20',
    selectedBorder: 'border-purple-400/40',
    selectedShadow: 'shadow-purple-500/20',
    selectedIconBg: 'bg-purple-500/30',
    countText: 'text-purple-300',
  },
  FOCUS: {
    icon: Focus,
    label: 'Focus',
    description: 'Attention & control',
    accent: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    iconColor: 'text-amber-300',
    iconBg: 'bg-amber-500/15 group-hover:bg-amber-500/25',
    selectedBg: 'bg-gradient-to-r from-amber-500/20 to-orange-600/20',
    selectedBorder: 'border-amber-400/40',
    selectedShadow: 'shadow-amber-500/20',
    selectedIconBg: 'bg-amber-500/30',
    countText: 'text-amber-300',
  },
  VISION: {
    icon: Eye,
    label: 'Vision',
    description: 'Eyesight & color',
    accent: 'cyan',
    gradient: 'from-cyan-500 to-teal-600',
    iconColor: 'text-cyan-300',
    iconBg: 'bg-cyan-500/15 group-hover:bg-cyan-500/25',
    selectedBg: 'bg-gradient-to-r from-cyan-500/20 to-teal-600/20',
    selectedBorder: 'border-cyan-400/40',
    selectedShadow: 'shadow-cyan-500/20',
    selectedIconBg: 'bg-cyan-500/30',
    countText: 'text-cyan-300',
  },
  HEARING: {
    icon: Headphones,
    label: 'Hearing',
    description: 'Audio & frequency',
    accent: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    iconColor: 'text-pink-300',
    iconBg: 'bg-pink-500/15 group-hover:bg-pink-500/25',
    selectedBg: 'bg-gradient-to-r from-pink-500/20 to-rose-600/20',
    selectedBorder: 'border-pink-400/40',
    selectedShadow: 'shadow-pink-500/20',
    selectedIconBg: 'bg-pink-500/30',
    countText: 'text-pink-300',
  },
};

const CATEGORY_ORDER = ['ALL', 'PERFORMANCE', 'COGNITIVE', 'FOCUS', 'VISION', 'HEARING'];

const Sidebar = ({ isOpen, setIsOpen, selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Compute test counts per category
  const counts = CATEGORY_ORDER.reduce((acc, key) => {
    if (key === 'ALL') {
      acc[key] = tests.length;
    } else {
      acc[key] = tests.filter((t) => t.category === testCategories[key]).length;
    }
    return acc;
  }, {});

  const handleCategoryClick = (categoryKey) => {
    const categoryId = categoryKey === 'ALL' ? 'ALL' : testCategories[categoryKey];
    if (setSelectedCategory) setSelectedCategory(categoryId);
    if (!isHomePage) {
      navigate('/#all-tests');
    } else {
      document.getElementById('all-tests')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const isCategorySelected = (key) => {
    if (key === 'ALL') return selectedCategory === 'ALL';
    return selectedCategory === testCategories[key];
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-dark-900/95 backdrop-blur-xl border-r border-dark-800
          transition-transform duration-300 z-[45]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Main navigation"
      >
        {/* Subtle gradient glow at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-dark-800/80">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6 text-white" strokeWidth={2.5} fill="white" />
                </div>
                {/* Live indicator dot */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-dark-900" />
                </span>
              </div>
              <div>
                <div className="text-lg font-bold text-white leading-tight">TestHub</div>
                <p className="text-[11px] text-dark-400 flex items-center gap-1.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-green-400" />
                  Free • No signup
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {/* Dashboard link */}
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                transition-all duration-200 group
                ${isActive
                  ? 'bg-gradient-to-r from-green-500/15 to-emerald-600/15 text-white border border-green-400/30 shadow-md shadow-green-500/10'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800/60'
                }
              `}
              end
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-green-500/25' : 'bg-dark-800 group-hover:bg-green-500/15'}`}>
                      <LayoutDashboard size={17} className={isActive ? 'text-green-300' : 'text-dark-400 group-hover:text-green-400'} />
                    </div>
                    <span className="text-sm font-semibold">Dashboard</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/15 px-2 py-0.5 rounded-md border border-green-500/30">
                      Live
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* Section header */}
            <div className="pt-5 pb-2 px-3 flex items-center justify-between">
              <span className="text-[10px] font-bold text-dark-500 uppercase tracking-wider">
                Test Categories
              </span>
              <span className="text-[10px] font-semibold text-dark-600 tabular-nums">
                {tests.length} total
              </span>
            </div>

            {/* Category items */}
            {CATEGORY_ORDER.map((key) => {
              const theme = CATEGORY_THEMES[key];
              const Icon = theme.icon;
              const selected = isCategorySelected(key);
              const count = counts[key];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCategoryClick(key)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                    transition-all duration-200 group
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400
                    ${selected
                      ? `${theme.selectedBg} text-white border ${theme.selectedBorder} shadow-md ${theme.selectedShadow}`
                      : 'text-dark-300 hover:text-white hover:bg-dark-800/60'
                    }
                  `}
                  aria-pressed={selected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`
                      w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0
                      ${selected ? theme.selectedIconBg : `bg-dark-800 ${theme.iconBg}`}
                    `}>
                      <Icon
                        size={17}
                        strokeWidth={2.2}
                        className={`shrink-0 ${selected ? theme.iconColor : `text-dark-400 group-hover:${theme.iconColor.replace('-300', '-400')}`}`}
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-sm font-semibold leading-tight">{theme.label}</div>
                      <div className={`text-[10.5px] truncate transition-colors ${selected ? 'text-white/70' : 'text-dark-500 group-hover:text-dark-400'}`}>
                        {theme.description}
                      </div>
                    </div>
                  </div>
                  {/* Count badge */}
                  <span className={`
                    text-[10.5px] font-bold tabular-nums px-2 py-0.5 rounded-md shrink-0 ml-2
                    transition-colors
                    ${selected
                      ? `${theme.countText} bg-white/10`
                      : 'text-dark-400 bg-dark-800/60 group-hover:text-white group-hover:bg-dark-700'
                    }
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Featured spotlight */}
            <div className="pt-5 pb-2 px-3">
              <span className="text-[10px] font-bold text-dark-500 uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={11} className="text-orange-400" />
                Trending
              </span>
            </div>

            <Link
              to="/test/f1-reaction"
              onClick={() => setIsOpen(false)}
              className="relative block px-3 py-3 rounded-xl bg-gradient-to-br from-red-500/15 via-rose-500/10 to-orange-500/10 border border-red-500/30 hover:border-red-400/60 transition-all group overflow-hidden"
            >
              {/* Animated glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-red-500/0 via-orange-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />

              <div className="relative flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
                  <F1LightsIcon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
                    F1 Reaction
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded">
                      <Flame size={9} />
                      Hot
                    </span>
                  </div>
                  <div className="text-[10.5px] text-dark-400 flex items-center gap-1">
                    Beat the lights
                    <Zap size={9} className="text-yellow-400" fill="currentColor" />
                  </div>
                </div>
                <ArrowRight size={14} className="text-dark-500 group-hover:text-red-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </Link>
          </nav>

          {/* Footer card */}
          <div className="p-3 border-t border-dark-800/80">
            <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-800/60 to-dark-900/80 rounded-xl p-3.5 border border-dark-700/60 overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0">
                    <Sparkles size={18} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white leading-tight">Guest mode</p>
                    <p className="text-[10.5px] text-dark-400 flex items-center gap-1 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Ready to play
                    </p>
                  </div>
                </div>

                {/* Mini stats grid */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-dark-700/60">
                  <div className="flex items-center gap-1.5">
                    <Trophy size={12} className="text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-dark-500 leading-none">Tests</div>
                      <div className="text-xs font-bold text-white tabular-nums">{tests.length}+</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame size={12} className="text-orange-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-dark-500 leading-none">Today</div>
                      <div className="text-xs font-bold text-white tabular-nums">1.2K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
