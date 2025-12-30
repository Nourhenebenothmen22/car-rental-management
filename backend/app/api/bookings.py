from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.booking_schema import BookingCreate, BookingResponse, BookingUpdate
from app.services import booking_service

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"]
)

@router.get("/", response_model=List[BookingResponse])
def read_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings = booking_service.get_bookings(db, skip=skip, limit=limit)
    return bookings

@router.get("/{booking_id}", response_model=BookingResponse)
def read_booking(booking_id: int, db: Session = Depends(get_db)):
    db_booking = booking_service.get_booking(db, booking_id=booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_new_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    return booking_service.create_booking(db=db, booking=booking)

@router.put("/{booking_id}", response_model=BookingResponse)
def update_existing_booking(booking_id: int, booking_update: BookingUpdate, db: Session = Depends(get_db)):
    db_booking = booking_service.update_booking(db, booking_id=booking_id, booking_update=booking_update)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@router.delete("/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_booking(booking_id: int, db: Session = Depends(get_db)):
    success = booking_service.delete_booking(db, booking_id=booking_id)
    if not success:
        raise HTTPException(status_code=404, detail="Booking not found")
    return None

@router.get("/user/{user_id}", response_model=List[BookingResponse])
def read_user_bookings(user_id: int, db: Session = Depends(get_db)):
    return booking_service.get_user_bookings(db, user_id=user_id)

@router.get("/owner/{owner_id}", response_model=List[BookingResponse])
def read_owner_bookings(owner_id: int, db: Session = Depends(get_db)):
    return booking_service.get_owner_bookings(db, owner_id=owner_id)
