# Based on: https://www.linkedin.com/learning/advanced-python/itertools

import itertools


def cycle_over_items():
    seq1 = ['Joe', 'John', 'Mike']
    cycle1 = itertools.cycle(seq1)  # infinite iterator
    print(next(cycle1))
    print(next(cycle1))
    print(next(cycle1))
    print(next(cycle1))
    print(next(cycle1))
    print()


def counter():
    count = itertools.count(100, 10)
    print(next(count))
    print(next(count))
    print(next(count))
    print()


def accumulate():
    vals = (10, 20, 30, 40, 50, 40, 30)
    print(tuple(itertools.accumulate(vals)))
    print(tuple(itertools.accumulate(vals, max)))
    print()


def chain():
    print(tuple(itertools.chain('ABCD', '1234')))
    print()


def dropwhile():
    vals = [10, 20, 30, 40, 50, 40, 30]
    def test_function(x):
        return x < 40

    print(list(itertools.dropwhile(test_function, vals)))
    print(list(itertools.takewhile(test_function, vals)))
    print()


def main():
    cycle_over_items()
    counter()
    accumulate()
    chain()
    dropwhile()



if __name__ == '__main__':
    main()
