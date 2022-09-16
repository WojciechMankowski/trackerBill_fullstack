from fastapi import FastAPI
from database import  engine
import model
app = FastAPI()
model.Base.metadata.create_all(bind=engine)
# uvicorn main:app --reload
# points API
# /users
# /bills
# /history
# /category
# /add/user
# /add/bill
# /add/category

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
