# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms

def sequential_search(item, unordered_array):
    # Linear time complexity: O(n)
    for i in range(0, len(unordered_array)):
        if item == unordered_array[i]:
            return i
    return None


def binary_search(item, sorted_array):
    # Logarithmic time complexity: O(log n)
    lower_idx = 0
    upper_idx = len(sorted_array) - 1
    while lower_idx <= upper_idx:
        midpoint = (upper_idx + lower_idx) // 2
        if sorted_array[midpoint] == item:
            return midpoint
        elif item > sorted_array[midpoint]:
            lower_idx = midpoint + 1
        else:
            upper_idx = midpoint - 1
    if lower_idx > upper_idx:
        return None


def is_sorted(array):
    # Linear time complexity: O(n)
    # General solution:
    # for i in range(0, len(array)-1):
    #     if array[i] > array[i+1]:
    #         return False
    # return True
    return all([array[i] <= array[i+1] for i in range(0, len(array)-1)])  # Pythonic solution using list comprehension


def main():
    unordered_array = (6, 20, 8, 19, 56, 23, 87, 41, 49, 53)
    sorted_array = (6, 8, 19, 20, 23, 41, 49, 53, 56, 87)
    
    print(sequential_search(19, unordered_array))
    print(sequential_search(87, unordered_array))
    print(sequential_search(0, unordered_array))
    print()
    print(binary_search(19, sorted_array))
    print(binary_search(87, sorted_array))
    print(binary_search(0, sorted_array))
    print()
    print(is_sorted(unordered_array))
    print(is_sorted(sorted_array))


if __name__ == '__main__':
    main()
