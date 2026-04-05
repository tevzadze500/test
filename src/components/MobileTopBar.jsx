import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileTopBar = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <div className="lg:hidden sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <span className="text-lg">⚡</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-none">TestHub</span>
            <span className="text-dark-400 text-[10px] leading-none mt-0.5">Testing Platform</span>
          </div>
        </div>

        {/* Menu Button - Modern & Clean */}
        <button
          onClick={onMenuToggle}
          className="p-2.5 rounded-xl bg-dark-800/60 border border-dark-700/50 hover:bg-dark-700/80 hover:border-dark-600/50 transition-all duration-200 active:scale-95"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileTopBar;
