import pytest
from src.mypkg import calculations as calc


@pytest.fixture
def fixture_example():
    return [7, 10, 17]


def test_add(fixture_example):
    """
    The fixture in this example is of course not that useful.
    However, it demonstrates how it can be used for supplying reusable data to a test method.
    """
    assert calc.add(fixture_example[0], fixture_example[1]) == fixture_example[2]
    assert calc.add(0, 10) == 10
    assert calc.add(-5, 10) == 5
    assert calc.add(-5, -10) == -15


@pytest.mark.parametrize(
    "input1, input2, expected_result", [
        (7, 10, -3),
        (10, 10, 0),
        (10, 7, 3),
        (-10, 7, -17),
        (-10, -7, -3)
    ]
)
def test_subtract(input1, input2, expected_result):
    """
    The "@pytest.mark.parametrize" decorator can be used to eliminate the need of using multiple assertions for various parameters.
    It does the same job as if the following assertions were used:
    assert calc.subtract(7, 10) == -3
    assert calc.subtract(10, 10) == 0
    assert calc.subtract(10, 7) == 3
    assert calc.subtract(-10, 7) == -17
    assert calc.subtract(-10, -7) == -3
    """
    assert calc.subtract(input1, input2) == expected_result
