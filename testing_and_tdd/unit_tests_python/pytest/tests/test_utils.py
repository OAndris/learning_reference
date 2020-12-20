import pytest
from src.mypkg import utils


def test_replace_value_if_invalid():
    assert utils.replace_value_if_invalid(3, [4, ""], None) == 3
    assert utils.replace_value_if_invalid(4, [4, ""], None) == None
    assert utils.replace_value_if_invalid(5, [4, ""], None) == 5
    assert utils.replace_value_if_invalid("", [4, ""], None) == None
    assert utils.replace_value_if_invalid(None, [4, ""], None) == None

def test_higher_than_5():
    assert utils.higher_than_5(6) == "Higher than 5"
    assert utils.higher_than_5(5.01) == "Higher than 5"
    assert utils.higher_than_5(5) == "Not higher than 5"
    assert utils.higher_than_5(4.99) == "Not higher than 5"
    assert utils.higher_than_5(0) == "Not higher than 5"
    assert utils.higher_than_5(-5) == "Not higher than 5"

def test_smaller_than_5():
    # Example of a not fully tested function, both statement and branch coverage will be less than 100%
    assert utils.smaller_than_5(5) == "Not smaller than 5"
