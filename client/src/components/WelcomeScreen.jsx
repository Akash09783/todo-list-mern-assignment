import React from 'react';
import { ArrowRight, CheckSquare, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between bg-white overflow-hidden select-none">
      <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[460px] bg-[#3D5CFF] rounded-b-[44px] flex flex-col justify-between p-6 sm:p-8 overflow-hidden shadow-xl shadow-blue-500/20">
        <div className="absolute top-[-40px] right-[-40px] w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-700/40 blur-2xl pointer-events-none" />

        <div className="z-10 flex items-center justify-between pt-2">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
            <CheckSquare className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-white text-xs font-bold tracking-wider uppercase bg-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/25 shadow-xs">
            Task Planner
          </span>
        </div>

        <div className="z-10 flex flex-col items-center justify-center my-auto py-8">
          <svg
            className="w-56 h-40 sm:w-64 sm:h-48 text-white/40 drop-shadow"
            viewBox="0 0 160 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 25 L40 55 L70 25 L100 55 L130 25 L150 45"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 50 L40 80 L70 50 L100 80 L130 50 L150 70"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 75 L40 105 L70 75 L100 105 L130 75 L150 95"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="z-10 flex justify-center pb-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/30 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Weekly Organized To-Do
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between px-7 sm:px-9 py-8 bg-white space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Manage What To Do
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-sm">
            The best way to manage what you have to do, don't forget your plans.
          </p>
        </div>

        <div>
          <button
            onClick={onGetStarted}
            className="w-full h-14 bg-[#3D5CFF] hover:bg-[#2F4EE8] active:scale-[0.98] transition-all duration-200 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 group cursor-pointer text-base"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
