from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

with open('mock_data.json') as json_file:
    data = json.load(json_file)

@app.route('/data')
def get_data():
    return json.dumps(data)

@app.route('/config', methods=['POST'])
def index():
    return json.dumps(["first_name", "last_name", "email", "gender", "ip_address"])