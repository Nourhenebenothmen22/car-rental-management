from sqlalchemy.orm import Session
from app.models.models import Car
from app.schemas.car_schema import CarCreate, CarUpdate

def get_cars(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Car).offset(skip).limit(limit).all()

def get_car(db: Session, car_id: int):
    return db.query(Car).filter(Car.id == car_id).first()

def get_owner_cars(db: Session, owner_id: int):
    return db.query(Car).filter(Car.owner_id == owner_id).all()

def create_car(db: Session, car: CarCreate):
    db_car = Car(**car.model_dump())
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

def update_car(db: Session, car_id: int, car_update: CarUpdate):
    db_car = get_car(db, car_id)
    if not db_car:
        return None
    
    update_data = car_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_car, key, value)
    
    db.commit()
    db.refresh(db_car)
    return db_car

def delete_car(db: Session, car_id: int):
    db_car = get_car(db, car_id)
    if db_car:
        db.delete(db_car)
        db.commit()
        return True
    return False
