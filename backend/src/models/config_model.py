from . import db
import datetime


class ConfigModel(db.Model):
    """
    Config Model
    """

    __tablename__ = 'config'

    id = db.Column(db.Integer, primary_key=True)
    table = db.Column(db.String(128), nullable=False)
    fields = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    def __init__(self, data):
        self.table = data.get('table')
        self.fields = data.get('fields')
        self.created_at = datetime.datetime.utcnow()
        self.modified_at = datetime.datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.modified_at = datetime.datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        de.session.commit()

    @staticmethod
    def get_all_config():
        return ConfigModel.query.all()

    @staticmethod
    def get_one_config(id):
        return ConfigModel.query.get(id)


class ConfigSchema(Schema):
    """
    Config Schema
    """
    id = fields.Int(dump_only=True)
    table = fields.Str(required=True)
    fields = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    modified_at = fields.DateTime(dump_only=True)
