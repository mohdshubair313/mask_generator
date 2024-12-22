import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ setOriginalImage }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5 MB limit
      alert("File size must be less than 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOriginalImage(response.data.original_image_path);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Upload an Image</label>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleUpload}
        className="block w-full border border-gray-300 rounded-md p-2"
      />
      {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
