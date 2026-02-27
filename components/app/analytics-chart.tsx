"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Point {
  day: string;
  downloads: number;
}

export function AnalyticsChart() {
  const [data, setData] = useState<Point[]>([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((res) => setData(res.downloadsByDay ?? []));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border p-4">
      <h3 className="mb-3 font-semibold">Downloads Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="downloads" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
