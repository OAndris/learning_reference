# Source: https://www.linkedin.com/learning/python-essential-training-2/loops

def print_fibonacci_numbers(n):
    a, b = 0, 1
    while b < n:
        print(b, end=' ')
        a, b = b, a+b

print_fibonacci_numbers(50000)
