from typing import List

from API.database import session
from API.model import User, Bill
from API.Schema import UserSchema, BillSchema


# noinspection PyTypeChecker
def getUsers() -> list[UserSchema]:
    users_in_db = session.query(User).all()
    users = [UserSchema(id=user.id, username=user.username, email=user.email, hashed_password=user.hashed_password) for
             user in users_in_db]
    return users


# noinspection PyTypeChecker
def getBills() -> List[BillSchema]:
    bills_in_db = session.query(Bill).all()
    print("bills_in_db", bills_in_db)
    bills = [BillSchema(id=bill.id, name=bill.name, price=bill.sum, category=bill.category, user_id=bill.user_id,
                        date=bill.data) for bill in bills_in_db]
    return bills


def addUser(name, email, password):
    user = User(username=name, hashed_password=password, email=email)
    session.add(user)
    session.commit()
    return user


if __name__ == '__main__':
    print(getBills())
