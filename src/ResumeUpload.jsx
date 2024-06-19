import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (selectedFile && selectedFile.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "https://resume-to-json-api-2.onrender.com/get-text",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTextContent(response.data.text);
      } catch (error) {
        console.error("Error uploading or parsing PDF:", error);
        alert("Failed to upload or parse PDF file.");
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Upload Resume (PDF)</h1>
      <form onSubmit={handleFileUpload} className="flex flex-col items-center">
        <div className="flex flex-row">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-6 p-2 mr-3 bg-gray-800 border border-gray-700 rounded"
          />
          <button
            type="submit"
            className="mb-6 p-2 bg-gray-800 border border-gray-700 rounded">
            Upload
          </button>
        </div>
      </form>

      {textContent && (
        <div className="w-full max-w-4xl p-4 bg-gray-800 border border-gray-700 rounded">
          <h2 className="text-2xl font-semibold mb-4">Extracted Text</h2>
          <pre className="whitespace-pre-wrap break-words">{textContent}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
