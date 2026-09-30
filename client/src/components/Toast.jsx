import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200/80 text-xs font-semibold text-slate-800 animate-in slide-in-from-top-4 fade-in duration-200 min-w-[280px] max-w-sm">
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isSuccess
            ? 'bg-emerald-50 text-emerald-600'
            : isError
            ? 'bg-rose-50 text-rose-600'
            : 'bg-blue-50 text-blue-600'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 stroke-[2.5]" />
        ) : (
          <Info className="w-4 h-4 stroke-[2.5]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-900">{toast.title || 'Notification'}</p>
        <p className="text-[11px] text-slate-500 font-medium truncate">{toast.message}</p>
      </div>

      <button
        onClick={onClose}
        className="w-6 h-6 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
