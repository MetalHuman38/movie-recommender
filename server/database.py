from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from sqlalchemy import URL

load_dotenv()

url_object = URL.create(
    drivername="postgresql",
    username=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=os.getenv("POSTGRES_PORT"),
    database=os.getenv("POSTGRES_DB"),
)

DB_URL = os.getenv("DB_URL")

# ✅ Create Engine
engine = create_engine(url_object)
print("Database connection established.", engine)

# ✅ Create Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Create Base Model
Base = declarative_base()


# ✅ Dependency: Get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
