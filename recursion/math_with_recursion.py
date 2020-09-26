# Source: https://www.linkedin.com/learning/programming-foundations-algorithms/power-and-factorial

def power(num, pwr):
    if pwr == 0:
        return 1
    else:
        return num * power(num, pwr-1)


def factorial(num):
    if num == 0:
        return 1
    else:
        return num * factorial(num-1)


def print_power(num, pwr):
    result = power(num, pwr)
    print(f'{num}**{pwr} is {result}.')


def print_factorial(num):
    result = factorial(num)
    print(f'{num}! is {result}.')


print_power(5, 3)
print_power(1, 5)
print_factorial(4)
print_factorial(0)
