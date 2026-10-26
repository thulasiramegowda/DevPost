"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";

const PROGRESS_STEPS = [
  "Reading product details…",
  "Analyzing review patterns…",
  "Checking rating balance and reviewer behavior…",
  "Generating AI trust report…",
];

export const AnalysisLoading: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < PROGRESS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / PROGRESS_STEPS.length) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Loading Header Card */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 mb-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary mx-auto flex items-center justify-center mb-5 relative">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-pulse" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Analyzing Product Reviews
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Executing deterministic risk algorithms & Gemini AI synthesis
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Progressive Steps List */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {PROGRESS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-blue-50/70 border border-blue-100 text-primary font-medium"
                    : isCompleted
                    ? "text-slate-700"
                    : "text-slate-400 opacity-60"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-safe shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span className="text-xs sm:text-sm">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton Mockup of the Trust Report */}
      <div className="space-y-6 opacity-70 pointer-events-none">
        {/* Top Product Card Skeleton */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-20 h-20 rounded-xl bg-slate-200 animate-shimmer shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-48 bg-slate-200 rounded-md animate-shimmer" />
              <div className="h-4 w-32 bg-slate-200 rounded-md animate-shimmer" />
              <div className="h-3 w-64 bg-slate-100 rounded-md animate-shimmer" />
            </div>
          </div>
          <div className="w-32 h-32 rounded-full border-8 border-slate-100 animate-pulse shrink-0" />
        </div>

        {/* AI Report Card Skeleton */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div className="h-5 w-36 bg-slate-200 rounded-md animate-shimmer" />
          <div className="h-4 w-full bg-slate-100 rounded-md animate-shimmer" />
          <div className="h-4 w-5/6 bg-slate-100 rounded-md animate-shimmer" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="h-20 bg-slate-50 rounded-xl animate-shimmer" />
            <div className="h-20 bg-slate-50 rounded-xl animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
