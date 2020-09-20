# generators

A **generator** in Python is a special type of function that serves as an iterator.

A generator uses the `yield` keyword instead of the `return` keyword, to return an iterator object (a stream of values) instead of an actual value. Returning an iterator is completely different than returning an entire array of elements - a generator just yields the next element in each iteration (without storing a collection of the elements in memory). Thus, iterators are not the same as collections, although but are sequences.

For example, the built-in `range()` function is a generator. It returns (yields) an iterator object, that can be used e.g. in a for loop to yield the next element, without storing an actual array of elements.
