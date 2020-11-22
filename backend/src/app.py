from flask import Flask, request
from flask_cors import CORS
import json

from .config import app_config
from .models import db

from .views.user_view import user_api as user_blueprint
from .views.config_view import config_api as config_blueprint

from .mock_data import db_load_mock_data


def create_app(env_name):
    """
    Create app
    """
    app = Flask(__name__)
    app.config.from_object(app_config[env_name])

    db.init_app(app)
    db_load_mock_data(app, db)

    CORS(app)

    app.register_blueprint(user_blueprint, url_prefix='/user-data')
    app.register_blueprint(config_blueprint, url_prefix='/user-config')

    return app
