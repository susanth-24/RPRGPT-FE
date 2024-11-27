import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Get the selected file
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // Append the file to the form data

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });
            setMessage("File uploaded successfully! URL: " + response.data.fileUrl);
        } catch (error) {
            setMessage("Error uploading file: " + error.message);
        }
    };

    return (
        <div>
            <h1>Upload PDF</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default Admin;
