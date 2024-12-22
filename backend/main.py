import sqlite3
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Initialize FastAPI
app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory for uploaded files
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# SQLite database path
DATABASE = "metadata.db"

# Function to initialize the database
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS image_pairs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_image_path TEXT NOT NULL,
            mask_image_path TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database when the app starts
@app.on_event("startup")
async def startup_event():
    init_db()


# all the routes are defined here

@app.post("/upload")
async def upload_image(image: UploadFile = File(...)):
    try:
        # Save the uploaded image
        image_location = UPLOAD_DIR / image.filename
        with open(image_location, "wb") as f:
            f.write(await image.read())
        
        # Store the image path in the database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO image_pairs (original_image_path)
            VALUES (?)
        ''', (str(image_location),))
        conn.commit()
        image_id = cursor.lastrowid  # Get the ID of the inserted row
        conn.close()

        return {"id": image_id, "original_image_path": str(image_location)}
    except Exception as e:
        return {"error": str(e)}



    

# Ye ek POST route hai jo mask ko backend me save karne ke liye use hota hai.
# Jab user ek mask image upload karega, to ye code chalega.
@app.post("/save-mask/{image_id}")
async def save_mask(image_id: int, mask: UploadFile = File(...)):
    try:
        # Save the mask image
        mask_location = UPLOAD_DIR / f"mask_{image_id}.png"  # Save with image ID
        with open(mask_location, "wb") as f:
            f.write(await mask.read())
        
        # Update the database with the mask image path
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE image_pairs
            SET mask_image_path = ?
            WHERE id = ?
        ''', (str(mask_location), image_id))
        conn.commit()
        conn.close()

        return {"id": image_id, "mask_image_path": str(mask_location)}
    except Exception as e:
        return {"error": str(e)}



# Ye ek GET route hai jo image ko frontend me dikhane ke liye use hota hai.
@app.get("/image-pairs")
async def get_image_pairs():
    try:
        # Fetch data from the database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, original_image_path, mask_image_path
            FROM image_pairs
        ''')
        data = cursor.fetchall()
        conn.close()

        if not data:
            return {"message": "No image pairs found."}
        
        # Format the data
        image_pairs = [
            {"id": row[0], "original_image_path": row[1], "mask_image_path": row[2]}
            for row in data
        ]
        return {"image_pairs": image_pairs}

    except sqlite3.Error as db_error:
        return {"error": f"Database error: {db_error}"}
    except Exception as e:
        return {"error": str(e)}

