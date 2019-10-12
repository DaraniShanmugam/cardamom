# Cardamom Ticketing System

Live hosted demo: https://cardamom-ticket-tracking.herokuapp.com/
Admin and Manager credentials:
Username: crayonadmin
Password: testP@$$

## Requirements
- NPM
- Python 3

## Installation

It is preferable to run Python in a virtual environment.

#### React App
```bash
$ cd PATH_TO_REPOSITORY_ROOT
$ cd src
$ npm i
$ npm start-script build
$ cp build/static/* ../web/static_extras/
$ cp build/* ../web/build/
```

#### Django App
```bash
$ cd PATH_TO_REPOSITORY_ROOT
$ cd web
$ pip3 install -r requirements.txt
$ python3 manage.py migrate
$ python3 manage.py collectstatic
```

## Running the App
`cd PATH_TO_REPOSITORY_ROOT/web`
`gunicorn -w 3 -b 0:8081 api.wsgi`

The app can be viewed by navigating to `http://localhost:8081/`
The backend API docs can be viewed by navigating to `http://localhost:8081/docs/`

# Important Notes
- For demo purposes the site has been intentionally left in Debug Mode
- Some mock data is filled in the database
- SQLite DB is used, but can be easily replaced by any DB
- The db.sqlite3 file can be deleted to start afresh
- When starting from scratch
    - Run  `python3 manage.py createsuperuser` to create an admin account
    - Navigate to `http:8081/admin/` to login to admin panel
    - Create a new user for manager and assign the group `Manager` to that user
- Only managers or admins can create other users