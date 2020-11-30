from marshmallow import fields, Schema
from . import db, bcrypt


class UserModel(db.Model):
    """
    User Model
    """

    # table name
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    gender = db.Column(db.String(128), nullable=True)
    ip_address = db.Column(db.String(128), nullable=True)
    password = db.Column(db.String(128), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.first_name = data.get('first_name')
        self.last_name = data.get('last_name')
        self.email = data.get('email')
        self.gender = data.get('gender')
        self.ip_address = data.get('ip_address')
        self.password = UserModel.generate_hash(
            data.get('password'))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def generate_hash(password):
        return bcrypt.generate_password_hash(password.encode('utf8')).decode('utf8')

    @staticmethod
    def get_all_users():
        return UserModel.query.all()

    @staticmethod
    def get_one_user(id):
        return UserModel.query.get(id)

    @staticmethod
    def get_user_by_email(value):
        return UserModel.query.filter_by(email=value).first()

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr(self):
        return '<id {}>'.format(self.id)


class UserSchema(Schema):
    """
    User Schema
    """
    id = fields.Int(dump_only=True)
    first_name = fields.Str()
    last_name = fields.Str()
    email = fields.Email(required=True)
    gender = fields.Str()
    ip_address = fields.Str()
    password = fields.Str(required=True, load_only=True)
