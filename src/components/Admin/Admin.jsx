import axios from "axios";
import { useState } from "react";

const Admin = () => {
  const [pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState("");

  const submitPdf = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("fileName", fileName); // Add the custom file name

    addPdfApi(formData);
  };

  const addPdfApi = async (formData) => {
    try {
      await axios
        .post("http://18.205.22.41/api/create", formData)
        .then((res) => {
          console.log(res);
          alert("PDF added successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <div className="text-xl font-semibold mb-4 text-center">Upload PDF with Custom File Name</div>
      <form onSubmit={(e) => submitPdf(e)} className="space-y-4">
        <div>
          <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">Choose PDF file</label>
          <input
            id="pdf"
            type="file"
            onChange={(e) => setPdf(e.target.files[0])}
            accept=".pdf"
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">Enter Custom File Name</label>
          <input
            id="fileName"
            type="text"
            placeholder="Enter custom file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Upload PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
