import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ originalImage, setMaskImage, brushSize, setimageId }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin images
    img.src = `http://127.0.0.1:8000/${originalImage}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clean up
    };
  }, [originalImage]);
  

  const startDrawing = (e) => {
    setDrawing(true);
  
    // Draw the first dot at the position where mouse is pressed
    draw(e);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };
  
  const draw = (e) => {
    if (!drawing) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    // Get canvas position and calculate cursor position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // Draw a circle at the cursor position (brush effect)
    ctx.fillStyle = "gray"; // Color for the mask
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2); // Brush size and shape
    ctx.fill();
  };

  const saveMaskToBackend = async () => {
    const canvas = canvasRef.current;
    const maskDataURL = canvas.toDataURL("image/png");
    setMaskImage(maskDataURL);
  
    // Convert base64 to Blob for uploading as a file
    const base64 = maskDataURL.split(",")[1]; // Remove the `data:image/png;base64,` part
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    const maskBlob = new Blob([new Uint8Array(array)], { type: "image/png" });
  
    const formData = new FormData();
    formData.append("mask", maskBlob); // Send the mask as a file
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/save-mask/`, {
        method: "POST",
        body: formData, // Use FormData to send the file
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Mask saved successfully!", data);
      } else {
        console.error("Failed to save the mask:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving the mask:", error);
    }
  };
  
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-gray-300"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      ></canvas>
      <button
        onClick={saveMaskToBackend}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Mask
      </button>
    </div>
  );
};

export default Canvas;
