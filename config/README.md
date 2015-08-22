# `/config`

Configuration and settings files live here.

- `example.secrets.py`: A template for your `secrets.py` file.
- `secrets.py`: this file should not be in version control, as it contains secrets.
- `flask_config.py`: This contains all configuration variables for the app
- `requirements.txt`: Pip requirements.  Install from the root directory using:

    ```bash
    $ pip install -r config/requirements.txt
    ```
    
- `scss.json`: Configuration for [Flask-Assets][flask-assets].  These configurations are loaded by `app/__init__.py` and used to compile SCSS files and generate the files in `/app/static/css/gen`.

[flask-assets]: http://flask-assets.readthedocs.org/en/latest/
