"use client";

import { useState, useMemo, useCallback, useLayoutEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import useWidthSize from "@/hooks/useWidthSize";

export default function ExpenseTable({ expenses, setExpenses }) {
  //State for sorting: default is by date in descending order
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  //States for filters
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [monthYearFilter, setMonthYearFilter] = useState("");

  //Get the width of the screen
  const width = useWidthSize();

  //Filter expenses based on month and year
  const filteredData = useMemo(() => {
    if (!monthYearFilter || monthYearFilter === "all") return expenses;
    const [year, month] = monthYearFilter.split("-");
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === Number.parseInt(year) &&
        expenseDate.getMonth() === Number.parseInt(month) - 1
      );
    });
  }, [expenses, monthYearFilter]);

  //Create a table instance
  const table = useReactTable({
    data: filteredData,
    columns: [], // Define columns later
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // ✅ Enables pagination
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  //Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: () => (
          <button
            onClick={() =>
              setSorting((prev) => [{ id: "date", desc: !prev[0]?.desc }])
            }
            className="flex items-center space-x-2 font-bold"
          >
            <span>DATE</span>
            {sorting[0]?.desc ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        ),
        cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
      },
      {
        accessorKey: "description",
        header: "DESCRIPTION",
        cell: ({ row }) => (
          <>
            <div className="font-medium">{row.getValue("description")}</div>
            <span className="block md:hidden text-xs">
              Amount: {row.getValue("amount")}
            </span>
            <span className="block md:hidden text-xs">
              Date: {new Date(row.getValue("date")).toLocaleDateString()}
            </span>
          </>
        ),
      },
      {
        accessorKey: "amount",
        header: "AMOUNT",
        cell: ({ row }) => {
          const amount = Number.parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(amount);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        id: "actions",
        header: () => <span className="flex justify-end pr-4">ACTIONS</span>,
        cell: ({ row }) => {
          const expense = row.original;
          return (
            <div className="flex justify-end space-x-2">
              {/* Edit Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-purple-500 hover:text-white hover:bg-purple-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                  </DialogHeader>
                  <ExpenseForm
                    expense={expense}
                    onSubmit={(updatedExpense) => {
                      // Update the expense
                      setExpenses((prevExpenses) => {
                        const updatedExpenses = prevExpenses.map((expense) =>
                          expense.id === updatedExpense.id
                            ? updatedExpense
                            : expense
                        );

                        //Apply sorting after update
                        const sortedExpenses = [...updatedExpenses].sort(
                          (a, b) =>
                            sorting[0]?.desc
                              ? new Date(b.date) - new Date(a.date)
                              : new Date(a.date) - new Date(b.date)
                        );

                        //Save to localStorage
                        localStorage.setItem(
                          "expenses",
                          JSON.stringify(sortedExpenses)
                        );
                        return sortedExpenses;
                      });

                      //RESET pagination to first page
                      table.setPageIndex(0);
                    }}
                  />
                </DialogContent>
              </Dialog>

              {/* Delete Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-white hover:bg-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the expense.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        // Delete the expense
                        setExpenses((prevExpenses) => {
                          const updatedExpenses = prevExpenses.filter(
                            (exp) => exp.id !== expense.id
                          );
                          //Save to localStorage
                          localStorage.setItem(
                            "expenses",
                            JSON.stringify(updatedExpenses)
                          );
                          return updatedExpenses;
                        });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        },
      },
    ],
    [sorting, table]
  );

  //Handle column visibility based on screen width
  const handleWidthChange = useCallback(
    (width) => {
      if (width < 768) {
        table.getColumn("date")?.toggleVisibility(false);
        table.getColumn("amount")?.toggleVisibility(false);
      } else {
        table.getColumn("date")?.toggleVisibility(true);
        table.getColumn("amount")?.toggleVisibility(true);
      }
    },
    [table]
  );

  //Update table columns
  useLayoutEffect(() => {
    setTimeout(() => handleWidthChange(width), 200);
  }, [width, handleWidthChange]);

  //Update table columns when screen width changes
  table.setOptions((prev) => ({ ...prev, columns }));

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-end gap-8 justify-between py-4">
        {/* Search and filter controls */}
        <Input
          placeholder="Search expenses..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="w-full"
        />
        <Select value={monthYearFilter} onValueChange={setMonthYearFilter}>
          <SelectTrigger className="w-full md:w-[400px]">
            <SelectValue placeholder="Filter by month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            {expenses
              .map((expense) => {
                const date = new Date(expense.date);
                return `${date.getFullYear()}-${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}`;
              })
              .filter((value, index, self) => self.indexOf(value) === index)
              .sort()
              .reverse()
              .map((option) => (
                <SelectItem key={option} value={option}>
                  {new Date(option).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-300 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-800 hover:shadow-md"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
