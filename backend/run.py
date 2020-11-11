import os
from dotenv import load_dotenv, find_dotenv

from src.app import create_app

load_dotenv(find_dotenv())

if __name__ == '__main__':
    env_name = os.getenv('FLASK_ENV')
    port = os.getenv('PORT')
    host = os.getenv('HOST')
    app = create_app(env_name)
    app.run(host=host, port=port)
