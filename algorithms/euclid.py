"""
Euclid's Algorithm
Find the the greatest common denominator (GCD) of two integers.
Example: GCD of 20 and 8 is 4.
1) For two integers 'a' and 'b', where a > b, divide a by b.
2) If the remainder 'r' is 0, then stop: GCD is b.
3) Otherwise, set a to b, b to r, and repeat at step 1 until r is 0.
"""
# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms/common-algorithms-in-programming


def euclid_find_gcd_with_recursion(a, b):
    a, b = (a, b) if a >= b else (b, a)
    r = a % b
    if r == 0:
        print(b)
        return b
    a, b = b, r
    euclid_find_gcd_with_recursion(a, b)


def euclid_find_gcd_with_while(a, b):
    a, b = (a, b) if a >= b else (b, a)
    while (b != 0):
        a, b = b, (a % b)
    print(a)
    return a


def main():
    euclid_find_gcd_with_while(20, 8)
    euclid_find_gcd_with_while(8, 20)
    euclid_find_gcd_with_while(20, 7)
    euclid_find_gcd_with_while(7, 20)
    euclid_find_gcd_with_while(21, 14)
    euclid_find_gcd_with_while(21, 7)
    euclid_find_gcd_with_while(21, -3)


if __name__ == '__main__':
    main()
