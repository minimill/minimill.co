# `/app/templates/`

All HTML for the codebase lives here. 

- `base.html` is responsible for the entire HEAD of the document, *all* templates should extend it.  
- `index.html` is an example page to be rendered.
- `macros.html` is should contain helpful Jinja macros to be used across multiple templates.  To use these macros, just import `macros.html`:
    ```html
    {% import "macros.html" as macros %}
    <form class="example">
        {{ macros.render_field(form.username) }}
    </form>
    ```
