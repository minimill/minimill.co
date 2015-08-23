"""
.. module:: ContactForm
    :synopsis: A form for editing a :class:`~app.models.User`.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from flask.ext.wtf import Form
from wtforms import StringField, TextAreaField
from wtforms.validators import Required, Email

EMAIL_ERROR = 'Please pass a working email address.'


class ContactForm(Form):
    """A form for editing a :class:`~app.models.User`.

    :ivar name: :class:`wtforms.fields.StringField` - The user's name
    :ivar email: :class:`wtforms.fields.StringField` - The user's email address
    """
    name = StringField('who are you?', [Required('Please type a name.')])
    email = StringField('what is your email?',
                        [Email(message=EMAIL_ERROR),
                         Required(message=EMAIL_ERROR)])
    message = TextAreaField('how can we help?',
                            [Required('Please type a message.')])
