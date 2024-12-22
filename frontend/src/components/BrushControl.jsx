import React from "react";

const BrushControls = ({ setBrushSize }) => {
  return (
    <div className="my-4">
      <label className="block text-gray-700 font-medium mb-2">Brush Size</label>
      <input
        type="range"
        min="1"
        max="50"
        defaultValue="5"
        onChange={(e) => setBrushSize(Number(e.target.value))}
        className="w-full"
      />
      <p className="text-gray-500 mt-2">set Brush size</p>
    </div>
  );
};

export default BrushControls;
