# `/app/routes`

[Flask][flask] routes live here, organized into blueprints.  

[Blueprints][blueprints] allow namespacing of routes.  Each `.py` file here is a blueprint (except `base.py`), and contains routes that represent a part of the application.  For example, `client.py` has routes for the user-facing client.

- `base.py` Any global Flask configurations, including
    + `@app.before_request`
    + `@app.after_request`
    + `@app.error_handler`
    + `@app.context_processor`
- `client.py` contains an example Blueprint
- `__init__.py` imports all of the blueprints for easy importing elsewhere:
    
    ```python
    from app.routes import client
    app.register_blueprint(client)
    ```

[blueprints]: http://flask.pocoo.org/docs/blueprints/
[flask]: http://flask.pocoo.org/
