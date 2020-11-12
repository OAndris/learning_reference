# Source: https://www.linkedin.com/learning/programming-foundations-algorithms/hash-tables

# In Python, the built-in dictionary is a hash table.
items1 = dict({
    'key1': 1,
    'key2': 2,
    'key3': 'three',
})
print(items1)
items1['key2'] = 'two'
print(items1)

items2 = {}
items2['key1'] = 1
items2['key2'] = 2
items2['key3'] = 3
print(items2)

# print(items1['key6'])  # would throw a KeyError

for key in items2.keys():
    print(key)

for value in items2.values():
    print(value)

for key, value in items2.items():
    print(f'Key: {key} --> value: {value}.')
