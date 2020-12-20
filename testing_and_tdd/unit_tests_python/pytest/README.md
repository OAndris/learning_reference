# Unit testing in Python with pytest

This folder demonstrates the use of "pytest", a popular unit test framework for Python.

## Basics

- Test discovery:
    - Test file names have to either start with "test_" or end with "_test"
    - Test method names have to start with "test"
- Assertions:
    - Assertions are done with the "assert" keyword (e.g. "assert 5 == 5")
    - If an assertion fails in a test method, then that method execution is stopped, and pytest will continue with the next test method
- Test running examples:
    - `pytest` runs all discovered tests
    - `pytest -v` the "-v" increases the verbosity of pytest
    - `pytest tests/test_calculations.py` runs the tests in the specified folder or file
    - `pytest -k <expression>` runs the test methods whose name contain the string specified by \<expression>
    - `pytest -m <name>` runs the test methods which are marked using the **@pytest.mark.\<name>** decorator
    - `pytest --junitxml="result.xml"` runs the tests and creates a test result report (a JUnit-style XML file)
    - `pytest -n 4` runs tests in parallel, by multiple workers (4 in this case). First needs to be installed: `pip install pytest-xdist`
    - `pytest --collect-only` shows a list of the tests without running them
    - `pytest --lf` runs only the set of tests that failed at the last run, or all tests if none failed
    - `pytest -x` stop after first failure
- Fixtures:
    - `@pytest.fixture` can be used as a decorator to create a reusable function, which can perform shared tasks and return data
    - Fixtures can be supplied to test methods as an input
    - A fixture method can even be accessed across multiple test files, but for that, it needs to be defined in a `conftest.py` file
- Parameterized tests:
    - `@pytest.mark.parametrize` can be used as a decorator to supply multiple sets of arguments to a test, and testing each with a single assertion (instead of using multiple assertions for multiple parameters)
- Some other decorators:
    - `@pytest.mark.skip` causes a test to be skipped (not be executed)
    - `@pytest.mark.xfail` causes a test to be executed but excluded from the test results

## More info:
- https://www.guru99.com/pytest-tutorial.html
- https://gist.github.com/kwmiebach/3fd49612ef7a52b5ce3a/a62c6366b4442df3a50d867afe598fde403ccca7
- https://docs.pytest.org/en/stable/goodpractices.html
- https://docs.pytest.org/en/reorganize-docs/new-docs/user/commandlineuseful.html
