import { FileDropzone } from "./components/FileDropzone";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800">
      <TopBar />
      <div className="relative w-full h-[400px]">
        <img
          src="/skier-banner-strip.svg"
          alt="Skier Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            AI-Powered Skier Detection
          </h1>
          <h4 className="text-2xl font-normal text-white">
            Upload any video and see the YOLOv8-trained model identify skiers with precision and speed.
          </h4>
        </div>
      </div>
      
      <FileDropzone />
    </main>
  );
}
