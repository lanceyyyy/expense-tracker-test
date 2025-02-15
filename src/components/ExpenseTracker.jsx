"use client";

import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import ExpenseGraph from "./ExpenseGraph";
import ExpenseCards from "./ExpenseCards";

export default function ExpenseTracker() {
  //State to store the array of expenses
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage to expenses state when the component mounts
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      try {
        const parsedExpenses = JSON.parse(storedExpenses);
        if (Array.isArray(parsedExpenses)) {
          setExpenses(parsedExpenses); // Set the expenses state
        }
      } catch (error) {
        console.error("Error parsing localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 p-6">
      {/* Left side of the screen on desktop, composes of form and table */}
      <div className="lg:w-2/3 space-y-4">
        <div className="p-6 bg-white dark:bg-[#1F2937] shadow-xl rounded-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold my-2">Add New Expense</h2>
          <ExpenseForm
            onSubmit={(expense) => setExpenses([...expenses, expense])}
          />
        </div>

        <div className="p-6 bg-white dark:bg-[#1F2937] shadow-xl rounded-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold my-2">Recent Expenses</h2>
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
        </div>
      </div>
      {/* Right side of the screen on desktop */}
      <div className="lg:w-1/3 w-full h-full gap-4 flex flex-col">
        <div className="w-full">
          <ExpenseCards expenses={expenses} />
        </div>
        <div className="p-6 h-full bg-white dark:bg-[#1F2937]  shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
          <ExpenseGraph expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
