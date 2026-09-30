import React from 'react';

export default function DesktopWeekStrip({
  weekDays,
  onSelectDate,
  onGoToToday
}) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Weekly Schedule</h3>
          <p className="text-xs text-slate-400">Click a day to filter and assign tasks (Monday to Sunday)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToToday}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Go To Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((item) => (
          <button
            key={item.dateStr}
            onClick={() => onSelectDate(item.dateStr)}
            className={`flex flex-col items-center justify-center py-3.5 rounded-2xl transition-all duration-150 cursor-pointer border ${
              item.isSelected
                ? 'bg-[#3D5CFF] text-white border-[#3D5CFF] shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span
              className={`text-xs font-semibold ${
                item.isSelected ? 'text-white/80' : 'text-slate-400'
              }`}
            >
              {item.dayName}
            </span>
            <span
              className={`text-xl font-extrabold mt-1 ${
                item.isSelected ? 'text-white' : 'text-slate-800'
              }`}
            >
              {item.dayNumber}
            </span>
            <span
              className={`text-[10px] mt-0.5 ${
                item.isSelected ? 'text-white/90' : 'text-slate-400'
              }`}
            >
              {item.monthName}
            </span>
            {item.isToday && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full mt-1.5 ${
                  item.isSelected ? 'bg-white text-blue-600' : 'bg-blue-100 text-[#3D5CFF]'
                }`}
              >
                Today
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
