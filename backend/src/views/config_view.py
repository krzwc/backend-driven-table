from flask import request, json, Response, Blueprint
from flask_cors import CORS
from ..models.config_model import ConfigModel, ConfigSchema
from marshmallow import ValidationError
# from ..shared.authentication import Auth

config_api = Blueprint('config_api', __name__)
config_schema = ConfigSchema()

CORS(config_api)


@config_api.route('/', methods=['PUT'])
def update():
    """
    Update Config Function
    """
    req_data = request.get_json()
    try:
        data = config_schema.load(req_data)
    except ValidationError as err:
        print(err.messages)
        print(err.valid_data)

    config = ConfigModel.get_config_by_table(data['table'])
    config.update(data)

    # get and return the updated data from db
    table_data = ConfigModel.get_config_by_table(data['table'])
    if not table_data:
        return custom_response({'error': 'table name not found'}, 404)

    res_data = config_schema.dump(table_data)
    return custom_response({'data': res_data}, 201)


@config_api.route('/', methods=['POST'])
def read_or_create():
    """
    Read or Create Config Function
    """
    req_data = request.get_json()
    try:
        data = config_schema.load(req_data)
    except ValidationError as err:
        print(err.messages)
        print(err.valid_data)

    table_data = ConfigModel.get_config_by_table(req_data['table'])
    if not table_data:
        config = ConfigModel(data)
        config.save()
        table_data = ConfigModel.get_config_by_table(data['table'])

    res_data = config_schema.dump(table_data)
    return custom_response({'data': res_data}, 200)


@config_api.route('/', methods=['GET'])
def get_all():
    """
    Read all configs
    """
    configs = ConfigModel.get_all_tables_config()
    ser_configs = config_schema.dump(configs, many=True)
    return custom_response({'data': ser_configs}, 200)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
