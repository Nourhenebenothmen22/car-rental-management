from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.car_schema import CarCreate, CarResponse, CarUpdate
from app.services import car_service
from app.core.utils import save_upload_file

router = APIRouter(
    prefix="/cars",
    tags=["cars"]
)

@router.get("/", response_model=List[CarResponse])
def read_cars(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cars = car_service.get_cars(db, skip=skip, limit=limit)
    return cars

@router.get("/{car_id}", response_model=CarResponse)
def read_car(car_id: int, db: Session = Depends(get_db)):
    db_car = car_service.get_car(db, car_id=car_id)
    if db_car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@router.post("/", response_model=CarResponse, status_code=status.HTTP_201_CREATED)
async def create_new_car(
    brand: str = Form(...),
    model: str = Form(...),
    year: int = Form(...),
    category: str = Form(...),
    seating_capacity: int = Form(4),
    fuel_type: Optional[str] = Form(None),
    transmission: Optional[str] = Form(None),
    price_per_day: float = Form(...),
    location: str = Form(...),
    description: Optional[str] = Form(None),
    owner_id: int = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    image_url = None
    if image:
        image_url = save_upload_file(image)
        
    car_data = CarCreate(
        brand=brand,
        model=model,
        year=year,
        category=category,
        seating_capacity=seating_capacity,
        fuel_type=fuel_type,
        transmission=transmission,
        price_per_day=price_per_day,
        location=location,
        description=description,
        owner_id=owner_id,
        image=image_url
    )
    return car_service.create_car(db=db, car=car_data)

@router.put("/{car_id}", response_model=CarResponse)
async def update_existing_car(
    car_id: int,
    brand: Optional[str] = Form(None),
    model: Optional[str] = Form(None),
    year: Optional[int] = Form(None),
    category: Optional[str] = Form(None),
    seating_capacity: Optional[int] = Form(None),
    fuel_type: Optional[str] = Form(None),
    transmission: Optional[str] = Form(None),
    price_per_day: Optional[float] = Form(None),
    location: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    is_available: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    image_url = None
    if image:
        image_url = save_upload_file(image)
        
    car_update = CarUpdate(
        brand=brand,
        model=model,
        year=year,
        category=category,
        seating_capacity=seating_capacity,
        fuel_type=fuel_type,
        transmission=transmission,
        price_per_day=price_per_day,
        location=location,
        description=description,
        is_available=is_available,
        image=image_url
    )
    
    db_car = car_service.update_car(db=db, car_id=car_id, car_update=car_update)
    if db_car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@router.delete("/{car_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_car(car_id: int, db: Session = Depends(get_db)):
    success = car_service.delete_car(db=db, car_id=car_id)
    if not success:
        raise HTTPException(status_code=404, detail="Car not found")
    return None

@router.get("/owner/{owner_id}", response_model=List[CarResponse])
def read_owner_cars(owner_id: int, db: Session = Depends(get_db)):
    return car_service.get_owner_cars(db, owner_id=owner_id)
