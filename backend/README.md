python3 --version
python3 -m venv env
source env/bin/activate
python -m pip install -r requirements.txt
export FLASK_ENV=development; python3 -m flask run