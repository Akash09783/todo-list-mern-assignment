import React from 'react';
import {
  CheckSquare,
  Sparkles,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';

export default function DesktopTaskList({
  desktopFilter,
  selectedDate,
  tasks,
  onToggleStatus,
  onOpenEdit,
  onOpenCreate,
  onDeleteTask
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-extrabold text-slate-900">
            {desktopFilter === 'all'
              ? 'All Tasks'
              : desktopFilter === 'today'
              ? `Tasks for ${selectedDate}`
              : desktopFilter === 'pending'
              ? 'Pending Tasks'
              : 'Completed Tasks'}
          </h3>
          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
            {tasks.length} tasks
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCreate}
            className="px-4 py-1.5 bg-[#3D5CFF] hover:bg-[#2F4EE8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#3D5CFF] flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-700">No tasks found</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no tasks matching the current filter. Create a task or pick a different date/filter!
            </p>
          </div>
          <button
            onClick={onOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D5CFF] text-white text-xs font-bold shadow-md hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            return (
              <div
                key={task._id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 ${
                  isCompleted
                    ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs'
                }`}
              >
                <div
                  onClick={() => onToggleStatus(task)}
                  className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
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

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold tracking-tight ${
                        isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xl">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 px-4 flex-shrink-0">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {task.date}
                  </span>

                  {task.startTime && (
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {task.startTime}
                      {task.endTime ? ` - ${task.endTime}` : ''}
                    </span>
                  )}

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      task.priority === 'High'
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : task.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-600 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}
                  >
                    {task.priority || 'Medium'}
                  </span>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onOpenEdit(task)}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#3D5CFF] hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit Task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
  );
}
