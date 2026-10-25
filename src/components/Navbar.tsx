"use client";

import React from "react";
import { ShieldCheck, Sparkles, ExternalLink, RefreshCw } from "lucide-react";

interface NavbarProps {
  onReset?: () => void;
  hasReport?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, hasReport }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/30 group-hover:bg-primary-hover transition-colors">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                ReviewLens
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-primary border border-blue-100">
                <Sparkles className="w-3 h-3" />
                AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              E-commerce Review Trust Checker
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {hasReport && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Analyze Another Product
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Devpost "Build With AI" POC</span>
          </div>
        </div>
      </div>
    </header>
  );
};
