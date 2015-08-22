# `/app/static/`

CSS, JavaScript, SCSS, and image files live here.

SCSS files are compiled using [Flask-Assets][flask-assets] in `/app/__init__.py` using configurations in `config/scss.json`.

## Subdirectories

- `css`: Both CSS files compiled from SCSS (`css/gen`) and CSS libraries (`css/lib`)
- `js`: JavaScript files
- `img`: Images, including those uploaded from the admin interface
- `scss`: SCSS files that compile to CSS.

[flask-assets]: http://flask-assets.readthedocs.org/en/latest/
