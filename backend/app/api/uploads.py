import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List

from app.core.utils import save_upload_file

router = APIRouter(
    prefix="/uploads",
    tags=["uploads"]
)

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    url = save_upload_file(file)
    if not url:
        raise HTTPException(status_code=500, detail="Could not save file")
        
    return {"url": url}

@router.post("/multiple")
async def upload_multiple_images(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        if not file.content_type.startswith("image/"):
            continue
            
        url = save_upload_file(file)
        if url:
            results.append(url)
            
    return {"urls": results}
