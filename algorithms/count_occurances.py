# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms

items = [
    'apple', 'pear', 'orange', 'banana', 'apple',
    'orange', 'apple', 'pear', 'banana', 'orange',
    'apple', 'kiwi', 'pear', 'apple', 'orange'
]

counter = dict()
for item in items:
    if item not in counter:
        counter[item] = 1
    else:
        counter[item] += 1

print(counter)
