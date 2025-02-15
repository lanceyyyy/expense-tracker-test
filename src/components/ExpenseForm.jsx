"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./ui/date-picker";
import { DialogClose } from "./ui/dialog";

export default function ExpenseForm({ expense, onSubmit }) {
  // State variables to manage form fields
  const [description, setDescription] = useState(expense?.description || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const [date, setDate] = useState(expense?.date ? new Date(expense.date) : "");

  // Effect to update state when an existing expense is passed
  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setDate(new Date(expense.date));
    }
  }, [expense]);

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    if (description && amount && date) {
      onSubmit({
        id: expense?.id || Date.now(), // Generates a new ID if it's a new expense
        description,
        amount: Number.parseFloat(amount), // Ensures amount is stored as a number
        date,
      });

      // Clears the form fields if adding a new expense
      if (!expense) {
        setDescription("");
        setAmount("");
        setDate("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col">
      {expense ? (
        <>
          {/* Form fields for editing an expense */}
          <div className="flex flex-col w-full gap-8">
            <div className="w-full">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-8 items-end">
            <div className="flex flex-col w-full">
              <Label htmlFor="date">Date</Label>
              <DatePicker value={date} setDate={setDate} required />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Form fields for adding a new expense */}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="w-full">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8 items-end">
            <div className="flex flex-col w-full">
              <Label htmlFor="date">Date</Label>
              <DatePicker value={date} setDate={setDate} required />
            </div>
          </div>
        </>
      )}

      {/* Submit Button: Closes dialog after submitting */}
      {expense ? (
        <DialogClose asChild>
          <Button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-bold hover:bg-purple-800 transition"
          >
            {expense ? "Update Expense" : "Add Expense"}
          </Button>
        </DialogClose>
      ) : (
        <Button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded-lg font-bold hover:bg-purple-800 transition"
        >
          {expense ? "Update Expense" : "Add Expense"}
        </Button>
      )}
    </form>
  );
}
