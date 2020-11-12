"""
This example shows how to to flatten a nested list of lists, using recursion and generators.

Source: PyBites on Twitter
"""

print('The input is a list of lists having any number of nested layers:')
numbers = [
    [1],
    [2, 3],
    [4, [5, 6, [7, 8, [9, [10, 11, 12]]]]]
]
print(numbers)

# Option 1
print('\nUsing the built-in itertools could flatten the first layer of nesting:')
from itertools import chain
print(list(chain.from_iterable(numbers)))

# Option 2
print('\nUsing recursion and generators, it is easy to flatten all nested layers:')
def flatten(numbers):
    for num in numbers:
        if type(num) == int:
            yield num
        else:
            yield from flatten(num)

flattened_generator = flatten(numbers)
flattened_list = list(flatten(numbers))
print(flattened_generator, type(flattened_generator))
print(flattened_list)
print(sum(flattened_list))
