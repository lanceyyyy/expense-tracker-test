"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

export default function ExpenseCards({ expenses }) {
  const [totalExpense, setTotalExpense] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);

  useEffect(() => {
    let total = 0;
    let monthly = 0;
    const currentMonth = format(new Date(), "yyyy-MM"); // Get current month in YYYY-MM format

    expenses.forEach(({ amount, date }) => {
      total += amount;
      const expenseMonth = format(new Date(date), "yyyy-MM");
      if (expenseMonth === currentMonth) {
        monthly += amount;
      }
    });

    setTotalExpense(total);
    setMonthlyExpense(monthly);
  }, [expenses]);

  // Function to format numbers with commas and two decimal places
  const formatAmount = (amount) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col  items-stretch w-full gap-4">
      {/* Total Expense Card */}
      <div className="w-full flex flex-row items-center justify-between bg-white dark:bg-[#1F2937] shadow-lg rounded-lg p-6 border-l-4 border-red-500">
        <div>
          <h2 className="font-semibold text-gray-700 dark:text-gray-100">
            Total Expenses
          </h2>
          <p className="font-bold text-red-500 text-3xl">
            ${formatAmount(totalExpense)}
          </p>
        </div>
        <div className="bg-red-200 p-4 rounded-full">
          <FaMoneyBillWave className="text-red-500 h-6 w-6" />
        </div>
      </div>

      {/* This Month Expense Card */}
      <div className="w-full flex flex-row items-center justify-between bg-white dark:bg-[#1F2937] shadow-lg rounded-lg p-6 border-l-4 border-green-500">
        <div>
          <h2 className="font-semibold text-gray-700 dark:text-gray-100">
            This Month
          </h2>
          <p className="font-bold text-green-500 text-3xl">
            ${formatAmount(monthlyExpense)}
          </p>
        </div>
        <div className="bg-green-200 p-4 rounded-full">
          <FaCalendarAlt className="text-green-500 h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
