from os import path, pardir
from sys import stderr, exit
try:
    import secrets

    # Secret Values
    CSRF_SESSION_KEY = secrets.CSRF_SESSION_KEY
    SECRET_KEY = secrets.SECRET_KEY

    # Flask configurations
    HOST = '0.0.0.0'
    PORT = 5001
    DEBUG = True

    # Meta
    META_TITLE = 'Minimill'
    META_DESCRIPTION = 'Design and dev and brand and people.'
    META_TWITTER_HANDLE = '@minimillco'
    META_DOMAIN = 'minimill.co'
    SSL = False
    META_URL = ('https://' if SSL else 'http://') + META_DOMAIN
    META_IMAGE = 'img/CHANGE_ME.jpg'

    # SCSS Options
    SCSS_CONFIG_FILE = 'config/scss.json'

    # Base directory
    BASEDIR = path.abspath(path.join(path.dirname(__file__), pardir))

    # Cross-site request forgery configurations
    CSRF_ENABLED = True
    WTF_CSRF_ENABLED = True

    # MongoDB configurations
    MONGODB_SETTINGS = {'DB': 'CHANGEME'}

    # Logging configurations
    LOG_FILE_MAX_SIZE = '256'
    APP_LOG_NAME = 'app.log'
    WERKZEUG_LOG_NAME = 'werkzeug.log'

except ImportError:
    print >> stderr, ('Failed to import config/secrets.py. You should copy '
                      'config/example.secrets.py into config/secets.py and '
                      'edit the values in there.')
    exit(1)
