# Mask Generator 🎨

This project is a web-based tool that allows users to upload an image, draw a mask over the image, and save it. It is useful for tasks like image inpainting or creating custom masks for computer vision applications.

## 🚀 Features
- **Image Upload**: Users can upload an image to the canvas.
- **Brush Tool**: Draw masks using a customizable brush size.
- **Save Mask**: Export and save the mask image.
- **Backend Integration**: Save masks to the server.

## 🛠️ Libraries and Tools Used

### Frontend
- **React.js**: Frontend framework for building the UI.
- **CSS**: For styling the application.
- **Canvas API**: To draw masks on the uploaded image.

### Backend
- **FastAPI**: Python-based framework for handling backend routes.
- **SQLite3**: Database to store paths of the original image and mask.
- **Uvicorn**: ASGI server for running the backend.

## 🖥️ How to Run the Project Locally

### Prerequisites
- Node.js and npm installed for the frontend.
- Python 3.9+ installed for the backend.

### 1. Clone the Repository
```bash
git clone https://github.com/mohdshubair313/mask_generator.git
cd mask_generator.

```bash
### 2. Run the Frontend
Navigate to the frontend directory:

```bash
Copy code
cd frontend
Install dependencies:

```bash
Copy code
npm install
Start the development server:

```bash
Copy code
npm start
The app will be available at http://localhost:3000.

3. Run the Backend
Navigate to the backend directory:

```bash
Copy code
cd backend
Install Python dependencies:

```bash
Copy code
pip install -r requirements.txt
Start the FastAPI server:

```bash
Copy code
uvicorn main:app --reload
The backend will be available at http://127.0.0.1:8000.
```


📂 Folder Structure
plaintext
Copy code
mask_generator/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Canvas and other UI components
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── backend/
│   ├── main.py             # FastAPI application
│   ├── database.db         # SQLite database
│   ├── models.py           # Database models
│   ├── ...
├── README.md
⚡ Future Enhancements
Add eraser functionality for masks.
Integrate brush size and color options.
Deploy using Docker for consistent development environments.
Feel free to suggest improvements or raise issues. Happy coding! 🎉

css
Copy code

This `README.md` includes all the relevant details such as project description, features, libraries used, setup instructions, folder structure, and future enhancements. It will guide anyone who wants to run your project locally or contribute to it.





