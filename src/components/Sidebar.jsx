import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap,
  Flag,
  Brain, 
  Eye,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', description: 'Home' },
    { divider: true, label: 'Quick Tests' },
    { icon: Zap, label: 'Reaction Time', path: '/test/reaction-time', description: '2 min' },
    { icon: Flag, label: 'F1 Reaction', path: '/test/f1-reaction', description: '1 min' },
    { icon: Brain, label: 'ADHD Test', path: '/test/adhd', description: '5 min' },
    { icon: Eye, label: 'Vision Test', path: '/test/vision', description: '3 min' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-dark-800 rounded-xl border border-dark-700 hover:bg-dark-700 transition-colors shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

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
          w-72 bg-dark-900 border-r border-dark-800
          transition-transform duration-300 z-40
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
                <h1 className="text-xl font-bold text-white">TestHub</h1>
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
                        <Icon 
                          size={20} 
                          className={`shrink-0 ${isActive ? 'text-green-400' : 'text-dark-400 group-hover:text-green-400'}`} 
                        />
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
