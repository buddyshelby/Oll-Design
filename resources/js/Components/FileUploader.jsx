import React, { useState } from "react";

// CSS styles for FileUploader
const fileUploaderStyles = `
  .file-uploader {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }

  .file-list {
    list-style: none;
    padding: 0;
  }

  .file-list li {
    margin-bottom: 10px;
  }

  .file-list li button {
    margin-left: 5px;
    cursor: pointer;
    background: none;
    border: none;
    color: #0079c1;
  }

  .file-list li button:hover {
    text-decoration: underline;
  }

  .file-input {
    display: none;
  }
`;

const FileUploader = ({ onFilesSelected }) => {
    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...newFiles]);
        onFilesSelected([...files, ...newFiles]);
    };

    const handleRemove = (index, e) => {
        e.stopPropagation(); // Prevent click event from propagating to the parent element (file input)
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        onFilesSelected(newFiles);
    };

    const handleFileInputChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles([...files, ...newFiles]);
        onFilesSelected([...files, ...newFiles]);
    };

    const openFileDialog = () => {
        document.getElementById("file-input").click();
    };

    return (
        <>
            <style>{fileUploaderStyles}</style>
            <div
                className="file-uploader"
                onClick={openFileDialog}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <p>
                    Drag and drop files here, or{" "}
                    <span style={{ color: "#0079c1" }}>
                        click to select files
                    </span>
                </p>
                <input
                    id="file-input"
                    className="file-input"
                    type="file"
                    onChange={handleFileInputChange}
                    multiple // Add this attribute to allow selecting multiple files
                />
                <ul className="file-list">
                    {files.map((file, index) => (
                        <li key={index}>
                            {file.name} - {file.size} bytes
                            <button onClick={(e) => handleRemove(index, e)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FileUploader;
