"use client";

import { DarkThemeToggle } from "flowbite-react";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-black p-2 text-white dark:bg-gray-200 dark:text-black z-50">
      <h1 className="ml-2 text-2xl font-bold text-gray-300 dark:text-gray-600">
        SkierScope
      </h1>
      <div className="ml-auto flex items-center">
        <DarkThemeToggle/>
      </div>
    </div>
  );
}
