from flask import Flask
import json

app = Flask(__name__)

with open('mock_data.json') as json_file:
    data = json.load(json_file)

@app.route('/')
def hello_world():
    return json.dumps(data)