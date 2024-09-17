"use client";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export function FileDropzone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      console.log("Sending video to backend: ", selectedFile)
      const response = await axios.post(
        "http://127.0.0.1:5000/process_video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: 'blob',
        },
      );
      
      console.log("Video processed successfully:", response.data);
      console.log("Response data: ", response.data)

      const url = URL.createObjectURL(response.data);
      setProcessedVideoUrl(url);
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Label
          htmlFor="file-upload"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">MP4 only</p>
          </div>
          <FileInput
            id="file-upload"
            onChange={handleFileChange}
            accept="video/mp4"
          />
        </Label>
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Upload and Process Video
        </button>
      </form>
      {processedVideoUrl && (
        <div className="mt-4">
          <video width="600" controls>
            <source src={processedVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <a href={processedVideoUrl} download className="block mt-2 text-blue-500 hover:underline">
            Download Processed Video
          </a>
        </div>
      )}
    </div>
  );
}
