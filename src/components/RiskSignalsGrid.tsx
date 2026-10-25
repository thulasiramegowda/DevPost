"use client";

import React from "react";
import {
  Flame,
  Copy,
  UserCheck,
  BarChart2,
  Users,
  Compass,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
} from "lucide-react";
import { RiskSignal } from "../types";

interface RiskSignalsGridProps {
  signals: RiskSignal[];
}

export const RiskSignalsGrid: React.FC<RiskSignalsGridProps> = ({ signals }) => {
  // Mapping icons to signal IDs
  const getSignalIcon = (id: string) => {
    switch (id) {
      case "review_burst":
        return <Flame className="w-5 h-5" />;
      case "duplicate_wording":
        return <Copy className="w-5 h-5" />;
      case "unverified_ratio":
        return <UserCheck className="w-5 h-5" />;
      case "rating_imbalance":
        return <BarChart2 className="w-5 h-5" />;
      case "reviewer_repetition":
        return <Users className="w-5 h-5" />;
      case "extreme_deviation":
        return <Compass className="w-5 h-5" />;
      default:
        return <ShieldAlert className="w-5 h-5" />;
    }
  };

  const getSeverityBadge = (severity: string, pointsDeducted: number) => {
    if (severity === "high") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-risk border border-red-200">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>High Risk (-{pointsDeducted} pts)</span>
        </span>
      );
    }
    if (severity === "medium") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-warning border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Moderate Risk (-{pointsDeducted} pts)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-safe border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Normal (0 pts)</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="font-bold text-lg text-slate-900">
            Evidence-Based Risk Signals
          </h3>
          <p className="text-xs text-slate-500">
            Deterministic algorithmic checks calibrated to detect review manipulation
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          6 Core Verifications
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map((signal) => {
          const isHigh = signal.severity === "high";
          const isMedium = signal.severity === "medium";

          return (
            <div
              key={signal.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all bg-white shadow-card hover:shadow-cardHover ${
                isHigh
                  ? "border-red-200 bg-red-50/10"
                  : isMedium
                  ? "border-amber-200 bg-amber-50/10"
                  : "border-border"
              }`}
            >
              <div>
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isHigh
                        ? "bg-red-50 text-risk"
                        : isMedium
                        ? "bg-amber-50 text-warning"
                        : "bg-emerald-50 text-safe"
                    }`}
                  >
                    {getSignalIcon(signal.id)}
                  </div>
                  {getSeverityBadge(signal.severity, signal.pointsDeducted)}
                </div>

                {/* Title */}
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {signal.title}
                </h4>

                {/* Evidence Highlight Box */}
                <div
                  className={`p-2.5 rounded-xl text-xs font-medium mb-3 leading-relaxed ${
                    isHigh
                      ? "bg-red-50/80 text-red-900 border border-red-100"
                      : isMedium
                      ? "bg-amber-50/80 text-amber-900 border border-amber-100"
                      : "bg-slate-50 text-slate-700 border border-slate-100"
                  }`}
                >
                  <span className="font-semibold text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">
                    Detected Evidence:
                  </span>
                  "{signal.evidence}"
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-500 leading-normal">
                  {signal.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
