import React from 'react';
import { ViewState } from '../types';
import { TrendingUp, BookOpen, Home, Wallet } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  balance: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, balance }) => {
  const navColors = {
    [ViewState.HOME]: '#FF8299',
    [ViewState.MARKET]: '#FF8299',
    [ViewState.LEARN]: '#FF8299'
  };

  const navItemClass = (view: ViewState) => `
    flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
    ${currentView === view
      ? `bg-[${navColors[view]}]/20 text-[${navColors[view]}]`
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
  `;

  const iconClass = (view: ViewState) =>
    `w-4 h-4 mr-2 ${currentView === view ? `text-[${navColors[view]}]` : 'text-slate-500'}`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo and App Name */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onChangeView(ViewState.HOME)}>
              <img 
                src="/images/SheFinanceLogo.png" 
                alt="SheFinance Logo" 
                className="w-12 h-12 rounded-full object-cover" 
              />
              <span className="font-bold text-xl text-slate-800">SheFinance</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <button onClick={() => onChangeView(ViewState.HOME)} className={navItemClass(ViewState.HOME)}>
                <Home className={iconClass(ViewState.HOME)} />
                Home
              </button>
              <button onClick={() => onChangeView(ViewState.MARKET)} className={navItemClass(ViewState.MARKET)}>
                <TrendingUp className={iconClass(ViewState.MARKET)} />
                Market Simulator
              </button>
              <button onClick={() => onChangeView(ViewState.LEARN)} className={navItemClass(ViewState.LEARN)}>
                <BookOpen className={iconClass(ViewState.LEARN)} />
                Learn & Tips
              </button>
            </div>
          </div>
          
          {/* Balance */}
          <div className="flex items-center">
            <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2 border border-slate-200">
              <Wallet className="w-4 h-4 text-[#FF8299]" />
              <span className="text-sm font-semibold text-slate-700">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-around border-t border-slate-100 py-2">
        <button onClick={() => onChangeView(ViewState.HOME)} className="p-2 text-[#FF8299]"><Home /></button>
        <button onClick={() => onChangeView(ViewState.MARKET)} className="p-2 text-[#FFE066]"><TrendingUp /></button>
        <button onClick={() => onChangeView(ViewState.LEARN)} className="p-2 text-[#B58CFF]"><BookOpen /></button>
      </div>
    </nav>
  );
};
