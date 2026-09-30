import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function DesktopHeader({
  search,
  onSearchChange,
  currentWeekSummary
}) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-lg relative">
        <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title or description (keyword)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-xs font-medium transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold text-slate-800">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className="text-[11px] text-slate-400">Weekly Organised Dashboard</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3D5CFF] flex items-center justify-center font-bold text-xs">
          {currentWeekSummary ? `W${currentWeekSummary.weekNumber}` : 'W40'}
        </div>
      </div>
    </header>
  );
}
