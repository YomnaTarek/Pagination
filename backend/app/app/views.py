from app import app
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, abort
import string
import random
from flask import request

db = SQLAlchemy()

database_name = "pagination"
postgres_user = "postgres"
password = "root"
ahmed_password = "1234567890"

database_uri = "postgresql://{}:{}@{}/{}".format(
    postgres_user,
    ahmed_password,
    'localhost:5432',
    database_name
    )

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

class Users(db.Model):
    __tablename__ = 'users'
    """
    Primary key => id
    name | email | username | state | requests
    -----|-------|---------|-------|------------------
    ...............user info ......| imaginary column for user requests
    -----|-------|---------|-------|------------------
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, name):
        self.name = name

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def rollback(self):
        db.session.rollback()

    def format(self):
        return {
            "id" : self.id, 
            "name" : self.name
        }

@app.route("/")
def index():
    return "Hello world"

@app.route("/about")
def about():
    return "All about Flask"

@app.route("/users", methods=['GET'])
def get_all_users():
    page = int(request.args.get('page'))

    if (request.args.get('per_page')):
        per_page = int(request.args.get('per_page'))
    else:
        per_page = 20

    users = Users.query.order_by(Users.id.asc()).paginate(page,per_page,error_out=False).items

    if len(users) == 0:
        abort(404, 'No Gpus found')
    try:
        response = jsonify({'users' : [user.format() for user in users]})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    except:
        abort(400)

def create_dummy_users():
    for x in range(500):
        new_user = Users(random.choice(string.ascii_letters))
        new_user.insert()