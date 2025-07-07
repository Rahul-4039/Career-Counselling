import React, { useState } from 'react';
import '../styles/UploadReceipt.css';

const UploadReceipt = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreviewURL(URL.createObjectURL(selected));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDone = () => {
    if (!file) {
      alert("⚠️ Please upload your receipt first.");
      return;
    }

    // Simulate upload (you can send to backend here if needed)
    alert("🕒 Receipt received! Your premium account will be activated within 1 hour.");
    window.location.href = '/'; // Redirect to home or any other page
  };

  return (
    <div className="upload-receipt-container">
      <h2>📤 Upload Payment Receipt</h2>
      <p>Please upload a screenshot or image of your payment receipt for verification.</p>

      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="receiptUpload"
          style={{ display: 'none' }}
        />
        <label htmlFor="receiptUpload" className="upload-label">
          {file ? "Change Receipt" : "Choose Receipt"}
        </label>

        {previewURL && (
          <div className="preview">
            <img src={previewURL} alt="Receipt Preview" />
          </div>
        )}
      </div>

      <button className="done-btn" onClick={handleDone}>✅ Done</button>
    </div>
  );
};

export default UploadReceipt;
