# Source: https://www.linkedin.com/learning/advanced-python/function-documentation-strings

"""
Docstring Best Practices:
- enclose docstrings in triple quotes
- first line should be summary sentence of functionality
- modules: list important classes, functions, exceptions
- classes: list important methods, properties, static member functions
- functions: list parameters plus return value(s) and explain each, one per line + mention any exception that the function raises

Learn more: https://www.python.org/dev/peps/pep-0257/
"""


def my_function(arg1, arg2=None):
    """
    my_function(arg1, arg2=None) --> returns None

    Prints the arguments.

    Parameters:
        arg1: any argument
        arg2: any argument, defaults to None
    """
    print(arg1, arg2)


def main():
    print(my_function.__doc__)  # prints the docstring of a function


if __name__ == '__main__':
    main()
