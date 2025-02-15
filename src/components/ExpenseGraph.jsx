"use client";

import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  startOfWeek,
  endOfWeek,
  format,
  isWithinInterval,
  eachDayOfInterval,
  eachWeekOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ExpenseChart({ expenses }) {
  // Generate all weeks of the current year (Monday-Sunday weeks)
  const allWeeks = eachWeekOfInterval(
    {
      start: startOfWeek(startOfYear(new Date()), { weekStartsOn: 1 }),
      end: endOfWeek(endOfYear(new Date()), { weekStartsOn: 1 }),
    },
    { weekStartsOn: 1 }
  );

  // Set the default week to the most recent full Monday-Sunday week
  const defaultWeek = format(allWeeks[allWeeks.length - 2], "yyyy-MM-dd");

  // State for managing the selected week
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);

  // Get start and end dates of the selected week
  const selectedWeekStart = startOfWeek(new Date(selectedWeek), {
    weekStartsOn: 1,
  });
  const selectedWeekEnd = endOfWeek(new Date(selectedWeek), {
    weekStartsOn: 1,
  });

  // Get all days in the selected week
  const daysOfWeek = eachDayOfInterval({
    start: selectedWeekStart,
    end: selectedWeekEnd,
  });

  // Group expenses by month & weekly breakdown
  const { monthlyExpenses, weeklyTotal, weeklyExpenses } = useMemo(() => {
    const groupedMonths = {};
    let weeklyTotal = 0;
    const groupedDays = {};

    // Initialize weekly data structure with zero values
    daysOfWeek.forEach((day) => {
      groupedDays[format(day, "EEEE")] = 0;
    });

    expenses.forEach(({ date, amount }) => {
      const expenseDate = new Date(date);
      const month = format(expenseDate, "MMMM yyyy");
      const dayOfWeek = format(expenseDate, "EEEE");

      // Group by month
      if (!groupedMonths[month]) {
        groupedMonths[month] = 0;
      }
      groupedMonths[month] += parseFloat(amount);

      // Group by selected week
      if (
        isWithinInterval(expenseDate, {
          start: selectedWeekStart,
          end: selectedWeekEnd,
        })
      ) {
        weeklyTotal += parseFloat(amount);
        if (groupedDays[dayOfWeek] !== undefined) {
          groupedDays[dayOfWeek] += parseFloat(amount);
        }
      }
    });

    return {
      monthlyExpenses: Object.entries(groupedMonths).map(([month, total]) => ({
        name: month,
        value: total,
      })),
      weeklyTotal,
      weeklyExpenses: Object.entries(groupedDays).map(([day, value]) => ({
        name: day,
        value,
      })),
    };
  }, [expenses, selectedWeek]);

  // Colors for charts
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-8 px-4">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-4">Monthly Expenses</h2>

        {/* Show "No Data" if no expenses exist */}
        {monthlyExpenses.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No data available
          </div>
        ) : (
          <ResponsiveContainer className="-ml-2" width="110%" height={350}>
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
                style={{ overflow: "visible", wordWrap: "break-word" }}
              >
                {monthlyExpenses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  overflow: "visible",
                  wordWrap: "break-word",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Week Selector */}
      <div className="w-full max-w-xs mx-auto">
        <h2 className="text-xl font-bold text-center mb-4">Weekly Expenses</h2>
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a week" />
          </SelectTrigger>
          <SelectContent>
            {allWeeks.map((weekStart) => {
              const weekLabel = `${format(weekStart, "MMM dd")} - ${format(
                endOfWeek(weekStart, { weekStartsOn: 1 }),
                "MMM dd"
              )}`;
              return (
                <SelectItem
                  key={weekStart}
                  value={format(weekStart, "yyyy-MM-dd")}
                >
                  {weekLabel}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Weekly Expense Bar Chart */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        {weeklyExpenses.every((expense) => expense.value === 0) ? (
          <div className="text-center text-gray-500 text-sm">
            No expenses for this week
          </div>
        ) : (
          <ResponsiveContainer className="-ml-4" width="100%" height={300}>
            <BarChart data={weeklyExpenses} margin={{ left: 10, right: 10 }}>
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                  overflow: "visible",
                  wordWrap: "break-word",
                }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
