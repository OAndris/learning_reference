# python_generators

**About:**

A **generator** in Python is a special type of function that serves as an iterator.

A generator uses the `yield` keyword instead of the `return` keyword, to return an iterator object (a stream of values) instead of an actual value. Returning an iterator is completely different than returning an entire array of elements - a generator just yields the next element in each iteration.

For example, the built-in `range()` function is a generator. It returns (yields) an iterator object, that can be used e.g. in a for loop to yield the next element, without storing an actual array of elements.

**Usage:**

Run `python inclusive_range.py` in the terminal.

**Source:**

Example taken from the LinkedIn Learning course named "Python Essential Training" by Bill Weinman. Link: https://www.linkedin.com/learning/python-essential-training-2/generators
