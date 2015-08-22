# `/app/forms`

These are [WTForms][wtforms] form objects that are used to generate HTML forms and validate input.  All classes here should subclass `flask.ext.wtform.Form`.

- `EditUserForm` contains an example form.
- `__init__.py` imports all of the forms for convenient importing elsewhere:

    ```python
    from app.forms import CreateUserForm
    form = CreateUserForm()
    ```

[wtforms]: http://wtforms.readthedocs.org/en/latest/