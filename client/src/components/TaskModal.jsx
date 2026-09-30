import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask, defaultDate }) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('In Progress');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setStartTime(editingTask.startTime || '');
      setEndTime(editingTask.endTime || '');
      setDate(editingTask.date || defaultDate || new Date().toISOString().split('T')[0]);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setStatus(editingTask.status || 'In Progress');
    } else {
      setTitle('');
      setStartTime('');
      setEndTime('');
      setDate(defaultDate || new Date().toISOString().split('T')[0]);
      setDescription('');
      setPriority('Medium');
      setStatus('In Progress');
    }
    setError('');
  }, [editingTask, defaultDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!date) {
      setError('Task date is required');
      return;
    }

    onSave({
      _id: editingTask?._id,
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      endTime,
      priority,
      status
    });
  };

  const formattedDisplayDate = () => {
    if (!date) return 'Select Date';
    try {
      const [y, m, d] = date.split('-');
      const dateObj = new Date(y, parseInt(m) - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-modal-backdrop">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 animate-modal-content">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {editingTask ? 'Update task details and schedule' : 'Fill in the details to schedule a new to-do'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Task title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Doing Homework, Team Sync"
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-800 font-medium placeholder:text-slate-400 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Set Time</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative flex items-center">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-xs text-slate-700 font-medium"
                />
              </div>
              <div className="relative flex items-center">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-xs text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Set Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-xs text-slate-700 font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 pl-1">
              Formatted: <span className="font-semibold text-slate-600">{formattedDisplayDate()}</span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Priority</label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    priority === p
                      ? 'bg-blue-50 border-[#3D5CFF] text-[#3D5CFF] ring-2 ring-blue-100'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, notes, or subtasks..."
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-2xl border border-slate-200 focus:border-[#3D5CFF] focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 sm:h-13 bg-[#3D5CFF] hover:bg-[#2F4EE8] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all cursor-pointer hover:shadow-blue-500/35 active:scale-[0.99]"
            >
              {editingTask ? 'Save Changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
