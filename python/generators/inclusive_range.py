# Example taken from the LinkedIn Learning course named "Python Essential Training" by Bill Weinman. Link: https://www.linkedin.com/learning/python-essential-training-2/generators

def main():
    for i in inclusive_range(25):
        print(i, end=' ')
    print()


def inclusive_range(*args):
    """A custom version of the built-in 'range' generator function, one which also includes the end value."""
    numargs = len(args)
    start = 0
    step = 1

    if numargs == 0:
        raise TypeError(f'Expected at least 1 argument, got {numargs}.')
    elif numargs == 1:
        stop = args[0]
    elif numargs == 2:
        (start, stop) = args
    elif numargs == 3:
        (start, stop, step) = args
    else:
        raise TypeError(f'Expected at most 3 arguments, got {numargs}.')
    
    # Generator:
    i = start
    while i <= stop:
        yield i
        i += step


if __name__ == '__main__':
    main()
