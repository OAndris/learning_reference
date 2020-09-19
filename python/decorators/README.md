# decorators

A **decorator** in Python is a special type of function that returns a wrapper function (it is a form of metaprogramming).

A decorator is a function that takes a function as input, and returns a wrapped version of the input function. It just implements and returns another function, which actually calls the input function, plus decorates it with any other tasks we have immplemented.

In Python, everything is an object. Functions are also objects, and thus:
- functions can also be assigned to variables
- functions might as well be taken as input and/or returned as output by other functions.
