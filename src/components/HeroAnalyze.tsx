"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowRight,
  ShieldAlert,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Link2,
  X,
  AlertTriangle,
} from "lucide-react";

interface SampleProductLink {
  label: string;
  url: string;
  tag: string;
  color: "safe" | "warning" | "risk";
}

const SAMPLE_LINKS: SampleProductLink[] = [
  {
    label: "boAt Rockerz 450 (Amazon)",
    url: "https://www.amazon.in/dp/B07PR1CL3S",
    tag: "High Trust (92/100)",
    color: "safe",
  },
  {
    label: "Prestige Iris 750W Mixer (Flipkart)",
    url: "https://www.flipkart.com/prestige-iris-750-w-mixer-grinder/p/itm1234567",
    tag: "Moderate Trust (72/100)",
    color: "warning",
  },
  {
    label: "TurboPower 65W GaN Charger (Amazon)",
    url: "https://www.amazon.in/dp/B09XYZ65W1",
    tag: "Low Trust (48/100 • Burst detected)",
    color: "risk",
  },
];

const EXTRA_SAMPLES: SampleProductLink[] = [
  {
    label: "SlimGlow Herbal Detox Tea (Meesho)",
    url: "https://www.meesho.com/slimglow-herbal-detox-tea/p/sg9981",
    tag: "Very Low Trust (22/100 • Duplicates)",
    color: "risk",
  },
  {
    label: "Solimo High-Back Office Chair (Amazon)",
    url: "https://www.amazon.in/dp/B08SOLIMO8",
    tag: "Mixed Reviews (64/100)",
    color: "warning",
  },
];

interface HeroAnalyzeProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export const HeroAnalyze: React.FC<HeroAnalyzeProps> = ({
  onAnalyze,
  isLoading,
  initialUrl = "",
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

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setError(null);
    onAnalyze(sampleUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16">
      {/* Centered Headline & Subheading */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary border border-blue-100 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Independent AI Verification for E-Commerce</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Know if the reviews <br className="hidden sm:inline" />
          <span className="text-primary underline decoration-primary/30 decoration-wavy">
            can be trusted.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Paste a product link and get an AI-powered review trust report.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-6">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-primary shadow-lg shadow-slate-200/50 transition-all p-2 gap-2">
          <div className="flex items-center flex-1 pl-3 gap-2">
            <Link2 className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste ANY Amazon, Flipkart, Meesho, or online store URL..."
              className="w-full py-2.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base bg-transparent focus:outline-none"
              disabled={isLoading}
            />
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
            className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary-hover active:bg-blue-800 disabled:opacity-60 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
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

      {/* 3 Sample Product-Link Buttons */}
      <div className="w-full max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Try Sample Verified Products:
          </span>
          <span className="text-[11px] text-slate-400">Click to run instant demo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_LINKS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample.url)}
              disabled={isLoading}
              className="flex flex-col text-left p-3 rounded-xl bg-white border border-border hover:border-primary/50 hover:bg-blue-50/30 transition-all text-xs group shadow-sm"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                  {sample.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  sample.color === "safe"
                    ? "text-safe"
                    : sample.color === "warning"
                    ? "text-warning"
                    : "text-risk"
                }`}
              >
                {sample.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Additional sample pills */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">More demo links:</span>
          {EXTRA_SAMPLES.map((extra, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(extra.url)}
              disabled={isLoading}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors border border-slate-200 text-[11px]"
            >
              <span>{extra.label}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600">{extra.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-4">
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
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-safe flex items-center justify-center mb-4">
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
        <div className="p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-warning flex items-center justify-center mb-4">
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
