import ExpenseTracker from "@/components/ExpenseTracker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IoWalletOutline } from "react-icons/io5";

export default function Home() {
  return (
    <main className="w-full">
      <nav className="w-full flex flex-row justify-around items-center dark:bg-[#312E81]  bg-white px-4 md:px-8 shadow-md">
        <h1 className="w-full flex flex-row items-center gap-2 text-xl font-bold drop-shadow-lg py-4">
          <span>
            <IoWalletOutline className="h-8 w-8 text-purple-500" />
          </span>
          ExpenseTracker
        </h1>

        <div className="">
          <ThemeToggle />
        </div>
      </nav>

      <ExpenseTracker />
    </main>
  );
}
