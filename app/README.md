# `/app`

All code relevant to running Flask-Seed lives here.

- `forms`: [Flask-WTForms][flask-wtforms] models, used for generating forms in HTML and validating input
- `lib`: Misc helpers, tasks, and modular libraries
- `models`: The [Mongoengine][mongoengine] models
- `routes`: The Flask Blueprints that handle routing
- `static`: CSS, JS, and images
- `templates`: HTML templates
- `__init__.py`: Holds all the setup and initialization of dependencies, Blueprints, and the database.


[mongoengine]: http://docs.mongoengine.org/
[flask-wtforms]: https://flask-wtf.readthedocs.org/en/latest/
