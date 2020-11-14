# .env

```
PORT=5000
HOST=0.0.0.0
FLASK_ENV=development
JWT_SECRET_KEY=hhgaghhgsdhdhdd
FLASK_APP=run
DATABASE_URL=postgresql://admin:secret@0.0.0.0:5432/users
DATABASE_TEST_URL=
```

# Running app

```
python3 --version
python3 -m venv env
source env/bin/activate
python -m pip install -r requirements.txt
python -m run
```

vscode: cmd + shift + p -> python: select interpreter -> select env/bin/python

## pgadmin credentials:

http://localhost:8080/
user: admin@ro.ot
password: password

## Adding postgres in pgadmin

![alt text](../assets/postgres-connection-details.png?raw=true)
user: admin
password: secret

## Running migrations

```
python manage.py db init
```

## Populating migration files

```
python manage.py db migrate
```

## Apply the changes to db

```
python manage.py db upgrade
```
