import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

export default function DesktopStatCards({
  desktopFilter,
  totalCompleted,
  totalPending,
  totalTasks,
  progressPct,
  onFilterSelect
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div
        onClick={() => onFilterSelect(desktopFilter === 'completed' ? 'all' : 'completed')}
        className={`p-6 rounded-3xl border transition-all cursor-pointer ${
          desktopFilter === 'completed'
            ? 'bg-blue-100 border-[#3D5CFF] ring-2 ring-blue-300'
            : 'bg-[#EEF2FF] border-blue-100/90 hover:bg-blue-100/70 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-[#3D5CFF] flex items-center justify-center">
              <CheckSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-800">Task Complete</span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-blue-700">
            This Week
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-slate-900 tracking-tight">
            {String(totalCompleted).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-slate-500">Tasks Finished</span>
        </div>
      </div>

      <div
        onClick={() => onFilterSelect(desktopFilter === 'pending' ? 'all' : 'pending')}
        className={`p-6 rounded-3xl border transition-all cursor-pointer ${
          desktopFilter === 'pending'
            ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
            : 'bg-[#FFF1F2] border-rose-100/90 hover:bg-rose-100/70 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Square className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-800">Task Pending</span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-rose-700">
            This Week
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-slate-900 tracking-tight">
            {String(totalPending).padStart(2, '0')}
          </span>
          <span className="text-xs font-medium text-slate-500">Tasks In Progress</span>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-800">Weekly Progress</span>
            <span className="text-sm font-extrabold text-[#3D5CFF]">{progressPct}%</span>
          </div>
          <p className="text-xs text-slate-400">
            {totalCompleted} of {totalTasks} total tasks completed
          </p>
        </div>
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex mt-4">
          <div
            className="h-full bg-[#1E293B] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
