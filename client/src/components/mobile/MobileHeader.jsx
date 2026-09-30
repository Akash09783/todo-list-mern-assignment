import React from 'react';
import { Smartphone, RefreshCw } from 'lucide-react';

export default function MobileHeader({ serverStatus, loading, onRefresh }) {
  return (
    <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs sticky top-0 z-30">
      <div className="flex items-center gap-1.5 font-bold text-slate-700">
        <Smartphone className="w-4 h-4 text-[#3D5CFF]" />
        <span>Task Planner Mobile</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {serverStatus?.database || 'MERN Ready'}
        </span>
        <button
          onClick={onRefresh}
          className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#3D5CFF]' : ''}`} />
        </button>
      </div>
    </div>
  );
}
