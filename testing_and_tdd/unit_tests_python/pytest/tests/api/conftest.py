"""
Note that the name of this has to be "conftest.py" in order for other test modules to have access to the fixtures defined here.
"""

import pytest

@pytest.fixture
def supply_url():
	return "https://reqres.in/api"
