from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

print(f"Testing connection to: {DATABASE_URL}")
try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        result = connection.execute(text("SHOW TABLES;"))
        tables = [row[0] for row in result]
        print(f"Tables found: {tables}")
        print("Database connection is perfectly fine!")
except Exception as e:
    print(f"Connection failed: {e}")
