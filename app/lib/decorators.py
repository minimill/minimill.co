"""
.. module:: decorators
    :synopsis: Decorators to be used on routes.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from app import app
from flask import abort
from functools import wraps


def development_only(f):
    """A decorator that disables the decorated route if debug mode is off.

    :param func f: The decorated function.
    :returns: The parameter function ``f``, but with checks for debug mode.
    :rtype: func
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        """The decorated version of ``f`` (see :method:``development_only``).

        :param args: Arguments for ``f``.
        :params kwargs: Keyword arguments for ``f``.
        """

        if not app.config['DEBUG']:
            abort(401)
        return f(*args, **kwargs)

    return decorated_function
