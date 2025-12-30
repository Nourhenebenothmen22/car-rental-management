from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models import models
from app.core.security import hex_hash_password
from datetime import datetime, timedelta

def seed():
    # Create tables if they don't exist
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Create Owners/Users
        owner_email = "owner@example.com"
        db_owner = db.query(models.User).filter(models.User.email == owner_email).first()
        if not db_owner:
            db_owner = models.User(
                name="John Owner",
                email=owner_email,
                password=hex_hash_password("password123"),
                role="owner"
            )
            db.add(db_owner)
            db.commit()
            db.refresh(db_owner)
            print(f"Created owner: {owner_email}")

        user_email = "user@example.com"
        db_user = db.query(models.User).filter(models.User.email == user_email).first()
        if not db_user:
            db_user = models.User(
                name="Alice User",
                email=user_email,
                password=hex_hash_password("password123"),
                role="user"
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            print(f"Created user: {user_email}")

        # 2. Create Cars
        if db.query(models.Car).count() == 0:
            cars_data = [
                {
                    "brand": "Tesla",
                    "model": "Model 3",
                    "year": 2023,
                    "category": "Electric",
                    "seating_capacity": 5,
                    "fuel_type": "Electric",
                    "transmission": "Automatic",
                    "price_per_day": 150.0,
                    "location": "Paris",
                    "description": "Powerful and sleek electric car.",
                    "owner_id": db_owner.id
                },
                {
                    "brand": "BMW",
                    "model": "X5",
                    "year": 2022,
                    "category": "SUV",
                    "seating_capacity": 7,
                    "fuel_type": "Diesel",
                    "transmission": "Automatic",
                    "price_per_day": 120.0,
                    "location": "Lyon",
                    "description": "Luxury SUV for family trips.",
                    "owner_id": db_owner.id
                }
            ]
            for car_info in cars_data:
                db_car = models.Car(**car_info)
                db.add(db_car)
            db.commit()
            print("Created sample cars")

        # 3. Create a test booking
        if db.query(models.Booking).count() == 0:
            car = db.query(models.Car).first()
            if car:
                booking = models.Booking(
                    car_id=car.id,
                    user_id=db_user.id,
                    owner_id=db_owner.id,
                    pickup_date=datetime.now() + timedelta(days=1),
                    return_date=datetime.now() + timedelta(days=3),
                    total_price=car.price_per_day * 2,
                    status="confirmed"
                )
                db.add(booking)
                db.commit()
                print("Created sample booking")

    finally:
        db.close()

if __name__ == "__main__":
    print("Seeding database...")
    seed()
    print("Done!")
