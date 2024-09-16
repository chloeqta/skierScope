import { DarkThemeToggle } from "flowbite-react";
import { FileDropzone } from "./components/FileDropzone"; // Adjust the path based on your folder structure

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">SpotSkier</h1>
      <DarkThemeToggle />
      <FileDropzone /> {/* Integrate the FileDropzone component here */}
    </main>
  );
}
