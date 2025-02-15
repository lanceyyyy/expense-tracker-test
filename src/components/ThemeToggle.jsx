"use client";
import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Get the current theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Light Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
          {theme === "light" && (
            <Check className="ml-auto h-4 w-4 text-blue-500" />
          )}
        </DropdownMenuItem>

        {/* Dark Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
          {theme === "dark" && (
            <Check className="ml-auto h-4 w-4 text-blue-500" />
          )}
        </DropdownMenuItem>

        {/* System Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
          {theme === "system" && (
            <Check className="ml-auto h-4 w-4 text-blue-500" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
