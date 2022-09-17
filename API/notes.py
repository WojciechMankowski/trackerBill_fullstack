from database import session
from main import add_bill_to_history
from model import Bill

def add(name: str, price: float, category: str, date: str, user_id: int):
    bill = Bill(name=name, sum=price, category=category, data=date, user_id=user_id)
    session.add(bill)
    session.commit()
    return {"message": "bill added", "id1": bill.id}
def add_bill(name: str, price: float, category: str, date: str, user_id: int):
    add(name, price, category, date, user_id)
    session.add(add_bill_to_history(user_id, name))
    session.commit()
    return {"message": "bill added"}

add_bill("test", 1.0, "test", "2021-01-01", 1)