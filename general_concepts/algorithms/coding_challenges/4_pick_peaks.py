"""
Code Warriors' Challenge 2022
Challenge #04

Task:
Write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.
For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).
The output will be returned as a dictionary with two items: pos and peaks. Both items should contains one-one array.
If there is no peak in the given array, then the output should be: {pos: [ ], peaks: [ ]}

Rules:
All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the input.
The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).
Also, beware of plateaus!
- like [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] and [1, 2, 2, 2, 2] do not.
- in case of a plateau-peak, please only return the position and value of the beginning of the plateau.
- for example the pick_peaks([1, 2, 2, 2, 1]) returns: {pos: [1], peaks: [2]}

Example:
pick_peaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return: {pos: [3, 7], peaks: [6, 3]}

Code form:
def pick_peaks(arr):
    # insert your solution here
"""


def pick_peaks(arr):
    result = {"pos": [], "peaks": []}
    for idx in range(len(arr)):
        if (idx == 0) or (idx == len(arr) - 1):
            continue
        # For interim elements:
        is_peak = arr[idx-1] < arr[idx] > arr[idx+1]
        is_plateau_start = (arr[idx-1] < arr[idx]) and (arr[idx] == arr[idx+1]) and (arr[idx] > min(arr[idx+1:]))
        if is_peak or is_plateau_start:
            result["pos"].append(idx)
            result["peaks"].append(arr[idx])
    return result


testcases = [
    pick_peaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) == {"pos": [3, 7], "peaks": [6, 3]},
    pick_peaks([1, 2, 2, 2, 1]) == {"pos": [1], "peaks": [2]},
    pick_peaks([1, 2, 2, 2, 2]) == {"pos": [], "peaks": []},
    pick_peaks([1, 2, 2, 2, 3]) == {"pos": [], "peaks": []},
    pick_peaks([]) == {"pos": [], "peaks": []},
    pick_peaks([0, 1, 2, 5, 1, 0]) == {"pos": [3], "peaks": [5]},
]
print(f"Result: {all(testcases)}")
print(f"Details: {testcases}")
