# Based on: https://www.linkedin.com/learning/advanced-python/transforms

def main():
    nums = tuple(range(20))
    chars = 'abcDeFGHiJklmnoP'
    grades = (81, 89, 94, 78, 61, 66, 99, 74)
    def to_grade(x):
        if x >= 90:
            return 'A'
        elif x >= 80:
            return 'B'
        elif x >= 70:
            return 'C'
        elif x >= 65:
            return 'D'
        return 'E'

    # Filter:
    print('Filter:')
    print(list(filter(lambda num: num % 2, nums)))  # the first input of the 'filter' function is a function, that can also be a lambda function
    print([num for num in nums if num % 2])  # can also be achieved using list comprehension
    
    print(list(filter(lambda char: char.isupper(), chars)))
    print([char for char in chars if char.isupper()])

    # Map:
    print('\nMap:')
    print(list(map(lambda num: num**2, nums)))
    print([num**2 for num in nums])

    print(list(map(to_grade, grades)))
    print([to_grade(num) for num in grades])


if __name__ == '__main__':
    main()
