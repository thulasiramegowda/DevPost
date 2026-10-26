"use client";

import React from "react";
import { AlertCircle, ArrowRight, Sparkles, X } from "lucide-react";
import { ProductItem } from "../types";

interface NotFoundBannerProps {
  onSelectProduct: (url: string) => void;
  onClose?: () => void;
  sampleProducts?: Partial<ProductItem>[];
}

const DEFAULT_SAMPLES = [
  {
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones",
    store: "Amazon India",
    url: "https://www.amazon.in/dp/B07PR1CL3S",
    trustBadge: "High Trust (92/100)",
    color: "safe",
  },
  {
    name: "Prestige Iris 750W Mixer Grinder with 3 Jars",
    store: "Flipkart",
    url: "https://www.flipkart.com/prestige-iris-750-w-mixer-grinder/p/itm1234567",
    trustBadge: "Moderate Trust (72/100)",
    color: "warning",
  },
  {
    name: "TurboPower 65W GaN Dual-Port Fast Charger",
    store: "Amazon India",
    url: "https://www.amazon.in/dp/B09XYZ65W1",
    trustBadge: "Low Trust (48/100 • Review Burst)",
    color: "risk",
  },
  {
    name: "SlimGlow Herbal Ayurvedic Detox Slimming Tea",
    store: "Meesho",
    url: "https://www.meesho.com/slimglow-herbal-detox-tea/p/sg9981",
    trustBadge: "Very Low Trust (22/100 • Duplicates)",
    color: "risk",
  },
  {
    name: "Solimo High-Back Executive Mesh Office Chair",
    store: "Amazon India",
    url: "https://www.amazon.in/dp/B08SOLIMO8",
    trustBadge: "Mixed Trust (64/100)",
    color: "warning",
  },
];

export const NotFoundBanner: React.FC<NotFoundBannerProps> = ({
  onSelectProduct,
  onClose,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 sm:p-8 bg-white rounded-2xl border-2 border-amber-200/90 shadow-card relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-warning flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">
            Demo Mode Notice
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Live product reviews are not available in this demo. Try one of the sample product links below.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Click any demo product link to run full analysis:
        </span>

        {DEFAULT_SAMPLES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelectProduct(item.url)}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-primary hover:bg-blue-50/30 transition-all cursor-pointer group bg-slate-50/50"
          >
            <div className="space-y-1 pr-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                  {item.store}
                </span>
                <span
                  className={`text-[11px] font-bold ${
                    item.color === "safe"
                      ? "text-safe"
                      : item.color === "warning"
                      ? "text-warning"
                      : "text-risk"
                  }`}
                >
                  {item.trustBadge}
                </span>
              </div>
              <p className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {item.name}
              </p>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg group-hover:bg-primary-hover transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Analyze</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
