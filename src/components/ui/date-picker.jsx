"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ setDate, value, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-between border-b rounded-none border-gray-300 bg-transparent px-4 py-2 shadow-none focus:border-purple-500 transition-all",
            !value && "text-gray-500"
          )}
        >
          <div className="flex items-center ">
            {/* <CalendarIcon className="w-5 h-5 text-blue-500" /> */}
            {value ? (
              format(value, "PPP")
            ) : (
              <span className="text-gray-300">Pick a date</span>
            )}
          </div>
          {value && (
            <X
              className="w-4 h-4 text-gray-400 hover:text-red-500 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setDate(null);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-lg border border-gray-200 shadow-lg bg-white">
        <Calendar
          {...props}
          mode="single"
          selected={value}
          onSelect={(date) => {
            setDate(date);
            setOpen(false); // Close popover on selection
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
