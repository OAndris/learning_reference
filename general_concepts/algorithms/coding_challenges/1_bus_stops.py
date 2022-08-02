"""
Code Warriors' Challenge 2022
Challenge #01

There is a bus moving in the city, and it takes and drop some people in each bus stop.
You are provided with a list (or array) of integer pairs. Elements of each pair represent number of people get into bus (the first item) and number of people get off the bus (the second item) in a bus stop.
Your task is to return number of people who are still in the bus after the last bus station(after the last array). Even though it is the last bus stop, the bus is not empty and some people are still in the bus.

Take a look on the test cases:
[[10, 0], [3, 5], [5, 8]] - -> 5
[[3, 0], [9, 1], [4, 10], [12, 2], [6, 1], [7, 10]] - -> 17
[[3, 0], [9, 1], [4, 8], [12, 2], [6, 1], [7, 8]] - -> 21

Please keep in mind that the test cases ensure that the number of people in the bus is always >= 0. So the return integer can't be negative.

The second value in the first integer array is 0, since the bus is empty in the first bus stop.

Code form
def number(bus_stops):
    # insert your solution here
"""


def number(bus_stops):
    return sum([(bus_stop[0] - bus_stop[1]) for bus_stop in bus_stops])


testcases = [
    number([[10, 0], [3, 5], [5, 8]]) == 5,
    number([[3, 0], [9, 1], [4, 10], [12, 2], [6, 1], [7, 10]]) == 17,
    number([[3, 0], [9, 1], [4, 8], [12, 2], [6, 1], [7, 8]]) == 21
]
print(testcases)
