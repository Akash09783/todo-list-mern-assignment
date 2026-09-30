import React from 'react';
import { CheckSquare, Square, Layers, CalendarDays, Plus, RefreshCw } from 'lucide-react';

export default function DesktopSidebar({
  desktopFilter,
  totalTasks,
  totalPending,
  totalCompleted,
  selectedDate,
  todayTasksCount,
  weeklySummaries,
  selectedWeekKey,
  serverStatus,
  loading,
  onFilterSelect,
  onWeekSelect,
  onOpenCreate,
  onRefresh
}) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#3D5CFF] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Task Planner</h1>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">MERN To-Do Suite</p>
          </div>
        </div>

        <button
          onClick={onOpenCreate}
          className="w-full py-3 px-4 bg-[#3D5CFF] hover:bg-[#2F4EE8] text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create New Task</span>
        </button>

        <nav className="space-y-1 pt-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Overview</p>
          
          <button
            onClick={() => onFilterSelect('all')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              desktopFilter === 'all'
                ? 'bg-blue-50 text-[#3D5CFF]'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>All Tasks</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-slate-600 font-semibold border border-slate-200">
              {totalTasks}
            </span>
          </button>

          <button
            onClick={() => onFilterSelect('today')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              desktopFilter === 'today'
                ? 'bg-blue-50 text-[#3D5CFF]'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarDays className="w-4 h-4" />
              <span>Selected Day ({selectedDate})</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-slate-600 font-semibold border border-slate-200">
              {todayTasksCount}
            </span>
          </button>

          <button
            onClick={() => onFilterSelect('pending')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              desktopFilter === 'pending'
                ? 'bg-rose-50 text-rose-600'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Square className="w-4 h-4" />
              <span>Pending Tasks</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold">
              {totalPending}
            </span>
          </button>

          <button
            onClick={() => onFilterSelect('completed')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              desktopFilter === 'completed'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckSquare className="w-4 h-4" />
              <span>Completed Tasks</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
              {totalCompleted}
            </span>
          </button>
        </nav>

        <div className="pt-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Weeks List</p>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {weeklySummaries.map((w) => (
              <button
                key={w.weekKey}
                onClick={() => onWeekSelect(w.weekKey)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  selectedWeekKey === w.weekKey
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Week {w.weekNumber}</span>
                <span className="text-[10px] opacity-80">
                  {w.completedTasks}/{w.totalTasks} done
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Storage Backend</span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active
          </span>
        </div>
        <p className="text-xs font-medium text-slate-500 truncate">{serverStatus?.database}</p>
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-200/60">
          <span>Port: 5000</span>
          <button
            onClick={onRefresh}
            className="hover:text-blue-600 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync
          </button>
        </div>
      </div>
    </aside>
  );
}
