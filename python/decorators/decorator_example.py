
def decorator(base_function):
    def wrapper():
        print('this is before the function call')
        base_function()
        print('this is after the function call')
    return wrapper

@decorator
def base_function():
    print('this is f3')

"""
If the decorator is used in the following, simplified way:
    @decorator
    def base_function():
        ...

Then we do not have to use the following, equivalent but more complicated implementation:
    wrappped_base_function = decorator(base_function)
    wrappped_base_function()
"""

base_function()
