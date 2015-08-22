# `/app/static/scss/`

SCSS stylesheets live here.

SCSS files are compiled using [Flask-Assets][flask-assets] in `/app/__init__.py` using configurations in `config/scss.json`.

## Subdirectories

- `admin`: styles for the admin interface
- `client`: styles for the user-facing part of the website
- `common`: stylesheets shared by the admin and client

[flask-assets]: http://flask-assets.readthedocs.org/en/latest/

