# Source: https://www.youtube.com/watch?v=6tNS--WetLI (Python Tutorial: Unit Testing Your Code with the unittest Module)

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ValueError('Can not divide by zero!')
    return x / y
