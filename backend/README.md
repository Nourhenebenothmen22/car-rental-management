# Car Rental Management - Backend API

This is the backend API for the Car Rental Management system, built with **FastAPI**, **SQLAlchemy**, and **MySQL**. It handles user authentication, car management, booking processes, and image uploads.

## 🚀 Technologies Used

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: MySQL / MariaDB
- **Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Pydantic v2

## 📋 Prerequisites

- Python 3.9+
- MySQL Server
- `pip` or `pipenv`

## 🛠️ Installation & Setup

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd car-rental-management/backend
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/scripts/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory and add your configuration:

   ```env
   DATABASE_URL=mysql+pymysql://user:password@localhost/car_rental_db
   SECRET_KEY=your_super_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=43200
   ```

5. **Run database migrations**:
   ```bash
   alembic upgrade head
   ```

## 🏃 Running the Application

Start the development server using Uvicorn:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## 📖 API Documentation

Once the server is running, you can access the interactive documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🛣️ API Endpoints Overview

### Users & Auth

- `POST /users/register` - Create account
- `POST /users/login` - Get access token
- `GET /users/{id}` - Get profile

### Cars

- `GET /cars/` - List all cars
- `POST /cars/` - Add a car (multipart/form-data)
- `GET /cars/{id}` - Car details
- `PUT /cars/{id}` - Update car
- `DELETE /cars/{id}` - Remove car

### Bookings

- `GET /bookings/` - List bookings
- `POST /bookings/` - Create booking
- `GET /bookings/user/{user_id}` - My bookings

### Uploads

- `POST /uploads/` - Single image upload
- `POST /uploads/multiple` - Multiple images upload

## 📁 Project Structure

```text
backend/
├── alembic/          # Database migration files
├── app/
│   ├── api/          # Route handlers (controllers)
│   ├── core/         # Config, security, database setup
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic validation schemas
│   ├── services/     # Business logic
│   └── main.py       # FastAPI entry point
├── uploads/          # Local storage for images
└── requirements.txt  # Python dependencies
```
