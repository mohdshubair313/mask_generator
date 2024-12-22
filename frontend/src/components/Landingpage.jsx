import React, { useRef, useState } from 'react'

const Landingpage = () => {
    const [image, setimage] = useState(null);
    const canvasRef = useRef(null);

    const handleFileImage = (e) => {
        const file = e.target.files[0];  // taking the uploaded file in Image format

        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result;
                image.onload = () => {
                    setimage(image);
                };
            };
            reader.readAsDataURL(file);
        }
    }

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        setimage(null); // Reset the image state
      };

    const drawImageonCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        if (image) {
            // clear canvas first 

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // drawing the image

            ctx.drawImage(image, 0 , 0 , canvas.width, canvas.height)
        }
    };

    // automatically draw image when it changes
    React.useEffect(() => {
        drawImageonCanvas();
    },[image]);

  return (
    <div>
        <h2 className="mt-44">Upload the file in the form of image</h2>
        
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path strokeWidth="currentColor" strokewidth-linecap="round" strokewidth-linejoin="round" strokwidstrokewidthe-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input accept="image/*" id="dropzone-file" type="file" className="hidden" onChange={handleFileImage} />
    </label>

    {/* Canvas for rendering the image */}
      <canvas ref={canvasRef} width={500} height={500} style={{ border: "1px solid black" }} />
    </div> 
    {image && (
    <button className='mt-10 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' onClick={handleClearCanvas}>Remove the image</button>
    )}
    </div>
  )
}

export default Landingpage