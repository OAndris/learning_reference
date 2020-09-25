"""
Sources:
https://www.linkedin.com/learning/advanced-python/using-namedtuple
https://www.linkedin.com/learning/advanced-python/defaultdict
# TODO - continue
"""

import collections


def namedtuple():
    # Namedtuple is a subclass of tuple with named fields.
    Point = collections.namedtuple('Point', ['x', 'y'])
    p1 = Point(10, 20)
    p2 = Point(30, 40)
    p3 = Point(x=10, y=200)
    print(p1, p2)
    print(p1.x, p2.y)

    p1 = p1._replace(x=100)
    print(p1)
    print()


def defaultdict():
    # When trying to access a key that doesn't exist, it creates a default value using the constructor defined in the input.
    # (it helps to avoid having to check if a specific key exists and initialize a value if not)
    fruits = ['apple', 'pear', 'orange', 'banana', 'apple', 'grape', 'banana', 'banana']
    fruit_counter = collections.defaultdict(int)
    # fruit_counter = collections.defaultdict(lambda: 100)
    for fruit in fruits:
        fruit_counter[fruit] += 1
    for k, v in fruit_counter.items():
        print(f'{k}: {str(v)}')


def main():
    namedtuple()
    defaultdict()


if __name__ == '__main__':
    main()
