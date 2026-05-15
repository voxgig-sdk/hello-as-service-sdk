# ProjectName SDK exists test

import pytest
from helloasservice_sdk import HelloAsServiceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HelloAsServiceSDK.test(None, None)
        assert testsdk is not None
