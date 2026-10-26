"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart3, TrendingUp, PieChart as PieIcon, CheckCircle2 } from "lucide-react";
import { DeterministicResult } from "../types";

interface ChartsSectionProps {
  stats: DeterministicResult["stats"];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ stats }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-64 bg-white rounded-2xl border border-border p-5 animate-pulse" />
        <div className="h-64 bg-white rounded-2xl border border-border p-5 animate-pulse" />
        <div className="h-64 bg-white rounded-2xl border border-border p-5 animate-pulse" />
      </div>
    );
  }

  // 1. Rating Distribution Data
  const total = stats.totalReviews || 1;
  const ratingData = [
    { star: "5 Stars", count: stats.ratingDistribution.star5, pct: Math.round((stats.ratingDistribution.star5 / total) * 100) },
    { star: "4 Stars", count: stats.ratingDistribution.star4, pct: Math.round((stats.ratingDistribution.star4 / total) * 100) },
    { star: "3 Stars", count: stats.ratingDistribution.star3, pct: Math.round((stats.ratingDistribution.star3 / total) * 100) },
    { star: "2 Stars", count: stats.ratingDistribution.star2, pct: Math.round((stats.ratingDistribution.star2 / total) * 100) },
    { star: "1 Star", count: stats.ratingDistribution.star1, pct: Math.round((stats.ratingDistribution.star1 / total) * 100) },
  ];

  // 2. Timeline Data
  const timelineData = stats.timeline.map((item) => ({
    date: item.date.slice(5), // MM-DD
    count: item.count,
    avg: item.averageRating,
  }));

  // 3. Verified vs Unverified Donut Data
  const donutData = [
    { name: "Verified Buyer", value: stats.verifiedCount, color: "#16A34A" },
    { name: "Unverified", value: stats.unverifiedCount, color: "#F59E0B" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="font-bold text-lg text-slate-900">
            Review Data & Statistical Signals
          </h3>
          <p className="text-xs text-slate-500">
            Visual breakdown of ratings, submission timeline, and buyer verification
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Rating Distribution */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Rating Distribution</h4>
              <p className="text-[11px] text-slate-400">Concentration across star tiers</p>
            </div>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ratingData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="star"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  width={60}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} reviews`, "Count"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>5★ Share: {ratingData[0].pct}%</span>
            <span>1★ Share: {ratingData[4].pct}%</span>
          </div>
        </div>

        {/* Chart 2: Review Timeline */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-warning flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Review Timeline</h4>
              <p className="text-[11px] text-slate-400">Velocity & submission bursts</p>
            </div>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} reviews posted`, "Velocity"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#F59E0B" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Points Analyzed: {timelineData.length} dates</span>
            <span>Historical Spread</span>
          </div>
        </div>

        {/* Chart 3: Verified vs Unverified Donut */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-safe flex items-center justify-center">
              <PieIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Purchase Verification</h4>
              <p className="text-[11px] text-slate-400">Order confirmation split</p>
            </div>
          </div>

          <div className="h-52 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} reviews`, "Volume"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-xl font-bold text-slate-800">
                {stats.verifiedPercentage}%
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="text-safe">Verified: {stats.verifiedCount}</span>
            <span className="text-warning">Unverified: {stats.unverifiedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
