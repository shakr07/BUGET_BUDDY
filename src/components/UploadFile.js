import React from 'react'
import axios from "axios";
import './UploadFile.css'; // Import the CSS file for styling

function UploadFile() {
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const selectedFile = event.target.uploadfile.files[0]; // Get the selected file
    
        if (!selectedFile) {
          alert("Please select a file to upload");
          return;
        }
    
        if (!/\.(xls|xlsx)$/i.test(selectedFile.name)) {
          alert("Please upload a valid Excel file (.xls or .xlsx).");
          return;
        }
        
        const formData = new FormData();
        formData.append("uploadfile", selectedFile); 
        const user_id = JSON.parse(localStorage.getItem("user"));
        formData.append("user_id", user_id._id);

        axios
          .post("http://localhost:8080/uploads", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("File uploaded successfully:", response.data);
            alert("File uploaded successfully!");
            event.target.uploadfile.value = ""; // Clear file input
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please try again.");
          });
    };

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <input
                    type="file"
                    name="uploadfile"
                    accept=".xlsx, .xls"
                    className="file-input"
                />
                <p style={{ "font-size": "12px"}}>Put the transaction by uploading the sheet</p>
                <input type="submit" value="Upload Excel" className="submit-btn" />
            </form>
        </div>
    )
}

export default UploadFile;
