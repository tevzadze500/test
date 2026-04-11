import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap,
  Brain, 
  Eye,
  Focus,
  Headphones,
  Target,
  Activity
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', description: 'Home' },
    { divider: true, label: 'Test Categories' },
    { 
      icon: Target, 
      label: 'All Tests', 
      categoryId: 'ALL',
      description: 'View all',
      isCategory: true 
    },
    { 
      icon: Zap, 
      label: 'Performance', 
      categoryId: 'PERFORMANCE',
      description: 'Speed & Timing',
      isCategory: true 
    },
    { 
      icon: Brain, 
      label: 'Cognitive', 
      categoryId: 'COGNITIVE',
      description: 'Memory & Logic',
      isCategory: true 
    },
    { 
      icon: Focus, 
      label: 'Focus', 
      categoryId: 'FOCUS',
      description: 'Attention',
      isCategory: true 
    },
    { 
      icon: Eye, 
      label: 'Vision', 
      categoryId: 'VISION',
      description: 'Visual Tests',
      isCategory: true 
    },
    { 
      icon: Headphones, 
      label: 'Hearing', 
      categoryId: 'HEARING',
      description: 'Audio Tests',
      isCategory: true 
    },
  ];

  const handleCategoryClick = (categoryId) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryId);
    }
    if (!isHomePage) {
      navigate('/#all-tests');
    } else {
      document.getElementById('all-tests')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };


  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-dark-900/98 backdrop-blur-xl border-r border-dark-800
          transition-transform duration-300 z-[45]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl shadow-lg">
                ⚡
              </div>
              <div>
                <div className="text-xl font-bold text-white">TestHub</div>
                <p className="text-xs text-dark-400">Testing Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <div key={index} className="pt-4 pb-2">
                    <div className="text-xs font-semibold text-dark-500 uppercase tracking-wider px-3">
                      {item.label}
                    </div>
                  </div>
                );
              }

              const Icon = item.icon;
              
              // For category items
              if (item.isCategory) {
                const isSelected = selectedCategory === item.categoryId;
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(item.categoryId)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl
                      transition-all duration-200 group
                      ${isSelected 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/40 shadow-lg shadow-blue-500/10' 
                        : 'text-dark-300 hover:text-white hover:bg-dark-800/70 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${isSelected ? 'bg-blue-500/30' : 'bg-dark-800 group-hover:bg-dark-700'} flex items-center justify-center transition-all`}>
                        <Icon 
                          size={18} 
                          className={`shrink-0 ${isSelected ? 'text-blue-300' : 'text-dark-400 group-hover:text-blue-400'}`} 
                        />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.description && (
                      <span className={`text-xs ${isSelected ? 'text-blue-300' : 'text-dark-500'}`}>
                        {item.description}
                      </span>
                    )}
                  </button>
                );
              }

              // For regular navigation items (Dashboard)
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-white border border-green-500/30 shadow-lg shadow-green-500/10' 
                      : 'text-dark-300 hover:text-white hover:bg-dark-800/70'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${isActive ? 'bg-green-500/30' : 'bg-dark-800 group-hover:bg-dark-700'} flex items-center justify-center transition-all`}>
                          <Icon 
                            size={18} 
                            className={`shrink-0 ${isActive ? 'text-green-300' : 'text-dark-400 group-hover:text-green-400'}`} 
                          />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.description && (
                        <span className="text-xs text-dark-500">{item.description}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer Stats - Simplified */}
          <div className="p-4 border-t border-dark-800">
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 rounded-xl p-4 border border-dark-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-sm font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Guest User</p>
                  <p className="text-xs text-dark-400">No login required</p>
                </div>
              </div>
              <div className="text-xs text-center text-dark-400 pt-3 border-t border-dark-700">
                All tests are free
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
