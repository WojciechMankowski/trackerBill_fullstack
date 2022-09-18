from pydantic import BaseModel


# klasa user
class UserSchema(BaseModel):
    username: str
    email: str
    hashed_password: str


# klasa bill
class BillSchema(BaseModel):
    id: int
    name: str
    price: float
    category: str
    date: str
    user_id: int


# klasa history
class HistorySchema(BaseModel):
    user_id: int
    id_bill: int
