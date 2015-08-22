"""
.. module:: base
    :synopsis: This defines common functionality in our test suite, in the base
    class :class:`TestingTemplate`, which should be inherited by all test
    suite classes.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

import unittest
import mongoengine
from app import create_app


class TestingTemplate(unittest.TestCase):

    def setUp(self):  # noqa
        """Before every test, make some an example user."""
        from app.models import User
        user = User(name='Test User', email="testuser@test.com")
        user.save()

    def tearDown(self):  # noqa
        """After every test, delete users created in :func:`setUp`."""
        from app.models import User
        User.drop_collection()

    @classmethod
    def setUpClass(cls):  # noqa
        """Sets up a test database before each set of tests."""
        cls.app = create_app(
            MONGODB_SETTINGS={'DB': 'testing'},
            TESTING=True,
            CSRF_ENABLED=False,
            WTF_CSRF_ENABLED=False
        )

    def request(self, path, method='GET', role='admin', *args, **kwargs):
        """Make an http request with the given role's gplus_id
        in the session and a User with the given role in the database.
        """
        with self.app.test_client() as c:
            kwargs['method'] = method
            kwargs['path'] = path
            return c.open(*args, **kwargs)

    def test_create_test_app(self):
        """Assert that we are in a proper testing environment."""
        self.assertTrue(self.app.config['TESTING'])
        self.assertFalse(self.app.config['CSRF_ENABLED'])
        self.assertEqual(mongoengine.connection.get_db().name, 'testing')
