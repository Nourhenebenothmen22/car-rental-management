from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

from app.schemas.car_schema import CarResponse

class BookingBase(BaseModel):
    car_id: int
    pickup_date: datetime
    return_date: datetime
    total_price: float
    status: Optional[str] = "pending"

class BookingCreate(BookingBase):
    user_id: int
    owner_id: int

class BookingUpdate(BaseModel):
    status: Optional[str] = None
    pickup_date: Optional[datetime] = None
    return_date: Optional[datetime] = None
    total_price: Optional[float] = None

class BookingResponse(BookingBase):
    id: int
    user_id: int
    owner_id: int
    created_at: datetime
    
    car: Optional[CarResponse] = None

    model_config = ConfigDict(from_attributes=True)
