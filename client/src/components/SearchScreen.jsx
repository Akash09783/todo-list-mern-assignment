import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, CheckSquare, Trash2, Edit3, X, Sparkles, Loader2 } from 'lucide-react';

export default function SearchScreen({
  tasks,
  searchResults = [],
  isSearching = false,
  onSearchApi,
  onBack,
  onToggleStatus,
  onDeleteTask,
  onOpenEdit
}) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchApi) {
        onSearchApi(searchTerm);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchApi]);

  const displayTasks = searchTerm.trim() ? searchResults : tasks;

  return (
    <div className="relative w-full h-full flex flex-col bg-white text-slate-800 select-none overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 border-b border-slate-100 bg-white sticky top-0 z-20">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a task..."
            autoFocus
            className="w-full pl-4 pr-10 py-3 bg-[#F8FAFC] rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-800 font-medium placeholder:text-slate-400 transition-all"
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 pb-24">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            {isSearching && <Loader2 className="w-3 h-3 animate-spin text-[#3D5CFF]" />}
            <span>{displayTasks.length} Results Found</span>
          </span>
          {searchTerm && <span>Query: "{searchTerm}"</span>}
        </div>

        {displayTasks.length === 0 ? (
          <div className="text-center py-20 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3D5CFF] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">No matching tasks found</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Try searching with different keywords like 'meeting', 'wireframe', or 'food'
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayTasks.map((task) => {
              const isCompleted = task.status === 'Completed';
              return (
                <div
                  key={task._id}
                  className="flex items-center justify-between py-3.5 group hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
                >
                  <div
                    onClick={() => onToggleStatus(task)}
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                  >
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                        isCompleted
                          ? 'bg-[#3D5CFF] text-white'
                          : 'border-2 border-slate-300 hover:border-[#3D5CFF]'
                      }`}
                    >
                      {isCompleted && <CheckSquare className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold tracking-tight truncate ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {task.date} {task.startTime ? `• ${task.startTime}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenEdit(task)}
                      className="p-2 rounded-lg text-slate-400 hover:text-[#3D5CFF] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Task"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task._id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
