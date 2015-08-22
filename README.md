# Flask-Seed

Flask-Seed is an opinionated boilerplate for your next Flask app.  It uses the best practices, so you don't have to.

## Stack
- Built in [Flask][flask]
- [Flask-Mongoengine][flask-mongoengine] and [Mongoengine][mongoengine] are used to interface with [MongoDB][mongodb]  
- Forms and validation are done through [Flask-WTForms][flask-wtforms] and [WTForms][wtforms]
- CSS is generated from [SCSS][scss] and managed with [Flask-Assets][flask-assets]
- Routing is done using [Blueprints][blueprints]
- Testing is done using `nosetests` and `unittest`.

## First-Time Setup

Flask-Seed runs natively on Linux and OSX in a virtual environment, using [Virtualenv][virtualenv]. To get it up an running, follow these steps:

1.  Generate secrets files, using [good secret keys][secret-keys]:
    
    ```bash
    cp config/example.secrets.py config/secrets.py
    vim config/secrets.py
    ```

2.  Change all the `CHANGEME`s.  You should be able to run this command without seeing any output:

    ```bash
    grep -rn CHANGEME .
    ```
    
3.  Install [MongoDB][mongodb] ([Ubuntu Linux][mongodb-linux], [OSX][mongodb-osx]).

    > On OSX, you may have to run `mkdir /data /data/db` before you can run `mongod` without errors.

4.  Install [VirtualEnv][virtualenv]:
    ```bash
    sudo pip install virtualenv
    ```

5.  Install SASS gem `gem install sass`
    
    > Otherwise, you will see an intermittent `OSError` 

## Developing

```bash
./develop.sh                    # MongoDB, virtualenv, and Pip
source /tmp/venv/bin/activate   # Enter the virtual environment
python run.py                   # Run the application
```

Finally, go to `localhost:5000` in your web browser.

## Testing

Tests live in the `test` directory, and can be run via `nosetests`.  We also use `flake8` for linting `.py` files.

First, enter your development environment.  See "Developing" for more.  Then, run the tests:

```bash
flake8 app config test          # Run the flake8 linter on our python files
nosetests --with-progressive    # Run test scripts
```

## Organization / Structure

```bash
.
├── app              # All code related to the running of the app
│   ├── forms        # Flask-WTForms models, used for generating forms in 
│   │                #     HTML and validating input
│   ├── lib          # Misc helpers, tasks, and modular libraries
│   ├── models       # Mongoengine Models
│   ├── routes       # All Flask routes, using Blueprints
│   ├── static       # Static files.  Note: All files in here are public
│   │   ├── css      # CSS
│   │   │   ├── lib  # CSS libraries
│   │   │   └── gen  # CSS generated from SCSS
│   │   ├── img      # Images
│   │   ├── js       # JavaScript files
│   │   └── scss     # Stylesheets
│   ├── templates    # HTML templates
│   └── __init__.py  # All app-wide setup.  Called by `run.py`
├── config           # Configuration files
├── develop.sh       # Used for non-Vagrant local Development
├── run.py           # Runs the app!
└── test             # Unit tests
```

[blueprints]: http://flask.pocoo.org/docs/blueprints/
[flask]: http://flask.pocoo.org/
[flask-assets]: http://flask-assets.readthedocs.org/en/latest/
[flask-mongoengine]: http://flask-mongoengine.readthedocs.org/en/latest/
[flask-wtforms]: https://flask-wtf.readthedocs.org/en/latest/
[mongodb]: https://www.mongodb.org/
[mongodb-linux]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
[mongodb-osx]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-with-homebrew
[mongoengine]: http://docs.mongoengine.org/
[scss]: http://sass-lang.com/
[secret-keys]: http://flask.pocoo.org/docs/0.10/quickstart/#sessions
[virtualenv]: http://virtualenv.readthedocs.org/en/latest/
[wtforms]: http://wtforms.readthedocs.org/en/latest/
