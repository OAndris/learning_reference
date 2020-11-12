# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms

def find_max(items):
    # Linear time complexity: O(n)
    if len(items) == 1:  # breaking condition of the recursive function
        return items[0]

    op1 = items[0]
    op2 = find_max(items[1:])
    return op1 if (op1 > op2) else op2


def main():
    items = [6, 20, 8, 19, 56, 23, 87, 41, 49, 53]
    print(find_max(items))
    

if __name__ == '__main__':
    main()
