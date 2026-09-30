import React from 'react';
import { Sparkles, Calendar, Plus, Search as SearchIcon } from 'lucide-react';

export default function MobileNavBar({ currentScreen, onSelectScreen, onOpenCreate }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex items-center justify-around z-40 shadow-lg">
      <button
        onClick={() => onSelectScreen('welcome')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
          currentScreen === 'welcome' ? 'text-[#3D5CFF]' : 'text-slate-400'
        }`}
      >
        <Sparkles className="w-5 h-5" />
        <span>Welcome</span>
      </button>
      <button
        onClick={() => onSelectScreen('home')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
          currentScreen === 'home' ? 'text-[#3D5CFF]' : 'text-slate-400'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span>Home</span>
      </button>
      <button
        onClick={onOpenCreate}
        className="w-10 h-10 rounded-full bg-[#3D5CFF] text-white flex items-center justify-center shadow-md shadow-blue-500/30 -mt-4 active:scale-95 transition-transform cursor-pointer"
        title="Add Task"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
      </button>
      <button
        onClick={() => onSelectScreen('search')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
          currentScreen === 'search' ? 'text-[#3D5CFF]' : 'text-slate-400'
        }`}
      >
        <SearchIcon className="w-5 h-5" />
        <span>Search</span>
      </button>
    </div>
  );
}
