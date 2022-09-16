from flask import Flask, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}})


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email, "password": self.password}


class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    sum = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        nullable=False)
    user = db.relationship('User', backref=db.backref('bills', lazy=True))

    def __repr__(self):
        return '<Bill %r>' % self.name

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'sum': self.sum, 'category': self.category, 'user_id': self.user_id}


@app.route('/users/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


# /users/<id>
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.to_dict())


# /bill
@app.route('/bills/', methods=['GET'])
def get_bills():
    bills = Bill.query.all()
    return jsonify([bill.to_dict() for bill in bills])


# /bill/<id>
@app.route('/bills/<int:id>', methods=['GET'])
def get_bill(id):
    bill = Bill.query.get(id)
    return jsonify(bill.to_dict())


# /bill/<id>/cancel
@app.route('/bills/<int:id>/cancel', methods=['Delete'])
def cancel_bill(id):
    bill = Bill.query.get(id)
    db.session.delete(bill)
    db.session.commit()
    return jsonify(bill.to_dict())


# /bills/history/<period>
@app.route('/bills/history/<period>', methods=['GET'])
def get_history(period):
    bills = Bill.query.all()
    return jsonify([bill.to_dict() for bill in bills])


# /add/user
@app.route('/add/user/<name>/<email>/<password>', methods=['POST'])
@cross_origin()
def add_user(name, email, password):
    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    rs = jsonify(user.to_dict())
    return make_response(rs, 201)


# /add/bill
@app.route('/add/bill', methods=['POST'])
def add_bill(name, sum, category, user_id):
    bill = Bill(name=name, sum=sum, category=category, user_id=user_id)
    db.session.add(bill)
    db.session.commit()
    response = jsonify(bill.to_dict())
    return make_response(response, 201)


if __name__ == '__main__':
    app.run()
