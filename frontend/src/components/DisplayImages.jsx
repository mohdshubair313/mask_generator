import React from "react";

const DisplayImages = ({ originalImage, maskImage }) => {
  return (
    <div className="mt-6 flex gap-4">
      {originalImage ? (
        <div>
          <h2 className="text-lg font-medium mb-2">Original Image</h2>
          <img
            src={`http://127.0.0.1:8000/${originalImage}`}
            alt="Original"
            className="w-64 h-64 object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <p>No original image available.</p>
      )}
      {maskImage ? (
        <div>
          <h2 className="text-lg font-medium mb-2">Mask Image</h2>
          <img src={maskImage} alt="Mask" className="w-64 h-64 object-cover" loading="lazy" />
        </div>
      ) : (
        <p>No mask image available.</p>
      )}
    </div>
  );
};

export default DisplayImages;
