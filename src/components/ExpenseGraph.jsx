"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ expenses }) {
  // Group expenses by month and sum their amounts
  const monthlyExpenses = useMemo(() => {
    const grouped = {};

    expenses.forEach(({ date, amount }) => {
      const month = new Date(date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] += parseFloat(amount);
    });

    return Object.entries(grouped).map(([month, total]) => ({
      name: month,
      value: total,
    }));
  }, [expenses]);

  // Colors for the pie chart
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-4">Monthly Expenses</h2>
        {monthlyExpenses.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={monthlyExpenses}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {monthlyExpenses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
