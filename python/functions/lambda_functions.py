# Source: https://www.linkedin.com/learning/advanced-python/lambda-functions

"""
Lambda Functions:
- small, anonymous functions
- can be passed arguments where you need a function
- typically used in place just when needed
- defined as lambda (parameters) : (expression)
"""

def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32


def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9


def main():
    ctemps = [0, 12, 34, 100]
    ftemps = [32, 65, 100, 212]

    print(list(map(fahrenheit_to_celsius, ftemps)))
    print(list(map(celsius_to_fahrenheit, ctemps)))

    print(list(map(lambda f: (f - 32) * 5/9, ftemps)))
    print(list(map(lambda c: (c * 9/5) + 32, ctemps)))


if __name__ == '__main__':
    main()
