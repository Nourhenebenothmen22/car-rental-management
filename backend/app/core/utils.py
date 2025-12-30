import os
import shutil
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "uploads"

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def save_upload_file(file: UploadFile) -> str:
    """
    Saves an uploaded file to the UPLOAD_DIR and returns its relative URL.
    """
    if not file or not file.filename:
        return None
        
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return f"/uploads/{unique_filename}"
