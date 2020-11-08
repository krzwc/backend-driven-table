# Running app

python3 --version
python3 -m venv env
source env/bin/activate
python -m pip install -r requirements.txt
export FLASK_ENV=development; export JWT_SECRET_KEY=hhgaghhgsdhdhdd; export FLASK_APP=run; python3 -m flask run --host=0.0.0.0

albo

export FLASK_ENV=development; export JWT_SECRET_KEY=hhgaghhgsdhdhdd; python3 -m run

vscode: cmd + shift + p -> python: select interpreter -> select env/bin/python

## pgadmin credentials:

http://localhost:8080/
user: admin@ro.ot
password: password

## Adding postgres in pgadmin

![alt text](../assets/postgres-connection-details.png?raw=true)
user: admin
password: secret
