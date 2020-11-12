# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms

def bubble_sort(dataset):
    # print('Sorting with bubble sort...')
    dataset_copy = [*dataset]  # create a copy to avoid mutating the original array
    for i in range(len(dataset_copy)-1, 0 , -1):
        for j in range(i):
            if dataset_copy[j] > dataset_copy[j+1]:
                dataset_copy[j], dataset_copy[j+1] = dataset_copy[j+1], dataset_copy[j]
            # print(f'Current state {i, j} --> {dataset}')
        # print(f'Current state ({i}): {dataset}')
    return dataset_copy


def merge_sort(dataset):
    if len(dataset) > 1:
        mid = len(dataset) // 2
        left_array = dataset[:mid]
        right_array = dataset[mid:]

        # Recursively break down the arrays (until all of them elements are separated):
        merge_sort(left_array)
        merge_sort(right_array)

        # Merge back:
        i = 0  # index into the left array
        j = 0  # index into the right array
        k = 0  # index into the merged array
        while i < len(left_array) and j < len(right_array):
            if left_array[i] < right_array[j]:
                dataset[k] = left_array[i]
                i += 1
            else:
                dataset[k] = right_array[j]
                j += 1
            k += 1

        # If the left array or right array still have values, add them:
        while i < len(left_array):
            dataset[k] = left_array[i]
            i += 1
            k += 1

        while j < len(right_array):
            dataset[k] = right_array[j]
            j += 1
            k += 1
    return dataset


def quick_sort(dataset, first, last):
    if first < last:
        # Calculate the split point:
        pivot_idx = partition(dataset, first, last)

        # Sort the two partitions:
        quick_sort(dataset, first, pivot_idx-1)
        quick_sort(dataset, pivot_idx+1, last)
    return dataset


def partition(datavalues, first, last):
    # Choose the first item as the pivot value, and establish the upper and lower indexes:
    pivot_value = datavalues[first]
    lower = first + 1
    upper = last

    # Start searching for the crossing point:
    done = False
    while not done:
        # Advance the lower index:
        while lower <= upper and datavalues[lower] <= pivot_value:
            lower += 1

        # Advance the upper index:
        while datavalues[upper] >= pivot_value and upper >= lower:
            upper -= 1

        # If the two indexes cross, we have found the split point:
        if upper < lower:
            done = True
        else:
            datavalues[lower], datavalues[upper] = datavalues[upper], datavalues[lower]

    # When the split point is found, exchange the pivot value:
    datavalues[first], datavalues[upper] = datavalues[upper], datavalues[first]

    # Return the split point index:
    return upper


def main():
    dataset = (6, 20, 8, 19, 56, 23, 87, 41, 49, 53)
    print(f'Original dataset: {dataset}\n')

    print(f'Dataset sorted with bubble sort: {bubble_sort(dataset)}')
    print(f'Dataset sorted with merge sort:  {merge_sort([*dataset])}')
    print(f'Dataset sorted with merge sort:  {quick_sort([*dataset], 0, len(dataset)-1)}')
    
    print(f'\nOriginal dataset (should not be mutated): {dataset}\n')


if __name__ == '__main__':
    main()
