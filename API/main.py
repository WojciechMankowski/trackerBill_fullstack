from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from API.database import engine, session, Base
from API.model import Bill, History, User

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_credentials=True,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],

)
# uvicorn main:app --reload
# points API
@app.get("/users")
async def get_users():
    return session.query(User).all()


@app.get("/bills")
async def get_bills():
    return session.query(Bill).all()


@app.get("/history")
async def get_history():
    history_bill = []
    history = session.query(History).all()
    for item in history:
        history_bill.append(
            session.query(Bill).filter(Bill.id == item.id_bill and Bill.user_id == item.user_id).first())
    return history_bill


# /category
@app.post("/add/user/")
async def add_user(name: str, password: str, email: str):
    # http://127.0.0.1:8000/add/user/?name=wojtek&password=Wojtek92%21&email=wojtek
    user = User(username=name, hashed_password=password, email=email)
    session.add(user)
    session.commit()
    return {"message": "user added"}


def add_bill_to_history(user_id: int, name):
    bill = session.query(Bill).filter(Bill.name == name).first()
    print(bill.id)
    print(bill.user_id)
    history = History(user_id=user_id, id_bill=bill.id)
    return history


@app.post("/add/bill")
def add_bill(name: str, price: float, category: str, date: str, user_id: int):
    bill = Bill(name=name, sum=price, category=category, data=date, user_id=user_id)
    session.add(bill)

    session.add(add_bill_to_history(user_id, name))
    session.commit()
    return {"message": "bill added", "id1": bill.id}
