from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from Helpers import getUsers, getBills, addUser, addBill, addBillToHistory, getHistory
from API.Schema import UserSchema, BillSchema, HistorySchema
from API.database import session, Base, engine


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

# Base.metadata.create_all(bind=engine)


# uvicorn API.main:app --reload

@app.get("/")
@app.get("/users", status_code=200, response_model=list[UserSchema])
async def get_users() -> list[UserSchema]:
    users = getUsers()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@app.get("/bills/", status_code=200)
async def get_bills() -> list[BillSchema]:
    bills = getBills()
    if not bills:
        raise HTTPException(status_code=404, detail="No bills found")
    return bills


@app.get("/history", status_code=200)
async def get_history():
    history_bill = getHistory()
    if not history_bill:
        raise HTTPException(status_code=404, detail="No history found")
    return history_bill


@app.post("/add/user/", status_code=201, response_model=UserSchema)
async def add_user(name, email, password) -> UserSchema:
    # http://127.0.0.1:8000/add/user/?name=wojtek&password=Wojtek92%21&email=wojtek
    user = addUser(name, email, password)
    if not user:
        raise HTTPException(status_code=507,
                            detail="The server is unable to save the data related to the execution of the query")
    return user


@app.post("/add/bill/{name}/{price}/{category}/{date}/{user_id}", status_code=201)
def add_bill(name: str, price: float, category: str, date: str, user_id: int):
    bill = addBill(name, price, category, date, user_id)
    history = addBillToHistory(user_id)
    if not bill and not history:
        raise HTTPException(status_code=507,
                            detail="The server is unable to save the data related to the execution of the query")
    return {"bill": bill, "history": history}
