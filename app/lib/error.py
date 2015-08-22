"""
.. module:: error
    :synopsis: Home to the :class:`Error` class, which contains
        namespaced subclasses that should be used when raising and handling
        exceptions.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>

This module is slightly complicated.  It contains three main components: the
nested dictionary ``_ERROR_DATA``, the class :class:`Error`, and the
function :func:`_make_subclasses`.  The dictionary ``_ERROR_DATA`` contains a
family tree of subclasses for :class:`Error`. Each key is an error name,
and the value is a four-tuple of::

    (message, error_code, http_status_code, subclasses)

The ``message`` is a string that may be shown to users, in the app, and logged
to the application logs.

The ``error_code`` is a namespaced, unique number that can be easily used to
identify error messages in other parts of the app, or in JavaScript. They are
namespaced.  For example, Google Calendar API errors have error code ``6XX``,
and Google Calendar Not Found errors are ``64X``.

The ``http_status_code`` is the HTTP status code that should be associated with
this error should it reach the user.

The ``subclasses`` entry is a dictionary of similar structure, containing
recurisve error subclasses of this error.

In order to add a new error, simply add a new entry to the _ERROR_DATA
dictionary at the proper level of indentation.  Related errors should share
common baseclasses, and have similar ``error_code`` values.

Example usage::


    from app.lib.error import Error
    # ...
    try:
        raise Error.Some.Kind.OfError()
    except Error.Some.Kind.OfError:
        # handle error...

However, we can also except multiple errors by excepting their common
baseclass::


    from app.lib.error import Error
    # ...
    try:
        if something():
            raise Error.Some.Kind.OfError()
        elif something_else():
            raise Error.Some.OtherError()
        else:
            raise Error.Some():
    except Error.Some:
        # handles all above errors.

"""

import re

HTTP_OK = 200
HTTP_BAD_REQUEST = 400
HTTP_INTERNAL_SERVER_ERROR = 500

# Dictionary of:
# {ErrorName: (message, error_code, http_status_code, error_subclasses)}
_ERROR_DATA = {

    ###################################
    # 6XX: Google Calendar API Errors #
    ###################################
    'GCalAPI': (
        'Something went wrong with Google Calendar.',
        600, HTTP_INTERNAL_SERVER_ERROR, {

            'MissingID': (
                'This event was not assigned a gcal_id.',
                610, HTTP_INTERNAL_SERVER_ERROR, {

                    'FellBackToCreate': (
                        'Missing gplus_id. Successfully fell back to create.',
                        611, HTTP_OK, {}),
                }),

            'BadStatusLine': (
                'Encountered a BadStatusLine error with the Google Calendar '
                'API.',
                620, HTTP_INTERNAL_SERVER_ERROR, {}),

            'EventAlreadyDeleted': (
                'Encountered a Bad Status Line error with the API',
                630, HTTP_INTERNAL_SERVER_ERROR, {}),

            'NotFound': (
                'Got "Not Found" from Google Calendar.',
                640, HTTP_INTERNAL_SERVER_ERROR, {

                    'UpdateFellBackToCreate': (
                        'Couldn\'t find an event to update. Successfully fell '
                        'back to create.',
                        641, HTTP_OK, {}),

                    'MoveFellBackToCreate': (
                        'Couldn\'t find an event to move. Successfully fell '
                        'back to create.',
                        642, HTTP_OK, {}),
                }),

            'PublishFailed': (
                'Failed to Publish Event',
                650, HTTP_INTERNAL_SERVER_ERROR, {

                    'PublishedFalse': (
                        'Event must have the `published` set to `True` '
                        ' before publishing.',
                        651, HTTP_INTERNAL_SERVER_ERROR, {}),

                    'PublishedTrue': (
                        'Event must have the `published` set to `True` '
                        ' before unpublishing.',
                        652, HTTP_INTERNAL_SERVER_ERROR, {}),
                }),

            'EventMustEndOnOrAfter': (
                'A series should either end on a specific date, or after a '
                'specific number of occurences.  Series.ends_on and ends_after'
                ' are both false.',
                660, HTTP_BAD_REQUEST, {})
        }),
}


class Error(Exception):
    """The base error class.  All errors are subclasses of :class:`Error`."""

    message = 'An error occurred.'
    error_code = 0
    http_status_code = HTTP_INTERNAL_SERVER_ERROR

    def __init__(self, *subs, **kwargs):
        """Called to create an instance of :class:`Error`.  Subclasses
        of :class:`Error` inherit this method.  It uses ``subs`` to
        populate any format strings in the class's error message, and saves
        any kwargs as data attributes to be associate with the request.

        Initializing a subclass of Error will also log to the app log.

        :param subs: Strings to subsitute into the format string for the error
            message associated with class.
        :type subs: list(str)
        :param dict kwargs: any arbitrary data that should be logged along with
            this error.
        """
        self.data = kwargs
        self.error_type = self.__class__.__name__
        self.message = self._form_message(self.message, subs)
        self.log_error()

    def log_error(self):
        """Print the error type and plaintext message to the warning logs,
        as well as any other data associated with it.
        """
        # Import app in the function body to avoid importing `None` when
        # the module is first loaded.
        from app import app
        message = '[{}]: {}'.format(self.error_type, self.message)
        app.logger.error(message)
        if self.data:
            app.logger.error('[{}][DATA]: {}'.format(self.error_type,
                                                     self.data))

    def _form_message(self, message, subs):
        """Apply subsitutions to the error message if any exist.  If there are
        spots for subsitutions variables in the error message (if the strings
        ``'%s'`` appears anywhere in the string) and there are not enough
        strings in ``subs`` to fill them, instances of ``'%s'`` will be removed
        from the error message.  If there are two many strings in ``subs``,
        later strings will be ignored.

        Here are some examples::

            >>> _form_message('Error at url `%s`: %s', ['/home', 'Not Found'])
            'Error at url `/home`: Not Found'
            >>> _form_message('Error at url `%s`: %s', ['/home'])
            'Error at url `/home`: '
            >>> _form_message('Error at url.', ['/home'])
            'Error at url.'

        :param str message: The format string to format.
        :param subs: The strings to subsitute into the format string.
        :type subs: list(str)

        :returns: The formatted string.
        :rtype: str
        """
        # Import app in the function body to avoid importing `None` when
        # the module is first loaded.
        from app import app
        n_subs = message.count('%s')

        # Extend subs if there aren't enough
        if n_subs > len(subs):
            app.logger.warning(
                '[{}._form_message]: {}'.format(self.error_type,
                                                'Not enough subs provided'))
            # extend tuple by appending a tuple of length (n_subs - len(subs))
            subs = subs + (('',) * (n_subs - len(subs)))

        # Shorten subs if there are too many
        if len(subs) > n_subs:
            app.logger.warning(
                '[{}._form_message]: {}'.format(self.error_type,
                                                'Too many subs provided'))
            subs = subs[:n_subs]

        # Perform substitutions
        if subs:
            message = message % subs

        return re.sub(r'\%s', '', message)


def _make_subclasses(error_data, baseclass):
    """Recursively add subclass errors to ``baseclass``.

    :param dict error_data: A dictionary of error name strings to a four-tuple
        of ``(message, error_code, http_status_code, subclasses)``. The
        ``message`` is the user-facing message to display, the ``error_code``
        is a unique number representing the error, the ``http_status_code`` is
        the HTTP status code that should be associated with this error should
        it surface to the user, and subcalsses is a dictionary of this same
        type, containing data for subclasses of this error.
    :param baseclass: The error class to attach these errors onto.
    :type baseclass: :class:`Error` or one of its subclasses.
    """
    if not error_data:
        return

    for e_type, e_attrs in error_data.iteritems():
        # Make the new class object
        # `name` will be Error.<BaseClassName>.ClassName
        name = '{}.{}'.format(baseclass.__name__, e_type)
        # We then create a class dynamically, using `type()`.
        # Arguments are:
        #    name: the name of the class
        #    (baseclass,): a tuple of baseclasses
        #    {}: a namespace of function definitions (we don't need any)
        subclass = type(name, (baseclass,), {})

        message, error_code, http_status_code, subclasses = e_attrs

        # Configure its message, error_code, and http_status_code
        subclass.message = message
        subclass.error_code = error_code
        subclass.http_status_code = http_status_code

        # Recursively generate subclasses
        _make_subclasses(subclasses, subclass)

        # Add this subclass as an attribute of the baseclass
        setattr(Error, e_type, subclass)

# Start the recursive generation of Error subclasses.  This code gets
# run whenever the module is imported.
_make_subclasses(_ERROR_DATA, Error)
