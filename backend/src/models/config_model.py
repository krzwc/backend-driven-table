from marshmallow import fields, Schema
from . import db


class ConfigModel(db.Model):
    """
    Config Model
    """

    __tablename__ = 'config'

    id = db.Column(db.Integer, primary_key=True)
    table = db.Column(db.String(128), nullable=False)
    columns = db.Column(db.String(128), nullable=False)

    def __init__(self, data):
        self.table = data.get('table')
        self.columns = data.get('columns')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        de.session.commit()

    @staticmethod
    def get_all_tables_config():
        return ConfigModel.query.all()

    @staticmethod
    def get_config_by_table(value):
        return ConfigModel.query.filter_by(table=value).first()


class ConfigSchema(Schema):
    """
    Config Schema
    """
    id = fields.Int(dump_only=True)
    table = fields.Str(required=True)
    columns = fields.Str(required=True)
