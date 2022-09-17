from sqlalchemy import Float, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, backref
from API.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)



class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    sum = Column(Float, nullable=False)
    category = Column(String, unique=True, nullable=False)
    data = Column(String, unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('User', backref=backref('bills', lazy=True))

    def __repr__(self):
        return '<Bill %r>' % self.name

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'sum': self.sum, 'category': self.category, 'user_id': self.user_id}


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True)
    id_bill = Column(Integer, ForeignKey('bills.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('User', backref=backref('history', lazy=True))



    def to_dict(self):
        return {'id': self.id, 'id_bill': self.id_bill, 'user_id': self.user_id}
