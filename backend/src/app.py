from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

from .config import app_config
from .models import db

from .views.user_view import user_api as user_blueprint
from .views.config_view import config_api as config_blueprint


def create_app(env_name):
    """
    Create app
    """
    app = Flask(__name__)
    app.config.from_object(app_config[env_name])

    db.init_app(app)

    CORS(app)

    app.register_blueprint(user_blueprint, url_prefix='/user-data')
    app.register_blueprint(config_blueprint, url_prefix='/user-config')

    with open('src/mock_data.json') as json_file:
        data = json.load(json_file)

    @app.route('/table-data')
    def get_data():
        return json.dumps({'data': data})

    @app.route('/table-data/<id>', methods=['DELETE'])
    def delete_data(id):
        return json.dumps({'data': {'id': id}})

    @app.route('/table-config', methods=['POST', 'PUT'])
    def get_table_config():
        if request.method == 'PUT':
            print(request.data)
            return request.data
        else:
            return json.dumps({'data': ["first_name", "last_name", "email", "gender", "ip_address"]})

    return app
