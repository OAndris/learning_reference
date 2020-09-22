# Source: https://www.geeksforgeeks.org/args-kwargs-python/
# Source: https://www.linkedin.com/learning/python-essential-training-2/argument-lists
# Source: https://www.linkedin.com/learning/python-essential-training-2/keyword-arguments

def main():
    args = ('meow', 'grrr', 'purr')
    kwargs = dict(Buffy='meow', Zilla='grr', Angel='rawr')
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

if __name__ == '__main__':
    main()
