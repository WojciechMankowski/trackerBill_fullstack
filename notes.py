from API.database import engine, session, Base
from API.model import Bill, History, User

user = User(username='wojtek', hashed_password='Wojtek92', email='test@gmail.com')
bill = Bill(name='test', sum=10.0, category='test', data='2021-01-01', user_id=1)
history = History(id_bill=1, user_id=1)
session.add(user)
# session.add(bill)
# session.add(history)
session.commit()
