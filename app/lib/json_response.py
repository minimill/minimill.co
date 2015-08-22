from flask import make_response
import json
from bson import json_util


def json_response(data, code):
    """Return a :class:`flask.Response` with a JSON encoded object ``data`` in
    the body.

    :param dict data: The data to be put in the response body.
    :param int code: The HTTP status code for the response.

    :returns: the response object
    :rtype: :class:`flask.Response`
    """
    text = json.dumps(data, default=json_util.default)
    response = make_response(text, code)
    response.headers['Content-Type'] = 'application/json'
    return response


def json_success(data, code=200):
    """Return a :class:`flask.Response` with a JSON error message in the body,
    of the format::


        {
            "status": "success",
            "data": <data:dict>
        }

    :param dict data: The data to include as JSON in the response
    :param int code: The HTTP status code for the response.

    :returns: the response object
    :rtype: :class:`flask.Response`
    """
    return json_response({
        'status': 'success',
        'data': data
    }, code)


def json_error_message(error_message, code=400, error_data=None):
    """Return a :class:`flask.Response` with a JSON error message in the body,
    of the format::


        {
            "status": "error",
            "error": {
                "message": <error_message:string>,
                "code": <code:int>,
                "data": <error_data:dict>
            }
        }

    :param string error_message: A plaintext, user-facing error message to be
    displayed.
    :param int code: The HTTP status code for the response.
    :param dict error_data: Any additional details about the error.

    :returns: the response object
    :rtype: :class:`flask.Response`
    """
    if error_data is None:
        error_data = {}  # error_data should always be a dictionary

    return json_response({
        'status': 'error',
        'error': {
            'message': error_message,
            'code': code,
            'data': error_data
        }
    }, code)
