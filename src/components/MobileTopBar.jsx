import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileTopBar = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-lg border-b border-dark-800/50">
      <div className="flex items-center justify-between px-3 py-2.5">
        {/* Logo/Brand - Compact */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
            <span className="text-base">⚡</span>
          </div>
          <span className="text-white font-bold text-sm">TestHub</span>
        </div>

        {/* Menu Button - Compact & Clean */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg bg-dark-800/50 border border-dark-700/50 hover:bg-dark-700/80 transition-all duration-200 active:scale-95"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={18} className="text-white" />
          ) : (
            <Menu size={18} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileTopBar;
