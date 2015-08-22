"""
.. module:: client
    :synopsis: All routes on the ``client`` Blueprint.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from flask import Blueprint, render_template
from app.forms import ContactForm
client = Blueprint('client', __name__)


@client.route('/', methods=['GET', 'POST'])
def contact():
    """View the homepage.

    **Route:** ``/``

    **Methods:** ``GET``
    """
    form = ContactForm()
    return render_template('index.html', form=form)


@client.route('/team', methods=['GET'])
def team():
    """View the team.

    **Route:** ``/team``

    **Methods:** ``GET``
    """
    return render_template('team.html')
