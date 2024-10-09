import { Carousel, images } from "./components/Carousel";
import { FileDropzone } from "./components/FileDropzone";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 dark:bg-gray-800">
      <TopBar/>
      <div className="mt-20 flex flex-col items-center p-5">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Payment-Powered Website Crawling
        </h1>
        <h4 className="text-2xl font-normal dark:text-white">
          Pay a crawling AI agent to access payment-restricted web pages.
        </h4>
        </div>
        <Carousel images={images} />
      <FileDropzone /> {/* Integrate the FileDropzone component here */}
    </main>
  );
}
