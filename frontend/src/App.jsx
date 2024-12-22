import React, { useState, useEffect } from "react";
import BrushControls from "./components/BrushControl";
import Canvas from "./components/Canvas";
import DisplayImages from "./components/DisplayImages";
import ImageUpload from "./components/ImageUpload";

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [brushSize, setBrushSize] = useState(5); // State for brush size
  const [imageId, setimageId] = useState(1);

  useEffect(() => {
    console.log("Original Image Updated:", originalImage);
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Image Masking App</h1>
      <ImageUpload setOriginalImage={setOriginalImage} />
      {originalImage ? (
        <>
          <Canvas 
            originalImage={originalImage} 
            setMaskImage={setMaskImage} 
            brushSize={brushSize} // Pass brush size to Canvas
            imageId={setimageId}
          />
          <BrushControls setBrushSize={setBrushSize} /> {/* Pass setBrushSize */}
        </>
      ) : (
        <p className="text-gray-600 mt-4">Please upload an image to start editing.</p>
      )}
      <DisplayImages originalImage={originalImage} maskImage={maskImage} />
    </div>
  );
};

export default App;
