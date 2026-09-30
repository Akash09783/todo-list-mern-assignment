import React, { useState } from 'react';
import {
  Search,
  Settings,
  Bell,
  CheckSquare,
  Square,
  Trash2,
  Edit3,
  Plus,
  Calendar as CalendarIcon,
  ChevronRight,
  Clock,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';

export default function HomeScreen({
  tasks,
  selectedDate,
  onSelectDate,
  onOpenCreate,
  onOpenEdit,
  onToggleStatus,
  onDeleteTask,
  onOpenSearch,
  weeklySummaries,
  currentWeekSummary,
  selectedWeekKey,
  onSelectWeek
}) {
  const [viewFilter, setViewFilter] = useState('all');
  const [showWeekSelector, setShowWeekSelector] = useState(false);

  // Monday as start of week: day 0 is Sunday, so offset is (day === 0 ? -6 : 1 - day)
  const currentWeekDays = React.useMemo(() => {
    const cur = new Date(selectedDate);
    const day = cur.getDay();
    const diffToMonday = cur.getDate() - (day === 0 ? 6 : day - 1);
    const monday = new Date(cur);
    monday.setDate(diffToMonday);

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      days.push({
        dateStr: iso,
        dayName: dayNames[d.getDay()],
        dayNumber: String(d.getDate()).padStart(2, '0'),
        isToday: new Date().toISOString().split('T')[0] === iso,
        isSelected: selectedDate === iso
      });
    }
    return days;
  }, [selectedDate]);

  const displayedTasks = React.useMemo(() => {
    return tasks.filter((t) => {
      if (viewFilter === 'today' || viewFilter === 'all') {
        if (t.date !== selectedDate) return false;
      }
      if (viewFilter === 'pending') return t.status !== 'Completed';
      if (viewFilter === 'completed') return t.status === 'Completed';
      return true;
    });
  }, [tasks, selectedDate, viewFilter]);

  const weekStats = React.useMemo(() => {
    if (currentWeekSummary) {
      return {
        completed: currentWeekSummary.completedTasks || 0,
        pending: currentWeekSummary.openTasks || 0,
        total: currentWeekSummary.totalTasks || 0
      };
    }
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = tasks.filter((t) => t.status !== 'Completed').length;
    return { completed, pending, total: completed + pending };
  }, [currentWeekSummary, tasks]);

  const progressPercentage =
    weekStats.total === 0 ? 0 : Math.round((weekStats.completed / weekStats.total) * 100);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8FAFC] text-slate-800 select-none overflow-hidden">
      <div className="px-6 pt-5 pb-3 flex items-center justify-between bg-white border-b border-slate-100">
        <button
          onClick={() => setShowWeekSelector(!showWeekSelector)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
          title="Switch Week"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3D5CFF] flex items-center justify-center font-bold text-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Weekly View</p>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
              {currentWeekSummary ? `Week ${currentWeekSummary.weekNumber}` : 'Current Week'}
              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Mon-Sun</span>
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors shadow-xs"
            title="Search Tasks"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors shadow-xs relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[2.2]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>
      </div>

      {showWeekSelector && (
        <div className="px-6 py-3 bg-white border-b border-slate-200/80 shadow-md z-20 animate-in slide-in-from-top-2 duration-150">
          <p className="text-xs font-bold text-slate-500 mb-2">Select Week to inspect:</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weeklySummaries.map((w) => (
              <button
                key={w.weekKey}
                onClick={() => {
                  onSelectWeek(w.weekKey);
                  setShowWeekSelector(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedWeekKey === w.weekKey
                    ? 'bg-[#3D5CFF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Week {w.weekNumber} ({w.openTasks} open / {w.completedTasks} done)
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 space-y-5">
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
        >
          <span className="text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
            Search for a task
          </span>
          <Search className="w-4 h-4 text-slate-400 group-hover:text-[#3D5CFF] transition-colors stroke-[2.2]" />
        </div>

        <div className="bg-white p-3.5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between gap-1">
            {currentWeekDays.map((item) => (
              <button
                key={item.dateStr}
                onClick={() => onSelectDate(item.dateStr)}
                className={`flex flex-col items-center justify-center flex-1 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  item.isSelected
                    ? 'bg-[#3D5CFF] text-white shadow-md shadow-blue-500/25 scale-[1.04]'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`text-[11px] font-medium tracking-tight ${
                    item.isSelected ? 'text-white/80' : 'text-slate-400'
                  }`}
                >
                  {item.dayName}
                </span>
                <span
                  className={`text-base font-bold mt-1 ${
                    item.isSelected ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {item.dayNumber}
                </span>
                {item.isSelected && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-1"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div
            onClick={() => setViewFilter(viewFilter === 'completed' ? 'all' : 'completed')}
            className={`p-4 rounded-3xl border transition-all cursor-pointer ${
              viewFilter === 'completed'
                ? 'bg-blue-100 border-[#3D5CFF] ring-2 ring-blue-300'
                : 'bg-[#EEF2FF] border-blue-100/80 hover:bg-blue-100/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600/10 text-[#3D5CFF] flex items-center justify-center">
                <CheckSquare className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Task Complete</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {String(weekStats.completed).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-medium text-slate-500">This Week</span>
            </div>
          </div>

          <div
            onClick={() => setViewFilter(viewFilter === 'pending' ? 'all' : 'pending')}
            className={`p-4 rounded-3xl border transition-all cursor-pointer ${
              viewFilter === 'pending'
                ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                : 'bg-[#FFF1F2] border-rose-100/80 hover:bg-rose-100/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Square className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Task Pending</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {String(weekStats.pending).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-medium text-slate-500">This Week</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Weekly Progress</span>
            <span className="text-xs font-bold text-[#3D5CFF]">{progressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#1E293B] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {viewFilter === 'completed'
                  ? 'Completed Tasks'
                  : viewFilter === 'pending'
                  ? 'Pending Tasks'
                  : 'Tasks Today'}
              </h2>
              <span className="text-xs font-bold bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full">
                {displayedTasks.length}
              </span>
            </div>
            <button
              onClick={() => setViewFilter('all')}
              className="text-xs font-semibold text-[#3D5CFF] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {displayedTasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3D5CFF] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">No tasks found for this view</p>
                <p className="text-xs text-slate-400 mt-1">
                  Tap the button below to add your first task for this day!
                </p>
              </div>
              <button
                onClick={onOpenCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3D5CFF] text-white text-xs font-semibold shadow-sm hover:bg-blue-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Task
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {displayedTasks.map((task) => {
                const isCompleted = task.status === 'Completed';
                return (
                  <div
                    key={task._id}
                    className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 bg-white ${
                      isCompleted
                        ? 'border-slate-100 bg-slate-50/50'
                        : 'border-slate-200/80 hover:border-blue-300 shadow-xs'
                    }`}
                  >
                    <div
                      onClick={() => onToggleStatus(task)}
                      className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                          isCompleted
                            ? 'bg-[#3D5CFF] text-white'
                            : 'border-2 border-slate-300 text-transparent hover:border-[#3D5CFF]'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div className="min-w-0 pr-2">
                        <p
                          className={`text-sm font-medium tracking-tight truncate ${
                            isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                          {task.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.startTime}
                              {task.endTime ? ` - ${task.endTime}` : ''}
                            </span>
                          )}
                          {task.priority && (
                            <span
                              className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${
                                task.priority === 'High'
                                  ? 'bg-rose-50 text-rose-600'
                                  : task.priority === 'Medium'
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'bg-emerald-50 text-emerald-600'
                              }`}
                            >
                              {task.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onDeleteTask(task._id)}
                        className="w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2]" />
                      </button>
                      <button
                        onClick={() => onOpenEdit(task)}
                        className="w-8 h-8 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-[#3D5CFF] flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit3 className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={onOpenCreate}
          className="w-14 h-14 rounded-full bg-[#3D5CFF] hover:bg-[#2F4EE8] text-white shadow-xl shadow-blue-500/35 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Add New Task"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
