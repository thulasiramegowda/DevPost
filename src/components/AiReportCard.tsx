"use client";

import React from "react";
import {
  Sparkles,
  ThumbsUp,
  AlertCircle,
  Lightbulb,
  Info,
  CheckCircle2,
} from "lucide-react";
import { GeminiAnalysisResponse } from "../types";

interface AiReportCardProps {
  aiReport: GeminiAnalysisResponse;
}

export const AiReportCard: React.FC<AiReportCardProps> = ({ aiReport }) => {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
      {/* Header with Title and Clear AI Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">AI Trust Report</h3>
            <p className="text-xs text-slate-500">
              Shopper-focused review synthesis & sentiment analysis
            </p>
          </div>
        </div>

        {/* Required label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>AI-generated summary based on available review signals.</span>
        </div>
      </div>

      {/* Shopper-Friendly Summary */}
      <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80">
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
          {aiReport.summary}
        </p>
      </div>

      {/* Positive Themes & Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Themes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-safe">
            <ThumbsUp className="w-4 h-4" />
            <h4 className="font-bold text-sm text-slate-900">Main Positive Themes</h4>
          </div>
          <div className="space-y-2">
            {aiReport.positiveThemes && aiReport.positiveThemes.length > 0 ? (
              aiReport.positiveThemes.map((theme, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/80 text-xs sm:text-sm text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-safe shrink-0 mt-0.5" />
                  <span>{theme}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No strong positive themes verified.</p>
            )}
          </div>
        </div>

        {/* Main Complaints */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-risk">
            <AlertCircle className="w-4 h-4" />
            <h4 className="font-bold text-sm text-slate-900">Main Customer Complaints</h4>
          </div>
          <div className="space-y-2">
            {aiReport.complaints && aiReport.complaints.length > 0 ? (
              aiReport.complaints.map((complaint, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs sm:text-sm text-slate-800"
                >
                  <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <span>{complaint}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No significant recurring complaints found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Practical Buyer Recommendation */}
      <div className="pt-2">
        <div className="rounded-xl bg-blue-50/60 border border-blue-200 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-900">
              Practical Buyer Recommendation
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {aiReport.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
