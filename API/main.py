from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

from API.Helpers import getUsers, getBills, addUser
from API.Schema import UserSchema, BillSchema, HistorySchema
from API.database import engine, session, Base
from API.model import Bill, History, User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
Base.metadata.create_all(bind=engine)

# uvicorn API.main:app --reload

@app.get("/users", status_code=200, response_model=list[UserSchema])
async def get_users() -> list[UserSchema]:
    users = getUsers()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


@app.get("/bills", status_code=200)
async def get_bills() -> list[BillSchema]:
    bills = getBills()
    if not bills:
        raise HTTPException(status_code=404, detail="No bills found")
    return bills


@app.get("/history", status_code=200, response_model=list[HistorySchema])
async def get_history() -> list[HistorySchema]:
    history_bill = []
    history = session.query(History).all()
    if not history:
        raise HTTPException(status_code=404, detail="No history found")
    else:
        for item in history:
            history_bill.append(
                session.query(Bill).filter(Bill.id == item.id_bill and Bill.user_id == item.user_id).first())
        return history_bill


# /category
@app.post("/add/user/", status_code=201, response_model=UserSchema)
async def add_user(name, email, password) -> UserSchema:
    # http://127.0.0.1:8000/add/user/?name=wojtek&password=Wojtek92%21&email=wojtek
    user = addUser(name, email, password)
    session.add(user)
    session.commit()
    return user


def add_bill_to_history(user_id: int, name) -> BillSchema:
    bill = session.query(Bill).filter(Bill.name == name).first()
    history = History(user_id=user_id, id_bill=bill.id)
    return history


@app.post("/add/bill", status_code=201, response_model=BillSchema)
def add_bill(name: str, price: float, category: str, date: str, user_id: int) -> BillSchema:
    bill = Bill(name=name, sum=price, category=category, data=date, user_id=user_id)
    session.add(bill)
    session.commit()
    return bill
