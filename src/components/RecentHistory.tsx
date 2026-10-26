"use client";

import React from "react";
import { Clock, ArrowRight, Trash2, ExternalLink, ShieldCheck, ShieldAlert, CheckCircle } from "lucide-react";

export interface HistoryItem {
  id: string;
  productName: string;
  store: string;
  url: string;
  imageUrl: string;
  trustScore: number;
  trustLevel: string;
  analyzedAt: string;
}

interface RecentHistoryProps {
  items: HistoryItem[];
  onSelect: (url: string) => void;
  onClear: () => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  items,
  onSelect,
  onClear,
}) => {
  if (items.length === 0) return null;

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{score}/100 High</span>
        </span>
      );
    }
    if (score >= 60) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{score}/100 Moderate</span>
        </span>
      );
    }
    if (score >= 40) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{score}/100 Low</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>{score}/100 Critical</span>
      </span>
    );
  };

  const getRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 px-2 sm:px-0">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Recent Analyses</h3>
            <p className="text-[11px] text-slate-400">Quickly revisit products you've analyzed</p>
          </div>
        </div>

        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-red-600 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
          title="Clear all recent history"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.url)}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-cardHover transition-all cursor-pointer group shadow-card"
          >
            {/* Real product thumbnail */}
            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">
                  {item.store}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {getRelativeTime(item.analyzedAt)}
                </span>
              </div>

              <p className="font-bold text-xs text-slate-900 truncate group-hover:text-primary transition-colors">
                {item.productName}
              </p>

              <div>{getScoreBadge(item.trustScore)}</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
