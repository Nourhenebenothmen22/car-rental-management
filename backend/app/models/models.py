from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="user") # 'user' or 'owner'
    image = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cars = relationship("Car", back_populates="owner")
    bookings = relationship("Booking", back_populates="user")

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    brand = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)
    year = Column(Integer, nullable=False)
    category = Column(String(50), nullable=False)
    seating_capacity = Column(Integer, default=4)
    fuel_type = Column(String(50))
    transmission = Column(String(50))
    price_per_day = Column(Float, nullable=False)
    location = Column(String(100), nullable=False)
    description = Column(Text)
    image = Column(String(255))
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="cars")
    bookings = relationship("Booking", back_populates="car")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, ForeignKey("cars.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))
    pickup_date = Column(DateTime)
    return_date = Column(DateTime)
    total_price = Column(Float)
    status = Column(String(20), default="pending") # 'pending', 'confirmed', 'cancelled'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    car = relationship("Car", back_populates="bookings")
    user = relationship("User", back_populates="bookings")
