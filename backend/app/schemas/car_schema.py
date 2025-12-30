from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class CarBase(BaseModel):
    brand: str
    model: str
    year: int
    category: str
    seating_capacity: int = 4
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    price_per_day: float
    location: str
    description: Optional[str] = None
    image: Optional[str] = None
    is_available: bool = True

class CarCreate(CarBase):
    owner_id: int

class CarUpdate(BaseModel):
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    category: Optional[str] = None
    seating_capacity: Optional[int] = None
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    price_per_day: Optional[float] = None
    location: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    is_available: Optional[bool] = None

class CarResponse(CarBase):
    id: int
    owner_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
