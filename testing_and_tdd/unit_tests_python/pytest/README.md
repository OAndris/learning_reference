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
    - `pytest --collect-only` shows a list of the tests without running them
    - `pytest --lf` runs only the set of tests that failed at the last run, or all tests if none failed
    - `pytest -x` stop after first failure
    - `pytest -n 4` runs tests in parallel, by multiple workers (4 in this case). First needs to be installed: `pip install pytest-xdist`
- Fixtures:
    - `@pytest.fixture` can be used as a decorator to create a reusable function, which can perform shared tasks and return data
    - Fixtures can be supplied to test methods as an input
    - A fixture method can even be accessed across multiple test files, but for that, it needs to be defined in a `conftest.py` file
- Parameterized tests:
    - `@pytest.mark.parametrize` can be used as a decorator to supply multiple sets of arguments to a test, and testing each with a single assertion (instead of using multiple assertions for multiple parameters)
- Some other decorators:
    - `@pytest.mark.skip` causes a test to be skipped (not be executed)
    - `@pytest.mark.xfail` causes a test to be executed but excluded from the test results
- Reporting:
    - Test results report:
        - `pytest --junitxml="result.xml"` runs the tests and creates a test results report (a JUnit-style XML file)
    - Code coverage report:
        - **Coverage.py** is a popular code coverage tool for Python
            - `pip install coverage`
            - `coverage run -m pytest arg1 arg2` run pytest through coverage.py
            - `coverage run my_program.py arg1 arg2` run a file (including optional command line arguments)
            - `coverage report` report to terminal
            - `coverage report -m` report to terminal and include missing line numbers
            - `coverage html` report to HTML files (use default folder name: "htmlcov")
        - **Pytest-cov** is a Python plugin to generate coverage reports (adds new command line options to pytest)
            - `pip install pytest-cov`
            - `pytest --cov=./` generates code coverage report for specified path (report to terminal)
            - `pytest --cov=./ --cov-report term` report to terminal
            - `pytest --cov=./ --cov-report term-missing` report to terminal and include missing line numbers
            - `pytest --cov=./ --cov-report term:skip-covered` report to terminal and skip fully covered files (include only files with less than 100% coverage)
            - `pytest --cov=./ --cov-report html` report to HTML files (use default folder name: "htmlcov")
            - `pytest --cov=./ --cov-report html:coverage_html` report to HTML files (use specified folder name)
            - `pytest --cov=./ --cov-report xml` report to XML file (use default file name: "coverage.xml")
            - `pytest --cov=./ --cov-report xml:coverage.xml` report to XML file (use specified file name)

## More info:
- [Pytest tutorial, setup](https://www.guru99.com/pytest-tutorial.html)
- [Pytest cheat sheet](https://gist.github.com/kwmiebach/3fd49612ef7a52b5ce3a/a62c6366b4442df3a50d867afe598fde403ccca7)
- [Best practices (e.g. folder structure)](https://docs.pytest.org/en/stable/goodpractices.html)
- [Command line options for pytest](https://docs.pytest.org/en/reorganize-docs/new-docs/user/commandlineuseful.html)
- Code coverage:
    - [Overview of code coverage tools](https://www.sealights.io/agile-testing/test-metrics/python-code-coverage/)
    - [Coverage.py documentation](https://coverage.readthedocs.io/en/coverage-5.3.1/)
    - [Pytest-cov documentation](https://pytest-cov.readthedocs.io/en/latest/reporting.html)
