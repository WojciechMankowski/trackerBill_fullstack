from typing import List
from API.database import session
from API.model import User, Bill, History
from API.Schema import UserSchema, BillSchema, HistorySchema


# noinspection PyTypeChecker
def getUsers() -> list[UserSchema]:
    users_in_db = session.query(User).all()
    users = [UserSchema(id=user.id, username=user.username, email=user.email, hashed_password=user.hashed_password) for
             user in users_in_db]
    return users


# noinspection PyTypeChecker
def getBills() -> List[BillSchema]:
    bills_in_db = session.query(Bill).all()
    bills = [BillSchema(id=bill.id, name=bill.name, price=bill.sum, category=bill.category, user_id=bill.user_id,
                        date=bill.data) for bill in bills_in_db]
    return bills

def getHistory():
    history_in_db = session.query(History).all()
    history = [HistorySchema(id=history.id, user_id=history.user_id, id_bill=history.id_bill) for history in history_in_db]
    bills = [fillterHistory(item.user_id, item.id_bill) for item in history]
    return bills
def fillterHistory(user_id, id_bill):
    history = session.query(Bill).filter(Bill.user_id == user_id and Bill.id_bill == id_bill).first()
    return history
def getIdUser(email, name):
    user = session.query(User).all()
    chosen_user = [item for item in user if item.email == email and item.username == name][0]
    return chosen_user.id
def addUser(name, email, password):
    user = User(username=name, hashed_password=password, email=email)
    session.add(user)
    session.commit()
    return user
def addBill(name, price, category, date, user_id):
    bill = Bill(name=name, sum=price,
                category=category, data=date, user_id=user_id)
    session.add(bill)
    # session.commit()
    return bill

def addBillToHistory(user_id):
    idBill = getHistory()[-1].id
    history = History(user_id=user_id, id_bill=idBill)
    session.add(history)
    session.commit()
    return history

