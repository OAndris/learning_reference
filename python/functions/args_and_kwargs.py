# Source: https://www.geeksforgeeks.org/args-kwargs-python/
# Source: https://www.linkedin.com/learning/python-essential-training-2/argument-lists
# Source: https://www.linkedin.com/learning/python-essential-training-2/keyword-arguments
# Source: https://www.linkedin.com/learning/advanced-python/variable-argument-lists


def variable_number_of_positional_arguments(*args):
    if len(args):
        print('1 or more positional arguments:')
        for s in args:
            print(s, end=' ')
    else:
        print('\n0 positional arguments:')
        print('Meow.')


def variable_number_of_keyword_arguments(**kwargs):
    if len(kwargs):
        print('1 or more keyword arguments:')
        for k in kwargs:
            print(f'Kitten {k} says {kwargs[k]}.', end=' ')
    else:
        print('\n0 keyword arguments:')
        print('Meow.')


def variable_number_of_positional_and_keyword_args(*args, **kwargs):
    print(f'Args: {args}. Kwargs: {kwargs}.')


def fun(x, *args, **kwargs):
    print(f'First argument: {x}. Args: {args}. Kwargs: {kwargs}.')


def do_operation_on_any_number_of_numbers(operator, *args, start_from=0):
    result = start_from
    if operator == '+':
        for arg in args:
            result += arg
    elif operator == '-':
        for arg in args:
            result -= arg
    elif operator == '*':
        for arg in args:
            result *= arg
    else:
        print(f'Unknown operator "{operator}".', end=' ')
    print(f'Result is {result}')
    return result


def strictly_separated_positional_and_keyword_arguments(positional1, positional2, *, keyword1=None):
    """
    NOTE: if the '*' (asterisk) character is placed after the last positional and before the first keyword argument,
    then the keyword has to be explicitly defined when calling the function.
    It can be used to force the users of the function to define the exact key-value pairs, and reduce errors.
    """
    print(positional1, positional2, keyword1)


def main():
    args = ('meow', 'grrr', 'purr')
    kwargs = dict(Buffy='meow', Zilla='grr', Angel='rawr')
    nums = (1, 3, 7, 5, 9, 4, 8, 12, 150)

    variable_number_of_positional_arguments(*args)
    variable_number_of_positional_arguments()
    print()
    
    variable_number_of_keyword_arguments(**kwargs)
    variable_number_of_keyword_arguments()
    print()
    
    variable_number_of_positional_and_keyword_args(*args, **kwargs)
    variable_number_of_positional_and_keyword_args(*args)
    variable_number_of_positional_and_keyword_args(**kwargs)
    variable_number_of_positional_and_keyword_args()
    print()
    
    fun('Merlin', *args, **kwargs)
    print()

    do_operation_on_any_number_of_numbers('+', *nums)
    do_operation_on_any_number_of_numbers('-', *nums)
    do_operation_on_any_number_of_numbers('*', *nums)
    do_operation_on_any_number_of_numbers('/', *nums)
    do_operation_on_any_number_of_numbers('+', *nums, start_from=10)
    do_operation_on_any_number_of_numbers('+', 1, 5)
    do_operation_on_any_number_of_numbers('+', 1, 5, 10)
    do_operation_on_any_number_of_numbers('+', 1, 5, 10, start_from=10)
    print()

    strictly_separated_positional_and_keyword_arguments(1, 5)
    strictly_separated_positional_and_keyword_arguments(1, 5, keyword1=10)


if __name__ == '__main__':
    main()
