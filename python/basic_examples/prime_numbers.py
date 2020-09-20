# Source: https://www.linkedin.com/learning/python-essential-training-2/functions

def isprime(n):
    if n <= 1:
        return False
    for x in range(2, n):
        if n % x == 0:
            return False
    return True

def list_primes_until(x):
    for n in range(x):
        if isprime(n):
            print(n, end=' ')

list_primes_until(100)
