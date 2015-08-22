"""
.. module:: base
    :synopsis: All routes on the ``base`` Blueprint, as well as error handlers,
        before and after request handlers, and context processors.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from flask import render_template, request, url_for
import sys

SUPER_USER_GPLUS_ID = 'super'
ERROR_FLASH = 'error'
MESSAGE_FLASH = 'message'


def register_error_handlers(app):

    @app.errorhandler(Exception)
    def exception_handler(error):
        """Handle uncaught exceptions."""
        app.logger.error("Uncaught Exception", exc_info=sys.exc_info())
        app.handle_exception(error)  # default error handler

    @app.errorhandler(400)
    def bad_request(error):
        """Handle 400 errors."""
        return render_template('error/400.html'), 400

    @app.errorhandler(401)
    def not_authorized(error):
        """Handle 401 errors."""
        return render_template('error/401.html'), 401

    @app.errorhandler(403)
    def forbidden(error):
        """Handle 403 errors."""
        return render_template('error/403.html'), 403

    @app.errorhandler(404)
    def not_found(error):
        """Handle 404 errors."""
        return render_template('error/404.html'), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        """Handle 405 errors."""
        return render_template('error/405.html', method=request.method), 405

    @app.errorhandler(500)
    def internal_server_error(error):
        """Handle 500 errors."""
        return render_template('error/500.html'), 500

    @app.context_processor
    def inject_helpers():
        """Injects a dictionary of helper variables and functions into Jinja
        templates.
        """
        helpers = {
            'static': lambda filename: url_for('static', filename=filename)
        }
        return helpers

    @app.after_request
    def add_header(response):
        """
        Add headers to both force latest IE rendering engine or Chrome Frame,
        and also to cache the rendered page for 10 minutes.
        """
        response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
        response.headers['Cache-Control'] = 'public, max-age=0'
        return response
