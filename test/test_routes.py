"""
.. module:: test_routes
    :synopsis: This module tests that routes behave as expected.

.. moduleauthor:: Dan Schlosser <dan@dan@schlosser.io>
"""

from base import TestingTemplate


class TestRoutes(TestingTemplate):
    """Test the basic behavior of routes."""

    OK = (200, 201)
    REDIRECT = (301, 302)

    ROUTE_EXPECTATIONS = [
        ('/', OK),
        ('/typography', OK),
    ]

    ROUTE_MSG = 'Error requesting route: {}. {} not in {}.'

    def test_routes(self):
        """Test that routes on the client return the expected status codes."""
        for url, code in self.ROUTE_EXPECTATIONS:
            response = self.request(url)
            self.assertIn(response.status_code,
                          code,
                          msg=self.ROUTE_MSG.format(url,
                                                    response.status_code,
                                                    code))
