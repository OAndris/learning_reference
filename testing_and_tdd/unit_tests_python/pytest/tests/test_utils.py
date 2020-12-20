import pytest
from src.mypkg import utils


def test_replace_value_if_invalid():
    assert utils.replace_value_if_invalid(3, [4, ""], None) == 3
    assert utils.replace_value_if_invalid(4, [4, ""], None) == None
    assert utils.replace_value_if_invalid(5, [4, ""], None) == 5
    assert utils.replace_value_if_invalid("", [4, ""], None) == None
    assert utils.replace_value_if_invalid(None, [4, ""], None) == None
