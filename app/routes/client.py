"""
.. module:: client
    :synopsis: All routes on the ``client`` Blueprint.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from flask import Blueprint, render_template
from app.lib.json_response import json_success, json_error_message
from app.forms import ContactForm
client = Blueprint('client', __name__)


@client.route('/', methods=['GET'])
def contact():
    """View the homepage.

    **Route:** ``/``

    **Methods:** ``GET``
    """
    form = ContactForm()
    return render_template('contact.html', form=form)

@client.route('/', methods=['POST'])
def email_us():
    """Email the team.

    **Route:** ``/``

    **Methods:** ``GET``
    """
    form = ContactForm()
    if form.validate_on_submit():
        return json_success({})
    return json_error_message('error', error_data=form.errors)

@client.route('/team', methods=['GET'])
def team():
    """View the team.

    **Route:** ``/team``

    **Methods:** ``GET``
    """
    return render_template('team.html')
