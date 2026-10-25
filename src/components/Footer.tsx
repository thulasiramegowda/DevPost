"use client";

import React from "react";
import { Shield, Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-white mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        {/* Core required positioning statement */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
          ReviewLens is a proof-of-concept decision-support tool. It highlights review-risk signals; it does not prove that a review is fake.
        </p>

        {/* Hackathon attribution */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span>Built for the Devpost "Build With AI: Basics" Hackathon</span>
          <span>•</span>
          <span>Powered by Google Gemini & Next.js</span>
          <span>•</span>
          <span>Designed with Linear/Stripe/Notion minimalism</span>
        </div>
      </div>
    </footer>
  );
};
