"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldAlert,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Link2,
  X,
  AlertTriangle,
  Clipboard,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { RecentHistory, HistoryItem } from "./RecentHistory";

interface HeroAnalyzeProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  initialUrl?: string;
  historyItems?: HistoryItem[];
  onClearHistory?: () => void;
}

export const HeroAnalyze: React.FC<HeroAnalyzeProps> = ({
  onAnalyze,
  isLoading,
  initialUrl = "",
  historyItems = [],
  onClearHistory = () => {},
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError("Please paste a product URL to analyze.");
      return;
    }
    setError(null);
    onAnalyze(url.trim());
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setError(null);
      }
    } catch {
      // Clipboard permission denied or unsupported
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16">
      {/* Centered Headline & Subheading */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200/90 shadow-sm hover:border-primary/40 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600 font-medium">Gemini 2.5 Flash Live Audit</span>
          <span className="text-slate-300">•</span>
          <span className="text-primary font-bold">100% Free & Independent</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Know if the reviews <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            can be trusted.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Paste ANY product link from Amazon, Flipkart, Myntra, or Meesho to get a real-time review trust audit and plain-language buyer report.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Analysis</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-safe" />
            <span>6 Deterministic Checks</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200/80">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Authentic Image Extraction</span>
          </span>
        </div>
      </div>

      {/* Main Search Input Form with Elevated Shadow */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-10">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl border-2 border-slate-200/90 focus-within:border-primary shadow-xl shadow-slate-200/60 transition-all p-2 gap-2">
          <div className="flex items-center flex-1 pl-3 gap-2">
            <Link2 className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste any product link (Amazon, Flipkart, Myntra, Meesho)..."
              className="w-full py-2.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base bg-transparent focus:outline-none"
              disabled={isLoading}
            />

            {!url && (
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shrink-0 mr-1"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            )}

            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mr-1"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 bg-primary hover:bg-primary-hover active:bg-blue-800 disabled:opacity-60 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Reviews...</span>
              </>
            ) : (
              <>
                <span>Analyze Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-xs sm:text-sm text-risk font-medium flex items-center gap-1.5 pl-3">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </p>
        )}
      </form>

      {/* Recent Analysis History (Shows products analyzed by the user) */}
      <RecentHistory
        items={historyItems}
        onSelect={(selectedUrl) => onAnalyze(selectedUrl)}
        onClear={onClearHistory}
      />

      {/* 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Detect suspicious review patterns
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Uncover 48-hour velocity spikes, duplicate copy-paste reviews, reviewer repetition, and unverified purchaser flooding.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-safe" />
            <span>6 deterministic algorithms</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-safe flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Understand real customer feedback
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gemini AI synthesizes dozens of long reviews into concise shopper-friendly bullet points, highlighting authentic praise and real complaints.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-safe" />
            <span>Structured Gemini AI synthesis</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-warning flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              Make a confident buying decision
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get an explainable 0–100 Review Trust Score with actionable buyer recommendations before you hit the checkout button.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-safe" />
            <span>Transparent 0–100 scoring</span>
          </div>
        </div>
      </div>
    </div>
  );
};
